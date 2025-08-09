import React, { useState } from "react";
const Category = () => {
        const [perPage, setPerPage] = useState(5);

        return (
                <div className="px-2 lg:px-7 pt-5">
                        <div className="flex flex-wrap w-full">
                                {/* Right part */}
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
                                                                className="px-4 py-2 focus:outline-none focus:border-indigo-500 focus:bg-slate-900 border-slate-900 border-2 rounded-md text-[#d0d2d6] overflow-hidden outline-none"
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
                                                                                                        className="py-3 px-4 font-medium whitespace-nowrap"
                                                                                                >
                                                                                                        #34343
                                                                                                </td>
                                                                                                <td
                                                                                                        scope="row"
                                                                                                        className="py-3 px-4 font-medium whitespace-nowrap"
                                                                                                >
                                                                                                        $212
                                                                                                </td>
                                                                                                <td
                                                                                                        scope="row"
                                                                                                        className="py-3 px-4 font-medium whitespace-nowrap"
                                                                                                >
                                                                                                        Pending
                                                                                                </td>
                                                                                                <td
                                                                                                        scope="row"
                                                                                                        className="py-3 px-4 font-medium whitespace-nowrap"
                                                                                                >
                                                                                                        Delivered
                                                                                                </td>
                                                                                        </tr>
                                                                                );
                                                                        })}
                                                                </tbody>
                                                        </table>
                                                </div>
                                        </div>
                                </div>

                                {/* Left part : Add category*/}
                                <div className="w-full lg:w-5/12">
                                        <div className="w-full p-4 bg-[#6a5fdf] rounded-md"></div>
                                </div>
                        </div>
                </div>
        );
};

export default Category;
