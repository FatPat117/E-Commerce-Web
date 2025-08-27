import React, { useState } from "react";
import { FaBorderAll, FaHeart, FaKey, FaList, FaSignOutAlt } from "react-icons/fa";
import { IoIosHome, IoMdChatbubbles } from "react-icons/io";
import { Link, Outlet } from "react-router-dom";
const Dashboard = () => {
        const [filterShow, setFilterShow] = useState(false);
        return (
                <div>
                        <div className="bg-slate-200 mt-5">
                                <div className="w-[90%] mx-auto block md-lg:hidden ">
                                        <button
                                                onClick={() => setFilterShow(!filterShow)}
                                                className="text-center p-3 bg-[#059473] text-white"
                                        >
                                                <FaList />
                                        </button>
                                </div>

                                {/* SideBar*/}
                                <div className="h-full mx-auto ">
                                        <div className="py-5 flex md-lg:w-[90%] mx-auto relative">
                                                <div
                                                        className={`rounded-sm z-50 absolute md-lg:relative md-lg:left-0 ${
                                                                filterShow ? "left-2" : "-left-[360px]"
                                                        } w-[270px] ml-4 bg-white`}
                                                >
                                                        <ul className="py-2 text-slate-600 px-4 flex flex-col gap-3">
                                                                <li className="cursor-pointer flex justify-start items-center gap-2 py-2">
                                                                        <span className="text-xl">
                                                                                <IoIosHome />
                                                                        </span>
                                                                        <Link to="/dashboard" className="block ">
                                                                                Dashboard
                                                                        </Link>
                                                                </li>

                                                                <li className="cursor-pointer flex justify-start items-center gap-2 py-2">
                                                                        <span className="text-xl">
                                                                                <FaBorderAll />
                                                                        </span>
                                                                        <Link to="my-orders" className="block ">
                                                                                My Orders
                                                                        </Link>
                                                                </li>

                                                                <li className="cursor-pointer flex justify-start items-center gap-2 py-2">
                                                                        <span className="text-xl">
                                                                                <FaHeart />
                                                                        </span>
                                                                        <Link to="/dashboard" className="block ">
                                                                                My Wishlist
                                                                        </Link>
                                                                </li>

                                                                <li className="cursor-pointer flex justify-start items-center gap-2 py-2">
                                                                        <span className="text-xl">
                                                                                <IoMdChatbubbles />
                                                                        </span>
                                                                        <Link to="/dashboard" className="block ">
                                                                                Chat
                                                                        </Link>
                                                                </li>

                                                                <li className="cursor-pointer flex justify-start items-center gap-2 py-2">
                                                                        <span className="text-xl">
                                                                                <FaKey />
                                                                        </span>
                                                                        <Link to="/dashboard" className="block ">
                                                                                Change Password
                                                                        </Link>
                                                                </li>

                                                                <li className="cursor-pointer flex justify-start items-center gap-2 py-2">
                                                                        <span className="text-xl">
                                                                                <FaSignOutAlt />
                                                                        </span>
                                                                        <Link to="/dashboard" className="block ">
                                                                                Logout
                                                                        </Link>
                                                                </li>
                                                        </ul>
                                                </div>

                                                <div className="w-full md-lg:w-[calc(100%-270px)]">
                                                        <div className="mx-0 md-lg:mx-4">
                                                                <Outlet />
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
        );
};

export default Dashboard;
