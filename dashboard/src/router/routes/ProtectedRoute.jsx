import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ route, children }) => {
        const { role, userInfo } = useSelector((state) => state.auth);

        if (role) {
                if (userInfo) {
                        if (userInfo?.role == route?.role) {
                                return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
                        } else {
                                return <Navigate to="/unauthorized" />;
                        }
                } else {
                        return <Navigate to="/unauthorized" />;
                }
        } else {
                return <Navigate to="/login" replace />;
        }
};

export default ProtectedRoute;
