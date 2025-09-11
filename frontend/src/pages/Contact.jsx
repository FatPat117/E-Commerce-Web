import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { URL } from "../utils/utils";
const Contact = () => {
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
                                                        <h2 className="text-3xl font-bold">Contact Page</h2>
                                                        <div className="flex justify-center items-center gap-2 text-2xl w-full lg:mt-2">
                                                                <Link to="/">Home</Link>
                                                                <span className="mt-1">
                                                                        <IoIosArrowForward />
                                                                </span>
                                                                <span className="underline text-blue-300">Contact</span>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </section>

                        <section className="py-16">
                                <div className="w-[80%] md-lg:w-[85%] lg:w-[90%] h-full mx-auto flex justify-center items-center gap-2 text-5xl font-bold">
                                        The Page is Not Working Yet . Return Back To
                                        <Link to="/" className="text-blue-500">
                                                Home Page
                                        </Link>
                                </div>
                        </section>
                </div>
        );
};

export default Contact;
