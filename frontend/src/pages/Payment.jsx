import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Stripe from "../components/Stripe";

const Payment = () => {
        const location = useLocation();
        const price = location.state?.price || 0;
        const items = location.state?.items || 0;
        const orderId = location.state?.orderId || null;
        const [paymentMethods, setPaymentMethods] = useState("stripe");
        return (
                <div>
                        <section className="bg-[#eeeeee]">
                                <div className="w-[85%] md-lg:w-[90%] mx-auto py-16 mt-4">
                                        <div className="flex flex-wrap flex-col-reverse md:flex-row">
                                                {/* Payment method */}
                                                <div className=" w-full md:w-7/12">
                                                        {/* Select payment method */}
                                                        <div className="pr-0 md:pr-2">
                                                                <div className="flex flex-wrap">
                                                                        {/* Stripe */}
                                                                        <div
                                                                                onClick={() =>
                                                                                        setPaymentMethods("stripe")
                                                                                }
                                                                                className={`w-[20%] border-r cursor-pointer py-8 px-12 ${
                                                                                        paymentMethods == "stripe"
                                                                                                ? "bg-white"
                                                                                                : "bg-slate-200"
                                                                                }`}
                                                                        >
                                                                                <div className="flex flex-col gap-[3px] justify-center items-center">
                                                                                        <img
                                                                                                src={`/images/payment/stripe.png`}
                                                                                                alt=""
                                                                                        />
                                                                                        <span className="text-slate-600">
                                                                                                Stripe
                                                                                        </span>
                                                                                </div>
                                                                        </div>

                                                                        {/* Cod */}
                                                                        <div
                                                                                onClick={() => setPaymentMethods("cod")}
                                                                                className={`w-[20%] border-r cursor-pointer py-8 px-12 ${
                                                                                        paymentMethods == "cod"
                                                                                                ? "bg-white"
                                                                                                : "bg-slate-200"
                                                                                }`}
                                                                        >
                                                                                <div className="flex flex-col gap-[3px] justify-center items-center">
                                                                                        <img
                                                                                                src={`/images/payment/cod.jpg`}
                                                                                                alt=""
                                                                                        />
                                                                                        <span className="text-slate-600">
                                                                                                COD
                                                                                        </span>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        </div>

                                                        <div>
                                                                {paymentMethods == "stripe" && (
                                                                        <div>
                                                                                <Stripe />
                                                                        </div>
                                                                )}

                                                                {paymentMethods == "cod" && (
                                                                        <div className="w-full px-4 py-8 bg-white shadow-sm">
                                                                                <button className="px-10 py-[6px] rounded-sm hover:shadow-md shadow:shadow-green-500/50 transition-all duration-500 bg-[#059473] text-white">
                                                                                        Pay Now
                                                                                </button>
                                                                        </div>
                                                                )}
                                                        </div>
                                                </div>

                                                {/* Order summary */}
                                                <div className="w-full md:w-5/12">
                                                        <div className="pl-0 md:pl-2 mb-0">
                                                                <div className="bg-white shadow p-5 text-slate-600 flex flex-col gap-3">
                                                                        <h2 className="font-bold text-xl">
                                                                                Order summary
                                                                        </h2>
                                                                        <div className="flex justify-between items-center text-lg">
                                                                                <span>
                                                                                        {items} Items and Shipping Fee
                                                                                        Included
                                                                                </span>
                                                                                <span>${price}</span>
                                                                        </div>
                                                                        <div className="flex justify-between items-center font-semibold text-lg">
                                                                                <span>Total Amount</span>
                                                                                <span className="text-lg text-[#059473]">
                                                                                        ${price}
                                                                                </span>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </section>
                </div>
        );
};

export default Payment;
