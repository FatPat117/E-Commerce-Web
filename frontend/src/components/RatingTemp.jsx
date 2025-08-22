import React from "react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
const RatingTemp = ({ ratings }) => {
        if (ratings === 5) {
                return (
                        <>
                                <span className="text-[#EDBB0E]">
                                        <FaStar />
                                </span>
                                <span className="text-[#EDBB0E]">
                                        <FaStar />
                                </span>
                                <span className="text-[#EDBB0E]">
                                        <FaStar />
                                </span>
                                <span className="text-[#EDBB0E]">
                                        <FaStar />
                                </span>
                                <span className="text-[#EDBB0E]">
                                        <FaStar />
                                </span>
                        </>
                );
        } else if (ratings === 4) {
                return (
                        <>
                                <span className="text-[#EDBB0E]">
                                        <FaStar />
                                </span>
                                <span className="text-[#EDBB0E]">
                                        <FaStar />
                                </span>
                                <span className="text-[#EDBB0E]">
                                        <FaStar />
                                </span>
                                <span className="text-[#EDBB0E]">
                                        <FaStar />
                                </span>
                                <span className="text-[#EDBB0E]">
                                        <CiStar />
                                </span>
                        </>
                );
        } else if (ratings === 3) {
                return (
                        <>
                                <span className="text-[#EDBB0E]">
                                        <FaStar />
                                </span>
                                <span className="text-[#EDBB0E]">
                                        <FaStar />
                                </span>
                                <span className="text-[#EDBB0E]">
                                        <FaStar />
                                </span>
                                <span className="text-[#EDBB0E]">
                                        <CiStar />
                                </span>
                                <span className="text-[#EDBB0E]">
                                        <CiStar />
                                </span>
                        </>
                );
        } else if (ratings === 2) {
                return (
                        <>
                                <span className="text-[#EDBB0E]">
                                        <FaStar />
                                </span>
                                <span className="text-[#EDBB0E]">
                                        <FaStar />
                                </span>
                                <span className="text-[#EDBB0E]">
                                        <CiStar />
                                </span>
                                <span className="text-[#EDBB0E]">
                                        <CiStar />
                                </span>
                                <span className="text-[#EDBB0E]">
                                        <CiStar />
                                </span>
                        </>
                );
        } else if (ratings === 1) {
                return (
                        <>
                                {" "}
                                <span className="text-[#EDBB0E]">
                                        <FaStar />
                                </span>
                                <span className="text-[#EDBB0E]">
                                        <CiStar />
                                </span>
                                <span className="text-[#EDBB0E]">
                                        <CiStar />
                                </span>
                                <span className="text-[#EDBB0E]">
                                        <CiStar />
                                </span>
                                <span className="text-[#EDBB0E]">
                                        <CiStar />
                                </span>
                        </>
                );
        } else {
                <>
                        {" "}
                        <span className="text-[#EDBB0E]">
                                <CiStar />
                        </span>
                        <span className="text-[#EDBB0E]">
                                <CiStar />
                        </span>
                        <span className="text-[#EDBB0E]">
                                <CiStar />
                        </span>
                        <span className="text-[#EDBB0E]">
                                <CiStar />
                        </span>
                        <span className="text-[#EDBB0E]">
                                <CiStar />
                        </span>
                </>;
        }
        return <div>Rating Temp</div>;
};

export default RatingTemp;
