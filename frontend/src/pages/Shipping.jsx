import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { URL } from "../utils/utils.js";
const Shipping = () => {
        return (
                <div>
                        {/* Banner */}
                        <section
                                style={{ backgroundImage: `url(${URL}/images/banner/shop.png)` }}
                                className={` h-[240px] bg-cover bg-no-repeat relative bg-left md-lg:mt-10`}
                        >
                                <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
                                        <div className=" w-[80%] md-lg:w-[85%] lg:w-[90%] h-full mx-auto">
                                                <div className="flex flex-col justify-center items-center gap-1 w-full h-full text-white">
                                                        <h2 className="text-3xl font-bold">Shipping Page</h2>
                                                        <div className="flex justify-center items-center gap-2 text-2xl w-full lg:mt-2">
                                                                <Link to="/">Home</Link>
                                                                <span className="mt-1">
                                                                        <IoIosArrowForward />
                                                                </span>
                                                                <span className="underline text-blue-300">
                                                                        Shipping
                                                                </span>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </section>

                        {/* Main Shipping Page */}
                        <section className="bg-[#eeeeee]">
                                <div className="w-[85%] md:w-[90%] mx-auto py-16">
                                        <div className="w-full flex flex-wrap">
                                                {/* Shipping Form and Order Detais */}
                                                <div className="w-full md-lg:w-[67%]">
                                                        <div className="flex flex-col gap-3">
                                                                <div className="bg-white p-6 shadow-sm rounded-md">
                                                                        <h2 className="text-slate-600 font-bold pb-3">
                                                                                Shipping Information
                                                                        </h2>

                                                                        <form action="">
                                                                                <div className="flex-col md:flex-row md:gap-2 w-full gap-5 text-slate-600 flex">
                                                                                        <div className="flex flex-col gap-1 mb-2 w-full">
                                                                                                <label htmlFor="name">
                                                                                                        Name
                                                                                                </label>
                                                                                                <input
                                                                                                        type="text"
                                                                                                        name="name"
                                                                                                        id="name"
                                                                                                        placeholder="Name..."
                                                                                                        className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                                                                                                />
                                                                                        </div>

                                                                                        <div className="flex flex-col gap-1 mb-2 w-full">
                                                                                                <label htmlFor="address">
                                                                                                        Address
                                                                                                </label>
                                                                                                <input
                                                                                                        type="text"
                                                                                                        name="address"
                                                                                                        id="address"
                                                                                                        placeholder="Address..."
                                                                                                        className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                                                                                                />
                                                                                        </div>
                                                                                </div>
                                                                        </form>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </section>
                </div>
        );
};

export default Shipping;
