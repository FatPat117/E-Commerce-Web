import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// Add product
export const get_admin_orders = createAsyncThunk(
        "product/add_product",
        async ({ perPage, page, searchValue }, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.get(
                                `/order/admin/orders?perPage=${perPage}&page=${page}&searchValue=${searchValue}`,
                                {
                                        withCredentials: true,
                                }
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
                successMessage: "",
                errorMessage: "",
                loader: false,
                totalOrder: 0,
                orders: {},
                myOrders: [],
        },
        reducers: {
                messageClear: (state) => {
                        state.successMessage = "";
                        state.errorMessage = "";
                },
        },
        extraReducers: (builder) => {
                // Add product
        },
});

export const { messageClear } = orderReducer.actions;
export default orderReducer.reducer;
