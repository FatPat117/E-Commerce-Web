import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineMessage, AiOutlinePlus } from "react-icons/ai";
import { FaList } from "react-icons/fa";
import { GrEmoji } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import io from "socket.io-client";
import { add_friend, messageClear, send_message, updateMessage } from "../../store/reducers/chatReducer";
// chỉ tạo socket 1 lần
const localUrl = "http://localhost:5000";
const productionUrl = "https://e-commerce-web-8l3q.onrender.com";
const mode = "pro";

const API_URL = mode == "pro" ? productionUrl : localUrl;
// socket client
const socket = io(API_URL, {
        withCredentials: true,
        transports: ["websocket"], // đảm bảo dùng websocket
});

const Chat = () => {
        const dispatch = useDispatch();
        const { sellerId } = useParams();
        const { userInfo } = useSelector((state) => state.auth);
        const { myFriends, friendMessages, currentFriend, successMessage } = useSelector((state) => state.chat);
        const [text, setText] = useState("");
        const [receiverMessage, setReceiverMessage] = useState("");
        const [activeSeller, setActiveSeller] = useState([]);
        const [show, setShow] = useState(false);
        const scrollRef = useRef(null);
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
                const handleSellerMessage = (message) => {
                        setReceiverMessage(message);
                };

                const handleActiveSeller = (allSeller) => {
                        setActiveSeller(allSeller);
                };

                socket.on("seller_message", handleSellerMessage);
                socket.on("activeSeller", handleActiveSeller);

                return () => {
                        socket.off("seller_message", handleSellerMessage);
                        socket.off("activeSeller", handleActiveSeller);
                };
        }, []);

        useEffect(() => {
                if (successMessage) {
                        socket.emit("send_customer_message", friendMessages[friendMessages.length - 1]);
                        dispatch(messageClear());
                }
        }, [successMessage]);

        useEffect(() => {
                if (receiverMessage) {
                        if (sellerId == receiverMessage.senderId && userInfo?.id == receiverMessage.receiverId) {
                                dispatch(updateMessage(receiverMessage));
                        } else {
                                toast.success(receiverMessage?.senderName + " " + "Send A message");
                                dispatch(messageClear());
                        }
                }
        }, [receiverMessage]);

        // Scroll
        useEffect(() => {
                scrollRef.current?.scrollIntoView({ behavior: "smooth" });
        }, [receiverMessage, friendMessages]);
        return (
                <div className="bg-white p-3 rounded-md">
                        <div className="w-full flex relative">
                                <div
                                        className={`w-[230px] absolute md-lg:static bg-white h-full md-lg:h-auto  ${
                                                show ? "-left-[0px]" : "-left-[350px]"
                                        }`}
                                >
                                        <div className="flex justify-center gap-3 items-center text-slate-600 text-xl h-[50px]">
                                                <span>
                                                        <AiOutlineMessage />
                                                </span>
                                                <span>Message</span>
                                        </div>
                                        <div className="w-full flex flex-col text-slate-600 py-4 h-[400px] pr-3">
                                                {myFriends?.map((friend, idx) => (
                                                        <Link
                                                                onClick={() => setShow(false)}
                                                                key={idx}
                                                                to={`/dashboard/chat/${friend.friendId}`}
                                                                className={`flex gap-2 justify-start items-center pl-2 py-[5px]`}
                                                        >
                                                                <div className="w-[30px] h-[30px] rounded-full relative">
                                                                        {activeSeller?.some(
                                                                                (seller) =>
                                                                                        seller.sellerId.toString() ==
                                                                                        friend.friendId.toString()
                                                                        ) ? (
                                                                                <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0"></div>
                                                                        ) : null}

                                                                        <img src={friend.image} alt="object-contain" />
                                                                </div>
                                                                <span>{friend.shopName}</span>
                                                        </Link>
                                                ))}
                                        </div>
                                </div>
                                <div className="md-lg:w-[calc(100%-230px)] w-full">
                                        {currentFriend ? (
                                                <div className="w-full h-full">
                                                        <div className="flex justify-between gap-3 items-center text-slate-600 text-xl h-[50px]">
                                                                <div className="flex gap-2">
                                                                        <div className="w-[30px] h-[30px] rounded-full relative">
                                                                                {activeSeller?.some(
                                                                                        (seller) =>
                                                                                                seller.sellerId.toString() ==
                                                                                                currentFriend.friendId.toString()
                                                                                ) ? (
                                                                                        <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0"></div>
                                                                                ) : null}
                                                                                <img
                                                                                        src={currentFriend?.image}
                                                                                        alt=""
                                                                                />
                                                                        </div>
                                                                        <span>{currentFriend?.shopName}</span>
                                                                </div>

                                                                <div
                                                                        onClick={() => setShow(!show)}
                                                                        className="w-[35px] h-[35px] flex md-lg:hidden cursor-pointer rounded-sm justify-center items-center bg-sky-500 text-white"
                                                                >
                                                                        <FaList />
                                                                </div>
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
                                                                                                        ref={scrollRef}
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
                                                                                                        ref={scrollRef}
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
                                                <div
                                                        onClick={() => setShow(true)}
                                                        className="w-full min-h-[400px] flex justify-center items-center text-lg ont-bold text-slate-600"
                                                >
                                                        <span>select seller</span>
                                                </div>
                                        )}
                                </div>
                        </div>
                </div>
        );
};

export default Chat;
