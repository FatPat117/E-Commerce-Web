import React from "react";
import { FaImage } from "react-icons/fa";
import { FadeLoader } from "react-spinners";

const Profile = () => {
        const image = true;
        const loader = false;
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
                                        </div>
                                </div>

                                {/* Right Side */}
                                <div className="w-full md:w-6/12"></div>
                        </div>
                </div>
        );
};

export default Profile;
