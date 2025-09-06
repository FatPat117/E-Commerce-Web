import React, { forwardRef, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { MdCurrencyExchange } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { FixedSizeList as List } from "react-window";
import { get_seller_payment_details, messageClear, send_withdraw_request } from "../../store/Reducers/paymentReducer";
function handleOnWheel({ deltaY }) {
        console.log(deltaY);
}

const outerElementType = forwardRef((props, ref) => {
        return <div ref={ref} {...props} onWheel={handleOnWheel} />;
});
const Payments = () => {
        const dispatch = useDispatch();
        const { userInfo } = useSelector((state) => state.auth);
        const {
                pendingWithdraws,
                successWithdraws,
                totalAmount,
                withdrawAmount,
                pendingAmount,
                availableAmount,
                loader,
                successMessage,
                errorMessage,
        } = useSelector((state) => state.payment);

        const [amount, setAmount] = useState(0);
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
                        </div>
                );
        };

        useEffect(() => {
                dispatch(get_seller_payment_details(userInfo?._id));
        }, [userInfo?._id]);

        const sendRequest = (e) => {
                e.preventDefault();
                if (amount != 0 && amount <= availableAmount) {
                        dispatch(send_withdraw_request({ amount, sellerId: userInfo?._id }));
                } else if (amount == 0) {
                        toast.error("Amount request is greater than 0");
                } else {
                        toast.error("Amount request is greater than available amount");
                }

                setAmount(0);
        };

        useEffect(() => {
                if (successMessage) {
                        toast.success(successMessage);
                        dispatch(messageClear());
                }
                if (errorMessage) {
                        toast.error(errorMessage);
                        dispatch(messageClear());
                }
        }, [successMessage, errorMessage]);
        return (
                <div className="px-2 md:px-7 py-5">
                        {/* First Part: Total Sales, Products, Sellers, Orders */}
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4  gap-7 wrap">
                                {/* Total Sales */}
                                <div className="flex justify-between items-center p-5 bg-[#fae8e8] rounded-md gap-3">
                                        <div className="flex flex-col justify-center items-start text-[#5c5a5a]">
                                                <h2 className="text-xl lg:text-3xl font-bold">${totalAmount}</h2>
                                                <span className="text-md font-medium">Total Sales</span>
                                        </div>

                                        <div className="w-[40px] h-[45px] rounded-full bg-[#fa0305] flex items-center justify-center text-xl">
                                                <MdCurrencyExchange className="text-[#fae8e8] shadow-lg" />
                                        </div>
                                </div>

                                {/* Products */}
                                <div className="flex justify-between items-center p-5 bg-[#fde2ff] rounded-md gap-3">
                                        <div className="flex flex-col justify-center items-start text-[#5c5a5a]">
                                                <h2 className="text-xl lg:text-3xl font-bold">${availableAmount}</h2>
                                                <span className="text-md font-medium">Available Amount</span>
                                        </div>

                                        <div className="w-[40px] h-[45px] rounded-full bg-[#760077] flex items-center justify-center text-xl">
                                                <MdCurrencyExchange className="text-[#fae8e8] shadow-lg" />
                                        </div>
                                </div>

                                {/* Sellers */}
                                <div className="flex justify-between items-center p-5 bg-[#e9feea] rounded-md gap-3">
                                        <div className="flex flex-col justify-center items-start text-[#5c5a5a]">
                                                <h2 className="text-xl lg:text-3xl font-bold">${withdrawAmount}</h2>
                                                <span className="text-md font-medium">Withdraw Amount</span>
                                        </div>

                                        <div className="w-[40px] h-[45px] rounded-full bg-[#038000] flex items-center justify-center text-xl">
                                                <MdCurrencyExchange className="text-[#fae8e8] shadow-lg" />
                                        </div>
                                </div>

                                {/* Orders */}
                                <div className="flex justify-between items-center p-5 bg-[#ecebff] rounded-md gap-3">
                                        <div className="flex flex-col justify-center items-start text-[#5c5a5a]">
                                                <h2 className="text-xl lg:text-3xl font-bold">${pendingAmount}</h2>
                                                <span className="text-md font-medium">Pending Amount</span>
                                        </div>

                                        <div className="w-[40px] h-[45px] rounded-full bg-[#0200f8] flex items-center justify-center text-xl">
                                                <MdCurrencyExchange className="text-[#fae8e8] shadow-lg" />
                                        </div>
                                </div>
                        </div>

                        {/* Second Part */}
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 pb-4 mt-5">
                                {/* Send Request */}
                                <div className="bg-[#6a5fdf] text-[#d0d2d6] rounded-md p-5">
                                        <h2 className="text-lg font-medium">Send Request</h2>

                                        {/* Request amount */}
                                        <div className="pt-5">
                                                <form onSubmit={sendRequest}>
                                                        <div className="flex gap-8 flex-wrap items-center">
                                                                <input
                                                                        min={0}
                                                                        value={amount}
                                                                        onChange={(e) => setAmount(e.target.value)}
                                                                        type="number"
                                                                        name="amount"
                                                                        placeholder="Amount"
                                                                        className="px-3 py-3 md:w-[75%] focus:outline-none focus:border-indigo-500 focus:bg-slate-900/50 border-slate-900 border-2 rounded-md text-[#d0d2d6] overflow-hidden outline-none"
                                                                />

                                                                {/* button */}
                                                                <div className=" text-center rounded-lg px-10 py-3  bg-red-500 w-[20%]  hover:shadow-red-500/50 hover:shadow-md hover:bg-red-400 transition-colors duration-300 text-white cursor-pointer ">
                                                                        <button
                                                                                disable={loader}
                                                                                className="cursor-pointer"
                                                                        >
                                                                                {loader ? "Loading..." : "Submit"}
                                                                        </button>
                                                                </div>
                                                        </div>
                                                </form>
                                        </div>

                                        {/* Request Status */}
                                        <div className="mt-5">
                                                <h2 className="text-lg pb-4">Pending Request</h2>

                                                {/* List */}
                                                <div className="w-full overflow-x-auto ">
                                                        <div className="flex bg-[#a7a3de] uppercase text-sm font-bold min-w-[340px] rounded-md">
                                                                <div className="w-[25%] p-2">No</div>
                                                                <div className="w-[25%] p-2">Amount</div>
                                                                <div className="w-[25%] p-2">Status</div>
                                                                <div className="w-[25%] p-2">Date</div>
                                                        </div>

                                                        {/* React Window */}
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

                                {/* Success Withdraw */}
                                <div className="bg-[#6a5fdf] text-[#d0d2d6] rounded-md p-5">
                                        {/* Request Status */}

                                        <h2 className="text-lg pb-4">Success Withdraw</h2>

                                        {/* List */}
                                        <div className="w-full overflow-x-auto ">
                                                <div className="flex bg-[#a7a3de] uppercase text-sm font-bold min-w-[340px] rounded-md">
                                                        <div className="w-[25%] p-2">No</div>
                                                        <div className="w-[25%] p-2">Amount</div>
                                                        <div className="w-[25%] p-2">Status</div>
                                                        <div className="w-[25%] p-2">Date</div>
                                                </div>

                                                {/* React Window */}
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

export default Payments;
