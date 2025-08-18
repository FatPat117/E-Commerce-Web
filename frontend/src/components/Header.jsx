import React, { useState } from "react";
import { FaFacebookF, FaLinkedin, FaList, FaLock } from "react-icons/fa";
import { FaInstagram, FaUser } from "react-icons/fa6";
import { IoIosArrowDown, IoMdPhonePortrait } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
const Header = () => {
        const { pathname } = useLocation();
        const [showSidebar, setShowSidebar] = useState(false);
        const user = true;

        return (
                <header className="w-full bg-white">
                        {/* Header top */}
                        <div className="header-top bg-[#caddff] md-lg:block hidden ">
                                <div className="w-[85%] lg:w-[90%] mx-auto">
                                        <div className="flex w-full justify-between items-center h-[50px] text-solid-500">
                                                {/* Left part */}
                                                <ul className="flex justify-start items-center gap-8 font-semibold text-black">
                                                        <li className="flex relative justify-center items-center gap-2 text-sm after:absolute after:h-[18px] after:w-[2px] after:bg-[#afafaf] after:-right-[16px] after:top-[1px]">
                                                                <span>
                                                                        <MdEmail />
                                                                </span>
                                                                <span>support@gmail.com</span>
                                                        </li>
                                                        <li className="flex relative justify-center items-center gap-2 text-sm x ">
                                                                <span>
                                                                        <IoMdPhonePortrait />
                                                                </span>
                                                                <span>+91 9876543210</span>
                                                        </li>
                                                </ul>

                                                {/* Right part*/}
                                                <div>
                                                        <div className="flex justify-center items-center gap-10">
                                                                {/* Facebook,Instagram, Linkedin */}
                                                                <div className="flex justify-center items-center gap-4 text-black">
                                                                        <a href="#">
                                                                                <FaFacebookF />
                                                                        </a>
                                                                        <a href="#">
                                                                                <FaLinkedin />
                                                                        </a>
                                                                        <a href="#">
                                                                                <FaInstagram />
                                                                        </a>
                                                                </div>

                                                                {/* Language */}
                                                                <div className="flex group cursor-pointer text-slate-800 text-sm justify-center items-center gap-2 relative after:absolute after:h-[18px] after:w-[2px] after:bg-[#afafaf] after:-right-[16px] after:top-[1px] before:absolute before:h-[18px] before:w-[2px] before:bg-[#afafaf] before:-left-[20px] before:top-[1px]">
                                                                        <img
                                                                                src="/images/language.png"
                                                                                alt="language"
                                                                        />
                                                                        <span>
                                                                                <IoIosArrowDown />
                                                                        </span>
                                                                        <ul className="absolute invisible transition-all top-12 rounded-sm duration-300 text-white p-2 w-[100px] flex flex-col gap-3 group-hover:visible group-hover:top-6 group-hover:bg-black z-10">
                                                                                <li>English</li>
                                                                                <li>Hindi</li>
                                                                                <li>Marathi</li>
                                                                                <li>Kannada</li>
                                                                                <li>Telugu</li>
                                                                                <li>Tamil</li>
                                                                                <li>Urdu</li>
                                                                        </ul>
                                                                </div>

                                                                {/* User info */}
                                                                {user ? (
                                                                        <Link
                                                                                to="/dashboard"
                                                                                className="flex cursor-pointer justify-center items-center gap-2 text-sm  text-black"
                                                                        >
                                                                                <span>
                                                                                        <FaUser />
                                                                                </span>
                                                                                <span>Pita Pitachiti</span>
                                                                        </Link>
                                                                ) : (
                                                                        <Link
                                                                                to="/login"
                                                                                className="flex cursor-pointer justify-center items-center gap-2 text-sm  text-black"
                                                                        >
                                                                                <span>
                                                                                        <FaLock />
                                                                                </span>
                                                                                <span>Login</span>
                                                                        </Link>
                                                                )}
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>

                        {/* Main header */}
                        <div className="bg-white">
                                <div className="w-[85%] lg:w-[90%] mx-auto">
                                        <div className="h-[80px] md-lg:h-[100px] flex justify-between items-center flex-wrap">
                                                {/* logo */}
                                                <div className="md-lg:w-3/12 w-full md-lg:pt-4 ">
                                                        <div className="flex justify-between items-center">
                                                                <Link to="/">
                                                                        <img src="/images/logo.png" alt="logo" />
                                                                </Link>

                                                                {/* Hidden sidebar */}
                                                                <div
                                                                        onClick={() => setShowSidebar(!showSidebar)}
                                                                        className="flex justify-center items-center w-[30px] h-[30px] bg-white text-slate-700 border border-slate-600 rounded-sm cursor-pointer  md-lg:hidden"
                                                                >
                                                                        <span>
                                                                                <FaList />
                                                                        </span>
                                                                </div>
                                                        </div>
                                                </div>

                                                {/* Menu */}
                                                <nav className="md-lg:w-9/12 w-full">
                                                        <div className="flex md-lg:justify-between justify-center items-center flex-wrap pl-8">
                                                                <ul className=" justify-start items-start gap-8 text-sm font-bold uppercase hidden md-lg:flex">
                                                                        <li>
                                                                                <Link
                                                                                        className={`p-2 block ${
                                                                                                pathname === "/"
                                                                                                        ? "text-[#059473]"
                                                                                                        : "text-slate-600"
                                                                                        }`}
                                                                                        to="/"
                                                                                >
                                                                                        Home
                                                                                </Link>
                                                                        </li>
                                                                        <li>
                                                                                <Link
                                                                                        className={`p-2 block ${
                                                                                                pathname === "/shop"
                                                                                                        ? "text-[#059473]"
                                                                                                        : "text-slate-600"
                                                                                        }`}
                                                                                        to="/shop"
                                                                                >
                                                                                        Shop
                                                                                </Link>
                                                                        </li>
                                                                        <li>
                                                                                <Link
                                                                                        className={`p-2 block ${
                                                                                                pathname === "/blog"
                                                                                                        ? "text-[#059473]"
                                                                                                        : "text-slate-600"
                                                                                        }`}
                                                                                        to="/blog"
                                                                                >
                                                                                        Blog
                                                                                </Link>
                                                                        </li>
                                                                        <li>
                                                                                <Link
                                                                                        className={`p-2 block ${
                                                                                                pathname === "/about"
                                                                                                        ? "text-[#059473]"
                                                                                                        : "text-slate-600"
                                                                                        }`}
                                                                                        to="/shop"
                                                                                >
                                                                                        About Us
                                                                                </Link>
                                                                        </li>
                                                                        <li>
                                                                                <Link
                                                                                        className={`p-2 block ${
                                                                                                pathname === "/contact"
                                                                                                        ? "text-[#059473]"
                                                                                                        : "text-slate-600"
                                                                                        }`}
                                                                                        to="/shop"
                                                                                >
                                                                                        Contact us
                                                                                </Link>
                                                                        </li>
                                                                </ul>
                                                        </div>
                                                </nav>
                                        </div>
                                </div>
                        </div>
                </header>
        );
};

export default Header;
