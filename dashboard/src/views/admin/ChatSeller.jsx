import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

const ChatSeller = () => {
        const [show, setShow] = useState(false);

        return (
                <div className="px-2 lg:px-7 pt-5">
                        <div className="w-full p-4 bg-[#6a5fdf] rounded-md  h-[calc(100vh-140px)]">
                                <div className="flex w-full h-full relative">
                                        {/* Sidebar */}
                                        <div
                                                className={`w-[280px] h-full absolute z-10 ${
                                                        show ? "-left-[16px]" : "-left-[336px]"
                                                } md:left-0 md:relative transition-all`}
                                        >
                                                <div className="w-full h-[calc(100vh-177px)] bg-[#9e99e9] md:bg-transparent overflow-y-auto">
                                                        <div className="flex text-xl justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 text-white">
                                                                <h2>Seller</h2>
                                                                <span
                                                                        className="block cursor-pointer md:hidden"
                                                                        onClick={() => setShow(!show)}
                                                                >
                                                                        <IoMdClose />
                                                                </span>
                                                        </div>

                                                        {/* Chat list */}
                                                        <div
                                                                className={
                                                                        "h-[60px] flex items-center justify-start gap-3 text-white p-2 rounded-sm cursor-pointer"
                                                                }
                                                        >
                                                                <div className="relative">
                                                                        <img
                                                                                src="/images/admin.jpg"
                                                                                alt="avatar"
                                                                                className="w-[38px] h-[38px] rounded-full border-white border-2 max-w-[38px] p-[2px] "
                                                                        />
                                                                        <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                                                                </div>

                                                                <div className="flex justify-center items-start flex-col w-full">
                                                                        <div className="flex justify-between items-center w-full">
                                                                                <h2 className="text-base font-semibold">
                                                                                        Pitachiti
                                                                                </h2>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
        );
};

export default ChatSeller;
