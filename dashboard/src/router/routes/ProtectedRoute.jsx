import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ route, children }) => {
        const { role, userInfo } = useSelector((state) => state.auth);

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
