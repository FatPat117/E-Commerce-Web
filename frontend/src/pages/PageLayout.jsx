import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { get_category } from "../store/reducers/homeReducer";

const PageLayout = () => {
        const dispatch = useDispatch();
        const { categories } = useSelector((state) => state.home);
        useEffect(() => {
                dispatch(get_category());
        }, []);
        return (
                <div className="w-full h-screen bg-white">
                        <Header categories={categories} />

                        <main className="">
                                <Outlet />
                        </main>

                        <Footer />
                </div>
        );
};

export default PageLayout;
