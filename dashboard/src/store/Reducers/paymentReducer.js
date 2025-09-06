import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// Get seller payment details
export const get_seller_payment_details = createAsyncThunk(
        "payment/get_seller_payment_detail",
        async (sellerId, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.get(`/payment/seller-payment-details/${sellerId}`, {
                                withCredentials: true,
                        });
                        console.log(response.data);
                        return fulfillWithValue(response.data);
                } catch (error) {
                        return rejectWithValue(error.response.data.message);
                }
        }
);

const paymentReducer = createSlice({
        name: "payment",
        initialState: {
                successMessage: "",
                errorMessage: "",
                loader: false,
                pendingWithdraws: [],
                successWithdraws: [],
                totalAmount: 0,
                withdrawAmount: 0,
                pendingAmount: 0,
                availableAmount: 0,
        },
        reducers: {
                messageClear: (state) => {
                        state.successMessage = "";
                        state.errorMessage = "";
                },
        },
        extraReducers: (builder) => {
                // Get seller requests
                builder.addCase(get_seller_payment_details.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(get_seller_payment_details.fulfilled, (state, action) => {
                        state.loader = false;
                        state.pendingWithdraws = action.payload.data.pendingWithdraws;
                        state.successWithdraws = action.payload.data.successWithdraws;
                        state.availableAmount = action.payload.data.availableAmount;
                        state.pendingAmount = action.payload.data.pendingAmount;
                        state.withdrawAmount = action.payload.data.withdrawAmount;
                        state.totalAmount = action.payload.data.totalAmount;
                });
                builder.addCase(get_seller_payment_details.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });
        },
});

export const { messageClear } = paymentReducer.actions;
export default paymentReducer.reducer;
