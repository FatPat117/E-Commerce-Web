import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// place order
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

// get order
export const get_order = createAsyncThunk(
        "order/get_order",
        async ({ customerId, status }, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.get(`/order/get-order/${customerId}/${status}`, {
                                withCredentials: true,
                        });
                        // console.log(response.data);

                        return fulfillWithValue(response.data);
                } catch (error) {
                        return rejectWithValue(error.response.data.message);
                }
        }
);

// get order Details
export const get_order_details = createAsyncThunk(
        "order/get_order_details",
        async (orderId, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.get(`/order/get-order-details/${orderId}`, {
                                withCredentials: true,
                        });
                        // console.log(response.data);

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
                loading: false,
        },
        reducers: {
                messageClear(state) {
                        state.errorMessage = "";
                        state.successMessage = "";
                },
        },
        extraReducers: (builder) => {
                // Place orders
                builder.addCase(place_order.pending, (state) => {
                        state.loading = true;
                });
                builder.addCase(place_order.fulfilled, (state, action) => {
                        state.successMessage = action.payload.message;
                });
                builder.addCase(place_order.rejected, (state, action) => {
                        state.loading = false;
                        state.errorMessage = action.payload;
                });

                // Get orders
                builder.addCase(get_order.pending, (state) => {
                        state.loading = true;
                });
                builder.addCase(get_order.fulfilled, (state, action) => {
                        state.myOrders = action.payload.data.orders;
                });
                builder.addCase(get_order.rejected, (state, action) => {
                        state.loading = false;
                        state.errorMessage = action.payload;
                });

                // Get order details

                builder.addCase(get_order_details.pending, (state) => {
                        state.loading = true;
                });
                builder.addCase(get_order_details.fulfilled, (state, action) => {
                        state.myOrder = action.payload.data.order;
                });
                builder.addCase(get_order_details.rejected, (state, action) => {
                        state.loading = false;
                        state.errorMessage = action.payload;
                });
        },
});

export default orderReducer.reducer;

export const { messageClear } = orderReducer.actions;
