import React, { useState } from "react";
import { FaEdit, FaImage, FaTimes, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
const Category = () => {
        const [currentPage, setCurrentPage] = useState(1);
        const [searchValue, setSearchValue] = useState("");
        const [perPage, setPerPage] = useState(5);
        const [showAddCategory, setShowAddCategory] = useState(false);
        const [imageShow, setImageShow] = useState("");

        const [state, setState] = useState({
                name: "",
                image: "",
        });

        const handleInput = (e) => {
                const value = e.target.value;
                setState({ ...state, [e.target.name]: value });
        };

        const handleImage = (e) => {
                const files = e.target.files;
                if (files.length > 0) {
                        setImageShow(URL.createObjectURL(files[0]));
                        setState({ ...state, image: files[0] });
                }
        };
        const handleSubmit = (e) => {
                e.preventDefault();
        };
        return (
                <div className="px-2 lg:px-7 pt-5">
                        {/* Mobile view */}
                        <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-[#6a5fdf] rounded-md">
                                <h1 className="text-[#d0d2d6] font-semibold text-lg">Category</h1>
                                <button
                                        onClick={() => setShowAddCategory(!showAddCategory)}
                                        className="cursor-pointer text-white bg-red-500 shadow-lg hover:shadow-red-500 hover:bg-red-400 transition-colors duration-300 px-4 py-2 rounded-md text-sm "
                                >
                                        Add
                                </button>
                        </div>

                        <div className="flex flex-wrap w-full">
                                {/* Left part */}
                                <div className="w-full lg:w-7/12 ">
                                        <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
                                                {/* Select and Search field */}
                                                <div className="flex justify-between items-center">
                                                        <select
                                                                onChange={(e) => setPerPage(parseInt(e.target.value))}
                                                                name=""
                                                                id=""
                                                                value={perPage}
                                                                className="px-4 py-2 focus:border-indigo-500 hover:border-indigo-500 outline-none bg-[#6a5fdf] border-2 border-slate-700 rounded-lg text-[#d0d2d6] overflow-hidden cursor-pointer"
                                                        >
                                                                <option value="5">5</option>
                                                                <option value="10">10</option>
                                                                <option value="15">15</option>
                                                                <option value="20">20</option>
                                                        </select>
                                                        <input
                                                                type="text"
                                                                placeholder="search"
                                                                value={searchValue}
                                                                onChange={(e) => setSearchValue(e.target.value)}
                                                                className="px-4 py-2 focus:outline-none focus:border-indigo-500 focus:bg-slate-900/50 border-slate-900 border-2 rounded-md text-[#d0d2d6] overflow-hidden outline-none"
                                                        />
                                                </div>

                                                {/* Table */}
                                                <div className="relative overflow-x-auto">
                                                        <table className="w-full text-sm text-left text-[#d0d2d6]  ">
                                                                <thead className="border-b border-slate-700 uppercase text-[#d0d2d6] ">
                                                                        <tr>
                                                                                <th scope="col" className="py-3 px-4">
                                                                                        No.
                                                                                </th>
                                                                                <th scope="col" className="py-3 px-4">
                                                                                        Image
                                                                                </th>
                                                                                <th scope="col" className="py-3 px-4">
                                                                                        Name
                                                                                </th>
                                                                                <th scope="col" className="py-3 px-4">
                                                                                        Action
                                                                                </th>
                                                                        </tr>
                                                                </thead>
                                                                {/* <tbody className="text-center"> */}
                                                                <tbody className="">
                                                                        {[1, 2, 3, 4, 5].map((data, idx) => {
                                                                                return (
                                                                                        <tr
                                                                                                key={idx}
                                                                                                className="border-b"
                                                                                        >
                                                                                                <td
                                                                                                        scope="row"
                                                                                                        className="py-2 px-4 font-medium whitespace-nowrap"
                                                                                                >
                                                                                                        {data}
                                                                                                </td>
                                                                                                <td
                                                                                                        scope="row"
                                                                                                        className="py-2 px-4 font-medium whitespace-nowrap"
                                                                                                >
                                                                                                        <img
                                                                                                                src={`/category/${data}.jpg`}
                                                                                                                alt="category-image"
                                                                                                                className="w-[45px] h-[45px] object-cover"
                                                                                                        />
                                                                                                </td>
                                                                                                <td
                                                                                                        scope="row"
                                                                                                        className="py-2 px-4 font-medium whitespace-nowrap"
                                                                                                >
                                                                                                        TShirt
                                                                                                </td>
                                                                                                <td
                                                                                                        scope="row"
                                                                                                        className="py-2 px-4 font-medium whitespace-nowrap"
                                                                                                >
                                                                                                        <div className="flex items-center justify-start gap-4">
                                                                                                                <Link className="p-[8px]  bg-yellow-500 rounded-md hover:shadow-lg hover:shadow-yellow-500/50">
                                                                                                                        <FaEdit />
                                                                                                                </Link>
                                                                                                                <Link className="p-[8px]  bg-red-500 rounded-md hover:shadow-lg hover:shadow-red-500/50">
                                                                                                                        <FaTrash />
                                                                                                                </Link>
                                                                                                        </div>
                                                                                                </td>
                                                                                        </tr>
                                                                                );
                                                                        })}
                                                                </tbody>
                                                        </table>
                                                </div>

                                                {/* Pagination */}
                                                <div className="w-full flex justify-end items-center mt-4 bottom-4 right-4">
                                                        <Pagination
                                                                pageNumber={currentPage}
                                                                setPageNumber={setCurrentPage}
                                                                totalItem={50}
                                                                perPage={perPage}
                                                                showPage={3}
                                                        />
                                                </div>
                                        </div>
                                </div>

                                {/* Right part : Add category*/}
                                <div
                                        className={`w-[320px] lg:w-5/12 lg:relative lg:right-0 fixed  z-50 transition-all duration-500 ${
                                                showAddCategory ? "right-0 top-0" : "-right-[340px] top-0 "
                                        }`}
                                >
                                        <div className="w-full pl-5 ">
                                                <div className="bg-[#6a5fdf] h-screen lg:h-auto px-3 py-2 lg:rounded-md text-[#d0d2d6]">
                                                        <div className="flex justify-between items-center">
                                                                <h1 className="text-[#d0dd26] font-semibold text-xl mb-4 w-full text-center">
                                                                        Add category
                                                                </h1>

                                                                {/* Close button */}
                                                                <div className="block lg:hidden cursor-pointer">
                                                                        <button
                                                                                className="cursor-pointer"
                                                                                onClick={() =>
                                                                                        setShowAddCategory(false)
                                                                                }
                                                                        >
                                                                                <FaTimes />
                                                                        </button>
                                                                </div>
                                                        </div>

                                                        <form onSubmit={handleSubmit}>
                                                                {/* Search Input */}
                                                                <div className="flex flex-col w-full gap-1 mb-3">
                                                                        <label htmlFor="name">Category Name</label>
                                                                        <input
                                                                                type="text"
                                                                                id="name"
                                                                                name="name"
                                                                                placeholder="Category Name"
                                                                                value={state.name}
                                                                                onChange={handleInput}
                                                                                className="px-4 py-2 focus:outline-none focus:border-indigo-500 focus:bg-slate-900/50 border-slate-900 border-2 rounded-md text-[#d0d2d6] overflow-hidden outline-none"
                                                                        />
                                                                </div>

                                                                {/* Image Upload */}
                                                                <div>
                                                                        <label
                                                                                className="flex justify-center items-center flex-col h-[238px] cursor-pointer border-2 border-dashed hover:border-white w-full border-slate-900"
                                                                                htmlFor="image"
                                                                        >
                                                                                {imageShow ? (
                                                                                        <img
                                                                                                src={imageShow}
                                                                                                alt="image"
                                                                                                className="w-full h-full object-cover"
                                                                                        />
                                                                                ) : (
                                                                                        <>
                                                                                                <span>
                                                                                                        <FaImage />
                                                                                                </span>
                                                                                                <span>
                                                                                                        Select Image
                                                                                                </span>
                                                                                        </>
                                                                                )}
                                                                        </label>

                                                                        <input
                                                                                className="hidden"
                                                                                type="file"
                                                                                id="image"
                                                                                name="image"
                                                                                onChange={handleImage}
                                                                        />

                                                                        <div className=" text-center rounded-lg px-7 py-3 mt-2 bg-red-500 w-full hover:shadow-red-500/50 hover:shadow-md hover:bg-red-400 transition-colors duration-300 text-white cursor-pointer ">
                                                                                <button className="cursor-pointer">
                                                                                        Add category
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

export default Category;
