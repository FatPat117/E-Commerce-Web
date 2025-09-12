import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { customer_register, messageClear } from "../store/reducers/authReducer";

const Register = () => {
        const navigate = useNavigate();
        const dispatch = useDispatch();
        const { loader, errorMessage, successMessage, userInfo } = useSelector((state) => state.auth);
        const [state, setState] = useState({
                name: "",
                email: "",
                password: "",
        });
        const [hidePassword, setHidePassword] = useState(true);

        const inputHandle = (e) => {
                setState({ ...state, [e.target.name]: e.target.value });
        };
        const handleRegister = (e) => {
                e.preventDefault();
                dispatch(customer_register(state));
        };
        useEffect(() => {
                if (successMessage) {
                        toast.success(successMessage);
                        dispatch(messageClear());
                }
                if (errorMessage) {
                        toast.error(errorMessage);
                        dispatch(messageClear());
                }
                if (userInfo) {
                        navigate("/");
                }
        }, [successMessage, errorMessage]);

        return (
                <div className="bg-slate-200 mt-4">
                        {loader && (
                                <div className="flex justify-center items-center w-screen h-screen fixed top-0 left-0 bg-[#38303033] z-[9999]">
                                        <FadeLoader color="#059473" />
                                </div>
                        )}
                        <div className="w-full flex justify-center items-center p-10">
                                <div className="grid grid-cols-1 md-lg:grid-cols-2 w-[60%] mx-auto bg-white rounded-sm">
                                        <div className="p-8">
                                                <div className="">
                                                        <h2 className="text-center w-full text-2xl text-slate-600 font-bold">
                                                                Register
                                                        </h2>
                                                </div>

                                                {/* Form */}
                                                <div>
                                                        <form
                                                                onSubmit={handleRegister}
                                                                className="text-slate-600 flex flex-col gap-3"
                                                        >
                                                                {/* Name */}
                                                                <div className="flex flex-col gap-2 mb-2">
                                                                        <label htmlFor="name">Name</label>
                                                                        <input
                                                                                type="text"
                                                                                name="name"
                                                                                id="name"
                                                                                placeholder="Name..."
                                                                                required
                                                                                value={state.name}
                                                                                onChange={inputHandle}
                                                                                className="w-full px-3 py-2 border border-slate-300 outline-none focus:border-green-500 rounded-md"
                                                                        />
                                                                </div>

                                                                {/* Email */}
                                                                <div className="flex flex-col gap-2 mb-2">
                                                                        <label htmlFor="email">Email</label>
                                                                        <input
                                                                                type="email"
                                                                                name="email"
                                                                                id="email"
                                                                                placeholder="Email..."
                                                                                required
                                                                                value={state.email}
                                                                                onChange={inputHandle}
                                                                                className="w-full px-3 py-2 border border-slate-300 outline-none focus:border-green-500 rounded-md"
                                                                        />
                                                                </div>

                                                                {/* Password */}
                                                                <div className="flex flex-col gap-2 mb-2 relative">
                                                                        <label htmlFor="password">Password </label>
                                                                        <input
                                                                                type={
                                                                                        hidePassword
                                                                                                ? "password"
                                                                                                : "text"
                                                                                }
                                                                                name="password"
                                                                                id="password"
                                                                                placeholder="Password..."
                                                                                required
                                                                                value={state.password}
                                                                                onChange={inputHandle}
                                                                                className="w-full px-3 py-2 border border-slate-300 outline-none focus:border-green-500 rounded-md"
                                                                        />
                                                                        <span
                                                                                onClick={() => {
                                                                                        setHidePassword(!hidePassword);
                                                                                }}
                                                                                className="cursor-pointer absolute top-10 right-5 text-slate-500"
                                                                        >
                                                                                {!hidePassword ? (
                                                                                        <MdVisibility className="text-2xl" />
                                                                                ) : (
                                                                                        <MdVisibilityOff className="text-2xl" />
                                                                                )}
                                                                        </span>
                                                                </div>

                                                                <button
                                                                        type="submit"
                                                                        className="mt-5 px-8 py-2 w-full bg-[#059473] rounded-md shadow-md hover:shadow-green-500/50 transition-all duration-500 text-white cursor-pointer"
                                                                >
                                                                        Register
                                                                </button>
                                                        </form>

                                                        <div className="flex justify-center items-center py-2 mt-3">
                                                                <div className="h-[1px] bg-slate-300 w-[90%]"></div>
                                                                <span className="px-3 text-slate-600">Or</span>
                                                                <div className="h-[1px] bg-slate-300 w-[90%]"></div>
                                                        </div>

                                                        {/* Login as Seller */}
                                                        <a
                                                                href="https://dashboard-e-commerce-web-8e26.vercel.app/login"
                                                                target="_blank"
                                                                className="px-8 w-full py-2 bg-cyan-400 shadow-md hover:shadow-cyan-500/50 text-white rounded-md cursor-pointer flex justify-center items-center gap-2 mb-3 md-lg:mt-5 "
                                                        >
                                                                <span>Login As Seller</span>
                                                        </a>

                                                        {/* Register as Seller  */}
                                                        <a
                                                                href={
                                                                        "https://dashboard-e-commerce-web-8e26.vercel.app/register"
                                                                }
                                                                target="_blank"
                                                                className="px-8 w-full py-2 bg-indigo-500 shadow-md hover:shadow-indigo-500 text-white rounded-md cursor-pointer flex justify-center items-center gap-2 mb-3"
                                                        >
                                                                <span>Register as Seller</span>
                                                        </a>
                                                </div>

                                                <div className="text-center text-slate-600 pt-1">
                                                        <p>
                                                                You Already Had Account?{" "}
                                                                <Link to="/login" className="text-blue-500 underline">
                                                                        Login
                                                                </Link>
                                                        </p>
                                                </div>
                                        </div>

                                        <div className="hidden md-lg:block w-full h-full py-4 pr-4">
                                                <img
                                                        src="/images/login.jpg"
                                                        alt="Login Images"
                                                        className="w-full h-full object-cover"
                                                />
                                        </div>
                                </div>
                        </div>
                </div>
        );
};

export default Register;
