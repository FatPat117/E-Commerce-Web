import React, { useState } from "react";

const Orders = () => {
        const [currentPage, setCurrentPage] = useState(1);
        const [searchValue, setSearchValue] = useState("");
        const [perPage, setPerPage] = useState(10);

        return (
                <div className="px-2 lg:px-7 pt-5">
                        <div className="w-full p-4 bg-[#6a5fdf] rounded-md ">
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
                                                className="px-4 py-2 focus:outline-none focus:border-indigo-500 focus:bg-slate-900 border-slate-900 border-2 rounded-md text-[#d0d2d6] overflow-hidden cursor-pointer outline-none"
                                        />
                                </div>
                        </div>
                </div>
        );
};

export default Orders;
