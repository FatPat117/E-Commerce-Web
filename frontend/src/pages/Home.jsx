import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import FeatureProducts from "../components/products/FeatureProducts";
import Products from "../components/products/Products";
import { get_category, get_products } from "../store/reducers/homeReducer";

const Home = () => {
        const dispatch = useDispatch();
        const { categories, products, latestProduct, ratingProduct, discountProduct } = useSelector(
                (state) => state.home
        );
        useEffect(() => {
                dispatch(get_category());
                dispatch(get_products());
        }, []);
        return (
                <div className="w-full h-full bg-white">
                        <Banner />
                        <Categories categories={categories} />

                        {/* Feature Products */}
                        <div className="py-[45px]">
                                <FeatureProducts products={products} />
                        </div>

                        {/* Latest Product */}
                        <div className="py-10">
                                <div className="w-[85%] flex flex-wrap mx-auto">
                                        <div className="grid w-full  md-lg:grid-cols-3 grid-cols-1 md:grid-cols-2">
                                                <div className="overflow-hidden">
                                                        <Products title={"Latest Products"} products={latestProduct} />
                                                </div>
                                                <div className="overflow-hidden">
                                                        <Products
                                                                title={"Top Rated Products"}
                                                                products={ratingProduct}
                                                        />
                                                </div>
                                                <div className="overflow-hidden">
                                                        <Products
                                                                title={"Discount Products"}
                                                                products={discountProduct}
                                                        />
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
        );
};

export default Home;
