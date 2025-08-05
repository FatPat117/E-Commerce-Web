import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaFacebook, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
        const [hiddenPassword, setHiddenPassword] = useState(true);
        const [state, setState] = useState({
                email: "",
                password: "",
        });

        const inputHandle = (e) => {
                setState({ ...state, [e.target.name]: e.target.value });
        };

        const handleSubmit = (e) => {
                e.preventDefault();
                console.log(state);
        };

        const togglePassword = () => {
                setHiddenPassword(!hiddenPassword);
        };
        return (
                <div className="min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center ">
                        <div className="w-[430px] text-white p-2 py-10 relative">
                                <div className="bg-[#6f68d1] p-5 rounded-md h-full">
                                        <h2 className="text-xl md:text-3xl mb-3 font-bold text-center">
                                                Welcome to Ecommerce
                                        </h2>

                                        <p className="text-md text-center mb-5 font-medium">Sign in to Your Account</p>

                                        {/* Form */}
                                        <form className="flex flex-col gap-x-5 gap-y-4" onSubmit={handleSubmit}>
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
                                                                value={state.email}
                                                                onChange={inputHandle}
                                                                className="w-full px-3 py-2 outline-none rounded-md border border-white/90 bg-transparent "
                                                        />
                                                </div>

                                                {/* Password    */}
                                                <div className="flex flex-col w-full gap-1 relative">
                                                        <label htmlFor="password" className="text-md font-medium">
                                                                Password
                                                        </label>
                                                        <input
                                                                type={hiddenPassword ? "password" : "text"}
                                                                id="password"
                                                                name="password"
                                                                placeholder="Enter your password"
                                                                required
                                                                value={state.password}
                                                                onChange={inputHandle}
                                                                className="w-full px-3 py-2 outline-none rounded-md border border-white/90 bg-transparent "
                                                        />
                                                        <span
                                                                onClick={togglePassword}
                                                                className="absolute top-[50%] right-[3px] translate-x-[-50%] translate-y-[40%] cursor-pointer"
                                                        >
                                                                {hiddenPassword ? <FaEye /> : <FaEyeSlash />}
                                                        </span>
                                                </div>

                                                <button
                                                        type="submit"
                                                        className="bg-slate-800 w-full cursor-pointer hover:bg-slate-800/50 hover:shadow-blue-300 hover:shadow-md text-white py-2 px-7 mb-1 rounded-md "
                                                >
                                                        Sign In
                                                </button>

                                                <div className="flex items-center mb-1 gap-3 justify-center">
                                                        <p className="text-md font-medium">Don't have an account?</p>
                                                        <Link
                                                                to="/register"
                                                                className="text-md font-medium text-red-500 underline"
                                                        >
                                                                Sign Up
                                                        </Link>
                                                </div>

                                                <div className="w-full flex items-center justify-center mb-1">
                                                        <div className="w-[45%] h-[1px] bg-white/90 flex items-center justify-center"></div>
                                                        <div className="w-[10%] flex justify-center items-center">
                                                                <span className="pb-1">Or</span>
                                                        </div>
                                                        <div className="w-[45%] bg-white/90 h-[1px]"></div>
                                                </div>

                                                <div className="flex justify-center items-center gap-5">
                                                        <div className="w-[135px] h-[40px] flex rounded-md bg-orange-600 shadow-lg hover:shadow-orange-600/70 justify-center cursor-pointer items-center overflow-hidden">
                                                                <span>
                                                                        {" "}
                                                                        <FaGoogle />
                                                                </span>
                                                        </div>

                                                        <div className="w-[135px] h-[45px] flex rounded-md bg-blue-600 shadow-lg hover:shadow-blue-600/70 justify-center cursor-pointer items-center overflow-hidden">
                                                                <span>
                                                                        {" "}
                                                                        <FaFacebook />
                                                                </span>
                                                        </div>
                                                </div>
                                        </form>
                                </div>
                        </div>
                </div>
        );
};

export default Login;
