import React from "react";
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedin, FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
const Footer = () => {
        const navigate = useNavigate();
        const { userInfo } = useSelector((state) => state.auth);
        const { cartProductsTotal, wishlistProductsTotal } = useSelector((state) => state.cart);
        return (
                <footer className="bg-[#f3f6fa] mt-12">
                        <div className="w-[85%] mx-auto flex flex-wrap md:flex-nowrap border-b py-10 md-lg:pb-10 sm:pb-6 border-slate-300">
                                {/* Logo */}
                                <div className="lg:w-3/12 lg:w-4/12 w-full">
                                        <div className="flex flex-col gap-3">
                                                <img src="/images/logo.png" alt="Logo" className="w-[190px] h-[70px]" />
                                                <ul className="flex flex-col gap-2 text-slate-600">
                                                        <li>Address: 1234 Main Street, Cajun</li>
                                                        <li>Phone: +123456789</li>
                                                        <li>Email: support@gmail.com</li>
                                                </ul>
                                        </div>
                                </div>

                                {/*Links*/}
                                <div className="lg:w-5/12 w-full mt-6 lg:mt-0">
                                        <div content="flex justify-center sm:justify-start mt-6 w-full">
                                                {/* UseFul Links */}
                                                <div>
                                                        <h2 className="font-bold text-lg mb-2">Useful Link</h2>
                                                        <div className="flex justify-start gap-[80px] ">
                                                                <ul className="flex flex-col gap-2 text-slate-600 text-md font-semibold">
                                                                        <li>
                                                                                <Link>About us</Link>
                                                                        </li>
                                                                        <li>
                                                                                <Link>About Our Shop</Link>
                                                                        </li>
                                                                        <li>
                                                                                <Link>Delivery Information</Link>
                                                                        </li>
                                                                        <li>
                                                                                <Link>Privacy Policy</Link>
                                                                        </li>
                                                                        <li>
                                                                                <Link>Blogs</Link>
                                                                        </li>
                                                                </ul>

                                                                <ul className="flex flex-col gap-2 text-slate-600 text-md font-semibold">
                                                                        <li>
                                                                                <Link>Our Service</Link>
                                                                        </li>
                                                                        <li>
                                                                                <Link>Company Profile</Link>
                                                                        </li>
                                                                        <li>
                                                                                <Link>Delivery Information</Link>
                                                                        </li>
                                                                        <li>
                                                                                <Link>Privacy Policy</Link>
                                                                        </li>
                                                                        <li>
                                                                                <Link>Blogs</Link>
                                                                        </li>
                                                                </ul>
                                                        </div>
                                                </div>
                                        </div>
                                </div>

                                {/* Contact */}
                                <div className="lg:w-4/12 w-full mt-6 lg:mt-0">
                                        <div className="w-full flex flex-col justify-start gap-5">
                                                <h2 className="font-bold text-lg mb-2">Join Our Shop</h2>
                                                <span>Get Emails update about our latest products and offers</span>
                                                <div className="h-[50px] w-full bg-white border relative ">
                                                        <input
                                                                type="text"
                                                                name=""
                                                                id=""
                                                                placeholder="Enter your email"
                                                                className="h-full bg-transparent outline-none w-full px-3 py-2"
                                                        />
                                                        <button className="h-full absolute right-0 bg-[#059473] text-white uppercase px-4 font-bold text-sm">
                                                                Subscribe
                                                        </button>
                                                </div>
                                                <ul className="flex justify-start items-center gap-3">
                                                        <li className="w-[38px] h-[38px] rounded-full bg-[#ffffff] hover:bg-[#059473] transition-colors duration-500 hover:text-white cursor-pointer flex justify-center items-center">
                                                                <a href="#">
                                                                        {" "}
                                                                        <FaFacebookF />
                                                                </a>
                                                        </li>
                                                        <li className="w-[38px] h-[38px] rounded-full bg-[#ffffff] hover:bg-[#059473] transition-colors duration-500 hover:text-white cursor-pointer flex justify-center items-center">
                                                                <a href="#">
                                                                        {" "}
                                                                        <FaInstagram />
                                                                </a>
                                                        </li>
                                                        <li className="w-[38px] h-[38px] rounded-full bg-[#ffffff] hover:bg-[#059473] transition-colors duration-500 hover:text-white cursor-pointer flex justify-center items-center">
                                                                <a href="#">
                                                                        {" "}
                                                                        <FaLinkedin />
                                                                </a>
                                                        </li>
                                                        <li className="w-[38px] h-[38px] rounded-full bg-[#ffffff] hover:bg-[#059473] transition-colors duration-500 hover:text-white cursor-pointer flex justify-center items-center">
                                                                <a href="#">
                                                                        {" "}
                                                                        <FaGithub />
                                                                </a>
                                                        </li>
                                                </ul>
                                        </div>
                                </div>
                        </div>

                        {/* Copy right */}
                        <div className="w-[90%] flex flex-wrap justify-center items-center mx-auto text-center text-sm text-slate-700 p-3 font-normal">
                                <p>Copy right @2025: All rights reserved </p>
                        </div>

                        <div className=" block fixed md-lg:hidden w-[50px] h-[110px] bottom-3 right-2 bg-white rounded-full p-2 ">
                                <div className="w-full h-full flex flex-col gap-3 justify-center items-center">
                                        <div
                                                className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]"
                                                onClick={() => {
                                                        if (userInfo) {
                                                                navigate("/cart");
                                                        } else {
                                                                navigate("/login");
                                                        }
                                                }}
                                        >
                                                <span className="text-xl text-green-500">
                                                        <FaShoppingCart />
                                                </span>
                                                {cartProductsTotal != 0 && (
                                                        <div className="w-[17px] h-[17px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]">
                                                                {cartProductsTotal}
                                                        </div>
                                                )}
                                        </div>
                                        <div
                                                onClick={() => {
                                                        if (userInfo) {
                                                                navigate("/dashboard/my-wishlist");
                                                        } else {
                                                                navigate("/login");
                                                        }
                                                }}
                                                className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]"
                                        >
                                                <span className="text-xl text-green-500">
                                                        <FaHeart />
                                                </span>
                                                {wishlistProductsTotal != 0 && (
                                                        <div className="w-[17px] h-[17px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]">
                                                                {wishlistProductsTotal}
                                                        </div>
                                                )}
                                        </div>
                                </div>
                        </div>
                </footer>
        );
};

export default Footer;
