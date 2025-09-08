import React, { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { get_discount_products } from "../../store/Reducers/productReducer";
import Search from "../components/Search";
import Pagination from "../Pagination";
const DiscountProducts = () => {
        const dispatch = useDispatch();
        const { userInfo } = useSelector((state) => state.auth);
        const { products, totalProduct } = useSelector((state) => state.product);
        const [perPage, setPerPage] = useState(5);
        const [searchValue, setSearchValue] = useState("");
        const [currentPage, setCurrentPage] = useState(1);

        useEffect(() => {
                if (userInfo) {
                        const obj = {
                                page: parseInt(currentPage),
                                searchValue: searchValue || "",
                                perPage: parseInt(perPage),
                        };
                        dispatch(get_discount_products(obj));
                }
        }, [currentPage, perPage, searchValue]);
        return (
                <div className="px-2 lg:px-7 pt-5">
                        <h1 className="text-[#000000] text-xl font-bold">Discount Products</h1>
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
                                                                        No.
                                                                </th>
                                                                <th scope="col" className="py-3 px-4">
                                                                        Image
                                                                </th>
                                                                <th scope="col" className="py-3 px-4">
                                                                        Name
                                                                </th>
                                                                <th scope="col" className="py-3 px-4">
                                                                        Category
                                                                </th>
                                                                <th scope="col" className="py-3 px-4">
                                                                        Brand
                                                                </th>
                                                                <th scope="col" className="py-3 px-4">
                                                                        Price
                                                                </th>
                                                                <th scope="col" className="py-3 px-4">
                                                                        Discount
                                                                </th>
                                                                <th scope="col" className="py-3 px-4">
                                                                        Stock
                                                                </th>
                                                                <th scope="col" className="py-3 px-4">
                                                                        Action
                                                                </th>
                                                        </tr>
                                                </thead>
                                                {/* <tbody className="text-center"> */}
                                                <tbody className="">
                                                        {products?.map((data, idx) => {
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
                                                                                                src={data?.images[0]}
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
                                                                                        {data?.category}
                                                                                </td>
                                                                                <td
                                                                                        scope="row"
                                                                                        className="py-2 px-4 font-medium whitespace-nowrap"
                                                                                >
                                                                                        {data?.brand}
                                                                                </td>
                                                                                <td
                                                                                        scope="row"
                                                                                        className="py-2 px-4 font-medium whitespace-nowrap"
                                                                                >
                                                                                        {data?.price}
                                                                                </td>
                                                                                <td
                                                                                        scope="row"
                                                                                        className="py-2 px-4 font-medium whitespace-nowrap"
                                                                                >
                                                                                        {data?.discount}
                                                                                </td>
                                                                                <td
                                                                                        scope="row"
                                                                                        className="py-2 px-4 font-medium whitespace-nowrap"
                                                                                >
                                                                                        {data?.stock}
                                                                                </td>

                                                                                <td
                                                                                        scope="row"
                                                                                        className="py-2 px-4 font-medium whitespace-nowrap"
                                                                                >
                                                                                        <div className="flex items-center justify-start gap-4">
                                                                                                <Link className="p-[8px]  bg-yellow-500 rounded-md hover:shadow-lg hover:shadow-yellow-500/50">
                                                                                                        <FaEdit />
                                                                                                </Link>
                                                                                                <Link className="p-[8px]  bg-green-500 rounded-md hover:shadow-lg hover:shadow-green-500/50">
                                                                                                        <FaEye />
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
                                {totalProduct >= perPage && (
                                        <div className="w-full flex justify-end items-center mt-4 bottom-4 right-4">
                                                <Pagination
                                                        pageNumber={currentPage}
                                                        setPageNumber={setCurrentPage}
                                                        totalItem={totalProduct}
                                                        perPage={perPage}
                                                        showPage={3}
                                                />
                                        </div>
                                )}
                        </div>
                </div>
        );
};

export default DiscountProducts;
