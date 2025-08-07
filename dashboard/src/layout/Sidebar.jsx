import React, { useEffect, useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { getNav } from "../navigation";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
        const { pathname } = useLocation();
        const [allNav, setAllNav] = useState([]);

        useEffect(() => {
                const navs = getNav("admin");
                setAllNav(navs);
        }, []);

        return (
                <aside className="relative">
                        <div
                                onClick={() => setShowSidebar(false)}
                                className={`${
                                        showSidebar ? "invisible" : "visible"
                                } flex duration-200 w-screen h-screen bg-[#8cbce780] top-0 left-0 z-10`}
                        ></div>

                        <div
                                className={`w-[280px] fixed bg-[#e6e7fb] z-50 top-0  h-screen shadow-[0_0_15px_0_rgb(34_41_47_/_5%)] transition-all ${
                                        showSidebar ? "left-0" : "left-[-280px] lg:left-0"
                                }`}
                        >
                                <div className="h-[70px] flex justify-center items-center ">
                                        <Link to="/" className="w-[180px] h-[60px]">
                                                <img src="/images/logo.png" alt="logo" className="w-full h-full" />
                                        </Link>
                                </div>

                                <div className="px-[16px]   ">
                                        <div
                                                onClick={() => setShowSidebar(false)}
                                                className="absolute top-0 right-0 cursor-pointer p-2 lg:hidden"
                                        >
                                                <span>
                                                        <FaTimes size={20} />
                                                </span>
                                        </div>

                                        <ul>
                                                {allNav.map((nav, idx) => (
                                                        <li key={idx}>
                                                                <Link
                                                                        to={nav.path}
                                                                        className={`${
                                                                                pathname === nav.path
                                                                                        ? "bg-blue-600 shadow-indigo-500/50 text-white duration-400"
                                                                                        : "text-[#030811] font-bold duration-200"
                                                                        } px-[12px] py-[12px] rounded-md flex justify-start text-md md:text-lg items-center gap-3 hover:pl-6 transition-all w-full mb-1`}
                                                                >
                                                                        <span>{nav.icon}</span>
                                                                        <span>{nav.title}</span>
                                                                </Link>
                                                        </li>
                                                ))}

                                                <li>
                                                        <Link
                                                                to="/"
                                                                className="text-[#030811] font-bold duration-200 px-[12px] py-[12px] rounded-md flex justify-start text-md md:text-lg items-center gap-3 hover:pl-6 transition-all w-full mb-1"
                                                        >
                                                                <span>
                                                                        <BiLogOutCircle />
                                                                </span>
                                                                <span>Logout</span>
                                                        </Link>
                                                </li>
                                        </ul>
                                </div>
                        </div>
                </aside>
        );
};

export default Sidebar;
