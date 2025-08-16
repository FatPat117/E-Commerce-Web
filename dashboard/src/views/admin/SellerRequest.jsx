import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { get_seller_request } from "../../store/Reducers/sellerReducer";
import Pagination from "../Pagination";
import Search from "../components/Search";
const SellerRequest = () => {
        const dispatch = useDispatch();
        const { loader, sellers, totalSeller } = useSelector((state) => state.seller);
        const [currentPage, setCurrentPage] = useState(1);
        const [searchValue, setSearchValue] = useState("");
        const [perPage, setPerPage] = useState(5);

        useEffect(() => {
                const obj = {
                        perPage: parseInt(perPage),
                        page: parseInt(currentPage),
                        searchValue,
                };
                dispatch(get_seller_request(obj));
        }, [perPage, currentPage, searchValue]);

        return (
                <div className="px-2 lg:px-7 pt-5">
                        <h1 className="text-[20px] mb-3 font-bold">Seller Request</h1>

                        <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
                                {/* Select and Search field */}
                                <Search
                                        setPerPage={setPerPage}
                                        perPage={perPage}
                                        setSearchValue={setSearchValue}
                                        searchValue={searchValue}
                                />

                                {/* Table */}
                                <div className="relative overflow-x-auto">
                                        <table className="w-full text-sm text-left text-[#d0d2d6]  ">
                                                <thead className="border-b border-slate-700 uppercase text-[#d0d2d6] ">
                                                        <tr>
                                                                <th scope="col" className="py-3 px-4">
                                                                        No.
                                                                </th>

                                                                <th scope="col" className="py-3 px-4">
                                                                        Name
                                                                </th>
                                                                <th scope="col" className="py-3 px-4">
                                                                        Email
                                                                </th>
                                                                <th scope="col" className="py-3 px-4">
                                                                        Payment Status
                                                                </th>
                                                                <th scope="col" className="py-3 px-4">
                                                                        Status
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
                                                                                        Pitachiti
                                                                                </td>
                                                                                <td
                                                                                        scope="row"
                                                                                        className="py-2 px-4 font-medium whitespace-nowrap"
                                                                                >
                                                                                        Email
                                                                                </td>

                                                                                <td
                                                                                        scope="row"
                                                                                        className="py-2 px-4 font-medium whitespace-nowrap"
                                                                                >
                                                                                        Payment Status
                                                                                </td>
                                                                                <td
                                                                                        scope="row"
                                                                                        className="py-2 px-4 font-medium whitespace-nowrap"
                                                                                >
                                                                                        Status
                                                                                </td>
                                                                                <td
                                                                                        scope="row"
                                                                                        className="py-2 px-4 font-medium whitespace-nowrap"
                                                                                >
                                                                                        <div className="flex items-center justify-start gap-4">
                                                                                                <Link
                                                                                                        to="/admin/dashboard/seller/details/1"
                                                                                                        className="p-[8px]  bg-green-500 rounded-md hover:shadow-lg hover:shadow-green-500/50"
                                                                                                >
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

export default SellerRequest;
