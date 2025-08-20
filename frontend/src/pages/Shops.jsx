import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Range } from "react-range";
import { Link } from "react-router-dom";
import { URL } from "../utils/utils";
const Shops = () => {
        const [filter, setFilter] = useState(true);
        const [state, setState] = useState({
                values: [50, 1500],
        });
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

                                                        {/* Check box */}
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

                                                        {/* Price */}
                                                        <div className="py-2 flex flex-col gap-5">
                                                                <h2 className="text-3xl font-bold mb-3 text-slate-600">
                                                                        Price
                                                                </h2>
                                                                <Range
                                                                        step={5}
                                                                        min={50}
                                                                        max={1500}
                                                                        values={state.values}
                                                                        onChange={(values) => setState({ values })}
                                                                        renderTrack={({ props, children }) => (
                                                                                <div
                                                                                        {...props}
                                                                                        className="w-full h-[6px] bg-slate-200 rounded-full cursor-pointer"
                                                                                >
                                                                                        {children}
                                                                                </div>
                                                                        )}
                                                                        renderThumb={({ props }) => (
                                                                                <div
                                                                                        {...props}
                                                                                        className="w-[15px] h-[15px] bg-[#059473] rounded-full"
                                                                                ></div>
                                                                        )}
                                                                />
                                                        </div>
                                                        <span className="text-slate-800 font-bold text-lg">
                                                                ${Math.floor(state.values[0])} - $
                                                                {Math.floor(state.values[1])}
                                                        </span>
                                                </div>
                                        </div>
                                </div>
                        </section>
                </div>
        );
};

export default Shops;
