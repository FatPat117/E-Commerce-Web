import React from "react";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

const Pagination = ({ pageNumber, setPageNumber, totalItem, perPage, showPage }) => {
        const totalPage = Math.ceil(totalItem / perPage);

        const currentPage = Math.max(1, Math.min(pageNumber, totalPage));

        let startPage = Math.max(1, currentPage - Math.floor(showPage / 2));
        let endPage = startPage + showPage - 1;

        if (endPage > totalPage) {
                endPage = totalPage;
                startPage = Math.max(1, endPage - showPage + 1);
        }

        const createButton = () => {
                const btns = [];
                for (let i = startPage; i <= endPage; i++) {
                        btns.push(
                                <li
                                        key={i}
                                        className={`w-[33px] h-[33px] rounded-full flex justify-center items-center cursor-pointer text-[#d0d2d6] transition-all duration-300
                        ${
                                currentPage === i
                                        ? "bg-green-700 shadow-lg shadow-green-400/50 text-white"
                                        : "bg-slate-600 hover:bg-green-700 hover:text-white"
                        }`}
                                        onClick={() => setPageNumber(i)}
                                >
                                        {i}
                                </li>
                        );
                }
                return btns;
        };

        if (totalPage <= 1) return null;

        return (
                <ul className="flex gap-3 items-center justify-center">
                        {/* Nút Previous */}
                        {currentPage > 1 && (
                                <li
                                        className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-black cursor-pointer hover:bg-green-400 hover:text-white transition-colors duration-300"
                                        onClick={() => setPageNumber(currentPage - 1)}
                                >
                                        <MdKeyboardDoubleArrowLeft />
                                </li>
                        )}

                        {/* Các nút trang */}
                        {createButton()}

                        {/* Nút Next */}
                        {currentPage < totalPage && (
                                <li
                                        className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-black cursor-pointer hover:bg-green-400 hover:text-white transition-colors duration-300"
                                        onClick={() => setPageNumber(currentPage + 1)}
                                >
                                        <MdKeyboardDoubleArrowRight />
                                </li>
                        )}
                </ul>
        );
};

export default Pagination;
