import React from "react";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import Header from "../components/Header";

const Home = () => {
        return (
                <div className="w-full h-screen bg-white">
                        <Header></Header>
                        <Banner />
                        <Categories />
                </div>
        );
};

export default Home;
