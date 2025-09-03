import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { get_seller_orders } from "../../store/Reducers/orderReducer";
import Search from "../components/Search";
import Pagination from "../Pagination";
const Orders = () => {
        const dispatch = useDispatch();
        const { myOrders, totalOrder } = useSelector((state) => state.order);
        const { userInfo } = useSelector((state) => state.auth);
        const [perPage, setPerPage] = useState(5);
        const [searchValue, setSearchValue] = useState("");
        const [currentPage, setCurrentPage] = useState(1);

        useEffect(() => {
                dispatch(
                        get_seller_orders({
                                sellerId: userInfo?._id,
                                perPage: parseInt(perPage),
                                page: parseInt(currentPage),
                                searchValue,
                        })
                );
        }, [perPage, currentPage, searchValue]);
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
                                                                        Date
                                                                </th>
                                                                <th scope="col" className="py-3 px-4">
                                                                        Action
                                                                </th>
                                                        </tr>
                                                </thead>
                                                {/* <tbody className="text-center"> */}
                                                <tbody className="">
                                                        {myOrders?.map((data, idx) => {
                                                                return (
                                                                        <tr key={idx} className="border-b">
                                                                                <td
                                                                                        scope="row"
                                                                                        className="py-2 px-4 font-medium whitespace-nowrap"
                                                                                >
                                                                                        {data?._id}
                                                                                </td>

                                                                                <td
                                                                                        scope="row"
                                                                                        className="py-2 px-4 font-medium whitespace-nowrap"
                                                                                >
                                                                                        ${data?.price}
                                                                                </td>
                                                                                <td
                                                                                        scope="row"
                                                                                        className="py-2 px-4 font-medium whitespace-nowrap"
                                                                                >
                                                                                        {data?.paymentStatus}
                                                                                </td>
                                                                                <td
                                                                                        scope="row"
                                                                                        className="py-2 px-4 font-medium whitespace-nowrap"
                                                                                >
                                                                                        {data?.deliveryStatus}
                                                                                </td>
                                                                                <td
                                                                                        scope="row"
                                                                                        className="py-2 px-4 font-medium whitespace-nowrap"
                                                                                >
                                                                                        {data?.date}
                                                                                </td>

                                                                                <td
                                                                                        scope="row"
                                                                                        className="py-2 px-4 font-medium whitespace-nowrap"
                                                                                >
                                                                                        <div className="flex items-center justify-start gap-4">
                                                                                                <Link
                                                                                                        to={`/seller/dashboard/order/details/${data?._id}`}
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
                                {totalOrder >= perPage && (
                                        <div className="w-full flex justify-end items-center mt-4 bottom-4 right-4">
                                                <Pagination
                                                        pageNumber={currentPage}
                                                        setPageNumber={setCurrentPage}
                                                        totalItem={totalOrder}
                                                        perPage={perPage}
                                                        showPage={3}
                                                />
                                        </div>
                                )}
                        </div>
                </div>
        );
};

export default Orders;
