import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const PageLayout = () => {
        return (
                <div className="w-full h-screen bg-white">
                        <Header />

                        <main className="">
                                <Outlet />
                        </main>

                        <Footer />
                </div>
        );
};

export default PageLayout;
