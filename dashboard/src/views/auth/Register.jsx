import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash, FaFacebook, FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { messageClear, seller_register } from "../../store/Reducers/authReducer";
import { overrideStyle } from "../../utils/utils";
const Register = () => {
        const { loader, successMessage, errorMessage } = useSelector((state) => state.auth);
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const [hiddenPassword, setHiddenPassword] = useState(true);
        const [state, setState] = useState({
                name: "",
                email: "",
                password: "",
        });

        const inputHandle = (e) => {
                setState({ ...state, [e.target.name]: e.target.value });
        };

        const handleSubmit = (e) => {
                e.preventDefault();
                dispatch(seller_register(state));
        };

        const togglePassword = () => {
                setHiddenPassword(!hiddenPassword);
        };

        useEffect(() => {
                if (successMessage) {
                        toast.success(successMessage);
                        dispatch(messageClear());
                        navigate("/");
                }
                if (errorMessage) {
                        toast.error(errorMessage);
                        dispatch(messageClear());
                }
        }, [successMessage, errorMessage]);
        return (
                <div className="min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center ">
                        <div className="w-[450px] text-white p-2 py-10 relative">
                                <div className="bg-[#6f68d1] p-5 rounded-md h-full">
                                        <h2 className="text-xl md:text-3xl mb-3 font-bold text-center">
                                                Welcome to Ecommerce
                                        </h2>

                                        <p className="text-md text-center mb-5 font-medium">
                                                Please register your account
                                        </p>

                                        {/* Form */}
                                        <form className="flex flex-col gap-x-5 gap-y-4" onSubmit={handleSubmit}>
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
                                                                value={state.name}
                                                                onChange={inputHandle}
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
                                                                value={state.email}
                                                                onChange={inputHandle}
                                                                required
                                                                className="w-full px-3 py-2 outline-none rounded-md border border-white/90 bg-transparent "
                                                        />
                                                </div>

                                                {/* Password    */}
                                                <div className="flex flex-col w-full gap-1 relative     ">
                                                        <label htmlFor="password" className="text-md font-medium">
                                                                Password
                                                        </label>
                                                        <input
                                                                type={hiddenPassword ? "password" : "text"}
                                                                id="password"
                                                                name="password"
                                                                placeholder="Enter your password"
                                                                value={state.password}
                                                                onChange={inputHandle}
                                                                required
                                                                className="w-full px-3 py-2 outline-none rounded-md border border-white/90 bg-transparent "
                                                        />
                                                        <span
                                                                onClick={togglePassword}
                                                                className="absolute top-[50%] right-[3px] translate-x-[-50%] translate-y-[40%] cursor-pointer"
                                                        >
                                                                {hiddenPassword ? <FaEye /> : <FaEyeSlash />}
                                                        </span>
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
                                                        className=" h-[40px] bg-slate-800 w-full cursor-pointer hover:bg-slate-800/50 hover:shadow-blue-300 hover:shadow-md text-white py-2 px-7 mb-1 rounded-md "
                                                        disabled={loader}
                                                >
                                                        {loader ? (
                                                                <PropagateLoader
                                                                        color="#fff"
                                                                        cssOverride={overrideStyle}
                                                                />
                                                        ) : (
                                                                "Sign Up"
                                                        )}
                                                </button>

                                                <div className="flex items-center mb-1 gap-3 justify-center">
                                                        <p className="text-md font-medium">Already have an account?</p>
                                                        <Link
                                                                to="/login"
                                                                className="text-md font-medium text-red-500 underline"
                                                        >
                                                                Login
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

export default Register;
