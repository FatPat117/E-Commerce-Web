import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { URL } from "../utils/utils.js";

const Cart = () => {
        const cartProducts = [1, 2];
        const outOfStockProducts = [1, 2];

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
                                                        <h2 className="text-3xl font-bold">Cart Page</h2>
                                                        <div className="flex justify-center items-center gap-2 text-2xl w-full lg:mt-2">
                                                                <Link to="/">Home</Link>
                                                                <span className="mt-1">
                                                                        <IoIosArrowForward />
                                                                </span>
                                                                <span className="underline text-blue-300">Cart</span>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </section>

                        {/* Cart section */}
                        <section className="bg-[#eeeeee]">
                                <div className="w-[85%] md:w-[90%] mx-auto py-16">
                                        {cartProducts.length > 0 || outOfStockProducts.length > 0 ? (
                                                <div className="flex flex-wrap">
                                                        <div className="md-lg:w-[67%] w-full mx">
                                                                <div className="pr-0 md-lg:pr-3">
                                                                        <div className="flex flex-col gap-3">
                                                                                {/* Stock product */}
                                                                                <div className="bg-white p-4">
                                                                                        <h2 className="text-lg text-green-500 font-semibold">
                                                                                                Stock Product :{" "}
                                                                                                {cartProducts.length}
                                                                                        </h2>
                                                                                </div>

                                                                                {/* Cart info */}
                                                                                <div className="flex bg-white p-4 flex-col gap-2">
                                                                                        {/* Shop Name */}
                                                                                        <div className="flex justify-start items-center">
                                                                                                <h2 className="text-lg text-slate-600 font-bold">
                                                                                                        Easy Shop
                                                                                                </h2>
                                                                                        </div>

                                                                                        {/* Cart Details */}
                                                                                        <div className="w-full flex flex-wrap">
                                                                                                {/* Image and name */}
                                                                                                <div className="flex w-full gap-2 sm:w-7/12">
                                                                                                        <div className="flex gap-2 items-center justify-start">
                                                                                                                <img
                                                                                                                        className="w-[80px] h-[80px]"
                                                                                                                        src="/images/products/1.webp"
                                                                                                                        alt=""
                                                                                                                />
                                                                                                                <div className="pl-3 text-slate-600">
                                                                                                                        <h2 className="text-xl font-semibold">
                                                                                                                                Product
                                                                                                                                Name
                                                                                                                        </h2>
                                                                                                                        <span>
                                                                                                                                Brand:Apple
                                                                                                                        </span>
                                                                                                                </div>
                                                                                                        </div>
                                                                                                </div>
                                                                                                {/* Price */}
                                                                                                <div className="flex justify-between w-full sm:w-5/12 mt-3 sm:mt-0">
                                                                                                        <div className="pl-0 sm:pl-4">
                                                                                                                <h2 className="text-lg text-orange-500">
                                                                                                                        $233
                                                                                                                </h2>
                                                                                                                <p className="line-through">
                                                                                                                        $350
                                                                                                                </p>
                                                                                                                <p className="text-green-500 text-sm font-bold">
                                                                                                                        -15%
                                                                                                                </p>
                                                                                                        </div>
                                                                                                </div>
                                                                                        </div>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        ) : (
                                                <div>
                                                        <Link
                                                                className="px-4 py-1 bg-indigo-500 text-white"
                                                                to="/shops"
                                                        >
                                                                Shop Now
                                                        </Link>
                                                </div>
                                        )}
                                </div>
                        </section>
                </div>
        );
};

export default Cart;
