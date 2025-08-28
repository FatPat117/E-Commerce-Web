import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// Add to cart
export const get_dashboard_index_data = createAsyncThunk(
        "dashboard/get_dashboard_index_data",
        async (userId, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.get(`/order/get-dashboard-data/${userId}`, {
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
                loader: false,
                errorMessage: "",
                successMessage: "",
                recentOrder: [],
                totalOrder: 0,
                pendingOrder: 0,
                cancelledOrder: 0,
        },
        reducers: {
                messageClear(state) {
                        state.errorMessage = "";
                        state.successMessage = "";
                },
        },
        extraReducers: (builder) => {},
});

export default dashboardReducer.reducer;

export const { messageClear } = dashboardReducer.actions;
