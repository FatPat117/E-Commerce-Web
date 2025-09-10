import React, { useState } from "react";
import { FaRegImage } from "react-icons/fa";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
const AddBanner = () => {
        const loader = false;
        const [imageShow, setImageShow] = useState("");
        const [image, setImage] = useState("");

        const bannerHandle = (e) => {
                const files = e.target.files;
                const length = files.length;
                if (length > 0) {
                        const file = files[0];
                        setImageShow(URL.createObjectURL(file));
                        setImage(files[0]);
                }
        };

        const addBanner = (e) => {
                e.targetDefault();
        };
        return (
                <div className="px-2 lg:px-7 pt-5">
                        <h1 className="text-[#000000] font-semibold text-lg mb-3">Add Banner</h1>\
                        <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
                                {/* Form */}
                                <form className="w-full" onSubmit={addBanner}>
                                        <div className="mb-4">
                                                <label
                                                        htmlFor="image"
                                                        className="flex justify-center items-center flex-col lg:h-[180px]  cursor-pointer border border-dashed hover:border-red-500 w-full text-white p-4"
                                                >
                                                        <span className="text-4xl">
                                                                <FaRegImage />
                                                        </span>
                                                        <span>Select Banner Image</span>
                                                </label>
                                                <input
                                                        onChange={bannerHandle}
                                                        type="file"
                                                        name="image"
                                                        id="image"
                                                        className="hidden"
                                                        required
                                                />
                                        </div>

                                        {imageShow && (
                                                <div className="mb-4">
                                                        <img
                                                                src={imageShow}
                                                                alt="banner"
                                                                className="w-full h-[300px]"
                                                        />
                                                </div>
                                        )}
                                        <div className="flex justify-center items-center">
                                                <button
                                                        type="submit"
                                                        className=" h-[50px] bg-red-600  lg:w-[500px] w-full cursor-pointer hover:bg-red-600/50 hover:shadow-red-600 hover:shadow-md text-white py-2 px-7 mb-1 rounded-md "
                                                        disabled={loader}
                                                >
                                                        {loader ? (
                                                                <PropagateLoader
                                                                        color="#fff"
                                                                        cssOverride={overrideStyle}
                                                                />
                                                        ) : (
                                                                "Add Banner"
                                                        )}
                                                </button>
                                        </div>
                                </form>
                        </div>
                </div>
        );
};

export default AddBanner;
