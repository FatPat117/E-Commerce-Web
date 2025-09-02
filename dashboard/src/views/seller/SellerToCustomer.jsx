import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaList } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
        get_customer_messages,
        get_customers,
        messageClear,
        send_message,
        updateMessage,
} from "../../store/Reducers/chatReducer";
import { socket } from "../../utils/utils";
const SellerToCustomer = () => {
        const { customerId } = useParams();
        const dispatch = useDispatch();
        const { userInfo } = useSelector((state) => state.auth);
        const { customers, messages, currentCustomer, successMessage } = useSelector((state) => state.chat);
        const [text, setText] = useState("");
        const [show, setShow] = useState(false);
        const [receiverMessage, setReceiverMessage] = useState("");
        const [activeCustomer, setActiveCustomer] = useState([]);
        const scrollRef = useRef(null);
        useEffect(() => {
                dispatch(get_customers(userInfo?._id));
        }, [userInfo?.id]);

        useEffect(() => {
                if (customerId) {
                        dispatch(get_customer_messages(customerId));
                }
        }, [customerId]);

        const sendMessage = (e) => {
                e.preventDefault();
                if (!text || !customerId) return;
                dispatch(
                        send_message({
                                senderId: userInfo?._id,
                                receiverId: customerId,
                                text,
                                name: userInfo?.shopInfo.shopName,
                        })
                );
                setText("");
        };

        useEffect(() => {
                if (successMessage) {
                        socket.emit("send_seller_message", messages[messages.length - 1]);
                        dispatch(messageClear());
                }
        }, [successMessage]);

        useEffect(() => {
                const handleCustomerMessage = (message) => {
                        setReceiverMessage(message);
                };

                const handleActiveCustomer = (allCustomer) => {
                        setActiveCustomer(allCustomer);
                };

                socket.on("customer_message", handleCustomerMessage);
                socket.on("activeCustomer", handleActiveCustomer);

                return () => {
                        socket.off("customer_message", handleCustomerMessage);
                        socket.off("activeCustomer", handleActiveCustomer);
                };
        }, []);

        useEffect(() => {
                if (receiverMessage) {
                        if (customerId == receiverMessage.senderId && userInfo?._id == receiverMessage.receiverId) {
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
        }, [receiverMessage, messages]);
        return (
                <div className="px-2 lg:px-7 pt-5">
                        <div className="w-full p-4 bg-[#6a5fdf] rounded-md  h-[calc(100vh-140px)]">
                                <div className="flex w-full h-full relative">
                                        {/* Sidebar */}
                                        <div
                                                className={`w-[280px] h-full absolute z-10 ${
                                                        show ? "-left-[16px]" : "-left-[336px]"
                                                } md:left-0 md:relative transition-all duration-300`}
                                        >
                                                <div className="w-full h-[calc(100vh-177px)] bg-[#9e99e9] md:bg-transparent overflow-y-auto transition-all duration-300">
                                                        <div className="flex text-xl justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 text-white">
                                                                <h2>Customer</h2>
                                                                <span
                                                                        className="block cursor-pointer md:hidden"
                                                                        onClick={() => setShow(!show)}
                                                                >
                                                                        <IoMdClose />
                                                                </span>
                                                        </div>

                                                        {/* Chat list */}
                                                        {customers?.map((customer, idx) => (
                                                                <Link
                                                                        to={`/seller/dashboard/chat-customer/${customer.friendId}`}
                                                                        key={idx}
                                                                        className={
                                                                                "h-[60px] flex items-center justify-start gap-3 text-white p-2 rounded-md cursor-pointer bg-[#8288ed]"
                                                                        }
                                                                >
                                                                        <div className="relative">
                                                                                <img
                                                                                        src={
                                                                                                customer.image ||
                                                                                                `/images/admin.jpg`
                                                                                        }
                                                                                        alt="avatar"
                                                                                        className="w-[38px] h-[38px] rounded-full border-white border-2 max-w-[38px] p-[2px] "
                                                                                />
                                                                                {activeCustomer?.some(
                                                                                        (cus) =>
                                                                                                cus?.customerId.toString() ==
                                                                                                customer?.friendId.toString()
                                                                                ) && (
                                                                                        <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                                                                                )}
                                                                        </div>

                                                                        <div className="flex justify-center items-start flex-col w-full">
                                                                                <div className="flex justify-between items-center w-full">
                                                                                        <h2 className="text-base font-semibold">
                                                                                                {customer.shopName}
                                                                                        </h2>
                                                                                </div>
                                                                        </div>
                                                                </Link>
                                                        ))}
                                                </div>
                                        </div>

                                        {/* Chat Box */}
                                        <div className="w-full md:w-[calc(100%-200px)] md:pl-4">
                                                {/* Top */}
                                                <div className="flex justify-between items-center">
                                                        {customerId && (
                                                                <div className="flex justify-start items-center gap-3">
                                                                        <div className="relative">
                                                                                <img
                                                                                        src="/images/admin.jpg"
                                                                                        alt="avatar"
                                                                                        className="w-[45px] h-[45px] rounded-full border-green-500 border-2 max-w-[45px] p-[2px] "
                                                                                />
                                                                                {activeCustomer?.some(
                                                                                        (customer) =>
                                                                                                customer?.customerId.toString() ==
                                                                                                customerId?.toString()
                                                                                ) && (
                                                                                        <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                                                                                )}
                                                                        </div>
                                                                        <h2 className="text-base text-white font-semibold">
                                                                                {currentCustomer?.name}
                                                                        </h2>
                                                                </div>
                                                        )}

                                                        <div className="w-[35px] flex md:hidden h-[35px] rounded-sm bg-blue-500 shadow-lg hover:shadow-blue-500/50 hover:shadow-md hover:bg-blue-400 transition-colors duration-300 text-white cursor-pointer justify-between items-center ">
                                                                <span
                                                                        onClick={() => setShow(!show)}
                                                                        className="flex items-center justify-center w-full h-full"
                                                                >
                                                                        <FaList />
                                                                </span>
                                                        </div>
                                                </div>

                                                {/* Message Box */}
                                                <div className="py-4 ">
                                                        <div className="bg-[#475569] h-[calc(100vh-300px)] rounded-md p-3 overflow-y-auto">
                                                                {customerId ? (
                                                                        messages?.map((message, idx) => {
                                                                                if (
                                                                                        message.senderId.toString() ===
                                                                                        customerId.toString()
                                                                                ) {
                                                                                        /* Customer Message   */
                                                                                        return (
                                                                                                <div
                                                                                                        key={idx}
                                                                                                        className="w-full flex justify-start items-center"
                                                                                                        ref={scrollRef}
                                                                                                >
                                                                                                        <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                                                                                                                <div>
                                                                                                                        <img
                                                                                                                                src={`/images/admin.jpg`}
                                                                                                                                alt="avatar"
                                                                                                                                className="w-[38px] h-[38px] rounded-full border-white border-2 max-w-[38px] p-[3px] "
                                                                                                                        />
                                                                                                                </div>
                                                                                                                <div className="flex justify-center items-start flex-col w-full bg-blue-500 shadow-md shadow-blue-500/50 text-white py-1 px-2 rounded-sm ">
                                                                                                                        <span>
                                                                                                                                {
                                                                                                                                        message.message
                                                                                                                                }
                                                                                                                        </span>
                                                                                                                </div>
                                                                                                        </div>
                                                                                                </div>
                                                                                        );
                                                                                } else {
                                                                                        /* My  Message */
                                                                                        return (
                                                                                                <div
                                                                                                        key={idx}
                                                                                                        className="w-full flex justify-end items-center"
                                                                                                        ref={scrollRef}
                                                                                                >
                                                                                                        <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                                                                                                                <div className="flex justify-center items-start flex-col w-full bg-red-500 shadow-md shadow-red-500/50 text-white py-1 px-2 rounded-sm ">
                                                                                                                        <span>
                                                                                                                                {
                                                                                                                                        message.message
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
                                                                                }
                                                                        })
                                                                ) : (
                                                                        <div className="w-full h-full flex justify-center items-center text-white gap-2 flex-col">
                                                                                <span>Select Customer</span>
                                                                        </div>
                                                                )}
                                                        </div>
                                                </div>

                                                {/* Button  */}
                                                <form action="" className="flex gap-3" onSubmit={sendMessage}>
                                                        <input
                                                                type="text"
                                                                value={text}
                                                                onChange={(e) => setText(e.target.value)}
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

export default SellerToCustomer;
