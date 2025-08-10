import React, { useState } from "react";
import Chart from "react-apexcharts";
import { FaCartArrowDown, FaShoppingCart } from "react-icons/fa";
import { MdCurrencyExchange, MdProductionQuantityLimits } from "react-icons/md";
import { Link } from "react-router-dom";
const SellerDashboard = () => {
        const [state, setState] = useState({
                series: [
                        {
                                name: "Orders",
                                data: [10, 20, 32, 34, 40, 42, 50, 55, 58, 60],
                        },
                        {
                                name: "Revenues",
                                data: [10, 35, 20, 40, 30, 25, 50, 60, 70, 80],
                        },
                        {
                                name: "Sales",
                                data: [3, 5, 10, 15, 20, 25, 30, 35, 40, 45],
                        },
                ],
                options: {
                        // colors: ["#181ee8", "#181ee8"],
                        plotOptions: {
                                bar: {
                                        borderRadius: 3,
                                        columnWidth: "70%",
                                },
                        },
                        chart: {
                                background: "transparent",
                                foreColor: "#d0d2d6",
                        },
                        dataLabels: {
                                enabled: false,
                        },
                        stroke: {
                                show: true,
                                curve: ["smooth", "straight", "stepline"],
                                lineCap: "butt",
                                colors: "#f0f0f0",
                                width: 0.5,
                                dashArray: 0,
                        },
                        xaxis: {
                                categories: [
                                        "Jan",
                                        "Feb",
                                        "Mar",
                                        "Apr",
                                        "May",
                                        "Jun",
                                        "Jul",
                                        "Aug",
                                        "Sep",
                                        "Oct",
                                        "Nov",
                                        "Dec",
                                ],
                                labels: {
                                        style: {
                                                colors: "#d0d2d6",
                                        },
                                },
                        },
                        legend: {
                                position: "top",
                        },
                        responsive: [
                                {
                                        breakpoint: 565,
                                        options: {
                                                chart: { height: 550 },
                                                plotOptions: { bar: { horizontal: true } },
                                        },
                                },
                        ],
                },
        });

        return (
                <div className="px-2 md:px-7 py-5">
                        {/* First Part: Total Sales, Products, Sellers, Orders */}
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-7 wrap">
                                {/* Total Sales */}
                                <div className="flex justify-between items-center p-5 bg-[#fae8e8] rounded-md gap-3">
                                        <div className="flex flex-col justify-center items-start text-[#5c5a5a]">
                                                <h2 className="text-xl lg:text-3xl font-bold">$3434</h2>
                                                <span className="text-md font-medium">Total Sales</span>
                                        </div>

                                        <div className="w-[40px] h-[45px] rounded-full bg-[#fa0305] flex items-center justify-center text-xl">
                                                <MdCurrencyExchange className="text-[#fae8e8] shadow-lg" />
                                        </div>
                                </div>

                                {/* Products */}
                                <div className="flex justify-between items-center p-5 bg-[#fde2ff] rounded-md gap-3">
                                        <div className="flex flex-col justify-center items-start text-[#5c5a5a]">
                                                <h2 className="text-xl lg:text-3xl font-bold">50</h2>
                                                <span className="text-md font-medium">Products</span>
                                        </div>

                                        <div className="w-[40px] h-[45px] rounded-full bg-[#760077] flex items-center justify-center text-xl">
                                                <MdProductionQuantityLimits className="text-[#fae8e8] shadow-lg" />
                                        </div>
                                </div>

                                {/* Sellers */}
                                <div className="flex justify-between items-center p-5 bg-[#e9feea] rounded-md gap-3">
                                        <div className="flex flex-col justify-center items-start text-[#5c5a5a]">
                                                <h2 className="text-xl lg:text-3xl font-bold">60</h2>
                                                <span className="text-md font-medium">Orders</span>
                                        </div>

                                        <div className="w-[40px] h-[45px] rounded-full bg-[#038000] flex items-center justify-center text-xl">
                                                <FaShoppingCart className="text-[#fae8e8] shadow-lg" />
                                        </div>
                                </div>

                                {/* Orders */}
                                <div className="flex justify-between items-center p-5 bg-[#ecebff] rounded-md gap-3">
                                        <div className="flex flex-col justify-center items-start text-[#5c5a5a]">
                                                <h2 className="text-xl lg:text-3xl font-bold">44</h2>
                                                <span className="text-md font-medium">Pending Orders</span>
                                        </div>

                                        <div className="w-[40px] h-[45px] rounded-full bg-[#0200f8] flex items-center justify-center text-xl">
                                                <FaCartArrowDown className="text-[#fae8e8] shadow-lg" />
                                        </div>
                                </div>
                        </div>

                        {/* Second Part: Charts and Chatbox*/}
                        <div className="w-full flex flex-wrap mt-7 ">
                                {/* Charts */}
                                <div className="w-full lg:w-7/12 lg:pr-3">
                                        <div className="w-full bg-[#6a5fdf] p-4 rounded-md">
                                                <Chart
                                                        options={state.options}
                                                        series={state.series}
                                                        type="bar"
                                                        height="350"
                                                />
                                        </div>
                                </div>

                                {/* Sellers Chat */}
                                <div className="w-full lg:w-5/12 lg:pl-4 mt-7 lg:mt-0">
                                        <div className="w-full bg-[#6a5fdf] p-4  rounded-md text-[#d0d2d6] ">
                                                <div className="flex items-center justify-between">
                                                        <h2 className="font-semibold text-lg text-[#d0d2d6] pb-3">
                                                                Recent Customers Message
                                                        </h2>
                                                        <Link className="font-semibold text-sm text-[#d0d2d6] relative -top-[5px] ">
                                                                View All
                                                        </Link>
                                                </div>

                                                {/* Chat Box */}
                                                <div className="flex flex-col gap-2 pt-6 text-[#d0d2d6]">
                                                        <ol className="relative border-1 border-slate-500 ml-4">
                                                                <li className="mb-3 ml-6">
                                                                        <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#4c7fe2] z-10 rounded-full">
                                                                                <img
                                                                                        src="/images/admin.jpg"
                                                                                        alt="avatar"
                                                                                        className="w-full rounded-full h-full shadow-lg"
                                                                                />
                                                                        </div>
                                                                        <div className="p-3 bg-slate-800 rounded-lg border border-slate-500 shadow-sm">
                                                                                <div className="flex justify-between items-center mb-2">
                                                                                        <Link className="text-md font-normal">
                                                                                                Seller
                                                                                        </Link>
                                                                                        <time className="mb-1 text-sm font-normal sm:order-last sm:mb-0">
                                                                                                2 days ago
                                                                                        </time>
                                                                                </div>
                                                                                <div className="p-2 text-md font-normal bg-slate-700 rounded-lg border border-slate-800">
                                                                                        <p>How are you</p>
                                                                                </div>
                                                                        </div>
                                                                </li>
                                                                <li className="mb-3 ml-6">
                                                                        <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#4c7fe2] z-10 rounded-full">
                                                                                <img
                                                                                        src="/images/admin.jpg"
                                                                                        alt="avatar"
                                                                                        className="w-full rounded-full h-full shadow-lg"
                                                                                />
                                                                        </div>
                                                                        <div className="p-3 bg-slate-800 rounded-lg border border-slate-500 shadow-sm">
                                                                                <div className="flex justify-between items-center mb-2">
                                                                                        <Link className="text-md font-normal">
                                                                                                Admin
                                                                                        </Link>
                                                                                        <time className="mb-1 text-sm font-normal sm:order-last sm:mb-0">
                                                                                                2 days ago
                                                                                        </time>
                                                                                </div>
                                                                                <div className="p-2 text-md font-normal bg-slate-700 rounded-lg border border-slate-800">
                                                                                        <p>How are you</p>
                                                                                </div>
                                                                        </div>
                                                                </li>
                                                                <li className="mb-3 ml-6">
                                                                        <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#4c7fe2] z-10 rounded-full">
                                                                                <img
                                                                                        src="/images/admin.jpg"
                                                                                        alt="avatar"
                                                                                        className="w-full rounded-full h-full shadow-lg"
                                                                                />
                                                                        </div>
                                                                        <div className="p-3 bg-slate-800 rounded-lg border border-slate-500 shadow-sm">
                                                                                <div className="flex justify-between items-center mb-2">
                                                                                        <Link className="text-md font-normal">
                                                                                                Customers
                                                                                        </Link>
                                                                                        <time className="mb-1 text-sm font-normal sm:order-last sm:mb-0">
                                                                                                2 days ago
                                                                                        </time>
                                                                                </div>
                                                                                <div className="p-2 text-md font-normal bg-slate-700 rounded-lg border border-slate-800">
                                                                                        <p>How are you</p>
                                                                                </div>
                                                                        </div>
                                                                </li>
                                                        </ol>
                                                </div>
                                        </div>
                                </div>
                        </div>

                        {/* Third Part: Recent Orders */}
                        <div className="w-full p-4 bg-[#6a5fdf] rounded-md mt-6">
                                <div className="flex justify-between items-center">
                                        <h2 className="font-semibold text-lg text-[#d0d2d6] pb-3">Recent Orders</h2>
                                        <Link className="font-semibold text-sm text-[#d0d2d6] relative -top-[6px] ]">
                                                View All
                                        </Link>
                                </div>

                                <div className="relative overflow-x-auto">
                                        <table className="w-full text-sm text-left text-[#d0d2d6]  ">
                                                <thead className="border-b border-slate-700 uppercase text-[#d0d2d6] ">
                                                        <tr>
                                                                <th scope="col" className="py-3 px-4">
                                                                        Order Id
                                                                </th>
                                                                <th scope="col" className="py-3 px-4">
                                                                        Price
                                                                </th>
                                                                <th scope="col" className="py-3 px-4">
                                                                        Payment Status
                                                                </th>
                                                                <th scope="col" className="py-3 px-4">
                                                                        Order Status
                                                                </th>
                                                                <th scope="col" className="py-3 px-4">
                                                                        Active
                                                                </th>
                                                        </tr>
                                                </thead>
                                                {/* <tbody className="text-center"> */}
                                                <tbody className="">
                                                        {[1, 2, 3, 4, 5].map((data, idx) => {
                                                                return (
                                                                        <tr key={idx} className="border-b">
                                                                                <td
                                                                                        scope="row"
                                                                                        className="py-3 px-4 font-medium whitespace-nowrap"
                                                                                >
                                                                                        #34343
                                                                                </td>
                                                                                <td
                                                                                        scope="row"
                                                                                        className="py-3 px-4 font-medium whitespace-nowrap"
                                                                                >
                                                                                        $212
                                                                                </td>
                                                                                <td
                                                                                        scope="row"
                                                                                        className="py-3 px-4 font-medium whitespace-nowrap"
                                                                                >
                                                                                        Pending
                                                                                </td>
                                                                                <td
                                                                                        scope="row"
                                                                                        className="py-3 px-4 font-medium whitespace-nowrap"
                                                                                >
                                                                                        Delivered
                                                                                </td>
                                                                                <td
                                                                                        scope="row"
                                                                                        className="py-3 px-4 font-medium whitespace-nowrap"
                                                                                >
                                                                                        <Link>View</Link>
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

export default SellerDashboard;
