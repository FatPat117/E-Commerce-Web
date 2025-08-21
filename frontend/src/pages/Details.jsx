import React, { useState } from "react";
import { FaFacebookF, FaGithub, FaHeart, FaInstagram, FaLinkedin } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { Pagination } from "swiper/modules";
import { Swiper } from "swiper/react";
import Rating from "../components/Rating";
import Reviews from "../components/Reviews";
import { URL } from "../utils/utils";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { SwiperSlide } from "swiper/react";
const Details = () => {
        const images = [1, 2, 3, 4, 5, 6];
        const [image, setImage] = useState("");
        const discount = 5;
        const stock = 100;
        const [state, setState] = useState("reviews");
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
                                        <div className="grid grid-cols-1 md-lg:grid-cols-2 gap-6 gap-x-10">
                                                {/* Image and carousel */}
                                                <div className="flex flex-col gap-y-5">
                                                        {/* Image */}
                                                        <div className="p-5 border border-slate-300 flex justify-center items-center">
                                                                <div className="h-full w-full flex justify-center items-center">
                                                                        <img
                                                                                src={
                                                                                        image
                                                                                                ? `/images/products/${image}.webp`
                                                                                                : `/images/products/${images[2]}.webp`
                                                                                }
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
                                                                                                        <div
                                                                                                                key={
                                                                                                                        idx
                                                                                                                }
                                                                                                                onClick={() =>
                                                                                                                        setImage(
                                                                                                                                data
                                                                                                                        )
                                                                                                                }
                                                                                                        >
                                                                                                                <img
                                                                                                                        src={`/images/products/${data}.webp`}
                                                                                                                        alt="Product image"
                                                                                                                        s
                                                                                                                        className="h-[120px] cursor-pointer"
                                                                                                                />
                                                                                                        </div>
                                                                                                );
                                                                                        })}
                                                                                </Carousel>
                                                                        )}
                                                                </div>
                                                        </div>
                                                </div>

                                                {/* Product Info */}
                                                <div className="flex flex-col gap-5">
                                                        {/* Product Name */}
                                                        <div className="text-3xl text-slate-600 font-bold">
                                                                <h3>Product Name</h3>
                                                        </div>

                                                        {/* Rating */}
                                                        <div className="flex justify-start items-center gap-4">
                                                                <div className="flex text-xl">
                                                                        <Rating ratings={4.5} />
                                                                </div>
                                                                <span className="text-green-500">(24 reviews)</span>
                                                        </div>

                                                        {/* Price */}
                                                        <div className="flex justify-start items-center text-2xl text-red-500 font-bold gap-3">
                                                                {discount !== 0 ? (
                                                                        <>
                                                                                <h2 className="line-through">$500</h2>
                                                                                <h2 className="">
                                                                                        $
                                                                                        {500 -
                                                                                                Math.floor(
                                                                                                        (500 *
                                                                                                                discount) /
                                                                                                                100
                                                                                                )}
                                                                                </h2>
                                                                                <h2>(-{discount}%)</h2>
                                                                        </>
                                                                ) : (
                                                                        <>
                                                                                <h2>Price: $600</h2>
                                                                        </>
                                                                )}
                                                        </div>

                                                        {/* Description */}
                                                        <div className="text-slate-600 max-w-[700px]">
                                                                <p>
                                                                        Lorem ipsum dolor sit amet consectetur
                                                                        adipisicing elit. Quis ipsam natus amet, aut
                                                                        voluptas beatae veniam dolorum ex. Odit
                                                                        molestias suscipit impedit ducimus doloribus
                                                                        sint explicabo accusamus laborum. Laboriosam
                                                                        quisquam molestias laudantium ipsa quasi saepe
                                                                        commodi beatae similique delectus, iste ratione
                                                                        illum molestiae repudiandae cupiditate
                                                                        reprehenderit fugit, nisi blanditiis tempore.
                                                                </p>
                                                        </div>

                                                        {/* Action */}
                                                        <div className="flex gap-3 pb-10  border-slate-300 border-b">
                                                                {stock ? (
                                                                        <>
                                                                                <div className="flex bg-slate-200 h-[50px] justify-center items-center text-xl">
                                                                                        <div className="flex justify-center items-center px-6 cursor-pointer">
                                                                                                -
                                                                                        </div>
                                                                                        <div className="flex justify-center items-center px-6 ">
                                                                                                2
                                                                                        </div>
                                                                                        <div className="flex justify-center items-center px-6 cursor-pointer">
                                                                                                +
                                                                                        </div>
                                                                                </div>
                                                                                <div>
                                                                                        <button className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-green-500/40 bg-[#059473] text-white capitalize font-bold">
                                                                                                Add to cart
                                                                                        </button>
                                                                                </div>
                                                                                <div>
                                                                                        <div className="h-[50px] w-[50px] flex justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-cyan-500/40 bg-cyan-500 text-white">
                                                                                                <FaHeart />
                                                                                        </div>
                                                                                </div>
                                                                        </>
                                                                ) : (
                                                                        <>
                                                                                <div>
                                                                                        <div className="h-[50px] w-[50px] flex justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-cyan-500/40 bg-cyan-500 text-white">
                                                                                                <FaHeart />
                                                                                        </div>
                                                                                </div>
                                                                        </>
                                                                )}
                                                        </div>

                                                        {/* Social Links */}
                                                        <div className="flex py-5 gap-5">
                                                                <div className="w-[150px] text-black font-bold text-xl flex flex-col gap-5 ">
                                                                        <span>Availibility</span>
                                                                        <span>Share On</span>
                                                                </div>
                                                                <div className="flex flex-col gap-5">
                                                                        <span
                                                                                className={`text-${
                                                                                        stock ? "green" : "red"
                                                                                }-500 ${stock ? "" : "line-through"}`}
                                                                        >
                                                                                {stock
                                                                                        ? `In Stock (${stock})`
                                                                                        : "Out of Stock"}
                                                                        </span>

                                                                        <ul className="flex justify-start items-center gap-3">
                                                                                <li>
                                                                                        <a
                                                                                                href="#"
                                                                                                className="w-[38px] h-[38px] rounded-full hover:bg-[#059473] hover:text-white flex justify-center items-center bg-indigo-500 text-white transition-all duration-400"
                                                                                        >
                                                                                                <FaFacebookF />
                                                                                        </a>
                                                                                </li>

                                                                                <li>
                                                                                        <a
                                                                                                href="#"
                                                                                                className="w-[38px] h-[38px] rounded-full hover:bg-[#059473] hover:text-white flex justify-center items-center bg-pink-300 text-white transition-all duration-400"
                                                                                        >
                                                                                                <FaInstagram />
                                                                                        </a>
                                                                                </li>

                                                                                <li>
                                                                                        <a
                                                                                                href="#"
                                                                                                className="w-[38px] h-[38px] rounded-full hover:bg-[#059473] hover:text-white flex justify-center items-center bg-blue-600 text-white transition-all duration-400"
                                                                                        >
                                                                                                <FaLinkedin />
                                                                                        </a>
                                                                                </li>

                                                                                <li>
                                                                                        <a
                                                                                                href="#"
                                                                                                className="w-[38px] h-[38px] rounded-full hover:bg-[#059473] hover:text-white flex justify-center items-center bg-black text-white transition-all duration-400"
                                                                                        >
                                                                                                <FaGithub />
                                                                                        </a>
                                                                                </li>
                                                                        </ul>
                                                                </div>
                                                        </div>

                                                        {/* Actions*/}
                                                        <div className="flex justify-start items-center gap-3">
                                                                {stock ? (
                                                                        <button className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-green-500/40 bg-[#059473] text-white capitalize font-bold">
                                                                                Buy now
                                                                        </button>
                                                                ) : null}
                                                                <Link
                                                                        to="#"
                                                                        className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-red-500/40 bg-red-500 text-white capitalize font-bold"
                                                                >
                                                                        Chat Seller
                                                                </Link>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </section>

                        {/*Reviews and Description* */}
                        <section>
                                <div className="w-[85%] md-lg:w-[90%] mx-auto h-full pb-16">
                                        <div className="flex flex-wrap">
                                                {/*Reviews and Description*/}
                                                <div className="md-lg:w-[72%] w-full mt-5 md-lg:p-0">
                                                        <div className="pr-0 md-lg:pr-4">
                                                                {/* Button */}
                                                                <div className="grid grid-cols-2 gap-y-2">
                                                                        <button
                                                                                className={`py-2 md-lg:text-lg text-md hover:text-white px-5 hover:bg-[#059473] ${
                                                                                        state === "reviews"
                                                                                                ? "bg-[#059473] text-white"
                                                                                                : "bg-slate-200 text-slate-700"
                                                                                } cursor-pointer rounded-sm`}
                                                                                onClick={() => {
                                                                                        setState("reviews");
                                                                                }}
                                                                        >
                                                                                Reviews
                                                                        </button>
                                                                        <button
                                                                                className={`py-2 md-lg:text-lg text-md hover:text-white px-5 hover:bg-[#059473] ${
                                                                                        state === "description"
                                                                                                ? "bg-[#059473] text-white"
                                                                                                : "bg-slate-200 text-slate-700"
                                                                                } cursor-pointer rounded-sm`}
                                                                                onClick={() => setState("description")}
                                                                        >
                                                                                Description
                                                                        </button>
                                                                </div>

                                                                <div>
                                                                        {state === "reviews" ? (
                                                                                <Reviews />
                                                                        ) : (
                                                                                <p className="py-5 text-slate-500">
                                                                                        Lorem ipsum dolor sit amet
                                                                                        consectetur adipisicing elit.
                                                                                        Neque, repellat tempore fugit
                                                                                        unde asperiores numquam dicta
                                                                                        facilis repellendus possimus
                                                                                        quidem provident voluptate amet
                                                                                        quaerat officia. Placeat
                                                                                        doloremque nesciunt
                                                                                        reprehenderit maxime quam
                                                                                        dignissimos dolor nobis sed
                                                                                        repellendus in, animi dicta
                                                                                        autem doloribus facilis
                                                                                        asperiores non! Quas et eum sit
                                                                                        architecto, expedita
                                                                                        exercitationem optio obcaecati
                                                                                        incidunt illum laudantium,
                                                                                        repellat aut quod facilis
                                                                                        praesentium. Nobis iure,
                                                                                        possimus qui, corrupti eum
                                                                                        doloremque accusamus earum
                                                                                        voluptatum natus, voluptate
                                                                                        consectetur porro et odio id
                                                                                        atque. Maiores!
                                                                                </p>
                                                                        )}
                                                                </div>
                                                        </div>
                                                </div>

                                                {/* Related products */}
                                                <div className="w-full md-lg:w-[28%] md-lg:mt-5">
                                                        <div className="pl-0 md-lg:pl-4 ">
                                                                <div className="px-3 py-2 text-slate-600 bg-slate-200">
                                                                        <h2 className="font-bold text-center">
                                                                                From Easy Shop
                                                                        </h2>
                                                                </div>
                                                                <div className="flex flex-col gap-5 mt-3 p-3">
                                                                        {[1, 2, 3].map((data, idx) => {
                                                                                return (
                                                                                        <Link
                                                                                                key={idx}
                                                                                                className="block border border-slate-300 p-3"
                                                                                        >
                                                                                                <div className="relative h-[270px]">
                                                                                                        <img
                                                                                                                src={`/images/products/${data}.webp`}
                                                                                                                alt="Product image"
                                                                                                                className="w-full h-full object-contain"
                                                                                                        />
                                                                                                        {discount !==
                                                                                                                0 && (
                                                                                                                <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
                                                                                                                        {
                                                                                                                                discount
                                                                                                                        }

                                                                                                                        %
                                                                                                                </div>
                                                                                                        )}
                                                                                                </div>

                                                                                                <h2 className="text-slate-600 py-1 font-bold">
                                                                                                        Product Name:
                                                                                                        Pitachi
                                                                                                </h2>
                                                                                                <div className="flex gap-2 ">
                                                                                                        <h2 className="text-lg font-bold text-blue-500">
                                                                                                                $450
                                                                                                        </h2>
                                                                                                        <div className="flex items-center gap-2">
                                                                                                                <Rating
                                                                                                                        ratings={
                                                                                                                                4.5
                                                                                                                        }
                                                                                                                />
                                                                                                        </div>
                                                                                                </div>
                                                                                        </Link>
                                                                                );
                                                                        })}
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </section>

                        {/* Related Product */}
                        <section>
                                <div className="w-[85%] md-lg:w-[90%] mx-auto h-full ">
                                        <h2 className="text-2xl py-8 text-slate-600 font-semibold">Related Products</h2>
                                        {/* Swiper */}
                                        <div>
                                                <Swiper
                                                        slidesPerView="auto"
                                                        breakpoints={{
                                                                565: { slidesPerView: 2 },
                                                                1280: { slidesPerView: 3 },
                                                        }}
                                                        spaceBetween={25}
                                                        loop={true}
                                                        pagination={{
                                                                clickable: true,
                                                        }}
                                                        modules={[Pagination]}
                                                        className="mySwiper"
                                                >
                                                        {[1, 2, 3, 4, 5, 6].map((data, idx) => (
                                                                <SwiperSlide key={idx}>
                                                                        <Link className="block">
                                                                                <div className="relative h-[270px]">
                                                                                        <div className="w-full h-full">
                                                                                                <img
                                                                                                        src={`/images/products/${data}.webp`}
                                                                                                        alt="Product-img"
                                                                                                        className="object-contain w-full h-full"
                                                                                                />
                                                                                                <div className="absolute inset-0 bg-black/25 hover:bg-black/50 transition-all duration-500 z-10" />
                                                                                        </div>
                                                                                        {discount !== 0 && (
                                                                                                <div className="absolute left-2 top-2 flex items-center justify-center w-[38px] h-[38px] rounded-full bg-red-500 text-white text-xs font-semibold">
                                                                                                        {discount}%
                                                                                                </div>
                                                                                        )}
                                                                                </div>
                                                                                <div className="p-4 flex flex-col gap-1 relative mb-5">
                                                                                        <h2 className="text-slate-600 py-1 font-bold">
                                                                                                Product Name: Pitachi
                                                                                        </h2>
                                                                                        <div className="flex gap-2 ">
                                                                                                <h2 className="text-lg font-bold text-blue-500">
                                                                                                        $450
                                                                                                </h2>
                                                                                                <div className="flex items-center gap-2">
                                                                                                        <Rating
                                                                                                                ratings={
                                                                                                                        4.5
                                                                                                                }
                                                                                                        />
                                                                                                </div>
                                                                                        </div>
                                                                                </div>
                                                                        </Link>
                                                                </SwiperSlide>
                                                        ))}
                                                </Swiper>
                                        </div>
                                </div>
                        </section>
                </div>
        );
};

export default Details;
