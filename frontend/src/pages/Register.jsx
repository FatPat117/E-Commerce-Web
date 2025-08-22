import React, { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const Register = () => {
        const [hidePassword, setHidePassword] = useState(true);
        const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
        return (
                <div className="bg-slate-200 mt-4">
                        <div className="w-full flex justify-center items-center p-10">
                                <div className="grid grid-cols-2 w-[60%] mx-auto bg-white rounded-sm">
                                        <div className="p-8">
                                                <h2 className="text-center w-full text-xl text-slate-600 font-bold">
                                                        Register
                                                </h2>
                                        </div>

                                        {/* Form */}
                                        <div>
                                                <form action="" className="text-slate-600">
                                                        {/* Name */}
                                                        <div className="flex flex-col gap-2 mb-2">
                                                                <label htmlFor="name">Name</label>
                                                                <input
                                                                        type="text"
                                                                        name="name"
                                                                        id="name"
                                                                        placeholder="Name..."
                                                                        required
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
                                                                        className="w-full px-3 py-2 border border-slate-300 outline-none focus:border-green-500 rounded-md"
                                                                />
                                                        </div>

                                                        {/* Password */}
                                                        <div className="flex flex-col gap-2 mb-2 relative">
                                                                <label htmlFor="password">Password </label>
                                                                <input
                                                                        type={hidePassword ? "password" : "text"}
                                                                        name="password"
                                                                        id="password"
                                                                        placeholder="Password..."
                                                                        required
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

                                                        <button className="px-8 py-2 w-full bg-[#059473] rounded-md shadow-md hover:shadow-green-500/50 transition-all duration-500 text-shadow-fuchsia-50te">
                                                                Register
                                                        </button>
                                                </form>
                                        </div>
                                </div>
                        </div>
                </div>
        );
};

export default Register;
