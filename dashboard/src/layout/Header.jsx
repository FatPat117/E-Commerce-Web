import React from "react";
import { FaList } from "react-icons/fa";
import { useSelector } from "react-redux";

const Header = ({ showSidebar, setShowSidebar }) => {
        const { userInfo } = useSelector((state) => state.auth);
        return (
                <header className="fixed top-0 left-0 w-full py-5 px-2 lg:px-7 z-40">
                        <div className="ml-0 lg:ml-[260px] rounded-md h-[65px] flex justify-between items-center bg-[#b1addf] px-5 transition-all ">
                                <div
                                        onClick={() => setShowSidebar(!showSidebar)}
                                        className="cursor-pointer w-[35px] flex lg:hidden h-[35px] rounded-md bg-indigo-500 shadow-lg hover:shadow-indigo-400/50 transition-all justify-center items-center "
                                >
                                        <span>
                                                <FaList />
                                        </span>
                                </div>

                                <div className="hidden md:block">
                                        <input
                                                type="text"
                                                name="search"
                                                id="search"
                                                className="px-3 py-2 outline-none border bg-transparent border-slate-700 rounded-lg text-[#2a2837] focus:outline-none focus:border-2 focus:border-indigo-500 transition-all overflow-hidden "
                                                placeholder="Search..."
                                        />
                                </div>

                                <div className="flex items-center justify-center gap-8 relative ">
                                        <div className="flex justify-center items-center">
                                                <div className="flex justify-center items-center gap-3">
                                                        <div className="flex justify-center items-center flex-col text-end">
                                                                <h2 className="text-md font-bold">{userInfo?.name}</h2>
                                                                <span className="text-[14px] w-full font-normal">
                                                                        {userInfo?.role}
                                                                </span>
                                                        </div>
                                                        {userInfo.role == "admin" ? (
                                                                <img
                                                                        src="/images/admin.jpg"
                                                                        alt="avatar"
                                                                        className="w-[45px] h-[45px] rounded-full object-cover overflow-hidden"
                                                                />
                                                        ) : (
                                                                <img
                                                                        src={userInfo?.image}
                                                                        alt="avatar"
                                                                        className="w-[45px] h-[45px] rounded-full object-cover overflow-hidden"
                                                                />
                                                        )}
                                                </div>
                                        </div>
                                </div>
                        </div>
                </header>
        );
};

export default Header;
