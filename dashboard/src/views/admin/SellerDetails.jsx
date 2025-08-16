import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { get_seller, messageClear, seller_status_update } from "../../store/Reducers/sellerReducer";
const SellerDetails = () => {
        const { sellerId } = useParams();
        const dispatch = useDispatch();
        const { seller, successMessage, errorMessage } = useSelector((state) => state.seller);

        useEffect(() => {
                dispatch(get_seller(sellerId));
        }, [sellerId]);
        const [status, setStatus] = useState("");

        const changeStatus = (e) => {
                e.preventDefault();
                dispatch(
                        seller_status_update({
                                sellerId,
                                status,
                        })
                );
        };

        useEffect(() => {
                if (successMessage) {
                        toast.success(successMessage);
                        dispatch(messageClear());
                }
                if (errorMessage) {
                        toast.error(errorMessage);
                        dispatch(messageClear());
                }
        }, [successMessage, errorMessage]);

        useEffect(() => {
                if (seller) {
                        setStatus(seller?.status);
                }
        }, [seller]);

        return (
                <div className="px-2 lg:px-7 pt-5">
                        <h1 className="text-[20px] mb-3 font-bold">Seller Details</h1>
                        <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
                                {/* Basic info and address */}
                                <div className="w-full flex flex-wrap items-start text-[#d0d2d6">
                                        {/* Avatar */}
                                        <div className="w-3/12 h-full flex items-center justify-center pt-3">
                                                <div>
                                                        {seller?.image ? (
                                                                <img
                                                                        src={seller?.image}
                                                                        alt="Avatar"
                                                                        className="w-full h-[230px]  object-cover"
                                                                />
                                                        ) : (
                                                                <img
                                                                        src="/images/admin.jpg"
                                                                        alt="Avatar"
                                                                        className="w-full h-[230px]  object-cover"
                                                                />
                                                        )}
                                                </div>
                                        </div>

                                        {/* Basic info */}
                                        <div className="w-4/12">
                                                <div className="px-0 md:px-5 py-2">
                                                        <div className="py-2 text-lg">
                                                                <h2 className="text-[#d0d2d6]">Basic Info</h2>
                                                        </div>

                                                        <div className="flex flex-col justify-between text-sm gap-2 gap-y-3 p-4 bg-[#9e97e9] rounded-md">
                                                                <div className="flex gap-2 font-bold text-[#000000]">
                                                                        <span>Name: </span>
                                                                        <span>{seller?.name}</span>
                                                                </div>

                                                                <div className="flex gap-2 font-bold text-[#000000]">
                                                                        <span>Email: </span>
                                                                        <span>{seller?.email}</span>
                                                                </div>

                                                                <div className="flex gap-2 font-bold text-[#000000]">
                                                                        <span>Role: </span>
                                                                        <span>{seller?.role}</span>
                                                                </div>

                                                                <div className="flex gap-2 font-bold text-[#000000]">
                                                                        <span>Status: </span>
                                                                        <span>{seller?.status}</span>
                                                                </div>

                                                                <div className="flex gap-2 font-bold text-[#000000]">
                                                                        <span>Payment Status: </span>
                                                                        <span>{seller?.payment}</span>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>

                                        {/* Address */}
                                        <div className="w-4/12">
                                                <div className="px-0 md:px-5 py-2">
                                                        <div className="py-2 text-lg">
                                                                <h2 className="text-[#d0d2d6]">Address</h2>
                                                        </div>

                                                        <div className="flex flex-col justify-between text-sm gap-2 gap-y-3 p-4 bg-[#9e97e9] rounded-md">
                                                                <div className="flex gap-2 font-bold text-[#000000]">
                                                                        <span>Shop Name: </span>
                                                                        <span>{seller?.shopInfo?.shopName}</span>
                                                                </div>

                                                                <div className="flex gap-2 font-bold text-[#000000]">
                                                                        <span>Division: </span>
                                                                        <span>{seller?.shopInfo?.division}</span>
                                                                </div>

                                                                <div className="flex gap-2 font-bold text-[#000000]">
                                                                        <span>District: </span>
                                                                        <span>{seller?.shopInfo?.district}</span>
                                                                </div>

                                                                <div className="flex gap-2 font-bold text-[#000000]">
                                                                        <span>Sub District: </span>
                                                                        <span>{seller?.shopInfo?.sub_district}</span>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>

                                {/* BTN */}
                                <div className="mt-3 pl-5">
                                        <form onSubmit={changeStatus}>
                                                <div className="flex gap-4 py-3">
                                                        <select
                                                                name=""
                                                                id=""
                                                                className="px-4 py-2 focus:border-indigo-500 hover:border-indigo-500 outline-none bg-[#6a5fdf] border-2 border-slate-700 rounded-lg text-[#d0d2d6] overflow-hidden cursor-pointer font-semibold"
                                                                required
                                                                value={status}
                                                                onChange={(e) => {
                                                                        setStatus(e.target.value);
                                                                }}
                                                        >
                                                                <option value="">-- Select Status --</option>
                                                                <option value="active">Active</option>
                                                                <option value="deactive">Deactive</option>
                                                        </select>

                                                        {/* Submit button */}
                                                        <div className=" text-center rounded-lg px-7 py-3  bg-red-500 w-[190px] hover:shadow-red-500/50 hover:shadow-md hover:bg-red-400 transition-colors duration-300 text-white cursor-pointer ">
                                                                <button className="cursor-pointer">Submit</button>
                                                        </div>
                                                </div>
                                        </form>
                                </div>
                        </div>
                </div>
        );
};

export default SellerDetails;
