import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { admin_order_status_update, get_admin_order_details, messageClear } from "../../store/Reducers/orderReducer";
const OrderDetails = () => {
        const { orderId } = useParams();
        const { order, errorMessage } = useSelector((state) => state.order);
        const { successMessage } = useSelector((state) => state.order);
        const [status, setStatus] = useState("");
        const dispatch = useDispatch();

        useEffect(() => {
                dispatch(get_admin_order_details(orderId));
        }, [dispatch, orderId]);

        const statusUpdate = (e) => {
                dispatch(admin_order_status_update({ orderId, deliveryStatus: e.target.value }));
                setStatus(e.target.value);
        };

        useEffect(() => {
                setStatus(order?.deliveryStatus);
        }, [order]);

        useEffect(() => {
                if (successMessage) {
                        toast.success(successMessage);
                        dispatch(messageClear());
                } else if (errorMessage) {
                        toast.error(errorMessage);
                        dispatch(messageClear());
                }
        }, [successMessage, errorMessage]);
        return (
                <div className="px-2 lg:px-7 pt-5">
                        <div className="w-full p-4 bg-[#6a5fdf] rounded-md ">
                                {/* Select and Search field */}
                                <div className="flex justify-between items-center p-4">
                                        <h2 className="text-xl text-[#d0d2d6] font-semibold">Order Details</h2>

                                        <select
                                                value={status}
                                                onChange={statusUpdate}
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
                                                <h2>#{order?._id}</h2>
                                                <span>{order?.date}</span>
                                        </div>

                                        <div className="flex flex-wrap mt-3">
                                                {/* Deliver To */}
                                                <div className="w-[30%]">
                                                        <div className="pr-3 text-[#d0d2d6] text-lg">
                                                                <div className="flex flex-col mt-2">
                                                                        <h2 className="font-semibold text-xl">
                                                                                Deliver To: {order?.shippingInfo?.name}
                                                                        </h2>
                                                                        <p>
                                                                                <span className="text-sm">
                                                                                        {order?.shippingInfo?.address}
                                                                                        {order?.shippingInfo?.province}
                                                                                        {order?.shippingInfo?.city}
                                                                                        {order?.shippingInfo?.area}
                                                                                </span>
                                                                        </p>
                                                                </div>

                                                                <div className="flex justify-start items-center gap-3 mt-2">
                                                                        <h2>Payment Status:</h2>
                                                                        <span className="text-base">
                                                                                {order?.paymentStatus}
                                                                        </span>
                                                                </div>

                                                                <span className="mt-2 block">
                                                                        Price: ${order?.price}
                                                                </span>

                                                                {/* Order Items */}
                                                                {order?.products?.map((data, idx) => (
                                                                        <div
                                                                                key={idx}
                                                                                className="mt-4 flex flex-col gap-4 bg-[#8288ed] rounded-lg p-2 "
                                                                        >
                                                                                <div className="text-[#d0d2d6] ">
                                                                                        <div className="flex gap-3 text-md bg-[#8288ed] rounded-lg p-2">
                                                                                                <img
                                                                                                        className="w-[50px] h-[50px] object-cover"
                                                                                                        src={
                                                                                                                data
                                                                                                                        ?.images[0] ||
                                                                                                                "/category/1.jpg"
                                                                                                        }
                                                                                                        alt="product-image"
                                                                                                />

                                                                                                <div>
                                                                                                        <h2>
                                                                                                                {
                                                                                                                        data?.name
                                                                                                                }
                                                                                                        </h2>
                                                                                                        <p>
                                                                                                                <span>
                                                                                                                        Brand
                                                                                                                        :{" "}
                                                                                                                </span>
                                                                                                                <span>
                                                                                                                        {
                                                                                                                                data?.brand
                                                                                                                        }{" "}
                                                                                                                        ||
                                                                                                                </span>
                                                                                                                <span className="text-lg">
                                                                                                                        {" "}
                                                                                                                        Quantity:
                                                                                                                        {
                                                                                                                                data?.quantity
                                                                                                                        }
                                                                                                                </span>
                                                                                                        </p>
                                                                                                </div>
                                                                                        </div>
                                                                                </div>
                                                                        </div>
                                                                ))}
                                                        </div>
                                                </div>

                                                {/* Order Items */}
                                                <div className="w-[70%]">
                                                        <div className="pl-3">
                                                                <div className="mt-4 flex flex-col bg-[#8288ed] rounded-md p-4">
                                                                        {/* Items   */}

                                                                        {order?.order?.map((data, idx) => (
                                                                                <div
                                                                                        key={idx}
                                                                                        className="text-[#d0d2d6] border border-slate-100 rounded-sm p-2"
                                                                                >
                                                                                        <div className="flex justify-start items-center gap-3 ">
                                                                                                <h2>
                                                                                                        Seller {idx + 1}{" "}
                                                                                                        Order:{" "}
                                                                                                </h2>{" "}
                                                                                                <span>
                                                                                                        {
                                                                                                                data?.deliveryStatus
                                                                                                        }
                                                                                                </span>
                                                                                        </div>

                                                                                        <div className=" flex flex-col gap-4 bg-[#8288ed] rounded-lg p-2 py-1 ">
                                                                                                {data?.products?.map(
                                                                                                        (
                                                                                                                product,
                                                                                                                idx
                                                                                                        ) => (
                                                                                                                <div
                                                                                                                        key={
                                                                                                                                idx
                                                                                                                        }
                                                                                                                        className="text-[#d0d2d6] "
                                                                                                                >
                                                                                                                        <div className="flex gap-3 text-md bg-[#8288ed] rounded-lg p-2">
                                                                                                                                <img
                                                                                                                                        className="w-[50px] h-[50px] object-cover"
                                                                                                                                        src={
                                                                                                                                                product
                                                                                                                                                        ?.images[0] ||
                                                                                                                                                "/category/1.jpg"
                                                                                                                                        }
                                                                                                                                        alt="product-image"
                                                                                                                                />

                                                                                                                                <div>
                                                                                                                                        <h2>
                                                                                                                                                {
                                                                                                                                                        product?.name
                                                                                                                                                }
                                                                                                                                        </h2>
                                                                                                                                        <p>
                                                                                                                                                <span>
                                                                                                                                                        Brand
                                                                                                                                                        :{" "}
                                                                                                                                                </span>
                                                                                                                                                <span>
                                                                                                                                                        {
                                                                                                                                                                product?.brand
                                                                                                                                                        }{" "}
                                                                                                                                                        ||
                                                                                                                                                </span>
                                                                                                                                                <span className="text-lg">
                                                                                                                                                        {" "}
                                                                                                                                                        Quantity:
                                                                                                                                                        {
                                                                                                                                                                product?.quantity
                                                                                                                                                        }
                                                                                                                                                </span>
                                                                                                                                        </p>
                                                                                                                                </div>
                                                                                                                        </div>
                                                                                                                </div>
                                                                                                        )
                                                                                                )}
                                                                                        </div>
                                                                                </div>
                                                                        ))}
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
