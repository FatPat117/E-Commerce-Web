import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import FeatureProducts from "../components/products/FeatureProducts";
import Products from "../components/products/Products";
import { get_category } from "../store/reducers/homeReducer";

const Home = () => {
        const dispatch = useDispatch();
        const { categories } = useSelector((state) => state.home);
        useEffect(() => {
                dispatch(get_category());
        }, []);
        return (
                <div className="w-full h-full bg-white">
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
                                                        <Products title={"Latest Products"} />
                                                </div>
                                                <div className="overflow-hidden">
                                                        <Products title={"Top Rated Products"} />
                                                </div>
                                                <div className="overflow-hidden">
                                                        <Products title={"Discount Products"} />
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
        );
};

export default Home;
