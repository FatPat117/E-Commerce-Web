import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { BsFillGridFill } from "react-icons/bs";
import { CiStar } from "react-icons/ci";
import { FaThList } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Range } from "react-range";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import Products from "../components/products/Products";
import ShopProduct from "../components/products/ShopProduct";
import { get_category, get_products, price_range_product, query_products } from "../store/reducers/homeReducer";
import { URL } from "../utils/utils";
const CategoryShop = () => {
        const dispatch = useDispatch();
        const [searchParams, setSearchParams] = useSearchParams();
        const category = searchParams.get("category");

        const { latestProduct, priceRange, totalProducts, perPage, products } = useSelector((state) => state.home);
        useEffect(() => {
                dispatch(get_category());
                dispatch(get_products());
                dispatch(price_range_product());
        }, []);

        const [filter, setFilter] = useState(true);
        const [state, setState] = useState({
                values: [priceRange.low, priceRange.high],
        });
        const [rating, setRating] = useState("");

        const [sortBy, setSortBy] = useState("");
        const [style, setStyle] = useState("grid");
        const [currentPage, setCurrentPage] = useState(1);

        useEffect(() => {
                setState({
                        values: [priceRange.low, priceRange.high],
                });
        }, [priceRange.low, priceRange.high]);

        useEffect(() => {
                dispatch(
                        query_products({
                                category: category,
                                rating: rating,
                                sortBy: sortBy,
                                low: state.values[0],
                                high: state.values[1],
                                currentPage,
                        })
                );
        }, [category, rating, sortBy, state.values, currentPage, dispatch]);
        return (
                <div>
                        {/* Banner */}
                        <section
                                style={{ backgroundImage: `url(${URL}/images/banner/shop.png)` }}
                                className={` h-[240px] bg-cover bg-no-repeat relative bg-left md-lg:mt-10`}
                        >
                                <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
                                        <div className=" w-[80%] md-lg:w-[85%] lg:w-[90%] h-full mx-auto">
                                                <div className="flex flex-col justify-center items-center gap-1 w-full h-full text-white">
                                                        <h2 className="text-3xl font-bold">Category Page</h2>
                                                        <div className="flex justify-center items-center gap-2 text-2xl w-full lg:mt-2">
                                                                <Link to="/">Home</Link>
                                                                <span className="mt-1">
                                                                        <IoIosArrowForward />
                                                                </span>
                                                                <span className="underline text-blue-300">
                                                                        Category
                                                                </span>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </section>

                        <section className="py-16">
                                <div className="w-[80%] md-lg:w-[85%] lg:w-[90%] h-full mx-auto">
                                        {/* Filter Product Show in Mobile*/}
                                        <div className={`md:hidden block ${filter ? "mb-6" : "mb-0"}`}>
                                                <button
                                                        onClick={() => setFilter(!filter)}
                                                        className="text-center w-full py-2 px-3 bg-indigo-500 text-white"
                                                >
                                                        Filter Product
                                                </button>
                                        </div>

                                        {/* Shop Page*/}
                                        <div className="w-full flex flex-wrap">
                                                {/* Category search */}
                                                <div
                                                        className={`w-full md:w-4/12 md-lg:w-3/12 pr-8 ${
                                                                filter
                                                                        ? " h-auto overflow-auto mb-0"
                                                                        : " h-0 overflow-hidden mb-6 md:h-auto md:overflow-auto md:mb-0"
                                                        }`}
                                                >
                                                        {/* Price */}
                                                        <div className="py-2 flex flex-col gap-5 px-2">
                                                                <h2 className="text-3xl font-bold mb-3 text-slate-600  ">
                                                                        Price
                                                                </h2>
                                                                <Range
                                                                        step={5}
                                                                        min={priceRange.low}
                                                                        max={priceRange.high}
                                                                        values={state.values}
                                                                        onChange={(values) => setState({ values })}
                                                                        renderTrack={({ props, children }) => (
                                                                                <div
                                                                                        {...props}
                                                                                        className="w-full h-[6px] bg-slate-200 rounded-full cursor-pointer "
                                                                                >
                                                                                        {children}
                                                                                </div>
                                                                        )}
                                                                        renderThumb={({ props }) => {
                                                                                const { key, ...rest } = props;
                                                                                return (
                                                                                        <div
                                                                                                key={key}
                                                                                                {...rest}
                                                                                                className="w-[15px] h-[15px] bg-[#059473] rounded-full"
                                                                                        />
                                                                                );
                                                                        }}
                                                                />
                                                        </div>
                                                        <span className="text-slate-800 font-bold text-lg">
                                                                ${Math.floor(state.values[0])} - $
                                                                {Math.floor(state.values[1])}
                                                        </span>

                                                        {/* Ratings */}
                                                        <div className="py-3 flex flex-col gap-4">
                                                                <h2 className="text-3xl font-bold mb-3 text-slate-600">
                                                                        Rating
                                                                </h2>
                                                                <div className="flex flex-col gap-3">
                                                                        {/* 5 star*/}
                                                                        <div
                                                                                onClick={() => {
                                                                                        setRating(5);
                                                                                }}
                                                                                className="text-orange-500 flex justify-start items-center gap-2 text-xl cursor-pointer"
                                                                        >
                                                                                <span>
                                                                                        <AiFillStar />
                                                                                </span>
                                                                                <span>
                                                                                        <AiFillStar />
                                                                                </span>
                                                                                <span>
                                                                                        <AiFillStar />
                                                                                </span>
                                                                                <span>
                                                                                        <AiFillStar />
                                                                                </span>
                                                                                <span>
                                                                                        <AiFillStar />
                                                                                </span>
                                                                        </div>

                                                                        {/* 4 star*/}
                                                                        <div
                                                                                onClick={() => {
                                                                                        setRating(4);
                                                                                }}
                                                                                className="text-orange-500 flex justify-start items-center gap-2 text-xl cursor-pointer"
                                                                        >
                                                                                <span>
                                                                                        <AiFillStar />
                                                                                </span>
                                                                                <span>
                                                                                        <AiFillStar />
                                                                                </span>
                                                                                <span>
                                                                                        <AiFillStar />
                                                                                </span>
                                                                                <span>
                                                                                        <AiFillStar />
                                                                                </span>
                                                                                <span>
                                                                                        <CiStar />
                                                                                </span>
                                                                        </div>

                                                                        {/* 3 star */}
                                                                        <div
                                                                                onClick={() => {
                                                                                        setRating(3);
                                                                                }}
                                                                                className="text-orange-500 flex justify-start items-center gap-2 text-xl cursor-pointer"
                                                                        >
                                                                                <span>
                                                                                        <AiFillStar />
                                                                                </span>
                                                                                <span>
                                                                                        <AiFillStar />
                                                                                </span>
                                                                                <span>
                                                                                        <AiFillStar />
                                                                                </span>
                                                                                <span>
                                                                                        <CiStar />
                                                                                </span>
                                                                                <span>
                                                                                        <CiStar />
                                                                                </span>
                                                                        </div>

                                                                        {/* 2 star */}
                                                                        <div
                                                                                onClick={() => {
                                                                                        setRating(2);
                                                                                }}
                                                                                className="text-orange-500 flex justify-start items-center gap-2 text-xl cursor-pointer"
                                                                        >
                                                                                <span>
                                                                                        <AiFillStar />
                                                                                </span>
                                                                                <span>
                                                                                        <AiFillStar />
                                                                                </span>
                                                                                <span>
                                                                                        <CiStar />
                                                                                </span>
                                                                                <span>
                                                                                        <CiStar />
                                                                                </span>
                                                                                <span>
                                                                                        <CiStar />
                                                                                </span>
                                                                        </div>

                                                                        {/* 1 star */}
                                                                        <div
                                                                                onClick={() => {
                                                                                        setRating(1);
                                                                                }}
                                                                                className="text-orange-500 flex justify-start items-center gap-2 text-xl cursor-pointer"
                                                                        >
                                                                                <span>
                                                                                        <AiFillStar />
                                                                                </span>
                                                                                <span>
                                                                                        <CiStar />
                                                                                </span>
                                                                                <span>
                                                                                        <CiStar />
                                                                                </span>
                                                                                <span>
                                                                                        <CiStar />
                                                                                </span>
                                                                                <span>
                                                                                        <CiStar />
                                                                                </span>
                                                                        </div>

                                                                        {/* 0 star */}
                                                                        <div
                                                                                onClick={() => {
                                                                                        setRating(0);
                                                                                }}
                                                                                className="text-orange-500 flex justify-start items-center gap-2 text-xl cursor-pointer"
                                                                        >
                                                                                <span>
                                                                                        <CiStar />
                                                                                </span>
                                                                                <span>
                                                                                        <CiStar />
                                                                                </span>
                                                                                <span>
                                                                                        <CiStar />
                                                                                </span>
                                                                                <span>
                                                                                        <CiStar />
                                                                                </span>
                                                                                <span>
                                                                                        <CiStar />
                                                                                </span>
                                                                        </div>

                                                                        <button
                                                                                onClick={() => {
                                                                                        setRating("");
                                                                                        setSortBy("");
                                                                                        setState({
                                                                                                values: [
                                                                                                        priceRange.low,
                                                                                                        priceRange.high,
                                                                                                ],
                                                                                        });
                                                                                }}
                                                                                className="px-8 py-2 bg-[#059473] text-white text-md font-bold rounded-md hover:bg-[#059473]/80 transition-all duration-300 cursor-pointer"
                                                                        >
                                                                                Reset filter
                                                                        </button>
                                                                </div>
                                                        </div>

                                                        {/* Lated Products */}
                                                        <div className="py-5  flex-col gap-4 hidden md:flex">
                                                                <Products
                                                                        title={"Latest Product"}
                                                                        products={latestProduct}
                                                                />
                                                        </div>
                                                </div>

                                                {/* Product  */}
                                                <div className="w-full md:w-8/12 md-lg:w-9/12 ">
                                                        <div className="pl-0 md:pl-8 ">
                                                                {/* Top */}
                                                                <div className="py-4 bg-white mb-10 px-3 rounded-md flex justify-between items-start border-[1px] border-slate-300">
                                                                        <h2 className="text-lg font-medium text-slate-600">
                                                                                {totalProducts} Products
                                                                        </h2>
                                                                        <div className="flex justify-center items-center gap-3">
                                                                                <select
                                                                                        className="p-1 border outline-none text-lg text-slate-600 font-semibold"
                                                                                        name=""
                                                                                        id=""
                                                                                        value={sortBy}
                                                                                        onChange={(e) =>
                                                                                                setSortBy(
                                                                                                        e.target.value
                                                                                                )
                                                                                        }
                                                                                >
                                                                                        <option value="">
                                                                                                Sort By
                                                                                        </option>
                                                                                        <option value="low-to-high">
                                                                                                Low to High Price
                                                                                        </option>
                                                                                        <option value="high-to-low">
                                                                                                High to Low Price
                                                                                        </option>
                                                                                </select>
                                                                                <div className="justify-center items-center hidden md-lg:flex gap-4">
                                                                                        <div
                                                                                                onClick={() =>
                                                                                                        setStyle("grid")
                                                                                                }
                                                                                                className={`p-2 ${
                                                                                                        style == "grid"
                                                                                                                ? "bg-slate-300"
                                                                                                                : ""
                                                                                                } text-slate-600 hover:bg-slate-300 transition-all duration-300 cursor-pointer rounded-sm`}
                                                                                        >
                                                                                                <BsFillGridFill />
                                                                                        </div>

                                                                                        <div
                                                                                                onClick={() =>
                                                                                                        setStyle("list")
                                                                                                }
                                                                                                className={`p-2 ${
                                                                                                        style == "list"
                                                                                                                ? "bg-slate-300"
                                                                                                                : ""
                                                                                                } text-slate-600 hover:bg-slate-300 transition-all duration-300 cursor-pointer rounded-sm`}
                                                                                        >
                                                                                                <FaThList />
                                                                                        </div>
                                                                                </div>
                                                                        </div>
                                                                </div>

                                                                {/* Product show  */}
                                                                <div className="pb-8">
                                                                        <ShopProduct
                                                                                style={style}
                                                                                products={products}
                                                                        />
                                                                </div>

                                                                {/* Pagination */}
                                                                <div>
                                                                        {totalProducts > perPage && (
                                                                                <Pagination
                                                                                        pageNumber={currentPage}
                                                                                        setPageNumber={setCurrentPage}
                                                                                        totalItem={totalProducts}
                                                                                        perPage={perPage}
                                                                                        showPage={Math.ceil(
                                                                                                totalProducts / perPage
                                                                                        )}
                                                                                />
                                                                        )}
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </section>
                </div>
        );
};

export default CategoryShop;
