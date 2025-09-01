import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { updateCustomer, updateSellers } from "../store/Reducers/chatReducer";
import { socket } from "../utils/utils";
import Header from "./Header";
import Sidebar from "./Sidebar";
const MainLayout = () => {
        const dispatch = useDispatch();
        const { userInfo } = useSelector((state) => state.auth);
        const [showSidebar, setShowSidebar] = useState(false);

        useEffect(() => {
                if (userInfo?.role == "seller") {
                        socket.emit("add_seller", userInfo?._id, userInfo);
                } else {
                        socket.emit("add_admin", userInfo);
                }
        }, [userInfo]);

        useEffect(() => {
                socket.on("activeSeller", (allSeller) => {
                        console.log(allSeller);
                        dispatch(updateSellers(allSeller));
                });
                socket.on("activeCustomer", (admin) => {
                        dispatch(updateCustomer(admin));
                });
        }, []);
        return (
                <div className="bg-[#cdcae9] w-full min-h-screen">
                        <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
                        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
                        <div className="ml-0 lg:ml-[260px] pt-[95px] transition-all">
                                <Outlet />
                        </div>
                </div>
        );
};

export default MainLayout;
