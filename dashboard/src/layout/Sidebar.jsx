import React, { useEffect, useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { getNav } from "../navigation";
import { logout } from "../store/Reducers/authReducer";
const Sidebar = ({ showSidebar, setShowSidebar }) => {
        const navigate = useNavigate();
        const dispatch = useDispatch();
        const { pathname } = useLocation();
        const [allNav, setAllNav] = useState([]);

        const { role } = useSelector((state) => state.auth);
        useEffect(() => {
                const navs = getNav(role);
                setAllNav(navs);
        }, [role]);

        const Logout = () => {
                dispatch(logout({ navigate, role }));
        };
        return (
                <>
                        {/* Overlay */}
                        <div
                                onClick={() => setShowSidebar(false)}
                                className={`${
                                        showSidebar ? "visible opacity-100" : "invisible opacity-0"
                                } fixed top-0 left-0 w-screen h-screen bg-[#8cbce780] transition-opacity duration-200 z-40 lg:hidden`}
                        ></div>

                        {/* Sidebar */}
                        <aside
                                className={`w-[260px] fixed bg-[#e6e7fb] z-50 top-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/_5%)] transition-all ${
                                        showSidebar ? "left-0" : "left-[-280px] lg:left-0"
                                }`}
                        >
                                <div className="h-[70px] flex justify-center items-center">
                                        <Link to="#" className="w-[180px] h-[60px]">
                                                <img src={logo} alt="logo" className="w-full h-full" />
                                        </Link>
                                </div>

                                <div className="px-[16px] ">
                                        <div
                                                onClick={() => setShowSidebar(false)}
                                                className="absolute top-2 right-0 cursor-pointer p-2 lg:hidden"
                                        >
                                                <FaTimes size={20} />
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
                                                        <button
                                                                onClick={Logout}
                                                                className="cursor-pointer text-[#030811] font-bold duration-200 px-[12px] py-[12px] rounded-md flex justify-start text-md md:text-lg items-center gap-3 hover:pl-6 transition-all w-full mb-1"
                                                        >
                                                                <BiLogOutCircle />
                                                                <span>Logout</span>
                                                        </button>
                                                </li>
                                        </ul>
                                </div>
                        </aside>
                </>
        );
};

export default Sidebar;
