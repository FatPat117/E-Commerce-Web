import React, { useState } from "react";
import { BsArrowDownSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
const Orders = () => {
        const [currentPage, setCurrentPage] = useState(1);
        const [searchValue, setSearchValue] = useState("");
        const [perPage, setPerPage] = useState(10);

        return (
                <div className="px-2 lg:px-7 pt-5">
                        <div className="w-full p-4 bg-[#6a5fdf] rounded-md ">
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
                                                className="px-4 py-2 focus:outline-none focus:border-indigo-500 focus:bg-slate-900 border-slate-900 border-2 rounded-md text-[#d0d2d6] overflow-hidden cursor-pointer outline-none"
                                        />
                                </div>

                                {/* Table */}
                                <div className="relative mt-5 overflow-x-auto">
                                        <div className="w-full text-sm text-left text-[#d0d2d6]">
                                                <div className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
                                                        <div className="flex justify-between items-center">
                                                                <div className="py-3 w-[25%] font-bold text-md">
                                                                        Order id
                                                                </div>
                                                                <div className="py-3 w-[13%] font-bold text-md">
                                                                        Price
                                                                </div>
                                                                <div className="py-3 w-[18%] font-bold text-md">
                                                                        Payment Status
                                                                </div>
                                                                <div className="py-3 w-[18%] font-bold">
                                                                        Order Status
                                                                </div>
                                                                <div className="py-3 w-[18%] font-bold text-md">
                                                                        Action
                                                                </div>
                                                                <div className="py-3 w-[8%] font-bold">
                                                                        <BsArrowDownSquare size={20} />
                                                                </div>
                                                        </div>
                                                </div>

                                                {/* Items */}
                                                <div className="text-[#d0d2d6]  ">
                                                        <div className="flex justify-between items-start border-b border-slate-700">
                                                                <div className="py-3 w-[25%] font-medium text-sm whitespace-nowrap">
                                                                        #12321312
                                                                </div>
                                                                <div className="py-3 w-[13%] font-medium text-sm whitespace-nowrap">
                                                                        $545
                                                                </div>
                                                                <div className="py-3 w-[18%] font-medium text-sm whitespace-nowrap">
                                                                        Pending
                                                                </div>
                                                                <div className="py-3 w-[18%] font-medium text-sm whitespace-nowrap">
                                                                        Pending
                                                                </div>
                                                                <div className="py-3 w-[18%] font-medium text-sm whitespace-nowrap">
                                                                        <Link>View </Link>
                                                                </div>
                                                                <div className="py-3 w-[8%] font-medium text-sm whitespace-nowrap">
                                                                        <BsArrowDownSquare size={20} />
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
        );
};

export default Orders;
