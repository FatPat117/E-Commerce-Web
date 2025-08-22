import React, { useState } from "react";
import Rating from "../components/Rating";
import Pagination from "./Pagination";
import RatingTemp from "./RatingTemp";
const Reviews = () => {
        const [currentPage, setCurrentPage] = useState(1);
        const [perPage, setPerPage] = useState(2);
        return (
                <div className="mt-8">
                        {/* Star ratings */}
                        <div className="flex gap-10 md-lg:gap-20 flex-col md-lg:flex-row  ">
                                <div className="flex flex-col gap-2 justify-start items-start py-4">
                                        <div>
                                                <span className="text-6xl font-semibold">4.5</span>
                                                <span className="text-3xl font-semibold text-slate-600">/5</span>
                                        </div>
                                        <div className="flex items-center text-3xl">
                                                <Rating ratings={4.5} />
                                        </div>
                                        <p className="text-sm text-slate-600">15 Reviews</p>
                                </div>

                                <div className="flex gap-2 flex-col py-4">
                                        {/* Rating temp 5 */}
                                        <div className="flex justify-start items-center gap-5">
                                                <div className="text-md flex gap-1 w-[93px]">
                                                        <RatingTemp ratings={5} />
                                                </div>
                                                <div className="w-[200px] h-[14px] bg-slate-200 relative">
                                                        <div className="h-full bg-[#EDBB0E] w-[60%]"></div>
                                                </div>
                                                <p className="text-sm text-slate-600 w-[0%]">10</p>
                                        </div>

                                        {/* Rating temp 4*/}
                                        <div className="flex justify-start items-center gap-5">
                                                <div className="text-md flex gap-1 w-[93px]">
                                                        <RatingTemp ratings={4} />
                                                </div>
                                                <div className="w-[200px] h-[14px] bg-slate-200 relative">
                                                        <div className="h-full bg-[#EDBB0E] w-[40%]"></div>
                                                </div>
                                                <p className="text-sm text-slate-600 w-[0%]">5</p>
                                        </div>

                                        {/* Rating temp 3 */}
                                        <div className="flex justify-start items-center gap-5">
                                                <div className="text-md flex gap-1 w-[93px]">
                                                        <RatingTemp ratings={3} />
                                                </div>
                                                <div className="w-[200px] h-[14px] bg-slate-200 relative">
                                                        <div className="h-full bg-[#EDBB0E] w-[60%]"></div>
                                                </div>
                                                <p className="text-sm text-slate-600 w-[0%]">10</p>
                                        </div>

                                        {/* Rating temp  2*/}
                                        <div className="flex justify-start items-center gap-5">
                                                <div className="text-md flex gap-1 w-[93px]">
                                                        <RatingTemp ratings={2} />
                                                </div>
                                                <div className="w-[200px] h-[14px] bg-slate-200 relative">
                                                        <div className="h-full bg-[#EDBB0E] w-[10%]"></div>
                                                </div>
                                                <p className="text-sm text-slate-600 w-[0%]">2</p>
                                        </div>

                                        {/* Rating temp 1*/}
                                        <div className="flex justify-start items-center gap-5">
                                                <div className="text-md flex gap-1 w-[93px]">
                                                        <RatingTemp ratings={1} />
                                                </div>
                                                <div className="w-[200px] h-[14px] bg-slate-200 relative">
                                                        <div className="h-full bg-[#EDBB0E] w-[5%]"></div>
                                                </div>
                                                <p className="text-sm text-slate-600 w-[0%]">1</p>
                                        </div>

                                        {/* Rating temp 0*/}
                                        <div className="flex justify-start items-center gap-5">
                                                <div className="text-md flex gap-1 w-[93px]">
                                                        <RatingTemp ratings={0} />
                                                </div>
                                                <div className="w-[200px] h-[14px] bg-slate-200 relative">
                                                        <div className="h-full bg-[#EDBB0E] w-[5%]"></div>
                                                </div>
                                                <p className="text-sm text-slate-600 w-[0%]">1</p>
                                        </div>
                                </div>
                        </div>

                        {/* Product reviews */}
                        <h2 className="text-xl text-slate-600 font-bold py-5">Product reviews 10</h2>

                        <div className="flex flex-col gap-8 pb-10 pt-4">
                                {[1, 2, 3, 4, 5].map((data, idx) => {
                                        return (
                                                <div className="flex flex-col gap-1" key={idx}>
                                                        <div className="flex justify-between items-center">
                                                                <div className="flex gap-1 text-xl">
                                                                        <RatingTemp ratings={4} />
                                                                </div>
                                                                <span className="text-slate-600">8 Jan 2025</span>
                                                        </div>
                                                        <h2 className="text-md text-slate-600 md-lg:mt-4">
                                                                Pita Pitachiti
                                                        </h2>
                                                        <p className="text-slate-600 text-sm">
                                                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                                Mollitia culpa hic sed atque, iusto nam autem quos. Quas
                                                                recusandae nisi, libero cumque voluptate quis ex
                                                                provident, laboriosam incidunt excepturi suscipit.
                                                        </p>
                                                </div>
                                        );
                                })}

                                {/* Pagination */}
                                <div className="flex justify-end">
                                        {
                                                <Pagination
                                                        pageNumber={currentPage}
                                                        setPageNumber={setCurrentPage}
                                                        totalItem={10}
                                                        perPage={perPage}
                                                        showPage={Math.floor(10 / 2)}
                                                />
                                        }
                                </div>
                        </div>
                </div>
        );
};

export default Reviews;
