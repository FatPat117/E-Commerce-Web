import React from "react";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import Header from "../components/Header";
import FeatureProducts from "../components/products/FeatureProducts";

const Home = () => {
        return (
                <div className="w-full h-screen bg-white">
                        <Header></Header>
                        <Banner />
                        <Categories />
                        <div className="py-[45px]">
                                <FeatureProducts />
                        </div>
                </div>
        );
};

export default Home;
