import React, { useEffect } from "react";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { get_wishlist_products } from "../../store/reducers/cartReducer";
import Rating from "../Rating";

const Wishlist = () => {
        const dispatch = useDispatch();
        const { userInfo } = useSelector((state) => state.auth);
        const { wishlistProducts } = useSelector((state) => state.cart);
        useEffect(() => {
                dispatch(get_wishlist_products(userInfo?.id));
        }, []);

        return (
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md-lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((data, idx) => {
                                return (
                                        <div
                                                key={idx}
                                                className="border group transition-all duration-500 hover:shadow-md hover:-mt-3 bg-white overflow-hidden"
                                        >
                                                {/* Product  Image */}
                                                <div className="relative overflow-hidden">
                                                        {/* Discount part */}

                                                        <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
                                                                30%
                                                        </div>

                                                        <img
                                                                src="/images/products/1.webp"
                                                                alt="products"
                                                                className="w-full h-[300px] md-lg:w-full "
                                                        />

                                                        <ul className="flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3">
                                                                <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all">
                                                                        <FaRegHeart />
                                                                </li>
                                                                <Link
                                                                        to="/product/details/newslug"
                                                                        className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all"
                                                                >
                                                                        <FaEye />
                                                                </Link>
                                                                <li
                                                                        // onClick={() => addToCart(product?._id)}
                                                                        className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all"
                                                                >
                                                                        <RiShoppingCartLine />
                                                                </li>
                                                        </ul>
                                                </div>

                                                {/* Product Details*/}
                                                <div className="py-3 text-slate-600 px-2">
                                                        <h2 className="font-bold text-lg">Product Name</h2>
                                                        <div className="flex justify-start items-center gap-3">
                                                                <span className="text-md font-semibold">10000</span>
                                                                <div className="flex">
                                                                        <Rating ratings={4.5}></Rating>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                );
                        })}
                </div>
        );
};

export default Wishlist;
