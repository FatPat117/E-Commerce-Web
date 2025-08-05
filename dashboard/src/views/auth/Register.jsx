import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
        return (
                <div className="min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center ">
                        <div className="w-[450px] text-white p-2 py-10 ">
                                <div className="bg-[#6f68d1] px-6 py-7 rounded-md h-full">
                                        <h2 className="text-xl md:text-3xl mb-3 font-bold text-center">
                                                Welcome to Ecommerce
                                        </h2>

                                        <p className="text-md text-center mb-5 font-medium">
                                                Please register your account
                                        </p>

                                        {/* Form */}
                                        <form className="flex flex-col gap-5">
                                                {/* Name */}
                                                <div className="flex flex-col w-full gap-1 ">
                                                        <label htmlFor="name" className="text-md font-medium">
                                                                Name
                                                        </label>
                                                        <input
                                                                type="text"
                                                                id="name"
                                                                name="name"
                                                                placeholder="Enter your name"
                                                                required
                                                                className="w-full px-3 py-2 outline-none rounded-md border border-white/90 bg-transparent "
                                                        />
                                                </div>

                                                {/* Email */}
                                                <div className="flex flex-col w-full gap-1 ">
                                                        <label htmlFor="email" className="text-md font-medium">
                                                                Email
                                                        </label>
                                                        <input
                                                                type="email"
                                                                id="email"
                                                                name="email"
                                                                placeholder="Enter your email"
                                                                required
                                                                className="w-full px-3 py-2 outline-none rounded-md border border-white/90 bg-transparent "
                                                        />
                                                </div>

                                                {/* Password    */}
                                                <div className="flex flex-col w-full gap-1 ">
                                                        <label htmlFor="password" className="text-md font-medium">
                                                                Password
                                                        </label>
                                                        <input
                                                                type="password"
                                                                id="password"
                                                                name="password"
                                                                placeholder="Enter your password"
                                                                required
                                                                className="w-full px-3 py-2 outline-none rounded-md border border-white/90 bg-transparent "
                                                        />
                                                </div>

                                                {/* Checkbox */}
                                                <div className="flex items-center w-full gap-2 mb-2">
                                                        <input
                                                                type="checkbox"
                                                                id="checkbox"
                                                                name="checkbox"
                                                                className="w-4 h-4 text-blue-600 overflow-hidden bg-gray-200 rounded-full border border-gray-300 focus:outline-none focus:ring-blue-500"
                                                        />
                                                        <label htmlFor="checkbox" className="text-md font-medium">
                                                                I agree to the terms and conditions
                                                        </label>
                                                </div>

                                                <button
                                                        type="submit"
                                                        className="bg-slate-800 w-full cursor-pointer hover:bg-slate-800/50 hover:shadow-blue-300 hover:shadow-md text-white py-2 px-7 mb-3 rounded-md "
                                                >
                                                        Sign Up
                                                </button>

                                                <div className="flex items-center mb-3 gap-3 justify-center">
                                                        <p className="text-md font-medium">Already have an account?</p>
                                                        <Link
                                                                to="/login"
                                                                className="text-md font-medium text-red-500 underline"
                                                        >
                                                                Login
                                                        </Link>
                                                </div>
                                        </form>
                                </div>
                        </div>
                </div>
        );
};

export default Register;
