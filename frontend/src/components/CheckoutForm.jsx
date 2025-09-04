import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
const CheckoutForm = ({ orderId }) => {
        useEffect(() => {
                localStorage.setItem("orderId", orderId);
        }, [orderId]);
        const stripe = useStripe();
        const elements = useElements();
        const [message, setMessage] = useState(null);
        const [isLoading, setIsLoading] = useState(false);

        const paymentElementOptions = {
                layout: "tabs",
        };

        const submit = async (e) => {
                e.preventDefault();
                if (!stripe || !elements) {
                        return;
                }
                setIsLoading(true);
                const { error } = await stripe.confirmPayment({
                        elements,
                        confirmParams: {
                                return_url: `${window.location.origin}/order/confirm`,
                        },
                });

                if (error.type == "card_error" || error.type == "validation_error") {
                        setMessage(error.message);
                } else {
                        setMessage("An Unexpected error occured");
                }

                setIsLoading(false);
        };
        return (
                <form onSubmit={submit} id="payment">
                        <LinkAuthenticationElement id="link-authentication-element" />
                        <PaymentElement id="payment-element" options={paymentElementOptions} />

                        <button className="cursor-pointer px-10 py-[6px] rounded-sm hover:shadow-green-700/50 hover:shadow-lg font-semibold bg-green-700 text-white mt-2">
                                <span id="button-text">{isLoading ? <div>Loading...</div> : "Pay Now"}</span>
                        </button>

                        {message && <div id="payment-message">{message}</div>}
                </form>
        );
};

export default CheckoutForm;
