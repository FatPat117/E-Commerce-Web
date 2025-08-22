import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
const Products = ({ title, products }) => {
        const responsive = {
                superLargeDesktop: {
                        breakpoint: { max: 4000, min: 3000 },
                        items: 1,
                },
                desktop: {
                        breakpoint: { max: 3000, min: 1024 },
                        items: 1,
                },
                tablet: {
                        breakpoint: { max: 1024, min: 464 },
                        items: 1,
                },
                mobile: {
                        breakpoint: { max: 464, min: 0 },
                        items: 1,
                },
        };

        const ButtonGroup = ({ next, previous }) => {
                return (
                        <div className="absolute top-0 left-0 w-full flex  items-center px-2 gap-5">
                                <div className="text-xl font-bold text-slate-600">{title}</div>
                                <div className="flex gap-3 text-slate-600">
                                        <button onClick={previous} className="p-1 bg-slate-300 rounded">
                                                <IoIosArrowBack />
                                        </button>
                                        <button onClick={next} className="p-1 bg-slate-300 rounded">
                                                <IoIosArrowForward />
                                        </button>
                                </div>
                        </div>
                );
        };
        return (
                <div className="w-full flex flex-col relative">
                        <Carousel
                                autoPlay={false}
                                infinite={false}
                                arrows={false}
                                showDots={false}
                                responsive={responsive}
                                transitionDuration={500}
                                renderButtonGroupOutside={true}
                                customButtonGroup={<ButtonGroup />}
                                containerClass="pt-14"
                        >
                                {products?.map((pro, idx) => {
                                        return (
                                                <div key={idx} className="flex flex-col justify-start gap-2">
                                                        {pro.map((item, idx) => {
                                                                return (
                                                                        <Link
                                                                                key={idx}
                                                                                to="#"
                                                                                className="flex justify-start items-start"
                                                                        >
                                                                                <img
                                                                                        src={item?.images[0]}
                                                                                        alt="Product Images"
                                                                                        className="w-[110px] h-[110px] "
                                                                                />
                                                                                <div className="px-3 flex justify-start items-start gap-1 flex-col text-slate-600 ">
                                                                                        <h2>{item?.name}</h2>
                                                                                        <span className="text-lg font-bold">
                                                                                                ${item?.price}
                                                                                        </span>
                                                                                </div>
                                                                        </Link>
                                                                );
                                                        })}
                                                </div>
                                        );
                                })}
                        </Carousel>
                </div>
        );
};

export default Products;
