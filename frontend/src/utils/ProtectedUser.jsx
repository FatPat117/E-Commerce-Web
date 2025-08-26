import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedUser = ({ children }) => {
        const { userInfo } = useSelector((state) => state.auth);

        if (userInfo) {
                return children;
        } else {
                return <Navigate to="/login" replace={true} />;
        }
};

export default ProtectedUser;
