import React from "react";
import Banner from "../components/Banner";
import Header from "../components/Header";

const Home = () => {
        return (
                <div className="w-full h-screen bg-white">
                        <Header></Header>
                        <Banner />
                </div>
        );
};

export default Home;
