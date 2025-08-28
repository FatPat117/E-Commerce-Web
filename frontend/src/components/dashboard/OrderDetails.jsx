import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { get_order_details } from "../../store/reducers/orderReducer";

const OrderDetails = () => {
        const { orderId } = useParams();
        const dispatch = useDispatch();
        const { userInfo } = useSelector((state) => state.auth);
        const { myOrder } = useSelector((state) => state.order);
        useEffect(() => {
                dispatch(get_order_details(orderId));
        }, [dispatch, orderId]);
        return (
                <div className="bg-white p-4">
                        <h2 className="text-slate-600 font-semibold">
                                #{myOrder._id}, <span className="pl-1">{myOrder.date}</span>
                        </h2>

                        <div className="grid grids-cols-1 md-lg:grid-cols-2 gap-3 lg:text-lg">
                                <div className="flex flex-col gap-1 gap-y-3">
                                        <h2 className="text-slate-600 font-semibold font-sans">
                                                Delivery To: {myOrder?.shippingInfo?.name}
                                        </h2>
                                        <p>
                                                <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2 py-2 rounded">
                                                        Home
                                                </span>
                                                <span className="text-slate-600 text-sm">
                                                        {myOrder?.shippingInfo?.address}
                                                </span>
                                        </p>
                                        <p className="text-slate-600 text-md font-semibold">Email: {userInfo?.email}</p>
                                </div>
                                <div className="text-slate-600 lg:text-lg">
                                        <h2 className="font-mono">Price : ${myOrder?.price} Include Shipping Fee</h2>
                                        <p className="font-mono mt-2">
                                                Payment Status:{" "}
                                                <span
                                                        className={`py-[2px] text-xs px-3 rounded-sm ${
                                                                myOrder?.paymentStatus === "paid"
                                                                        ? "bg-green-300 text-green-800"
                                                                        : "bg-red-300 text-red-800"
                                                        }`}
                                                >
                                                        {myOrder?.paymentStatus}
                                                </span>
                                        </p>

                                        <p className="font-mono mt-2">
                                                Order Status:{" "}
                                                <span
                                                        className={`py-[2px] text-xs px-3 rounded-sm ${
                                                                myOrder?.deliveryStatus != "cancelled"
                                                                        ? "bg-green-300 text-green-800"
                                                                        : "bg-red-300 text-red-800"
                                                        }`}
                                                >
                                                        {myOrder?.deliveryStatus}
                                                </span>
                                        </p>
                                </div>
                        </div>

                        {/* Product */}
                        <div className="mt-4">
                                <h2 className="text-slate-600 text-xl pb-2 font-sans font-bold">Order Products</h2>
                                <div className="flex gap-5 flex-col">
                                        {myOrder?.products?.map((product, idx) => {
                                                return (
                                                        <div
                                                                key={idx}
                                                                className="flex justify-between items-center py-3 border-b border-slate-200"
                                                        >
                                                                {/* Left: Image + Info */}
                                                                <div className="flex gap-3 items-center">
                                                                        <img
                                                                                src={product.images[0]}
                                                                                alt={product.name}
                                                                                className="w-[60px] h-[60px] object-cover rounded"
                                                                        />
                                                                        <div className="flex flex-col text-sm text-slate-600">
                                                                                <Link className="font-medium text-slate-800 hover:underline text-lg">
                                                                                        {product.name}
                                                                                </Link>
                                                                                <span className="text-md mt-1">
                                                                                        Brand: {product.brand}
                                                                                </span>
                                                                                <span className="text-md mt-1">
                                                                                        Quantity: {product.quantity}
                                                                                </span>
                                                                        </div>
                                                                </div>

                                                                {/* Right: Price */}
                                                                <div className="text-right min-w-[100px] ">
                                                                        <h2 className="text-lg text-green-600 font-semibold">
                                                                                $
                                                                                {product.price -
                                                                                        Math.floor(
                                                                                                (product.price *
                                                                                                        product.discount) /
                                                                                                        100
                                                                                        )}
                                                                        </h2>
                                                                        <p className="line-through text-slate-500">
                                                                                ${product.price}
                                                                        </p>
                                                                        <p className="text-slate-600">
                                                                                -{product.discount}%
                                                                        </p>
                                                                </div>
                                                        </div>
                                                );
                                        })}
                                </div>
                        </div>
                </div>
        );
};

export default OrderDetails;
