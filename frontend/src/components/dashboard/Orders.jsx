import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { get_order } from "../../store/reducers/orderReducer";
const Orders = () => {
        const navigate = useNavigate();
        const [state, setState] = useState("all");
        const dispatch = useDispatch();
        const { userInfo } = useSelector((state) => state.auth);
        const { myOrders } = useSelector((state) => state.order);
        useEffect(() => {
                dispatch(get_order({ customerId: userInfo.id, status: state }));
        }, [state, userInfo.id, dispatch]);

        const redirect = (order) => {
                let items = 0;
                for (let i = 0; i < order.products.length; i++) {
                        items += order.products[i].quantity;
                }
                navigate("/payment", {
                        state: {
                                price: order?.price,
                                items: items,
                                orderId: order?._id,
                        },
                });
        };
        return (
                <div className="bg-white p-4 rounded-md">
                        <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold text-slate-600">My orders</h2>
                                <select
                                        name=""
                                        id=""
                                        className="outline-none px-3 py-1 border rounded-md text-slate-600"
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                >
                                        <option value="all">--Order Status--</option>
                                        <option value="placed">Placed</option>
                                        <option value="pending">Pending</option>
                                        <option value="cancelled">Cancelled</option>
                                        <option value="warehouse">Warehouse</option>
                                </select>
                        </div>

                        <div className="pt-4">
                                {" "}
                                {/* Table */}
                                <div className="relative overflow-x-auto rounded-md">
                                        <table className="w-full text-sm text-left text-gray-500 ">
                                                <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
                                                        <tr>
                                                                <th scope="col" className="px-6 py-3">
                                                                        Order Id
                                                                </th>
                                                                <th scope="col" className="px-6 py-3">
                                                                        Price
                                                                </th>
                                                                <th scope="col" className="px-6 py-3">
                                                                        Payment Status
                                                                </th>
                                                                <th scope="col" className="px-6 py-3">
                                                                        Order Status
                                                                </th>
                                                                <th scope="col" className="px-6 py-3">
                                                                        Action
                                                                </th>
                                                        </tr>
                                                </thead>
                                                <tbody>
                                                        {myOrders.map((data, idx) => {
                                                                return (
                                                                        <tr
                                                                                key={idx}
                                                                                className="bg-white border-b border-slate-200"
                                                                        >
                                                                                <td
                                                                                        scope="row"
                                                                                        className="px-6 py-4 font-medium whitespace-nowrap"
                                                                                >
                                                                                        {data._id}
                                                                                </td>
                                                                                <td
                                                                                        scope="row"
                                                                                        className="px-6 py-4 font-medium whitespace-nowrap"
                                                                                >
                                                                                        {data.price}
                                                                                </td>
                                                                                <td
                                                                                        scope="row"
                                                                                        className="px-6 py-4 font-medium whitespace-nowrap"
                                                                                >
                                                                                        {data.paymentStatus}
                                                                                </td>
                                                                                <td
                                                                                        scope="row"
                                                                                        className="px-6 py-4 font-medium whitespace-nowrap"
                                                                                >
                                                                                        {data.deliveryStatus}
                                                                                </td>
                                                                                <td
                                                                                        scope="row"
                                                                                        className="px-6 py-4 font-medium whitespace-nowrap"
                                                                                >
                                                                                        <Link
                                                                                                to={`dashboard/order/${data._id}  `}
                                                                                        >
                                                                                                <span className="bg-green-200 font-semibold text-md mr-2 px-3 py-[2px] rounded-md">
                                                                                                        View
                                                                                                </span>
                                                                                        </Link>

                                                                                        {data.paymentStatus !=
                                                                                                "paid" && (
                                                                                                <span
                                                                                                        onClick={() =>
                                                                                                                redirect(
                                                                                                                        data
                                                                                                                )
                                                                                                        }
                                                                                                        className="cursor-pointer bg-green-200 font-semibold text-md mr-2 px-3 py-[2px] rounded-md"
                                                                                                >
                                                                                                        Pay Now
                                                                                                </span>
                                                                                        )}
                                                                                </td>
                                                                        </tr>
                                                                );
                                                        })}
                                                </tbody>
                                        </table>
                                </div>
                        </div>
                </div>
        );
};

export default Orders;
