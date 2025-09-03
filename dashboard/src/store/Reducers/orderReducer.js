import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// Get admin Seller
export const get_admin_orders = createAsyncThunk(
        "order/get_admin_orders",
        async ({ perPage, page, searchValue }, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.get(
                                `/order/admin/orders?perPage=${perPage}&page=${page}&searchValue=${searchValue}`,
                                {
                                        withCredentials: true,
                                }
                        );
                        // console.log(response.data);
                        return fulfillWithValue(response.data);
                } catch (error) {
                        return rejectWithValue(error.response.data.message);
                }
        }
);

// Get admin order details
export const get_admin_order_details = createAsyncThunk(
        "order/get_admin_order_details",
        async (orderId, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.get(`/order/admin/order-details/${orderId}`, {
                                withCredentials: true,
                        });
                        // console.log(response.data);
                        return fulfillWithValue(response.data);
                } catch (error) {
                        return rejectWithValue(error.response.data.message);
                }
        }
);

// Update admin order details delivery status
export const admin_order_status_update = createAsyncThunk(
        "order/admin_order_status_update",
        async ({ orderId, deliveryStatus }, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.patch(
                                `/order/admin/order-status/${orderId}`,
                                { deliveryStatus },
                                {
                                        withCredentials: true,
                                }
                        );
                        // console.log(response.data);
                        return fulfillWithValue(response.data);
                } catch (error) {
                        return rejectWithValue(error.response.data.message);
                }
        }
);

// Get seller orders
export const get_seller_orders = createAsyncThunk(
        "order/get_seller_orders",
        async ({ perPage, page, searchValue, sellerId }, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.get(
                                `/order/seller/orders/${sellerId}?perPage=${perPage}&page=${page}&searchValue=${searchValue}`,
                                {
                                        withCredentials: true,
                                }
                        );
                        // console.log(response.data);
                        return fulfillWithValue(response.data);
                } catch (error) {
                        return rejectWithValue(error.response.data.message);
                }
        }
);

// Get admin order details
export const get_seller_order_details = createAsyncThunk(
        "order/get_seller_order_details",
        async (orderId, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.get(`/order/seller/order-details/${orderId}`, {
                                withCredentials: true,
                        });
                        // console.log(response.data);
                        return fulfillWithValue(response.data);
                } catch (error) {
                        return rejectWithValue(error.response.data.message);
                }
        }
);

// Update seller order details delivery status
export const seller_order_status_update = createAsyncThunk(
        "order/seller_order_status_update",
        async ({ orderId, deliveryStatus }, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.patch(
                                `/order/seller/order-status/${orderId}`,
                                { deliveryStatus },
                                {
                                        withCredentials: true,
                                }
                        );
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
                successMessage: "",
                errorMessage: "",
                loader: false,
                totalOrder: 0,
                order: {},
                myOrders: [],
        },
        reducers: {
                messageClear: (state) => {
                        state.successMessage = "";
                        state.errorMessage = "";
                },
        },
        extraReducers: (builder) => {
                // Get admin orders
                builder.addCase(get_admin_orders.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(get_admin_orders.fulfilled, (state, action) => {
                        state.loader = false;
                        state.myOrders = action.payload.data.orders;
                        state.totalOrder = action.payload.data.totalOrder;
                });
                builder.addCase(get_admin_orders.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });

                // Get admin order details
                builder.addCase(get_admin_order_details.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(get_admin_order_details.fulfilled, (state, action) => {
                        state.loader = false;
                        state.order = action.payload.data.order;
                });
                builder.addCase(get_admin_order_details.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });

                // Update admin order details delivery status
                builder.addCase(admin_order_status_update.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(admin_order_status_update.fulfilled, (state, action) => {
                        state.loader = false;
                        state.successMessage = action.payload.message;
                });
                builder.addCase(admin_order_status_update.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });

                // Get seller orders
                builder.addCase(get_seller_orders.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(get_seller_orders.fulfilled, (state, action) => {
                        state.loader = false;
                        state.myOrders = action.payload.data.orders;
                        state.totalOrder = action.payload.data.totalOrder;
                });
                builder.addCase(get_seller_orders.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });

                // Get Seller order details
                builder.addCase(get_seller_order_details.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(get_seller_order_details.fulfilled, (state, action) => {
                        state.loader = false;
                        state.order = action.payload.data.order;
                });
                builder.addCase(get_seller_order_details.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });

                // Update seller order details delivery status
                builder.addCase(seller_order_status_update.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(seller_order_status_update.fulfilled, (state, action) => {
                        state.loader = false;
                        state.successMessage = action.payload.message;
                });
                builder.addCase(seller_order_status_update.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });
        },
});

export const { messageClear } = orderReducer.actions;
export default orderReducer.reducer;
