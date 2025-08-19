import React from "react";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import Header from "../components/Header";
import FeatureProducts from "../components/products/FeatureProducts";
import Products from "../components/products/Products";

const Home = () => {
        return (
                <div className="w-full h-screen bg-white">
                        <Header></Header>
                        <Banner />
                        <Categories />

                        {/* Feature Products */}
                        <div className="py-[45px]">
                                <FeatureProducts />
                        </div>

                        {/* Latest Product */}
                        <div className="py-10">
                                <div className="w-[85%] flex flex-wrap mx-auto">
                                        <div className="grid w-full  md-lg:grid-cols-3 grid-cols-1 md:grid-cols-2">
                                                <div className="overflow-hidden">
                                                        <Products />
                                                </div>
                                                <div className="overflow-hidden">
                                                        <Products />
                                                </div>
                                                <div className="overflow-hidden">
                                                        <Products />
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
        );
};

export default Home;
