import React, { useState } from "react";
import Chart from "react-apexcharts";
import { FaCartArrowDown, FaUsers } from "react-icons/fa";
import { MdCurrencyExchange, MdProductionQuantityLimits } from "react-icons/md";

const AdminDashboard = () => {
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
                                name: "Sellers",
                                data: [3, 5, 10, 15, 20, 25, 30, 35, 40, 45],
                        },
                ],
                options: {
                        color: ["#181ee8", "#181ee8"],
                        plotOptions: {
                                radius: 30,
                        },
                        chart: {
                                background: "transparent",
                                fontColor: "#d0d2d6",
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
                },
        });

        return (
                <div className="px-2 md:px-7 py-5">
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
                                                <span className="text-md font-medium">Sellers</span>
                                        </div>

                                        <div className="w-[40px] h-[45px] rounded-full bg-[#038000] flex items-center justify-center text-xl">
                                                <FaUsers className="text-[#fae8e8] shadow-lg" />
                                        </div>
                                </div>

                                {/* Orders */}
                                <div className="flex justify-between items-center p-5 bg-[#ecebff] rounded-md gap-3">
                                        <div className="flex flex-col justify-center items-start text-[#5c5a5a]">
                                                <h2 className="text-xl lg:text-3xl font-bold">44</h2>
                                                <span className="text-md font-medium">Orders</span>
                                        </div>

                                        <div className="w-[40px] h-[45px] rounded-full bg-[#0200f8] flex items-center justify-center text-xl">
                                                <FaCartArrowDown className="text-[#fae8e8] shadow-lg" />
                                        </div>
                                </div>
                        </div>

                        {/* Charts */}
                        <div className="w-full flex flex-wrap mt-7 ">
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
                        </div>
                </div>
        );
};

export default AdminDashboard;
