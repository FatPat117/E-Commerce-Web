import React from "react";
import { FaList } from "react-icons/fa";

const Dashboard = () => {
        return (
                <div>
                        <div className="bg-slate-200 mt-5">
                                <div className="w-[90%] mx-auto block md-lg:hidden ">
                                        <button className="text-center p-3 bg-[#059473] text-white">
                                                <FaList />
                                        </button>
                                </div>
                        </div>
                </div>
        );
};

export default Dashboard;
