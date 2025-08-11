import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import Pagination from "../Pagination";

const Orders = () => {
        const [perPage, setPerPage] = useState(5);
        const [searchValue, setSearchValue] = useState("");
        const [currentPage, setCurrentPage] = useState(1);
        return (
                <div className="px-2 lg:px-7 pt-5">
                        <h1 className="text-[#000000] text-xl font-bold">Orders</h1>
                        <div className="w-full p-4 bg-[#6a5fdf] rounded-md mt-2">
                                {/* Search and Select form */}
                                <Search
                                        setPerPage={setPerPage}
                                        perPage={perPage}
                                        setSearchValue={setSearchValue}
                                        searchValue={searchValue}
                                />

                                {/* Table */}
                                <div className="relative overflow-x-auto mt-5">
                                        <table className="w-full text-sm text-left text-[#d0d2d6]  ">
                                                <thead className="border-b border-slate-700 uppercase text-[#d0d2d6] ">
                                                        <tr>
                                                                <th scope="col" className="py-3 px-4">
                                                                        Order Id
                                                                </th>
                                                                <th scope="col" className="py-3 px-4">
                                                                        Price
                                                                </th>
                                                                <th scope="col" className="py-3 px-4">
                                                                        Payment Status
                                                                </th>
                                                                <th scope="col" className="py-3 px-4">
                                                                        Order Status
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
                                                                        <tr key={idx} className="border-b">
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
                                                                                        $100
                                                                                </td>
                                                                                <td
                                                                                        scope="row"
                                                                                        className="py-2 px-4 font-medium whitespace-nowrap"
                                                                                >
                                                                                        Pending
                                                                                </td>
                                                                                <td
                                                                                        scope="row"
                                                                                        className="py-2 px-4 font-medium whitespace-nowrap"
                                                                                >
                                                                                        Pending
                                                                                </td>

                                                                                <td
                                                                                        scope="row"
                                                                                        className="py-2 px-4 font-medium whitespace-nowrap"
                                                                                >
                                                                                        <div className="flex items-center justify-start gap-4">
                                                                                                <Link className="p-[8px]  bg-green-500 rounded-md hover:shadow-lg hover:shadow-green-500/50">
                                                                                                        <FaEye />
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
        );
};

export default Orders;
