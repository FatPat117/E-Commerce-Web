import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import api from "../api/api";
import error from "../assets/error.png";
import success from "../assets/success.png";
const load = async () => {
        return await loadStripe(
                "pk_test_51RaH3APBwwmRlhpMfmf5s80OxN9OMAWM5Qn9rnmaJjNCsUoAiWKocPCvQa4bJefO6to5lr11FP6ejQfZ31A6V9Yc00Vg47FhDK"
        );
};

const ConfirmOrders = () => {
        const [loader, setLoader] = useState(true);
        const [stripe, setStripe] = useState("");
        const [message, setMessage] = useState("");

        const get_load = async () => {
                const tempStripe = await load();
                setStripe(tempStripe);
        };

        useEffect(() => {
                get_load();
        }, []);

        useEffect(() => {
                if (!stripe) {
                        return;
                }

                const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");

                if (!clientSecret) return;

                stripe.retrievePaymentIntent(clientSecret)
                        .then(({ paymentIntent }) => {
                                console.log(paymentIntent.status);
                                switch (paymentIntent.status) {
                                        case "succeeded":
                                                setMessage("succeeded");
                                                break;
                                        case "processing":
                                                setMessage("processing");
                                                break;
                                        case "requires_payment_method":
                                                setMessage("failed");
                                                break;
                                        default:
                                                setMessage("failed");
                                }
                        })
                        .catch((error) => {
                                console.log(error);
                        });
        }, [stripe]);

        const updatePayment = async () => {
                const orderId = localStorage.getItem("orderId");
                if (orderId) {
                        try {
                                const response = await api.post(
                                        `/order/confirm-payment/${orderId}`,
                                        {},
                                        { withCredentials: true }
                                );
                                console.log(response.data);
                                localStorage.removeItem("orderId");
                                setLoader(false);
                        } catch (error) {
                                console.log(error.response.data);
                        }
                }
        };

        useEffect(() => {
                if (message == "succeeded") {
                        updatePayment();
                }
        }, [message]);

        return (
                <div className="w-screen h-screen flex justify-center items-center flex-col gap-4">
                        {message == "failed" || message == "processing" ? (
                                <>
                                        <img src={error} alt="error" />
                                        <Link
                                                to="/dashboard/my-orders"
                                                className="px-5 py-2 bg-green-500 rounded-sm text-white "
                                        >
                                                Back To Dashboard
                                        </Link>
                                </>
                        ) : message == "succeeded" ? (
                                loader ? (
                                        <FadeLoader />
                                ) : (
                                        <>
                                                <img src={success} alt="success" />
                                                <Link
                                                        to="/dashboard/my-orders"
                                                        className="px-5 py-2 bg-green-500 rounded-sm text-white "
                                                >
                                                        Back To Dashboard
                                                </Link>
                                        </>
                                )
                        ) : (
                                <FadeLoader />
                        )}
                </div>
        );
};

export default ConfirmOrders;
