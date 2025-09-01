import React, { useEffect, useState } from "react";
import { AiOutlineMessage, AiOutlinePlus } from "react-icons/ai";
import { GrEmoji } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import io from "socket.io-client";
import { add_friend, send_message } from "../../store/reducers/chatReducer";

// chỉ tạo socket 1 lần
const socket = io("http://localhost:5000", {
        transports: ["websocket"], // giúp ổn định hơn
});
const Chat = () => {
        const dispatch = useDispatch();
        const { sellerId } = useParams();
        const { userInfo } = useSelector((state) => state.auth);
        const { myFriends, friendMessages, currentFriend } = useSelector((state) => state.chat);
        const [text, setText] = useState("");
        const [receiverMessage, setReceiverMessage] = useState([]);

        useEffect(() => {
                socket.emit("add_user", userInfo.id, userInfo);
        }, [userInfo]);

        useEffect(() => {
                dispatch(add_friend({ sellerId: sellerId || "", userId: userInfo?.id }));
        }, [sellerId, userInfo?.id]);

        const sendMessage = (e) => {
                e.preventDefault();
                if (!text || !sellerId) return;
                dispatch(send_message({ userId: userInfo?.id, sellerId: sellerId, text, name: userInfo?.name }));
                setText("");
        };

        useEffect(() => {
                socket.on("seller_message", (message) => {
                        setReceiverMessage([...receiverMessage, message]);
                });
        }, []);

        return (
                <div className="bg-white p-3 rounded-md">
                        <div className="w-full flex">
                                <div className="w-[230px]">
                                        <div className="flex justify-center gap-3 items-center text-slate-600 text-xl h-[50px]">
                                                <span>
                                                        <AiOutlineMessage />
                                                </span>
                                                <span>Message</span>
                                        </div>
                                        <div className="w-full flex flex-col text-slate-600 py-4 h-[400px] pr-3">
                                                {myFriends?.map((friend, idx) => (
                                                        <Link
                                                                key={idx}
                                                                to={`/dashboard/chat/${friend.friendId}`}
                                                                className={`flex gap-2 justify-start items-center pl-2 py-[5px]`}
                                                        >
                                                                <div className="w-[30px] h-[30px] rounded-full relative">
                                                                        <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0"></div>

                                                                        <img src={friend.image} alt="object-contain" />
                                                                </div>
                                                                <span>{friend.shopName}</span>
                                                        </Link>
                                                ))}
                                        </div>
                                </div>
                                <div className="w-[calc(100%-230px)]">
                                        {currentFriend ? (
                                                <div className="w-full h-full">
                                                        <div className="flex justify-start gap-3 items-center text-slate-600 text-xl h-[50px]">
                                                                <div className="w-[30px] h-[30px] rounded-full relative">
                                                                        <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0"></div>

                                                                        <img src={currentFriend?.image} alt="" />
                                                                </div>
                                                                <span>{currentFriend?.shopName}</span>
                                                        </div>
                                                        <div className="h-[400px] w-full bg-slate-100 p-3 rounded-md">
                                                                <div className="w-full h-full overflow-y-auto flex flex-col gap-3">
                                                                        {friendMessages?.map((message, idx) => {
                                                                                // Customer message
                                                                                if (
                                                                                        currentFriend?.friendId ==
                                                                                        message.senderId
                                                                                ) {
                                                                                        return (
                                                                                                <div
                                                                                                        key={idx}
                                                                                                        className="w-full flex gap-2 justify-start items-center text-[14px]"
                                                                                                >
                                                                                                        <img
                                                                                                                className="w-[30px] h-[30px] "
                                                                                                                src="/images/user.png"
                                                                                                                alt=""
                                                                                                        />
                                                                                                        <div className="p-2 bg-purple-500 text-white rounded-md">
                                                                                                                <span>
                                                                                                                        {
                                                                                                                                message?.message
                                                                                                                        }
                                                                                                                </span>
                                                                                                        </div>
                                                                                                </div>
                                                                                        );
                                                                                        // Seller message
                                                                                } else {
                                                                                        return (
                                                                                                <div
                                                                                                        key={idx}
                                                                                                        className="w-full flex gap-2 justify-end items-center text-[14px]"
                                                                                                >
                                                                                                        <img
                                                                                                                className="w-[30px] h-[30px] "
                                                                                                                src="/images/user.png"
                                                                                                                alt=""
                                                                                                        />
                                                                                                        <div className="p-2 bg-cyan-500 text-white rounded-md">
                                                                                                                <span>
                                                                                                                        {
                                                                                                                                message?.message
                                                                                                                        }
                                                                                                                </span>
                                                                                                        </div>
                                                                                                </div>
                                                                                        );
                                                                                }
                                                                        })}
                                                                </div>
                                                        </div>
                                                        <form
                                                                className="flex p-2 justify-between items-center w-full"
                                                                onSubmit={sendMessage}
                                                        >
                                                                <div className="w-[40px] h-[40px] border p-2 justify-center items-center flex rounded-full">
                                                                        <label className="cursor-pointer" htmlFor="">
                                                                                <AiOutlinePlus />
                                                                        </label>
                                                                        <input className="hidden" type="file" />
                                                                </div>
                                                                <div className="border h-[40px] p-0 ml-2 w-[calc(100%-90px)] rounded-full relative">
                                                                        <input
                                                                                value={text}
                                                                                onChange={(e) =>
                                                                                        setText(e.target.value)
                                                                                }
                                                                                type="text"
                                                                                placeholder="input message"
                                                                                className="w-full rounded-full h-full outline-none p-3"
                                                                        />
                                                                        <div className="text-2xl right-2 top-2 absolute cursor-auto">
                                                                                <span>
                                                                                        <GrEmoji />
                                                                                </span>
                                                                        </div>
                                                                </div>
                                                                <div className="w-[40px] p-2 justify-center items-center rounded-full">
                                                                        <button className="text-2xl cursor-pointer inline-block">
                                                                                <IoSend />
                                                                        </button>
                                                                </div>
                                                        </form>
                                                </div>
                                        ) : (
                                                <div className="w-full h-full flex justify-center items-center text-lg ont-bold text-slate-600">
                                                        <span>select seller</span>
                                                </div>
                                        )}
                                </div>
                        </div>
                </div>
        );
};

export default Chat;
