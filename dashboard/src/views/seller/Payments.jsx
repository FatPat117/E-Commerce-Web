import React from "react";
import { MdCurrencyExchange } from "react-icons/md";

const Payments = () => {
        return (
                <div className="px-2 md:px-7 py-5">
                        {/* First Part: Total Sales, Products, Sellers, Orders */}
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4  gap-7 wrap">
                                {/* Total Sales */}
                                <div className="flex justify-between items-center p-5 bg-[#fae8e8] rounded-md gap-3">
                                        <div className="flex flex-col justify-center items-start text-[#5c5a5a]">
                                                <h2 className="text-xl lg:text-3xl font-bold">$3434</h2>
                                                <span className="text-md font-medium">Total Sales</span>
                                        </div>

                                        <div className="w-[40px] h-[45px] rounded-full bg-[#fa0305] flex items-center justify-center text-xl">
                                                <MdCurrencyExchange className="text-[#fae8e8] shadow-lg" />
                                        </div>
                                </div>

                                {/* Products */}
                                <div className="flex justify-between items-center p-5 bg-[#fde2ff] rounded-md gap-3">
                                        <div className="flex flex-col justify-center items-start text-[#5c5a5a]">
                                                <h2 className="text-xl lg:text-3xl font-bold">150</h2>
                                                <span className="text-md font-medium">Available Amount</span>
                                        </div>

                                        <div className="w-[40px] h-[45px] rounded-full bg-[#760077] flex items-center justify-center text-xl">
                                                <MdCurrencyExchange className="text-[#fae8e8] shadow-lg" />
                                        </div>
                                </div>

                                {/* Sellers */}
                                <div className="flex justify-between items-center p-5 bg-[#e9feea] rounded-md gap-3">
                                        <div className="flex flex-col justify-center items-start text-[#5c5a5a]">
                                                <h2 className="text-xl lg:text-3xl font-bold">60</h2>
                                                <span className="text-md font-medium">Withdraw Amount</span>
                                        </div>

                                        <div className="w-[40px] h-[45px] rounded-full bg-[#038000] flex items-center justify-center text-xl">
                                                <MdCurrencyExchange className="text-[#fae8e8] shadow-lg" />
                                        </div>
                                </div>

                                {/* Orders */}
                                <div className="flex justify-between items-center p-5 bg-[#ecebff] rounded-md gap-3">
                                        <div className="flex flex-col justify-center items-start text-[#5c5a5a]">
                                                <h2 className="text-xl lg:text-3xl font-bold">44</h2>
                                                <span className="text-md font-medium">Pending Amount</span>
                                        </div>

                                        <div className="w-[40px] h-[45px] rounded-full bg-[#0200f8] flex items-center justify-center text-xl">
                                                <MdCurrencyExchange className="text-[#fae8e8] shadow-lg" />
                                        </div>
                                </div>
                        </div>
                </div>
        );
};

export default Payments;
