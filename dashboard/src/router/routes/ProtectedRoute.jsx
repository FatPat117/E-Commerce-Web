import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ route, children }) => {
        const { role, userInfo } = useSelector((state) => state.auth);

        if (role) {
                if (userInfo) {
                        // check if the route is visible to the user
                        if (userInfo?.role === route?.role) {
                                if (userInfo?.role === "seller") {
                                        // seller mới có status
                                        if (route?.status === userInfo?.status) {
                                                return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
                                        } else {
                                                if (userInfo?.status === "pending") {
                                                        return <Navigate to="/seller/account-pending" replace />;
                                                } else {
                                                        return <Navigate to="/seller/account-deactive" replace />;
                                                }
                                        }

                                        //
                                } else {
                                        // admin thì không cần check status
                                        return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
                                }
                        } else {
                                if (route?.visibility?.includes(userInfo?.status)) {
                                        return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
                                } else {
                                        return <Navigate to="/seller/account-pending" replace />;
                                }
                        }
                } else {
                        return <Navigate to="/login" replace />;
                }
        } else {
                return <Navigate to="/login" replace />;
        }
};

export default ProtectedRoute;
