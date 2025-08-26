import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// Add to cart
export const place_order = createAsyncThunk(
        "order/place_order",
        async (
                { price, products, shippingFee, items, shippingInfo, userInfo, navigate },
                { fulfillWithValue, rejectWithValue }
        ) => {
                try {
                        const response = await api.post(
                                "/order/place-order",
                                {
                                        price,
                                        products,
                                        shippingFee,
                                        items,
                                        shippingInfo,
                                        userInfo,
                                        navigate,
                                },
                                { withCredentials: true }
                        );
                        console.log(response.data);
                        return fulfillWithValue(response.data);
                } catch (error) {
                        return rejectWithValue(error.response.data.message);
                }
        }
);

const orderReducer = createSlice({
        name: "order",
        initialState: {
                myOrders: [],
                errorMessage: "",
                successMessage: "",
                myOrder: {},
        },
        reducers: {
                messageClear(state) {
                        state.errorMessage = "";
                        state.successMessage = "";
                },
        },
        extraReducers: (builder) => {},
});

export default orderReducer.reducer;

export const { messageClear } = orderReducer.actions;
