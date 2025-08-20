import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { URL } from "../utils/utils";
const Details = () => {
        const images = [1, 2, 3, 4, 5, 6];
        const responsive = {
                superLargeDesktop: {
                        breakpoint: { max: 4000, min: 3000 },
                        items: 6,
                },
                desktop: {
                        breakpoint: { max: 3000, min: 1024 },
                        items: 5,
                },
                tablet: {
                        breakpoint: { max: 1024, min: 464 },
                        items: 4,
                },
                mdTablet: {
                        breakpoint: { max: 991, min: 464 },
                        items: 4,
                },
                mobile: {
                        breakpoint: { max: 464, min: 0 },
                        items: 2,
                },
        };
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
                                                        <h2 className="text-3xl font-bold">Product Details</h2>
                                                        <div className="flex justify-center items-center gap-2 text-2xl w-full lg:mt-2">
                                                                <Link to="/">Home</Link>
                                                                <span className="mt-1">
                                                                        <IoIosArrowForward />
                                                                </span>
                                                                <span className="underline text-blue-300">
                                                                        Product Details
                                                                </span>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </section>

                        {/* Breadcumbs */}
                        <section>
                                <div className="bg-slate-100 py-5 mb-5">
                                        <div className="w-[85%] md-lg:w-[90%] mx-auto h-full">
                                                <div className="flex justify-start items-center text-md text-slate-600 w-full gap-x-2">
                                                        <Link to="/">Home</Link>
                                                        <span className="pt-[3px]">
                                                                <IoIosArrowForward />
                                                        </span>
                                                        <Link to="/">Category</Link>
                                                        <span className="pt-[3px]">
                                                                {" "}
                                                                <IoIosArrowForward />
                                                        </span>
                                                        <span className="underline text-blue-500">Product Name</span>
                                                </div>
                                        </div>
                                </div>
                        </section>

                        {/* Product details */}
                        <section>
                                <div className="w-[85%] md-lg:w-[90%] mx-auto h-full">
                                        <div className="grid grid-cols-1 md-lg:grid-cols-2 gap-6">
                                                <div className="flex flex-col gap-y-5">
                                                        {/* Image */}
                                                        <div className="p-5 border border-slate-300 flex justify-center items-center">
                                                                <div className="h-full w-full flex justify-center items-center">
                                                                        <img
                                                                                src="/images/products/1.webp"
                                                                                alt="product"
                                                                                className="h-[450px] w-[50%]"
                                                                        />
                                                                </div>
                                                        </div>
                                                        <div className="w-full h-full border border-slate-300">
                                                                <div className="py-3">
                                                                        {images && (
                                                                                <Carousel
                                                                                        autoPlay={true}
                                                                                        infinite={true}
                                                                                        arrows={true}
                                                                                        responsive={responsive}
                                                                                        transitionDuration={500}
                                                                                >
                                                                                        {images.map((data, idx) => {
                                                                                                return (
                                                                                                        <img
                                                                                                                src={`/images/products/${data}.webp`}
                                                                                                                alt="Product image"
                                                                                                                key={
                                                                                                                        idx
                                                                                                                }
                                                                                                                className="h-[120px] cursor-pointer"
                                                                                                        />
                                                                                                );
                                                                                        })}
                                                                                </Carousel>
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

export default Details;
