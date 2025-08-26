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
                        // console.log(response.data);
                        navigate("/payment", {
                                state: {
                                        price: price + shippingFee,
                                        items,
                                        orderId: response.data.data.orderId,
                                },
                        });
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
        extraReducers: (builder) => {
                builder.addCase(place_order.pending, (state, action) => {
                        state.loading = true;
                });
                builder.addCase(place_order.fulfilled, (state, action) => {
                        state.successMessage = action.payload.message;
                });
                builder.addCase(place_order.rejected, (state, action) => {
                        state.loading = false;
                        state.errorMessage = action.payload;
                });
        },
});

export default orderReducer.reducer;

export const { messageClear } = orderReducer.actions;
