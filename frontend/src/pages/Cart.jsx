import React, { useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { get_cart_products } from "../store/reducers/cartReducer.js";
import { URL } from "../utils/utils.js";

const Cart = () => {
        const dispatch = useDispatch();
        const { userInfo } = useSelector((state) => state.auth);
        const navigate = useNavigate();
        const cartProducts = [1, 2];
        const outOfStockProducts = [1, 2];

        useEffect(() => {
                dispatch(get_cart_products(userInfo.id));
        }, []);

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
                                                        {/* Left Order info */}
                                                        <div className="md-lg:w-[67%] w-full mx">
                                                                <div className="pr-0 md-lg:pr-3">
                                                                        <div className="flex flex-col gap-3 gap-y-5">
                                                                                {/* Stock product */}
                                                                                <div className="bg-white p-4">
                                                                                        <h2 className="text-lg text-green-500 font-semibold">
                                                                                                Stock Product :{" "}
                                                                                                {cartProducts.length}
                                                                                        </h2>
                                                                                </div>

                                                                                {/* Cart info */}
                                                                                {cartProducts.map((product, idx) => {
                                                                                        return (
                                                                                                <div
                                                                                                        key={idx}
                                                                                                        className="flex bg-white p-4 flex-col gap-2 gap-y-7"
                                                                                                >
                                                                                                        {/* Shop Name */}
                                                                                                        <div className="flex justify-start items-center">
                                                                                                                <h2 className="text-lg text-slate-600 font-bold">
                                                                                                                        Easy
                                                                                                                        Shop
                                                                                                                </h2>
                                                                                                        </div>

                                                                                                        {/* Product info */}
                                                                                                        {[1, 2].map(
                                                                                                                (
                                                                                                                        data,
                                                                                                                        idx
                                                                                                                ) => {
                                                                                                                        return (
                                                                                                                                // Cart details
                                                                                                                                <div
                                                                                                                                        className="w-full flex flex-wrap"
                                                                                                                                        key={
                                                                                                                                                idx
                                                                                                                                        }
                                                                                                                                >
                                                                                                                                        {/* Image and name */}
                                                                                                                                        <div className="flex w-full gap-2 sm:w-7/12">
                                                                                                                                                <div className="flex gap-2 items-center justify-start">
                                                                                                                                                        <img
                                                                                                                                                                className="w-[80px] h-[80px]"
                                                                                                                                                                src={`/images/products/${data}.webp`}
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
                                                                                                                                                <div className="flex gap-2 flex-col">
                                                                                                                                                        <div className="flex bg-slate-200 h-[30px] justify-center items-center text-xl">
                                                                                                                                                                <div className="px-3 cursor-pointer">
                                                                                                                                                                        -
                                                                                                                                                                </div>
                                                                                                                                                                <div className="px-3 ">
                                                                                                                                                                        2
                                                                                                                                                                </div>
                                                                                                                                                                <div className="px-3 cursor-pointer">
                                                                                                                                                                        +
                                                                                                                                                                </div>
                                                                                                                                                        </div>

                                                                                                                                                        <button className="px-5 py-[3px] bg-red-500 rounded-sm text-white">
                                                                                                                                                                Delete
                                                                                                                                                        </button>
                                                                                                                                                </div>
                                                                                                                                        </div>
                                                                                                                                </div>
                                                                                                                        );
                                                                                                                }
                                                                                                        )}
                                                                                                </div>
                                                                                        );
                                                                                })}

                                                                                {/* Out of stocks */}
                                                                                {outOfStockProducts.length > 0 && (
                                                                                        <div className="flex flex-col gap-3">
                                                                                                <div className="bg-white p-4">
                                                                                                        <h2 className="text-lg text-red-500 font-semibold">
                                                                                                                Out of
                                                                                                                Stock:{" "}
                                                                                                                {
                                                                                                                        outOfStockProducts.length
                                                                                                                }
                                                                                                        </h2>
                                                                                                </div>

                                                                                                <div className="bg-white p-4 flex flex-col gap-5 ">
                                                                                                        {[1, 2].map(
                                                                                                                (
                                                                                                                        data,
                                                                                                                        idx
                                                                                                                ) => {
                                                                                                                        return (
                                                                                                                                // Cart details
                                                                                                                                <div
                                                                                                                                        className="w-full flex flex-wrap"
                                                                                                                                        key={
                                                                                                                                                idx
                                                                                                                                        }
                                                                                                                                >
                                                                                                                                        {/* Image and name */}
                                                                                                                                        <div className="flex w-full gap-2 sm:w-7/12">
                                                                                                                                                <div className="flex gap-2 items-center justify-start">
                                                                                                                                                        <img
                                                                                                                                                                className="w-[80px] h-[80px]"
                                                                                                                                                                src={`/images/products/${data}.webp`}
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
                                                                                                                                                <div className="flex gap-2 flex-col">
                                                                                                                                                        <div className="flex bg-slate-200 h-[30px] justify-center items-center text-xl">
                                                                                                                                                                <div className="px-3 cursor-pointer">
                                                                                                                                                                        -
                                                                                                                                                                </div>
                                                                                                                                                                <div className="px-3 ">
                                                                                                                                                                        2
                                                                                                                                                                </div>
                                                                                                                                                                <div className="px-3 cursor-pointer">
                                                                                                                                                                        +
                                                                                                                                                                </div>
                                                                                                                                                        </div>

                                                                                                                                                        <button className="px-5 py-[3px] bg-red-500 rounded-sm text-white">
                                                                                                                                                                Delete
                                                                                                                                                        </button>
                                                                                                                                                </div>
                                                                                                                                        </div>
                                                                                                                                </div>
                                                                                                                        );
                                                                                                                }
                                                                                                        )}
                                                                                                </div>
                                                                                        </div>
                                                                                )}
                                                                        </div>
                                                                </div>
                                                        </div>

                                                        {/* Right Order Summary */}
                                                        <div className="w-full md-lg:w-[33%] mt-5">
                                                                <div className="pl-0 md-lg:pl-3 pt-5 md-lg:pt-0">
                                                                        {cartProducts.length > 0 && (
                                                                                <div className="bg-white p-3 text-slate-600 flex flex-col gap-3">
                                                                                        <h2 className="text-xl font-bold">
                                                                                                Order Summary
                                                                                        </h2>
                                                                                        {/* Items */}
                                                                                        <div className="flex justify-between items-center">
                                                                                                <span className="font-semibold">
                                                                                                        2 Items
                                                                                                </span>
                                                                                                <span className="">
                                                                                                        $343
                                                                                                </span>
                                                                                        </div>

                                                                                        {/* Shopping Fee */}
                                                                                        <div className="flex justify-between items-center">
                                                                                                <span className="font-semibold">
                                                                                                        Shopping Fee:
                                                                                                </span>
                                                                                                <span> $343</span>
                                                                                        </div>

                                                                                        {/* Voucher Coupon */}
                                                                                        <div className="flex gap-2">
                                                                                                <input
                                                                                                        type="text"
                                                                                                        name=""
                                                                                                        id=""
                                                                                                        placeholder="Voucher Coupon"
                                                                                                        className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-sm"
                                                                                                />
                                                                                                <button className="px-5 py-[1px] bg-[#059473] text-white rounded-sm uppercase text-md font-bold">
                                                                                                        Apply
                                                                                                </button>
                                                                                        </div>

                                                                                        {/* Total */}
                                                                                        <div className="flex justify-between items-center mt-4">
                                                                                                <span className="font-semibold text-xl">
                                                                                                        Total:
                                                                                                </span>
                                                                                                <span className="font-bold text-xl text-[#059473]">
                                                                                                        {" "}
                                                                                                        $343
                                                                                                </span>
                                                                                        </div>

                                                                                        <button
                                                                                                onClick={() =>
                                                                                                        navigate(
                                                                                                                "/shipping",
                                                                                                                {
                                                                                                                        state: {
                                                                                                                                products: [],
                                                                                                                                price: 500,
                                                                                                                                shipping_fee: 40,
                                                                                                                                items: 2,
                                                                                                                        },
                                                                                                                }
                                                                                                        )
                                                                                                }
                                                                                                className="cursor-pointer px-5 py-[8px] rounded-sm hover:shadow-red-500/50 hover:shadow-md font-semibold bg-red-500 text-md text-white uppercase"
                                                                                        >
                                                                                                Process to Checkout
                                                                                        </button>
                                                                                </div>
                                                                        )}
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
