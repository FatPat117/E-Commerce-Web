import React, { forwardRef } from "react";
import { FixedSizeList as List } from "react-window";
function handleOnWheel({ deltaY }) {
        console.log(deltaY);
}

const outerElementType = forwardRef((props, ref) => {
        return <div ref={ref} {...props} onWheel={handleOnWheel} />;
});

const PaymentRequest = () => {
        const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        const Row = ({ index, style }) => {
                return (
                        <div style={style} className="flex text-sm border-b border-gray-300 text-white font-semibold ">
                                <div className="w-[25%] p-2 whitespace-nowrap">{index + 1}</div>
                                <div className="w-[25%] p-2 whitespace-nowrap">$43434</div>
                                <div className="w-[25%] p-2 whitespace-nowrap">
                                        <span className="py-[2px] px-[5px] bg-slate-300 text-blue-500 rounded-md text-sm">
                                                Pending
                                        </span>
                                </div>
                                <div className="w-[25%] p-2 whitespace-nowrap">25 Oct 2024</div>
                                <div className="w-[25%] p-2 whitespace-nowrap">
                                        <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-[2px] cursor-pointer text-white rounded-md text-sm">
                                                Confirm
                                        </button>
                                </div>
                        </div>
                );
        };

        return (
                <div className="px-2 lg:px-7 pt-5">
                        <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
                                <h2 className="text-xl font-medium pb-5 text-[#d0d2d6]">Withdraw Requests</h2>
                                <div className="w-full ">
                                        <div className="w-full overflow-x-auto ">
                                                <div className="flex bg-[#a7a3de] uppercase text-sm font-bold min-w-[340px] rounded-md">
                                                        <div className="w-[25%] p-2">No</div>
                                                        <div className="w-[25%] p-2">Amount</div>
                                                        <div className="w-[25%] p-2">Status</div>
                                                        <div className="w-[25%] p-2">Date</div>
                                                        <div className="w-[25%] p-2">Action</div>
                                                </div>

                                                <List
                                                        style={{ minWidth: "340px" }}
                                                        className="List"
                                                        height={350}
                                                        itemCount={array.length}
                                                        itemSize={37}
                                                        outerElementType={outerElementType}
                                                >
                                                        {Row}
                                                </List>
                                        </div>
                                </div>
                        </div>
                </div>
        );
};

export default PaymentRequest;
