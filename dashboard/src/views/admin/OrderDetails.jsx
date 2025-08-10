import React from "react";

const OrderDetails = () => {
        return (
                <div className="px-2 lg:px-7 pt-5">
                        <div className="w-full p-4 bg-[#6a5fdf] rounded-md ">
                                {/* Select and Search field */}
                                <div className="flex justify-between items-center p-4">
                                        <h2 className="text-xl text-[#d0d2d6] font-semibold">Order Details</h2>

                                        <select
                                                name=""
                                                id=""
                                                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#475569] border border-slate-700 rounded-md text-[#d0d2d6]"
                                        >
                                                <option value="pending">Pending</option>
                                                <option value="processing">Processing</option>
                                                <option value="warehouse">Warehouse</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>
                                        </select>
                                </div>

                                {/* Order Details */}
                                <div className=" p-4">
                                        <div className="flex gap-2 text-lg text-[#d0d2d6]">
                                                <h2>#123123</h2>
                                                <span>3 Oct 2025</span>
                                        </div>
                                        <div className="flex flex-wrap">
                                                <div className="w-[30%]">
                                                        <div className="pr-3 text-[#d0d2d6] text-lg">
                                                                <div className="flex flex-col gap-1">
                                                                        <h2 className="pb-2 font-semibold text-xl">
                                                                                Deliver To: Ponyo
                                                                        </h2>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
        );
};

export default OrderDetails;
