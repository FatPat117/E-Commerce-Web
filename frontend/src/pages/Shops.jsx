import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { URL } from "../utils/utils";
const Shops = () => {
        const [filter, setFilter] = useState(true);
        const categories = [
                "Mobiles",
                "Laptops",
                "Speakers",
                "Top Wear",
                "Footwear",
                "Watches",
                "Home Decor",
                "Smart Watches",
        ];

        return (
                <div>
                        {/* Banner */}
                        <section
                                style={{ backgroundImage: `url(${URL}/images/banner/shop.png)` }}
                                className={` h-[220px] bg-cover bg-no-repeat relative bg-left`}
                        >
                                <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
                                        <div className=" w-[80%] md-lg:w-[85%] lg:w-[90%] h-full mx-auto">
                                                <div className="flex flex-col justify-center items-center gap-1 w-full h-full text-white">
                                                        <h2 className="text-3xl font-bold">Shop Page</h2>
                                                        <div className="flex justify-center items-center gap-2 text-2xl w-full lg:mt-2">
                                                                <Link to="/">Home</Link>
                                                                <span className="mt-1">
                                                                        <IoIosArrowForward />
                                                                </span>
                                                                <span className="underline text-blue-300">Shop</span>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </section>

                        <section className="py-16">
                                <div className="w-[80%] md-lg:w-[85%] lg:w-[90%] h-full mx-auto">
                                        {/* Filter Product Show in Mobile*/}
                                        <div className={`md:hidden block ${filter ? "mb-6" : "mb-0"}`}>
                                                <button
                                                        onClick={() => setFilter(!filter)}
                                                        className="text-center w-full py-2 px-3 bg-indigo-500 text-white"
                                                >
                                                        Filter Product
                                                </button>
                                        </div>

                                        {/* Category Search And Product*/}
                                        <div className="w-full flex flex-wrap">
                                                {/* Category search */}
                                                <div
                                                        className={`w-full md:w-4/12 md-lg:w-3/12 pr-8 ${
                                                                filter
                                                                        ? " h-auto overflow-auto mb-0"
                                                                        : " h-0 overflow-hidden mb-6 md:h-auto md:overflow-auto md:mb-0"
                                                        }`}
                                                >
                                                        <h2 className="text-3xl font-bold mb-3 text-slate-600">
                                                                Category
                                                        </h2>
                                                        <div className="py-2">
                                                                {categories.map((cate, idx) => {
                                                                        return (
                                                                                <div
                                                                                        key={idx}
                                                                                        className="flex justify-start items-center gap-2 py-1"
                                                                                >
                                                                                        <input
                                                                                                type="checkbox"
                                                                                                name=""
                                                                                                id={cate}
                                                                                        />
                                                                                        <label
                                                                                                htmlFor={cate}
                                                                                                className="text-slate-600 block cursor-pointer"
                                                                                        >
                                                                                                {cate}
                                                                                        </label>
                                                                                </div>
                                                                        );
                                                                })}
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </section>
                </div>
        );
};

export default Shops;
