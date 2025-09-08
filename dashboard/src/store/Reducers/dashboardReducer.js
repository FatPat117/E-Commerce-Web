import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// Get admin Seller
export const get_admin_dashboard_data = createAsyncThunk(
        "dashboard/get_admin_dashboard_data",
        async (_, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.get(`/admin/dashboard`, {
                                withCredentials: true,
                        });
                        // console.log(response.data);
                        return fulfillWithValue(response.data);
                } catch (error) {
                        return rejectWithValue(error.response.data.message);
                }
        }
);

const dashboardReducer = createSlice({
        name: "dashboard",
        initialState: {
                successMessage: "",
                errorMessage: "",
                loader: false,
                totalSale: 0,
                totalOrder: 0,
                totalProduct: 0,
                totalPendingOrder: 0,
                totalSeller: 0,
                recentOrders: [],
                recentMessages: [],
        },
        reducers: {
                messageClear: (state) => {
                        state.successMessage = "";
                        state.errorMessage = "";
                },
        },
        extraReducers: (builder) => {
                // Get admin dashboard data
                builder.addCase(get_admin_dashboard_data.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(get_admin_dashboard_data.fulfilled, (state, action) => {
                        state.loader = false;
                        state.totalSale = action.payload.data.totalSale;
                        state.totalOrder = action.payload.data.totalOrder;
                        state.totalProduct = action.payload.data.totalProduct;
                        state.totalSeller = action.payload.data.totalSeller;
                        state.recentOrders = action.payload.data.recentOrders;
                        state.recentMessages = action.payload.data.messages;
                });
                builder.addCase(get_admin_dashboard_data.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });
        },
});

export const { messageClear } = dashboardReducer.actions;
export default dashboardReducer.reducer;
