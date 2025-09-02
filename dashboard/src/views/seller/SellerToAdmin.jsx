import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
        get_seller_messages,
        messageClear,
        send_message_admin_to_seller,
        updateAdminMessage,
} from "../../store/Reducers/chatReducer";
import { socket } from "../../utils/utils";
const SellerToAdmin = () => {
        const dispatch = useDispatch();
        const [text, setText] = useState("");
        const { userInfo } = useSelector((state) => state.auth);
        const { sellerAdminMessage, successMessage } = useSelector((state) => state.chat);

        const sendMessage = (e) => {
                e.preventDefault();
                if (!text) return;
                dispatch(
                        send_message_admin_to_seller({
                                senderId: userInfo?._id,
                                receiverId: "",
                                text,
                                name: userInfo?.name,
                        })
                );
                setText("");
        };
        useEffect(() => {
                dispatch(get_seller_messages(""));
        }, []);

        useEffect(() => {
                if (successMessage) {
                        socket.emit("send_message_seller_to_admin", sellerAdminMessage[sellerAdminMessage.length - 1]);
                        dispatch(messageClear());
                }
        }, [successMessage]);

        useEffect(() => {
                const handleAdminMessage = (message) => {
                        dispatch(updateAdminMessage(message));
                };

                socket.on("received_admin_message", handleAdminMessage);

                return () => {
                        socket.off("received_admin_message", handleAdminMessage);
                };
        }, []);

        return (
                <div className="px-2 lg:px-7 pt-5">
                        <div className="w-full p-4 bg-[#6a5fdf] rounded-md  h-[calc(100vh-140px)]">
                                <div className="flex w-full h-full relative">
                                        {/* Chat Box */}
                                        <div className="w-full  md:pl-4">
                                                {/* Top */}
                                                <div className="flex justify-between items-center">
                                                        <div className="flex justify-start items-center gap-3">
                                                                <div className="relative">
                                                                        <img
                                                                                src="/images/demo.jpg"
                                                                                alt="avatar"
                                                                                className="w-[45px] h-[45px] rounded-full border-green-500 border-2 max-w-[45px] p-[2px] "
                                                                        />
                                                                        <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                                                                </div>
                                                                <h2 className="text-base text-white font-semibold">
                                                                        Support Admin
                                                                </h2>
                                                        </div>
                                                        )
                                                </div>

                                                {/* Message Box */}
                                                <div className="py-4 ">
                                                        <div className="bg-[#475569] h-[calc(100vh-300px)] rounded-md p-3 overflow-y-auto">
                                                                {sellerAdminMessage?.map((message, idx) => {
                                                                        if (message?.senderId === userInfo?._id) {
                                                                                return (
                                                                                        //       {/* My  Message */}
                                                                                        <div
                                                                                                key={idx}
                                                                                                className="w-full flex justify-end items-center"
                                                                                        >
                                                                                                <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                                                                                                        <div className="flex justify-center items-start flex-col w-full bg-red-500 shadow-md shadow-red-500/50 text-white py-1 px-2 rounded-sm ">
                                                                                                                <span>
                                                                                                                        {
                                                                                                                                message?.message
                                                                                                                        }
                                                                                                                </span>
                                                                                                        </div>
                                                                                                        <div>
                                                                                                                <img
                                                                                                                        src={
                                                                                                                                "/images/admin.jpg"
                                                                                                                        }
                                                                                                                        alt="avatar"
                                                                                                                        className="w-[38px] h-[38px] rounded-full border-white border-2 max-w-[38px] p-[3px] "
                                                                                                                />
                                                                                                        </div>
                                                                                                </div>
                                                                                        </div>
                                                                                );
                                                                        } else {
                                                                                return (
                                                                                        //        {/* Other Message   */}
                                                                                        <div
                                                                                                key={idx}
                                                                                                className="w-full flex justify-start items-center"
                                                                                        >
                                                                                                <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                                                                                                        <div>
                                                                                                                <img
                                                                                                                        src="/images/demo.jpg"
                                                                                                                        alt="avatar"
                                                                                                                        className="w-[38px] h-[38px] rounded-full border-white border-2 max-w-[38px] p-[3px] "
                                                                                                                />
                                                                                                        </div>
                                                                                                        <div className="flex justify-center items-start flex-col w-full bg-blue-500 shadow-md shadow-blue-500/50 text-white py-1 px-2 rounded-sm ">
                                                                                                                <span>
                                                                                                                        {
                                                                                                                                message?.message
                                                                                                                        }
                                                                                                                </span>
                                                                                                        </div>
                                                                                                </div>
                                                                                        </div>
                                                                                );
                                                                        }
                                                                })}
                                                        </div>
                                                </div>

                                                {/* Button  */}
                                                <form action="" className="flex gap-3" onSubmit={sendMessage}>
                                                        <input
                                                                value={text}
                                                                onChange={(e) => setText(e.target.value)}
                                                                type="text"
                                                                name=""
                                                                id=""
                                                                placeholder="Type your message here..."
                                                                className="w-full flex justify-between items-center px-2 py-3 border-2 border-slate-700 focus:border-white focus:outline-none rounded-md outline-none text-[#d0d2d6] bg-transparent font-medium"
                                                        />

                                                        <button className=" bg-[#06b6d4] hover:shadow-cyan-500/50 hover:bg-[#06b6d4]/90 shadow-md  py-3 cursor-pointer ] rounded-md  font-semibold w-[75px] h-[45px] text-white flex justify-center items-center">
                                                                Send
                                                        </button>
                                                </form>
                                        </div>
                                </div>
                        </div>
                </div>
        );
};

export default SellerToAdmin;
