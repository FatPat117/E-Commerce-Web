import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { get_order_details } from "../../store/reducers/orderReducer";

const OrderDetails = () => {
        const { orderId } = useParams();
        const dispatch = useDispatch();
        useEffect(() => {
                dispatch(get_order_details(orderId));
        }, [dispatch, orderId]);
        return <div>Order details</div>;
};

export default OrderDetails;
