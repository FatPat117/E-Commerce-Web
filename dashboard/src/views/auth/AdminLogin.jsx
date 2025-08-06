import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { PropagateLoader } from "react-spinners";
import { admin_login } from "../../store/Reducers/authReducer";

const AdminLogin = () => {
        const dispatch = useDispatch();
        const { loader } = useSelector((state) => state.auth);

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

                dispatch(admin_login(state));
        };

        const togglePassword = () => {
                setHiddenPassword(!hiddenPassword);
        };

        const overrideStyle = {
                display: "flex",
                margin: "0 auto",
                height: "24px",
                justifyContent: "center",
                alignItems: "center",
        };
        return (
                <div className="min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center ">
                        <div className="w-[430px] text-white p-2 py-10 relative">
                                <div className="bg-[#6f68d1] p-5 rounded-md h-full">
                                        <h2 className="text-xl md:text:2xl mb-3 font-bold">Welcome to</h2>

                                        <div className="h-[70px] flex justify-center items-center p-2">
                                                <div className="w-[250px] h-[100px]">
                                                        <img
                                                                src="/images/logo.png"
                                                                alt="Logo Image"
                                                                className="w-full h-full"
                                                        />
                                                </div>
                                        </div>

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
                                                        className=" h-[40px] bg-slate-800 w-full cursor-pointer hover:bg-slate-800/50 hover:shadow-blue-300 hover:shadow-md text-white py-2 px-7 mb-1 rounded-md "
                                                        disabled={loader}
                                                >
                                                        {loader ? (
                                                                <PropagateLoader
                                                                        color="#fff"
                                                                        cssOverride={overrideStyle}
                                                                />
                                                        ) : (
                                                                "Log In"
                                                        )}
                                                </button>
                                        </form>
                                </div>
                        </div>
                </div>
        );
};

export default AdminLogin;
