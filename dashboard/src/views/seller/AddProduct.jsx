import React, { useState } from "react";
import { Link } from "react-router-dom";

const AddProduct = () => {
        const [state, setState] = useState({
                name: "",
                description: "",
                discount: "",
                price: "",
                brand: "",
                stock: "",
        });

        const inputHandle = (e) => {
                setState({ ...state, [e.target.name]: e.target.value });
        };

        return (
                <div className="px-2 lg:px-7 pt-5">
                        <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
                                {/* First Part: Add Product */}
                                <div className="flex justify-between items-center pb-4">
                                        <h1 className="text-[#d0d2d6] text-xl font-bold">Add Product</h1>
                                        <Link className="bg-blue-500 hover:shadow-blue-500 hover:shadow-sm hover:bg-blue-400/60 transition-all duration-300 text-white px-4 py-2 my-2 rounded-md">
                                                All Product
                                        </Link>
                                </div>

                                {/* Second Part: Add Product Form */}
                                <div>
                                        <form action="">
                                                <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
                                                        {/* Left */}
                                                        <div className="flex flex-col w-full gap-1">
                                                                <label htmlFor="name">Product Name</label>
                                                                <input
                                                                        type="text"
                                                                        id="name"
                                                                        name="name"
                                                                        placeholder="Product Name"
                                                                        value={state.name}
                                                                        onChange={inputHandle}
                                                                        className="px-4 py-2 focus:outline-none focus:border-indigo-500 focus:bg-slate-900/50 border-slate-900 border-2 rounded-md text-[#d0d2d6] overflow-hidden outline-none"
                                                                />
                                                        </div>

                                                        {/* Right */}
                                                        <div className="flex flex-col w-full gap-1"></div>
                                                </div>
                                        </form>
                                </div>
                        </div>
                </div>
        );
};

export default AddProduct;
