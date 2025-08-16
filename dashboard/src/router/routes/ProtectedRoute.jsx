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

        if (loader) {
                return children; //  giữ nguyên UI cũ, không hiện loading
        }

        // --- 1. Chưa đăng nhập ---
        if (!role || !userInfo) {
                return <Navigate to="/login" replace />;
        }

        // --- 2. Không khớp role ---
        if (route?.role && userInfo.role !== route.role) {
                return <Navigate to="/unauthorized" replace />;
        }

        // --- 3. ADMIN: chỉ cần đúng role ---
        if (userInfo.role === "admin") {
                return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
        }

        // --- 4. SELLER: kiểm tra kỹ hơn ---
        if (userInfo.role === "seller") {
                // 4.1 Nếu route có visibility → check
                if (route?.visibility?.includes(userInfo.status)) {
                        return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
                }

                // 4.2 Nếu route yêu cầu status cụ thể → check
                if (route?.status && route.status === userInfo.status) {
                        return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
                }

                // 4.3 Nếu không match, redirect theo status
                if (userInfo.status === "pending") {
                        return <Navigate to="/seller/account-pending" replace />;
                }
                if (userInfo.status === "deactive") {
                        return <Navigate to="/seller/account-deactive" replace />;
                }
        }

        // --- 5. Fallback ---
        return <Navigate to="/unauthorized" replace />;
};

export default ProtectedRoute;
