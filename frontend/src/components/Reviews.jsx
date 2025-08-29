import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import RatingReact from "react-rating";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import { customer_review, get_review, messageClear, product_details } from "../store/reducers/homeReducer";
import Pagination from "./Pagination";
import RatingTemp from "./RatingTemp";
const Reviews = ({ product }) => {
        const { userInfo } = useSelector((state) => state.auth);
        const { errorMessage, successMessage, reviews, totalReview, ratingReview } = useSelector((state) => state.home);
        const dispatch = useDispatch();
        const [currentPage, setCurrentPage] = useState(1);
        const [perPage, setPerPage] = useState(3);

        const [rate, setRate] = useState(0);
        const [review, setReview] = useState("");

        const reviewSubmit = (e) => {
                e.preventDefault();
                const obj = {
                        name: userInfo?.name,
                        review,
                        rating: rate,
                        productId: product?._id,
                };
                dispatch(customer_review(obj));
        };

        useEffect(() => {
                if (successMessage) {
                        toast.success(successMessage);
                        dispatch(get_review({ productId: product?._id, pageNumber: currentPage }));
                        dispatch(product_details(product?.slug));
                        setReview("");
                        setRate(0);
                        dispatch(messageClear());
                } else if (errorMessage) {
                        toast.error(errorMessage);
                        dispatch(messageClear());
                }
        }, [successMessage, errorMessage]);

        useEffect(() => {
                if (product && product._id) {
                        dispatch(get_review({ productId: product?._id, pageNumber: currentPage }));
                }
        }, [currentPage, product?._id]);

        return (
                <div className="mt-8">
                        {/* Star ratings */}
                        <div className="flex gap-10 md-lg:gap-20 flex-col md-lg:flex-row  ">
                                <div className="flex flex-col gap-2 justify-start items-start py-4">
                                        <div>
                                                <span className="text-6xl font-semibold">
                                                        {product?.rating?.toFixed(1, 10)}
                                                </span>
                                                <span className="text-3xl font-semibold text-slate-600">/5</span>
                                        </div>
                                        <div className="flex items-center text-3xl">
                                                <Rating ratings={product?.rating?.toFixed(1, 10)} />
                                        </div>
                                        <p className="text-sm text-slate-600">({totalReview}) Reviews</p>
                                </div>

                                <div className="flex gap-2 flex-col py-4">
                                        {/* Rating temp 5 */}
                                        <div className="flex justify-start items-center gap-5">
                                                <div className="text-md flex gap-1 w-[93px]">
                                                        <RatingTemp ratings={5} />
                                                </div>
                                                <div className="w-[200px] h-[14px] bg-slate-200 relative">
                                                        <div
                                                                style={{
                                                                        width: `${Math.floor(
                                                                                (ratingReview[0]?.sum / totalReview) *
                                                                                        100
                                                                        )}%`,
                                                                }}
                                                                className="h-full bg-[#EDBB0E]"
                                                        ></div>
                                                </div>
                                                <p className="text-sm text-slate-600 w-[0%]">{ratingReview[0]?.sum}</p>
                                        </div>

                                        {/* Rating temp 4*/}
                                        <div className="flex justify-start items-center gap-5">
                                                <div className="text-md flex gap-1 w-[93px]">
                                                        <RatingTemp ratings={4} />
                                                </div>
                                                <div className="w-[200px] h-[14px] bg-slate-200 relative">
                                                        <div
                                                                style={{
                                                                        width: `${Math.floor(
                                                                                (ratingReview[1]?.sum / totalReview) *
                                                                                        100
                                                                        )}%`,
                                                                }}
                                                                className="h-full bg-[#EDBB0E]"
                                                        ></div>
                                                </div>
                                                <p className="text-sm text-slate-600 w-[0%]">{ratingReview[1]?.sum}</p>
                                        </div>

                                        {/* Rating temp 3 */}
                                        <div className="flex justify-start items-center gap-5">
                                                <div className="text-md flex gap-1 w-[93px]">
                                                        <RatingTemp ratings={3} />
                                                </div>
                                                <div className="w-[200px] h-[14px] bg-slate-200 relative">
                                                        <div
                                                                style={{
                                                                        width: `${Math.floor(
                                                                                (ratingReview[2]?.sum / totalReview) *
                                                                                        100
                                                                        )}%`,
                                                                }}
                                                                className="h-full bg-[#EDBB0E] "
                                                        ></div>
                                                </div>
                                                <p className="text-sm text-slate-600 w-[0%]">{ratingReview[2]?.sum}</p>
                                        </div>

                                        {/* Rating temp  2*/}
                                        <div className="flex justify-start items-center gap-5">
                                                <div className="text-md flex gap-1 w-[93px]">
                                                        <RatingTemp ratings={2} />
                                                </div>
                                                <div className="w-[200px] h-[14px] bg-slate-200 relative">
                                                        <div
                                                                style={{
                                                                        width: `${Math.floor(
                                                                                (ratingReview[3]?.sum / totalReview) *
                                                                                        100
                                                                        )}%`,
                                                                }}
                                                                className="h-full bg-[#EDBB0E] "
                                                        ></div>
                                                </div>
                                                <p className="text-sm text-slate-600 w-[0%]">{ratingReview[3]?.sum}</p>
                                        </div>

                                        {/* Rating temp 1*/}
                                        <div className="flex justify-start items-center gap-5">
                                                <div className="text-md flex gap-1 w-[93px]">
                                                        <RatingTemp ratings={1} />
                                                </div>
                                                <div className="w-[200px] h-[14px] bg-slate-200 relative">
                                                        <div
                                                                style={{
                                                                        width: `${Math.floor(
                                                                                (ratingReview[4]?.sum / totalReview) *
                                                                                        100
                                                                        )}%`,
                                                                }}
                                                                className="h-full bg-[#EDBB0E]"
                                                        ></div>
                                                </div>
                                                <p className="text-sm text-slate-600 w-[0%]">{ratingReview[4]?.sum}</p>
                                        </div>

                                        {/* Rating temp 0*/}
                                        <div className="flex justify-start items-center gap-5">
                                                <div className="text-md flex gap-1 w-[93px]">
                                                        <RatingTemp ratings={0} />
                                                </div>
                                                <div className="w-[200px] h-[14px] bg-slate-200 relative">
                                                        <div
                                                                style={{
                                                                        width: `${Math.floor(
                                                                                (ratingReview[5]?.sum / totalReview) *
                                                                                        100
                                                                        )}%`,
                                                                }}
                                                                className="h-full bg-[#EDBB0E]"
                                                        ></div>
                                                </div>
                                                <p className="text-sm text-slate-600 w-[0%]">{ratingReview[5]?.sum}</p>
                                        </div>
                                </div>
                        </div>

                        {/* Product reviews */}
                        <h2 className="text-xl text-slate-600 font-bold py-5">Product reviews {totalReview}</h2>

                        {/* Review list and Pagination */}
                        <div className="flex flex-col gap-8 pb-10 pt-4">
                                {reviews?.map((data, idx) => {
                                        return (
                                                <div className="flex flex-col gap-1" key={idx}>
                                                        <div className="flex justify-between items-center">
                                                                <div className="flex gap-1 text-xl">
                                                                        <RatingTemp ratings={data?.rating} />
                                                                </div>
                                                                <span className="text-slate-600">{data?.date}</span>
                                                        </div>
                                                        <h2 className="text-md text-slate-600 md-lg:mt-4">
                                                                {data?.customerName}
                                                        </h2>
                                                        <p className="text-slate-600 text-sm">{data?.review}</p>
                                                </div>
                                        );
                                })}

                                {/* Pagination */}
                                <div className="flex justify-end">
                                        {totalReview > 5 && (
                                                <Pagination
                                                        pageNumber={currentPage}
                                                        setPageNumber={setCurrentPage}
                                                        totalItem={totalReview}
                                                        perPage={perPage}
                                                        showPage={Math.floor(totalReview / 3)}
                                                />
                                        )}
                                </div>
                        </div>

                        {/* UserInfo */}
                        <div>
                                {userInfo ? (
                                        <div className="flex flex-col gap-3">
                                                <div className="flex gap-1">
                                                        <RatingReact
                                                                onChange={(e) => {
                                                                        setRate(e);
                                                                }}
                                                                initialRating={rate}
                                                                emptySymbol={
                                                                        <span className="text-slate-600 text-4xl">
                                                                                <CiStar />
                                                                        </span>
                                                                }
                                                                fullSymbol={
                                                                        <span className="text-[#EDBB0E] text-4xl">
                                                                                <FaStar />
                                                                        </span>
                                                                }
                                                        />
                                                </div>
                                                <form onSubmit={reviewSubmit}>
                                                        <textarea
                                                                name=""
                                                                required
                                                                id=""
                                                                cols={30}
                                                                rows={5}
                                                                value={review}
                                                                onChange={(e) => {
                                                                        setReview(e.target.value);
                                                                }}
                                                                className=" outline-none p-3 w-full border-[2px] border-slate-300"
                                                        ></textarea>
                                                        <div className="mt-2 ">
                                                                <button
                                                                        type="submit"
                                                                        className=" mb-5 md-lg:mb-0 cursor-pointer py-1 px-5 bg-indigo-500 text-white rounded-sm"
                                                                >
                                                                        Submit
                                                                </button>
                                                        </div>
                                                </form>
                                        </div>
                                ) : (
                                        <div>
                                                <Link
                                                        className="py-1 px-5 bg-red-500 cursor-pointer text-white rounded-sm"
                                                        to={"/login"}
                                                >
                                                        Login
                                                </Link>
                                        </div>
                                )}
                        </div>
                </div>
        );
};

export default Reviews;
