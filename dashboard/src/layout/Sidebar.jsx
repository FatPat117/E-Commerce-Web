import React, { useEffect, useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { getNav } from "../navigation";

const Sidebar = () => {
        const { pathname } = useLocation();
        const [allNav, setAllNav] = useState([]);

        useEffect(() => {
                const navs = getNav("admin");
                setAllNav(navs);
        }, []);

        return (
                <div>
                        <div></div>

                        <div
                                className={`w-[280px] fixed bg-[#e6e7fb] z-50 top-0  h-screen shadow-[0_0_15px_0_rgb(34_41_47_/_5%)] transition-all`}
                        >
                                <div className="h-[70px] flex justify-center items-center ">
                                        <Link to="/" className="w-[180px] h-[60px]">
                                                <img src="/images/logo.png" alt="logo" className="w-full h-full" />
                                        </Link>
                                </div>

                                <div className="px-[16px] ">
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
                </div>
        );
};

export default Sidebar;
