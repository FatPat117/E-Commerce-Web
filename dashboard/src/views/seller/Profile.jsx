import React, { useState } from "react";
import { FaEdit, FaEye, FaEyeSlash, FaImage } from "react-icons/fa";
import { FadeLoader } from "react-spinners";
const Profile = () => {
        const [hideOldPassword, setHideOldPassword] = useState(true);
        const [hideNewPassword, setHideNewPassword] = useState(true);

        const image = true;
        const loader = false;
        const status = "";
        const userInfo = true;
        const toggleOldPassword = () => {
                setHideOldPassword(!hideOldPassword);
        };

        const toggleNewPassword = () => {
                setHideNewPassword(!hideNewPassword);
        };

        return (
                <div className="px-2 lg:px-7 pt-5">
                        <div className="w-full flex flex-wrap">
                                {/* Left Side */}
                                <div className="w-full md:w-6/12">
                                        <div className="w-full p-4 bg-[#6a5fdf] rounded-md text-[#d0d2d6]">
                                                <div className="flex justify-center items-center py-3">
                                                        {image ? (
                                                                <label
                                                                        htmlFor="img"
                                                                        className="h-[200px] w-[250px] relative p-3 cursor-pointer overflow-hidden"
                                                                >
                                                                        <img src="/images/admin.jpg" alt="avatar" />
                                                                        {loader && (
                                                                                <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                                                                                        <span>
                                                                                                <FadeLoader />
                                                                                        </span>
                                                                                </div>
                                                                        )}
                                                                </label>
                                                        ) : (
                                                                <label
                                                                        className="flex justify-center items-center flex-col h-[200px] w-[250px] cursor-pointer border border-dashed hover:border-red-500 border-white relative gap-y-1"
                                                                        htmlFor="img"
                                                                >
                                                                        <span>
                                                                                <FaImage />
                                                                        </span>
                                                                        <span>Select Image</span>
                                                                        {loader && (
                                                                                <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                                                                                        <span>
                                                                                                <FadeLoader />
                                                                                        </span>
                                                                                </div>
                                                                        )}
                                                                </label>
                                                        )}
                                                        <input type="file" className="hidden" id="img" />
                                                </div>

                                                {/* User profile */}
                                                <div className="px-0 md:px-5 py-2">
                                                        <div className="flex justify-between text-sm md:text-md flex-col gap-3 px-4 py-3 bg-slate-700 rounded-md relative">
                                                                <span className="self-end p-[6px] bg-yellow-600 rounded-md hover:shadow-md hover:shadow-yellow-600/50 cursor-pointer absolute top-2 right-2">
                                                                        <FaEdit />
                                                                </span>
                                                                <div className="flex gap-2">
                                                                        <span className="font-bold text-md">
                                                                                Name:{" "}
                                                                        </span>
                                                                        <span>Pitachiti</span>
                                                                </div>
                                                                <div className="flex gap-2">
                                                                        <span className="font-bold text-md">
                                                                                Email:{" "}
                                                                        </span>
                                                                        <span>Pitachiti@gmail.com</span>
                                                                </div>
                                                                <div className="flex gap-2">
                                                                        <span className="font-bold text-md">
                                                                                Role:{" "}
                                                                        </span>
                                                                        <span>Seller</span>
                                                                </div>
                                                                <div className="flex gap-2">
                                                                        <span className="font-bold text-md">
                                                                                Status:{" "}
                                                                        </span>
                                                                        <span>Active</span>
                                                                </div>
                                                                <div className="flex gap-2">
                                                                        <span className="font-bold text-md">
                                                                                Payment Account:{" "}
                                                                        </span>
                                                                        <p>
                                                                                {status === "active" ? (
                                                                                        <span className="bg-green-500 text-white px-2 py-1 rounded-lg font-normal ml-2">
                                                                                                Pending
                                                                                        </span>
                                                                                ) : (
                                                                                        <span className="bg-red-500 text-white px-2 py-1 rounded-lg cursor-pointer">
                                                                                                Click activate
                                                                                        </span>
                                                                                )}
                                                                        </p>
                                                                </div>
                                                        </div>
                                                </div>

                                                {/* Edit Form */}
                                                <div className="px-0 md:px-5 py-2">
                                                        {!userInfo ? (
                                                                <form>
                                                                        {/* Shop Name */}
                                                                        <div className="flex flex-col w-full gap-1 mb-2">
                                                                                <label htmlFor="shopName">
                                                                                        Shop Name
                                                                                </label>
                                                                                <input
                                                                                        type="text"
                                                                                        id="shopName"
                                                                                        name="shopName"
                                                                                        placeholder="Shop Name"
                                                                                        className="px-4 py-2 focus:outline-none focus:border-indigo-500 focus:bg-slate-900/50 border-slate-900 border-2 rounded-md text-[#d0d2d6] overflow-hidden outline-none"
                                                                                />
                                                                        </div>

                                                                        {/* Division Name */}
                                                                        <div className="flex flex-col w-full gap-1 mb-2">
                                                                                <label htmlFor="division">
                                                                                        Division Name
                                                                                </label>
                                                                                <input
                                                                                        type="text"
                                                                                        id="division"
                                                                                        name="division"
                                                                                        placeholder="Division Name"
                                                                                        className="px-4 py-2 focus:outline-none focus:border-indigo-500 focus:bg-slate-900/50 border-slate-900 border-2 rounded-md text-[#d0d2d6] overflow-hidden outline-none"
                                                                                />
                                                                        </div>

                                                                        {/* District */}
                                                                        <div className="flex flex-col w-full gap-1 mb-2">
                                                                                <label htmlFor="district">
                                                                                        District Name
                                                                                </label>
                                                                                <input
                                                                                        type="text"
                                                                                        id="district"
                                                                                        name="district"
                                                                                        placeholder="District Name"
                                                                                        className="px-4 py-2 focus:outline-none focus:border-indigo-500 focus:bg-slate-900/50 border-slate-900 border-2 rounded-md text-[#d0d2d6] overflow-hidden outline-none"
                                                                                />
                                                                        </div>

                                                                        {/* Sub District*/}
                                                                        <div className="flex flex-col w-full gap-1 mb-2">
                                                                                <label htmlFor="subdis">
                                                                                        Sub District Name
                                                                                </label>
                                                                                <input
                                                                                        type="text"
                                                                                        id="subdis"
                                                                                        name="subdis"
                                                                                        placeholder="Sub District Name"
                                                                                        className="px-4 py-2 focus:outline-none focus:border-indigo-500 focus:bg-slate-900/50 border-slate-900 border-2 rounded-md text-[#d0d2d6] overflow-hidden outline-none"
                                                                                />
                                                                        </div>

                                                                        {/* button */}
                                                                        <div className="flex">
                                                                                <div className=" text-center rounded-lg px-7 py-3 mt-2 bg-red-500  hover:shadow-red-500/50 hover:shadow-md hover:bg-red-400 transition-colors duration-300 text-white cursor-pointer ">
                                                                                        <button className="cursor-pointer">
                                                                                                Update Profile
                                                                                        </button>
                                                                                </div>
                                                                        </div>
                                                                </form>
                                                        ) : (
                                                                <div className="flex justify-between text-sm md:text-md flex-col gap-3 px-4 py-3 bg-slate-700 rounded-md relative">
                                                                        <span className="self-end p-[6px] bg-yellow-600 rounded-md hover:shadow-md hover:shadow-yellow-600/50 cursor-pointer absolute top-2 right-2">
                                                                                <FaEdit />
                                                                        </span>
                                                                        <div className="flex gap-2">
                                                                                <span className="font-bold text-md">
                                                                                        Shop Name:{" "}
                                                                                </span>
                                                                                <span>Pitachiti Shop</span>
                                                                        </div>
                                                                        <div className="flex gap-2">
                                                                                <span className="font-bold text-md">
                                                                                        Division Name:{" "}
                                                                                </span>
                                                                                <span>Dhaka</span>
                                                                        </div>
                                                                        <div className="flex gap-2">
                                                                                <span className="font-bold text-md">
                                                                                        District Name:{" "}
                                                                                </span>
                                                                                <span>Dhaka</span>
                                                                        </div>
                                                                        <div className="flex gap-2">
                                                                                <span className="font-bold text-md">
                                                                                        Sub District Name:{" "}
                                                                                </span>
                                                                                <span>Dhaka</span>
                                                                        </div>
                                                                </div>
                                                        )}
                                                </div>
                                        </div>
                                </div>

                                {/* Right Side : Change Password*/}
                                <div className="w-full md:w-6/12">
                                        <div className="w-full pl-0 md:pl-7 mt-6 md:mt-0 ">
                                                <div className="bg-[#6a5fdf] rounded-md text-[#d0d2d6] p-4">
                                                        <h2 className="text-[#d0d2d6] text-xl font-semibold mb-3">
                                                                Change Password
                                                        </h2>

                                                        <form>
                                                                {/* Email*/}
                                                                <div className="flex flex-col w-full gap-1 mb-2">
                                                                        <label htmlFor="email">Email</label>
                                                                        <input
                                                                                type="email"
                                                                                id="email"
                                                                                name="email"
                                                                                placeholder="Email"
                                                                                className="px-4 py-2 focus:outline-none focus:border-indigo-500 focus:bg-slate-900/50 border-slate-900 border-2 rounded-md text-[#d0d2d6] overflow-hidden outline-none"
                                                                        />
                                                                </div>

                                                                {/*Old Password */}
                                                                <div className="flex flex-col w-full gap-1 mb-2 relative">
                                                                        <label htmlFor="o_password">Old Password</label>
                                                                        <input
                                                                                type={
                                                                                        hideOldPassword
                                                                                                ? "password"
                                                                                                : "text"
                                                                                }
                                                                                id="o_password"
                                                                                name="old_password"
                                                                                placeholder="Old Password"
                                                                                className="px-4 py-2 focus:outline-none focus:border-indigo-500 focus:bg-slate-900/50 border-slate-900 border-2 rounded-md text-[#d0d2d6] overflow-hidden outline-none"
                                                                        />
                                                                        <span
                                                                                onClick={toggleOldPassword}
                                                                                className="absolute top-[50%] right-[3px] translate-x-[-50%] translate-y-[40%] cursor-pointer"
                                                                        >
                                                                                {hideOldPassword ? (
                                                                                        <FaEye />
                                                                                ) : (
                                                                                        <FaEyeSlash />
                                                                                )}
                                                                        </span>
                                                                </div>

                                                                {/*New Password */}
                                                                <div className="flex flex-col w-full gap-1 mb-2 relative">
                                                                        <label htmlFor="n_password">New Password</label>
                                                                        <input
                                                                                type={
                                                                                        hideNewPassword
                                                                                                ? "password"
                                                                                                : "text"
                                                                                }
                                                                                id="n_password"
                                                                                name="new_password"
                                                                                placeholder="New Password"
                                                                                className="px-4 py-2 focus:outline-none focus:border-indigo-500 focus:bg-slate-900/50 border-slate-900 border-2 rounded-md text-[#d0d2d6] overflow-hidden outline-none"
                                                                        />
                                                                        <span
                                                                                onClick={toggleNewPassword}
                                                                                className="absolute top-[50%] right-[3px] translate-x-[-50%] translate-y-[40%] cursor-pointer"
                                                                        >
                                                                                {hideNewPassword ? (
                                                                                        <FaEye />
                                                                                ) : (
                                                                                        <FaEyeSlash />
                                                                                )}
                                                                        </span>
                                                                </div>

                                                                {/* button */}
                                                                <div className="flex">
                                                                        <div className=" text-center rounded-lg px-7 py-3 mt-2 bg-red-500  hover:shadow-red-500/50 hover:shadow-md hover:bg-red-400 transition-colors duration-300 text-white cursor-pointer ">
                                                                                <button className="cursor-pointer">
                                                                                        Save changes
                                                                                </button>
                                                                        </div>
                                                                </div>
                                                        </form>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
        );
};

export default Profile;
