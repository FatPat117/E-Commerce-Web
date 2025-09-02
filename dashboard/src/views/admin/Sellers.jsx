import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { get_active_sellers } from "../../store/Reducers/sellerReducer";
import Pagination from "../Pagination";
const Sellers = () => {
        const { sellers, totalSeller } = useSelector((state) => state.seller);
        const dispatch = useDispatch();
        const [currentPage, setCurrentPage] = useState(1);
        const [searchValue, setSearchValue] = useState("");
        const [perPage, setPerPage] = useState(5);

        useEffect(() => {
                const obj = {
                        searchValue,
                        perPage: parseInt(perPage),
                        page: parseInt(currentPage),
                };

                dispatch(get_active_sellers(obj));
        }, [searchValue, currentPage, perPage]);
        return (
                <div className="px-2 lg:px-7 pt-5">
                        <h1 className="text-[20px] mb-3 font-bold">Seller</h1>
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
                                                value={searchValue}
                                                onChange={(e) => setSearchValue(e.target.value)}
                                                type="text"
                                                placeholder="Search Name..."
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
                                                                        Shop Name
                                                                </th>
                                                                <th scope="col" className="py-3 px-4">
                                                                        Payment Status
                                                                </th>
                                                                <th scope="col" className="py-3 px-4">
                                                                        Email
                                                                </th>
                                                                <th scope="col" className="py-3 px-4">
                                                                        Status
                                                                </th>
                                                                <th scope="col" className="py-3 px-4">
                                                                        District
                                                                </th>
                                                                <th scope="col" className="py-3 px-4">
                                                                        Action
                                                                </th>
                                                        </tr>
                                                </thead>
                                                {/* <tbody className="text-center"> */}
                                                <tbody className="">
                                                        {sellers.map((data, idx) => {
                                                                return (
                                                                        <tr key={idx} className="border-b">
                                                                                <td
                                                                                        scope="row"
                                                                                        className="py-2 px-4 font-medium whitespace-nowrap"
                                                                                >
                                                                                        {idx + 1}
                                                                                </td>
                                                                                <td
                                                                                        scope="row"
                                                                                        className="py-2 px-4 font-medium whitespace-nowrap"
                                                                                >
                                                                                        <img
                                                                                                src={data?.image}
                                                                                                alt="category-image"
                                                                                                className="w-[45px] h-[45px] object-cover"
                                                                                        />
                                                                                </td>
                                                                                <td
                                                                                        scope="row"
                                                                                        className="py-2 px-4 font-medium whitespace-nowrap"
                                                                                >
                                                                                        {data?.name}
                                                                                </td>

                                                                                <td
                                                                                        scope="row"
                                                                                        className="py-2 px-4 font-medium whitespace-nowrap"
                                                                                >
                                                                                        {data?.shopInfo?.shopName}
                                                                                </td>
                                                                                <td
                                                                                        scope="row"
                                                                                        className="py-2 px-4 font-medium whitespace-nowrap"
                                                                                >
                                                                                        {data?.payment}
                                                                                </td>
                                                                                <td
                                                                                        scope="row"
                                                                                        className="py-2 px-4 font-medium whitespace-nowrap"
                                                                                >
                                                                                        {data?.email}
                                                                                </td>
                                                                                <td
                                                                                        scope="row"
                                                                                        className="py-2 px-4 font-medium whitespace-nowrap"
                                                                                >
                                                                                        {data?.status}
                                                                                </td>
                                                                                <td
                                                                                        scope="row"
                                                                                        className="py-2 px-4 font-medium whitespace-nowrap"
                                                                                >
                                                                                        {data?.shopInfo?.district}
                                                                                </td>
                                                                                <td
                                                                                        scope="row"
                                                                                        className="py-2 px-4 font-medium whitespace-nowrap"
                                                                                >
                                                                                        <div className="flex items-start justify-start gap-4">
                                                                                                <Link
                                                                                                        to={`/admin/dashboard/seller/details/${data?._id}`}
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
                                {totalSeller <= parseInt(perPage) ? null : (
                                        <div className="w-full flex justify-end items-center mt-4 bottom-4 right-4">
                                                <Pagination
                                                        pageNumber={currentPage}
                                                        setPageNumber={setCurrentPage}
                                                        totalItem={totalSeller}
                                                        perPage={perPage}
                                                        showPage={3}
                                                />
                                        </div>
                                )}
                        </div>
                </div>
        );
};

export default Sellers;
