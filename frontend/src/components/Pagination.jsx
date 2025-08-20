import React from "react";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

const Pagination = ({ pageNumber, setPageNumber, totalItem, perPage, showPage }) => {
        let totalPage = Math.ceil(totalItem / perPage);
        let startPage = pageNumber;

        let dif = totalPage - pageNumber;

        if (dif <= showPage) {
                startPage = totalPage - showPage;
        }
        let endPage = startPage < 0 ? showPage : showPage + startPage;

        if (startPage <= 0) {
                startPage = 1;
        }

        const createButton = () => {
                const btns = [];

                for (let i = startPage; i < endPage; i++) {
                        btns.push(
                                <li
                                        className={`w-[33px] h-[33px] rounded-full flex justify-center items-center cursor-pointer text-[#d0d2d6] transition-all duration-300  ${
                                                pageNumber === i
                                                        ? "bg-green-700 shadow-lg shadow-indigo-300/50 text-white"
                                                        : "bg-slate-600 hover:bg-green-700 shadow-lg hover:shadow-green-450/50 hover:text-white"
                                        }`}
                                        onClick={() => setPageNumber(i)}
                                >
                                        {i}
                                </li>
                        );
                }
                return btns;
        };

        return (
                <ul className="flex gap-3">
                        {pageNumber > 1 && (
                                <li
                                        className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000] cursor-pointer hover:bg-indigo-400 hover:text-white transition-colors duration-300"
                                        onClick={() => {
                                                setPageNumber(pageNumber - 1 <= 0 ? 1 : pageNumber - 1);
                                        }}
                                >
                                        <MdKeyboardDoubleArrowLeft />
                                </li>
                        )}
                        {createButton()}
                        {pageNumber < totalPage && (
                                <li
                                        className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000] cursor-pointer hover:bg-green-400 hover:text-white transition-colors duration-300"
                                        onClick={() => {
                                                setPageNumber(pageNumber + 1 > totalPage ? totalPage : pageNumber + 1);
                                        }}
                                >
                                        <MdKeyboardDoubleArrowRight />
                                </li>
                        )}
                </ul>
        );
};

export default Pagination;
