import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { URL } from "../utils/utils.js";
const Shipping = () => {
        const { state } = useLocation();
        console.log(state);

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

                                                                        {/* Form */}
                                                                        <form action="">
                                                                                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 w-full gap-5  text-slate-600 ">
                                                                                        {/* Name */}
                                                                                        <div className="flex flex-col gap-1 mb-2 w-full">
                                                                                                <label
                                                                                                        htmlFor="name"
                                                                                                        className="text-lg"
                                                                                                >
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

                                                                                        {/* Address */}
                                                                                        <div className="flex flex-col gap-1 mb-2 w-full">
                                                                                                <label
                                                                                                        htmlFor="address"
                                                                                                        className="text-lg"
                                                                                                >
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

                                                                                        {/* Phone */}
                                                                                        <div className="flex flex-col gap-1 mb-2 w-full">
                                                                                                <label
                                                                                                        htmlFor="phone"
                                                                                                        className="text-lg"
                                                                                                >
                                                                                                        Phone
                                                                                                </label>
                                                                                                <input
                                                                                                        type="text"
                                                                                                        name="phone"
                                                                                                        id="phone"
                                                                                                        placeholder="Phone..."
                                                                                                        className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                                                                                                />
                                                                                        </div>

                                                                                        {/* Post */}
                                                                                        <div className="flex flex-col gap-1 mb-2 w-full">
                                                                                                <label
                                                                                                        htmlFor="post"
                                                                                                        className="text-lg"
                                                                                                >
                                                                                                        Post
                                                                                                </label>
                                                                                                <input
                                                                                                        type="text"
                                                                                                        name="post"
                                                                                                        id="post"
                                                                                                        placeholder="Post..."
                                                                                                        className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                                                                                                />
                                                                                        </div>

                                                                                        {/* Province */}
                                                                                        <div className="flex flex-col gap-1 mb-2 w-full">
                                                                                                <label
                                                                                                        htmlFor="province"
                                                                                                        className="text-lg"
                                                                                                >
                                                                                                        Province
                                                                                                </label>
                                                                                                <input
                                                                                                        type="text"
                                                                                                        name="province"
                                                                                                        id="province"
                                                                                                        placeholder="Province..."
                                                                                                        className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                                                                                                />
                                                                                        </div>

                                                                                        {/* City */}
                                                                                        <div className="flex flex-col gap-1 mb-2 w-full">
                                                                                                <label
                                                                                                        htmlFor="city"
                                                                                                        className="text-lg"
                                                                                                >
                                                                                                        City
                                                                                                </label>
                                                                                                <input
                                                                                                        type="text"
                                                                                                        name="city"
                                                                                                        id="city"
                                                                                                        placeholder="City..."
                                                                                                        className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                                                                                                />
                                                                                        </div>

                                                                                        {/* Area*/}
                                                                                        <div className="flex flex-col gap-1 mb-2 w-full">
                                                                                                <label
                                                                                                        htmlFor="area"
                                                                                                        className="text-lg"
                                                                                                >
                                                                                                        Area
                                                                                                </label>
                                                                                                <input
                                                                                                        type="text"
                                                                                                        name="area"
                                                                                                        id="area"
                                                                                                        placeholder="Area..."
                                                                                                        className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                                                                                                />
                                                                                        </div>

                                                                                        {/* Button */}

                                                                                        {/* Post */}
                                                                                        <div className="flex flex-col gap-1 mb-2 w-full mt-8">
                                                                                                <button className="px-3 py-[10px] rounded-md hover:shadow-md hover:shadow-green-500/50 bg-green-500 text-white capitalize cursor-pointer">
                                                                                                        Save Changes
                                                                                                </button>
                                                                                        </div>
                                                                                </div>
                                                                        </form>

                                                                        <div className="flex flex-col gap-1">
                                                                                <h2 className="text-slate-600 font-semibold pb-2">
                                                                                        Deliver To
                                                                                </h2>
                                                                                <p>
                                                                                        <span className="bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2 py-1 rounded">
                                                                                                Home
                                                                                        </span>
                                                                                        <span>
                                                                                                Address,Province, City
                                                                                        </span>
                                                                                        <span className="text-indigo-500 cursor-pointer">
                                                                                                {" "}
                                                                                                Change
                                                                                        </span>
                                                                                </p>

                                                                                <p className="text-slate-600 text-sm">
                                                                                        Email To ntphat110705@gmail.com
                                                                                </p>
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

export default Shipping;
