import React from "react";
import { FaList } from "react-icons/fa";

const Header = ({ showSidebar, setShowSidebar }) => {
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
                        </div>
                </header>
        );
};

export default Header;
