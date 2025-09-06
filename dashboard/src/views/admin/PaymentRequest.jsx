import moment from "moment";
import React, { forwardRef, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { FixedSizeList as List } from "react-window";
import { confirm_payment_request, get_admin_request_payment, messageClear } from "../../store/Reducers/paymentReducer";
function handleOnWheel({ deltaY }) {
        // console.log(deltaY);
}

const outerElementType = forwardRef((props, ref) => {
        return <div ref={ref} {...props} onWheel={handleOnWheel} />;
});

const PaymentRequest = () => {
        const dispatch = useDispatch();
        const [paymentId, setPaymentId] = useState("");
        const { pendingWithdraws, loader, successMessage, errorMessage } = useSelector((state) => state.payment);

        const Row = ({ index, style }) => {
                return (
                        <div style={style} className="flex text-sm border-b border-gray-300 text-white font-semibold ">
                                <div className="w-[25%] p-2 whitespace-nowrap">{index + 1}</div>
                                <div className="w-[25%] p-2 whitespace-nowrap">${pendingWithdraws[index]?.amount}</div>
                                <div className="w-[25%] p-2 whitespace-nowrap">
                                        <span className="py-[2px] px-[5px] bg-slate-300 text-blue-500 rounded-md text-sm">
                                                {pendingWithdraws[index]?.status}
                                        </span>
                                </div>
                                <div className="w-[25%] p-2 whitespace-nowrap">
                                        {moment(pendingWithdraws[index]?.createdAt).format("DD MMM YYYY")}
                                </div>
                                <div className="w-[25%] p-2 whitespace-nowrap">
                                        <button
                                                disabled={loader}
                                                onClick={() => confirmPaymentRequest(pendingWithdraws[index]._id)}
                                                className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-[2px] cursor-pointer text-white rounded-md text-sm"
                                        >
                                                {loader && paymentId == pendingWithdraws[index]._id
                                                        ? "Loading..."
                                                        : "Confirm"}
                                        </button>
                                </div>
                        </div>
                );
        };

        useEffect(() => {
                dispatch(get_admin_request_payment());
        }, []);

        const confirmPaymentRequest = (id) => {
                setPaymentId(id);
                dispatch(confirm_payment_request(id));
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
                <div className="px-2 lg:px-7 pt-5">
                        <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
                                <h2 className="text-xl font-medium pb-5 text-[#d0d2d6]">Withdraw Requests</h2>
                                <div className="w-full ">
                                        {/* List */}
                                        <div className="w-full overflow-x-auto ">
                                                <div className="flex bg-[#a7a3de] uppercase text-sm font-bold min-w-[340px] rounded-md">
                                                        <div className="w-[25%] p-2">No</div>
                                                        <div className="w-[25%] p-2">Amount</div>
                                                        <div className="w-[25%] p-2">Status</div>
                                                        <div className="w-[25%] p-2">Date</div>
                                                        <div className="w-[25%] p-2">Action</div>
                                                </div>

                                                {/* React Window */}
                                                <List
                                                        style={{ minWidth: "340px" }}
                                                        className="List"
                                                        height={350}
                                                        itemCount={pendingWithdraws?.length}
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
