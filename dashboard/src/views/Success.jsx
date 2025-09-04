import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import error from "../assets/error.png";
import success from "../assets/success.png";
import { active_stripe_connect_account, messageClear } from "../store/Reducers/sellerReducer";
const Success = () => {
        const queryParams = new URLSearchParams(window.location.search);
        const activeCode = queryParams.get("activeCode");
        const navigate = useNavigate();

        const dispatch = useDispatch();
        const { successMessage, errorMessage, loader } = useSelector((state) => state.seller);

        useEffect(() => {
                dispatch(active_stripe_connect_account(activeCode));
        }, [activeCode]);
        const backToDashboard = () => {
                dispatch(messageClear());
                navigate("/seller/dashboard");
        };
        return (
                <div className="w-screen h-screen flex justify-center items-center flex-col gap-4">
                        {loader ? (
                                <FadeLoader />
                        ) : errorMessage ? (
                                <>
                                        <img src={error}></img>
                                        <button
                                                className="px-5 py-2 bg-green-600 rounded-sm text-white"
                                                onClick={backToDashboard}
                                        >
                                                Back to Dashboard
                                        </button>
                                </>
                        ) : (
                                successMessage && (
                                        <>
                                                <img src={success}></img>
                                                <button
                                                        className="px-5 py-2 bg-green-600 rounded-sm text-white"
                                                        onClick={backToDashboard}
                                                >
                                                        Back to Dashboard
                                                </button>
                                        </>
                                )
                        )}
                </div>
        );
};

export default Success;
