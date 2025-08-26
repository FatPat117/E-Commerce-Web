import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { place_order } from "../store/reducers/orderReducer.js";
import { URL } from "../utils/utils.js";

const Shipping = () => {
        const {
                state: { products, price, shippingFee, items },
        } = useLocation();
        const navigate = useNavigate();
        const dispatch = useDispatch();
        const { userInfo } = useSelector((state) => state.auth);
        const [state, setState] = useState({
                name: "",
                address: "",
                phone: "",
                post: "",
                province: "",
                city: "",
                area: "",
        });
        const [res, setRes] = useState(false);

        const inputHandle = (e) => {
                setState({ ...state, [e.target.name]: e.target.value });
        };

        const handleSubmit = (e) => {
                e.preventDefault();
                const { name, address, phone, post, province, city, area } = state;

                if (name && address && phone && post && province && city && area) {
                        setRes(true);
                }
        };
        const placeOrder = (e) => {
                e.preventDefault();

                dispatch(
                        place_order({
                                price,
                                products,
                                shippingFee,
                                items,
                                shippingInfo: state,
                                userId: userInfo.id,
                                navigate,
                        })
                );
        };

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
                                                                {/* Form */}
                                                                <div className="bg-white p-6 shadow-sm rounded-md">
                                                                        <h2 className="text-slate-600 font-bold pb-3">
                                                                                Shipping Information
                                                                        </h2>

                                                                        {/* Form */}
                                                                        {!res && (
                                                                                <form action="" onSubmit={handleSubmit}>
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
                                                                                                                value={
                                                                                                                        state.name
                                                                                                                }
                                                                                                                onChange={
                                                                                                                        inputHandle
                                                                                                                }
                                                                                                                placeholder="Name..."
                                                                                                                className="w-full px-3 
                                                                                                        py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
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
                                                                                                                value={
                                                                                                                        state.address
                                                                                                                }
                                                                                                                onChange={
                                                                                                                        inputHandle
                                                                                                                }
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
                                                                                                                value={
                                                                                                                        state.phone
                                                                                                                }
                                                                                                                onChange={
                                                                                                                        inputHandle
                                                                                                                }
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
                                                                                                                value={
                                                                                                                        state.post
                                                                                                                }
                                                                                                                onChange={
                                                                                                                        inputHandle
                                                                                                                }
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
                                                                                                                value={
                                                                                                                        state.province
                                                                                                                }
                                                                                                                onChange={
                                                                                                                        inputHandle
                                                                                                                }
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
                                                                                                                value={
                                                                                                                        state.city
                                                                                                                }
                                                                                                                onChange={
                                                                                                                        inputHandle
                                                                                                                }
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
                                                                                                                value={
                                                                                                                        state.area
                                                                                                                }
                                                                                                                onChange={
                                                                                                                        inputHandle
                                                                                                                }
                                                                                                                placeholder="Area..."
                                                                                                                className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                                                                                                        />
                                                                                                </div>

                                                                                                {/* Button */}

                                                                                                {/* Post */}
                                                                                                <div className="flex flex-col gap-1 mb-2 w-full mt-8">
                                                                                                        <button className="px-3 py-[10px] rounded-md hover:shadow-md hover:shadow-green-500/50 bg-green-500 text-white capitalize cursor-pointer">
                                                                                                                Save
                                                                                                                Changes
                                                                                                        </button>
                                                                                                </div>
                                                                                        </div>
                                                                                </form>
                                                                        )}

                                                                        {res && (
                                                                                <div className="flex flex-col gap-1">
                                                                                        <h2 className="text-slate-600 font-semibold pb-2">
                                                                                                Deliver To {state.name}
                                                                                        </h2>
                                                                                        <p>
                                                                                                <span className="bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2 py-1 rounded">
                                                                                                        Home
                                                                                                </span>
                                                                                                <span>
                                                                                                        {state.phone}
                                                                                                        {
                                                                                                                state.address
                                                                                                        }{" "}
                                                                                                        {state.province}{" "}
                                                                                                        {state.city}{" "}
                                                                                                        {state.area}
                                                                                                </span>
                                                                                                <span
                                                                                                        className="text-indigo-500 cursor-pointer"
                                                                                                        onClick={() =>
                                                                                                                setRes(
                                                                                                                        false
                                                                                                                )
                                                                                                        }
                                                                                                >
                                                                                                        {" "}
                                                                                                        Change
                                                                                                </span>
                                                                                        </p>

                                                                                        <p className="text-slate-600 text-sm mt-2">
                                                                                                Email To {state.email}
                                                                                        </p>
                                                                                </div>
                                                                        )}
                                                                </div>

                                                                {/* Cart info */}
                                                                {products?.map((product, idx) => {
                                                                        return (
                                                                                <div
                                                                                        key={idx}
                                                                                        className="flex bg-white p-4 flex-col gap-2 gap-y-7"
                                                                                >
                                                                                        {/* Shop Name */}
                                                                                        <div className="flex justify-start items-center">
                                                                                                <h2 className="text-lg text-slate-600 font-bold">
                                                                                                        {
                                                                                                                product.shopName
                                                                                                        }
                                                                                                </h2>
                                                                                        </div>

                                                                                        {/* Product info */}
                                                                                        {product.products.map(
                                                                                                (data, idx) => {
                                                                                                        return (
                                                                                                                // Cart details
                                                                                                                <div
                                                                                                                        className="w-full flex flex-wrap border-b border-slate-200 pb-4"
                                                                                                                        key={
                                                                                                                                idx
                                                                                                                        }
                                                                                                                >
                                                                                                                        {/* Image and name */}
                                                                                                                        <div className="flex w-full gap-2 sm:w-7/12">
                                                                                                                                <div className="flex gap-2 items-center justify-start">
                                                                                                                                        <img
                                                                                                                                                className="w-[80px] h-[80px]"
                                                                                                                                                src={
                                                                                                                                                        data
                                                                                                                                                                ?.productInfo
                                                                                                                                                                ?.images[0]
                                                                                                                                                }
                                                                                                                                                alt=""
                                                                                                                                        />
                                                                                                                                        <div className="pl-3 text-slate-600">
                                                                                                                                                <h2 className="text-xl font-semibold">
                                                                                                                                                        {
                                                                                                                                                                data
                                                                                                                                                                        ?.productInfo
                                                                                                                                                                        ?.name
                                                                                                                                                        }
                                                                                                                                                </h2>
                                                                                                                                                <span>
                                                                                                                                                        Brand:
                                                                                                                                                        {
                                                                                                                                                                data
                                                                                                                                                                        ?.productInfo
                                                                                                                                                                        ?.brand
                                                                                                                                                        }
                                                                                                                                                </span>
                                                                                                                                        </div>
                                                                                                                                </div>
                                                                                                                        </div>
                                                                                                                        {/* Price */}
                                                                                                                        <div className="flex justify-between w-full sm:w-5/12 mt-3 sm:mt-0">
                                                                                                                                <div className="pl-0 sm:pl-4">
                                                                                                                                        {data
                                                                                                                                                ?.productInfo
                                                                                                                                                ?.discount >
                                                                                                                                        0 ? (
                                                                                                                                                <>
                                                                                                                                                        <h2 className="text-lg text-orange-500">
                                                                                                                                                                $
                                                                                                                                                                {data
                                                                                                                                                                        ?.productInfo
                                                                                                                                                                        ?.price -
                                                                                                                                                                        Math.floor(
                                                                                                                                                                                (data
                                                                                                                                                                                        ?.productInfo
                                                                                                                                                                                        ?.price *
                                                                                                                                                                                        data
                                                                                                                                                                                                ?.productInfo
                                                                                                                                                                                                ?.discount) /
                                                                                                                                                                                        100
                                                                                                                                                                        )}
                                                                                                                                                        </h2>
                                                                                                                                                        <p className="line-through">
                                                                                                                                                                $
                                                                                                                                                                {
                                                                                                                                                                        data
                                                                                                                                                                                ?.productInfo
                                                                                                                                                                                ?.price
                                                                                                                                                                }
                                                                                                                                                        </p>
                                                                                                                                                </>
                                                                                                                                        ) : (
                                                                                                                                                <>
                                                                                                                                                        <h2 className="text-lg text-orange-500">
                                                                                                                                                                $
                                                                                                                                                                {
                                                                                                                                                                        data
                                                                                                                                                                                ?.productInfo
                                                                                                                                                                                ?.price
                                                                                                                                                                }
                                                                                                                                                        </h2>
                                                                                                                                                </>
                                                                                                                                        )}
                                                                                                                                        <p className="text-green-500 text-sm font-bold">
                                                                                                                                                -
                                                                                                                                                {
                                                                                                                                                        data
                                                                                                                                                                ?.productInfo
                                                                                                                                                                ?.discount
                                                                                                                                                }

                                                                                                                                                %
                                                                                                                                        </p>
                                                                                                                                </div>
                                                                                                                        </div>
                                                                                                                </div>
                                                                                                        );
                                                                                                }
                                                                                        )}
                                                                                </div>
                                                                        );
                                                                })}
                                                        </div>
                                                </div>

                                                {/* Order summary */}
                                                <div className="w-full md-lg:w-[33%] mt-5">
                                                        <div className="pl-0 md-lg:pl-3 pt-5 md-lg:pt-0">
                                                                <div className="bg-white p-3 text-slate-600 flex flex-col gap-3">
                                                                        <h2 className="text-xl font-bold">
                                                                                Order Summary
                                                                        </h2>
                                                                        {/* Items */}
                                                                        <div className="flex justify-between items-center">
                                                                                <span className="font-semibold">
                                                                                        Items Total ({items}):
                                                                                </span>
                                                                                <span className="">${price}</span>
                                                                        </div>

                                                                        {/* Shopping Fee */}
                                                                        <div className="flex justify-between items-center">
                                                                                <span className="font-semibold">
                                                                                        Delivery Fee:
                                                                                </span>
                                                                                <span> ${shippingFee}</span>
                                                                        </div>

                                                                        {/* Shopping Fee */}
                                                                        <div className="flex justify-between items-center">
                                                                                <span className="font-semibold">
                                                                                        Total Payment:
                                                                                </span>
                                                                                <span> ${price + shippingFee}</span>
                                                                        </div>

                                                                        {/* Total */}
                                                                        <div className="flex justify-between items-center mt-4">
                                                                                <span className="font-semibold text-xl">
                                                                                        Total:
                                                                                </span>
                                                                                <span className="font-bold text-xl text-[#059473]">
                                                                                        {" "}
                                                                                        ${price + shippingFee}
                                                                                </span>
                                                                        </div>

                                                                        <button
                                                                                onClick={placeOrder}
                                                                                disabled={res ? false : true}
                                                                                className={` px-5 py-[8px] rounded-sm   text-md text-white uppercase ${
                                                                                        res
                                                                                                ? "bg-green-500 hover:shadow-red-500/50 hover:shadow-md font-semibold cursor-pointer"
                                                                                                : "bg-red-300 cursor-not-allowed"
                                                                                }`}
                                                                        >
                                                                                Place Order
                                                                        </button>
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
