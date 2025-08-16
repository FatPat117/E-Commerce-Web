import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { get_user_info } from "../../store/Reducers/authReducer";

const ProtectedRoute = ({ route, children }) => {
        const dispatch = useDispatch();
        const { role, userInfo, token, loader } = useSelector((state) => state.auth);

        useEffect(() => {
                if (token && !userInfo) {
                        dispatch(get_user_info());
                }
        }, [token, userInfo, dispatch]);

        // 1) Không có token => login
        if (!token) {
                return <Navigate to="/login" replace />;
        }

        // 2) Có token nhưng chưa có userInfo => đợi hydrate (không redirect)
        if (!userInfo) {
                return children; // hoặc return null
        }

        // 3) Kiểm tra role theo route
        if (route?.role && userInfo.role !== route.role) {
                return <Navigate to="/unauthorized" replace />;
        }

        // 4) ADMIN
        if (userInfo.role === "admin") {
                return <Suspense fallback={null}>{children}</Suspense>;
        }

        // 5) SELLER
        if (userInfo.role === "seller") {
                if (route?.visibility?.includes(userInfo.status)) {
                        return <Suspense fallback={null}>{children}</Suspense>;
                }
                if (route?.status && route.status === userInfo.status) {
                        return <Suspense fallback={null}>{children}</Suspense>;
                }
                if (userInfo.status === "pending") {
                        return <Navigate to="/seller/account-pending" replace />;
                }
                if (userInfo.status === "deactive") {
                        return <Navigate to="/seller/account-deactive" replace />;
                }
        }

        return <Navigate to="/unauthorized" replace />;
};

export default ProtectedRoute;
