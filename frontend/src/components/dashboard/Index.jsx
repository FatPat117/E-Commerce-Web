import React, { useEffect } from "react";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { get_dashboard_index_data } from "../../store/reducers/dashboardReducer";
const Index = () => {
        const dispatch = useDispatch();
        const { recentOrder, totalOrder, pendingOrder, cancelledOrder } = useSelector((state) => state.dashboard);
        const { userInfo } = useSelector((state) => state.auth);
        useEffect(() => {
                dispatch(get_dashboard_index_data(userInfo.id));
        }, [dispatch]);
        return (
                <div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                {/* Orders */}
                                <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5">
                                        <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl ">
                                                <span className="text-xl text-green-800">
                                                        {" "}
                                                        <RiShoppingCart2Fill />
                                                </span>
                                        </div>

                                        <div className="flex flex-col justify-start items-start text-slate-600">
                                                <h2 className="text-3xl font-bold">{totalOrder}</h2>
                                                <span>Orders</span>
                                        </div>
                                </div>

                                {/* Pending: Orders */}
                                <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5">
                                        <div className="bg-yellow-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl ">
                                                <span className="text-xl text-yellow-500">
                                                        {" "}
                                                        <RiShoppingCart2Fill />
                                                </span>
                                        </div>

                                        <div className="flex flex-col justify-start items-start text-slate-600">
                                                <h2 className="text-3xl font-bold">{pendingOrder}</h2>
                                                <span>Pending Orders</span>
                                        </div>
                                </div>

                                {/*Cancelled Orders */}
                                <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5">
                                        <div className="bg-red-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl ">
                                                <span className="text-xl text-red-500">
                                                        {" "}
                                                        <RiShoppingCart2Fill />
                                                </span>
                                        </div>

                                        <div className="flex flex-col justify-start items-start text-slate-600">
                                                <h2 className="text-3xl font-bold ">{cancelledOrder}</h2>
                                                <span>Cancelled Orders</span>
                                        </div>
                                </div>
                        </div>

                        <div className="bg-white p-5 mt-5 rounded-md">
                                <h2 className="text-xl font-bold">Recent Orders</h2>
                                <div className="pt-4">
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
                                                                {recentOrder?.map((data, idx) => {
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
                                                                                                <Link>
                                                                                                        <span className="bg-green-200 font-semibold text-md mr-2 px-3 py-[2px] rounded-md">
                                                                                                                View
                                                                                                        </span>
                                                                                                </Link>

                                                                                                <Link>
                                                                                                        <span className="bg-green-200 font-semibold text-md mr-2 px-3 py-[2px] rounded-md">
                                                                                                                Pay Now
                                                                                                        </span>
                                                                                                </Link>
                                                                                        </td>
                                                                                </tr>
                                                                        );
                                                                })}
                                                        </tbody>
                                                </table>
                                        </div>
                                </div>
                        </div>
                </div>
        );
};

export default Index;
