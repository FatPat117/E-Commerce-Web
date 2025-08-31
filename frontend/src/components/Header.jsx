import React, { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaFacebookF, FaLinkedin, FaList, FaLock, FaPhoneAlt, FaShoppingCart } from "react-icons/fa";
import { FaInstagram, FaUser } from "react-icons/fa6";
import { IoIosArrowDown, IoMdPhonePortrait } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { get_category } from "../store/reducers/homeReducer";
const Header = () => {
        const dispatch = useDispatch();
        const { categories } = useSelector((state) => state.home);
        const { userInfo } = useSelector((state) => state.auth);
        const { cartProductsTotal, wishlistProductsTotal } = useSelector((state) => state.cart);
        useEffect(() => {
                dispatch(get_category());
        }, []);
        const navigate = useNavigate();
        const { pathname } = useLocation();
        const [showSidebar, setShowSidebar] = useState(false);
        const [categoryShow, setCategoryShow] = useState(false);
        const [searchValue, setSearchValue] = useState("");
        const [category, setCategory] = useState("All Category");

        const searchProduct = () => {
                navigate(`/products/search?category=${category}&searchValue=${searchValue}`);
        };

        const redirectCartPage = () => {
                if (userInfo) {
                        navigate("/cart");
                } else {
                        navigate("/login");
                }
        };
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
                                                                {userInfo ? (
                                                                        <Link
                                                                                to="/dashboard"
                                                                                className="flex cursor-pointer justify-center items-center gap-2 text-sm  text-black"
                                                                        >
                                                                                <span>
                                                                                        <FaUser />
                                                                                </span>
                                                                                <span>{userInfo.name}</span>
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
                                                                                        className={`p-2 block text-lg ${
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
                                                                                        className={`p-2 block text-lg ${
                                                                                                pathname === "/shops"
                                                                                                        ? "text-[#059473]"
                                                                                                        : "text-slate-600"
                                                                                        }`}
                                                                                        to="/shops"
                                                                                >
                                                                                        Shop
                                                                                </Link>
                                                                        </li>
                                                                        <li>
                                                                                <Link
                                                                                        className={`p-2 block text-lg ${
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
                                                                                        className={`p-2 block text-lg ${
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
                                                                                        className={`p-2 block text-lg ${
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

                                                                <div className="hidden md-lg:flex justify-center items-center gap-5">
                                                                        <div className="flex justify-center gap-5">
                                                                                {/* Loved items */}
                                                                                <div className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]">
                                                                                        <Link
                                                                                                to="/dashboard/my-wishlist"
                                                                                                className="text-xl text-green-500"
                                                                                        >
                                                                                                <AiFillHeart />
                                                                                        </Link>
                                                                                        {wishlistProductsTotal != 0 && (
                                                                                                <div
                                                                                                        className="w-[25px] h-[25px] absolute bg-red-500 rounded-full text-white flex items-center 
                                                                                        justify-center -top-[10px] -right-[5px] text-[14px] font-semibold "
                                                                                                >
                                                                                                        {
                                                                                                                wishlistProductsTotal
                                                                                                        }
                                                                                                </div>
                                                                                        )}
                                                                                </div>
                                                                                {/* Cart items */}
                                                                                <div className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]">
                                                                                        <li
                                                                                                onClick={
                                                                                                        redirectCartPage
                                                                                                }
                                                                                                className="text-xl flex text-green-500"
                                                                                        >
                                                                                                <FaShoppingCart />
                                                                                        </li>
                                                                                        {cartProductsTotal !== 0 && (
                                                                                                <div
                                                                                                        className="w-[25px] h-[25px] absolute bg-red-500 rounded-full text-white flex items-center 
                                                                                        justify-center -top-[10px] -right-[5px] text-[14px] font-semibold "
                                                                                                >
                                                                                                        {
                                                                                                                cartProductsTotal
                                                                                                        }
                                                                                                </div>
                                                                                        )}
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </nav>
                                        </div>
                                </div>
                        </div>

                        {/* Side bar */}
                        <div className="block md-lg:hidden">
                                {/* Overlay */}
                                <div
                                        className={`fixed duration-200 transition-all ${
                                                showSidebar ? "visible" : "invisible"
                                        } block md-lg:hidden w-screen h-screen bg-[rgba(0,0,0,0.5)] top-0 left-0 z-200`}
                                        onClick={() => setShowSidebar(false)}
                                ></div>

                                {/* Side bar */}
                                <div
                                        className={`w-[320px] z-999 transition-all duration-200 fixed ${
                                                showSidebar ? "left-0 top-0" : "-left-[300px]"
                                        } overflow-y-auto bg-white h-screen py-6 px-8`}
                                >
                                        <div className="flex justify-start flex-col gap-6">
                                                {/* Logo */}
                                                <Link to="/">
                                                        <img src="/images/logo.png" alt="logo" />
                                                </Link>

                                                {/* Language and user info */}
                                                <div className="flex justify-start items-center gap-5">
                                                        {/* Language */}
                                                        <div className="flex group cursor-pointer text-slate-800 text-sm justify-center items-center gap-2 relative after:absolute after:h-[18px] after:w-[2px] after:bg-[#afafaf] after:-right-[16px] after:top-[1px] before:absolute before:h-[18px] before:w-[2px] before:bg-[#afafaf] before:-left-[20px] before:top-[1px]">
                                                                <img src="/images/language.png" alt="language" />
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
                                                        <div className="pl-2">
                                                                {userInfo ? (
                                                                        <Link
                                                                                to="/dashboard"
                                                                                className="flex cursor-pointer justify-center items-center gap-2 text-sm  text-black"
                                                                        >
                                                                                <span>
                                                                                        <FaUser />
                                                                                </span>
                                                                                <span>{userInfo.name}</span>
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

                                                {/* Menu */}
                                                <ul className=" justify-start items-start gap-4 text-sm font-bold uppercase flex flex-col">
                                                        <li>
                                                                <Link
                                                                        className={`py-2 block ${
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
                                                                        className={`py-2 block ${
                                                                                pathname == "/shops"
                                                                                        ? "text-[#059473]"
                                                                                        : "text-slate-600"
                                                                        }`}
                                                                        to="/shops"
                                                                >
                                                                        Shop
                                                                </Link>
                                                        </li>
                                                        <li>
                                                                <Link
                                                                        className={`py-2 block ${
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
                                                                        className={`py-2 block ${
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
                                                                        className={`py-2 block ${
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

                                                {/* Facebook,Instagram, Linkedin */}
                                                <div className="flex justify-start items-center gap-4 text-black">
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

                                                {/* Support */}
                                                <div className="w-full flex justify-start md-lg:justify-end items-center">
                                                        <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center bg-[#f5f5f5]">
                                                                <span>
                                                                        <FaPhoneAlt />
                                                                </span>
                                                        </div>

                                                        <div className="flex justify-end flex-col gap-2 pl-3">
                                                                <h2 className="text-lg font-semibold text-slate-700">
                                                                        +12312312312
                                                                </h2>
                                                                <span className="text-slate-700 text-sm">
                                                                        Support 24/7
                                                                </span>
                                                        </div>
                                                </div>

                                                <ul className="flex flex-col justify-start items-start gap-3 text-[#1c1c1c]">
                                                        <li className="flex justify-start items-center gap-2 text-md">
                                                                <span>
                                                                        <MdEmail />
                                                                </span>
                                                                <span>support@gmail.com</span>
                                                        </li>
                                                </ul>
                                        </div>
                                </div>
                        </div>

                        {/* Search Category */}
                        <div className="w-[85%] lg:w-[90%] mx-auto py-1">
                                <div className="flex w-full flex-wrap md-lg:gap-6 md-lg:flex-nowrap items-center">
                                        {/* Category */}
                                        <div className={` w-full md-lg:w-3/12  `}>
                                                <div className="bg-white relative">
                                                        {/* Search category */}
                                                        <div
                                                                className="h-[50px] bg-[#059473] text-white text-lg flex justify-between md-lg:justify-center md-lg:px-6 items-center gap-3 font-bold cursor-pointer"
                                                                onClick={() => setCategoryShow(!categoryShow)}
                                                        >
                                                                <div className="flex justify-center items-center gap-2">
                                                                        <span>
                                                                                <FaList />
                                                                        </span>
                                                                        <span>All Category</span>
                                                                        <span>
                                                                                <IoIosArrowDown />
                                                                        </span>
                                                                </div>
                                                        </div>

                                                        {/* Dropdown */}
                                                        <div
                                                                className={`${
                                                                        categoryShow ? "h-[400px]" : "h-0"
                                                                } overflow-hidden transition-all md-lg:absolute  relative duration-500  z-[9999] bg-[#dbf3ed] w-full `}
                                                        >
                                                                <ul className="p-3 text-slate-700 font-medium">
                                                                        {categories?.map((cate, idx) => {
                                                                                return (
                                                                                        <Link
                                                                                                to={`/products?category=${cate.name}`}
                                                                                                key={idx}
                                                                                                className="flex justify-start items-center gap-5 md-lg:gap-8 px-[24px] py-[6px] border-b border-slate-300"
                                                                                        >
                                                                                                <img
                                                                                                        src={
                                                                                                                cate?.image
                                                                                                        }
                                                                                                        alt="Product image"
                                                                                                        className="w-[40px] h-[40px] rounded-full overflow-hidden object-contain"
                                                                                                />
                                                                                                <li className="text-md md-lg:text-lg block">
                                                                                                        {cate?.name}
                                                                                                </li>
                                                                                        </Link>
                                                                                );
                                                                        })}
                                                                </ul>
                                                        </div>
                                                </div>
                                        </div>

                                        {/* Search */}
                                        <div className="w-full md-lg:w-9/12">
                                                <div className="flex flex-wrap w-full justify-between items-center md-lg:gap-6 md-lg:flex-nowrap">
                                                        {/* Select category */}
                                                        <div className="w-full md-lg:w-9/12 ">
                                                                <div className="flex border-1 h-[50px] items-center relative gap-6 p-2">
                                                                        <div className="relative after:absolute after:h-[25px] after:w-[2px] after:bg-[#afafaf] after:-right-[15px] ">
                                                                                <select
                                                                                        name=""
                                                                                        id=""
                                                                                        value={category}
                                                                                        onChange={(e) =>
                                                                                                setCategory(
                                                                                                        e.target.value
                                                                                                )
                                                                                        }
                                                                                        className="w-[150px] text-slate-600 font-semibold bg-transparent px-1 h-full outline-none border-none"
                                                                                >
                                                                                        <option value="">
                                                                                                Select Category
                                                                                        </option>
                                                                                        {categories?.map(
                                                                                                (cate, idx) => (
                                                                                                        <option
                                                                                                                value={
                                                                                                                        cate?.name
                                                                                                                }
                                                                                                                key={
                                                                                                                        idx
                                                                                                                }
                                                                                                        >
                                                                                                                {
                                                                                                                        cate.name
                                                                                                                }
                                                                                                        </option>
                                                                                                )
                                                                                        )}
                                                                                </select>
                                                                        </div>

                                                                        {/* Search input */}
                                                                        <input
                                                                                type="text"
                                                                                name=""
                                                                                id="searchValue"
                                                                                value={searchValue}
                                                                                onChange={(e) =>
                                                                                        setSearchValue(e.target.value)
                                                                                }
                                                                                placeholder="Search..."
                                                                                className=" md:w-full h-full px-2 text-slate-600 font-semibold bg-transparent outline-none border-none relative"
                                                                        />

                                                                        <button
                                                                                onClick={searchProduct}
                                                                                className="bg-[#059473] hover:bg-[#059473]/50 transition-all rounded-md duration-300 cursor-pointer absolute right-0  px-2  md:px-8 h-full font-semibold flex justify-center items-center text-capitalize text-white"
                                                                        >
                                                                                Search
                                                                        </button>
                                                                </div>
                                                        </div>

                                                        {/* Info and contact */}
                                                        <div className="hidden w-full md-lg:w-4/12 md-lg:block gap-4">
                                                                <div className="w-full flex justify-start md-lg:justify-end items-center">
                                                                        <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center bg-[#f5f5f5]">
                                                                                <span>
                                                                                        <FaPhoneAlt />
                                                                                </span>
                                                                        </div>

                                                                        <div className="flex justify-end flex-col gap-2 pl-3">
                                                                                <h2 className="text-lg font-semibold text-slate-700">
                                                                                        +12312312312
                                                                                </h2>
                                                                                <span className="text-slate-700 text-sm">
                                                                                        Support 24/7
                                                                                </span>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </header>
        );
};

export default Header;
