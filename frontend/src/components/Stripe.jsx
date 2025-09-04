import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import api from "../api/api.js";
import CheckoutForm from "./CheckoutForm";
import toast from "react-hot-toast";
const stripePromise = loadStripe(
        "pk_test_51RaH3APBwwmRlhpMfmf5s80OxN9OMAWM5Qn9rnmaJjNCsUoAiWKocPCvQa4bJefO6to5lr11FP6ejQfZ31A6V9Yc00Vg47FhDK"
);
const Stripe = ({ orderId, price }) => {
        const [clientSecret, setClientSecret] = useState(null);
        const apperance = {
                theme: "stripe",
        };
        const options = {
                apperance,
                clientSecret,
        };

        const createPayment = async () => {
                try {
                        const response = await api.post(
                                "/order/create-payment-intent",
                                {
                                        orderId,
                                        price,
                                },
                                { withCredentials: true }
                        );

                        setClientSecret(response.data.data.clientSecret);
                } catch (error) {
                        console.log(error.response.data);
                        toast.error(error.response.data.message);
                }
        };

        return (
                <div className="mt-4">
                        {clientSecret ? (
                                <Elements options={options} stripe={stripePromise}>
                                        <CheckoutForm orderId={orderId} />
                                </Elements>
                        ) : (
                                <button
                                        onClick={createPayment}
                                        className="cursor-pointer px-10 py-[6px] rounded-sm hover:shadow-green-700/50 hover:shadow-lg font-semibold bg-green-700 text-white"
                                >
                                        Start Payment
                                </button>
                        )}
                </div>
        );
};

export default Stripe;
