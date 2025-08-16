import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// Get seller requests
export const get_seller_request = createAsyncThunk(
        "seller/get_seller_request",
        async ({ perPage, page, searchValue }, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.get(
                                `/seller/request-seller?perPage=${perPage}&page=${page}&searchValue=${searchValue}`,
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

// Get seller
export const get_seller = createAsyncThunk(
        "seller/get_seller",
        async (sellerId, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.get(`/seller/${sellerId}`, {
                                withCredentials: true,
                        });
                        // console.log(response.data);
                        return fulfillWithValue(response.data);
                } catch (error) {
                        return rejectWithValue(error.response.data.message);
                }
        }
);

// Update seller status
export const seller_status_update = createAsyncThunk(
        "seller/seller_status_update",
        async (data, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.patch(`/seller/status-update/${data.sellerId}`, {
                                data,
                                withCredentials: true,
                        });
                        console.log(response.data);
                        return fulfillWithValue(response.data);
                } catch (error) {
                        return rejectWithValue(error.response.data.message);
                }
        }
);

const sellerReducer = createSlice({
        name: "category",
        initialState: {
                successMessage: "",
                errorMessage: "",
                loader: false,
                sellers: [],
                totalSeller: 0,
                seller: null,
        },
        reducers: {
                messageClear: (state) => {
                        state.successMessage = "";
                        state.errorMessage = "";
                },
        },
        extraReducers: (builder) => {
                // Get seller requests
                builder.addCase(get_seller_request.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(get_seller_request.fulfilled, (state, action) => {
                        state.loader = false;
                        state.successMessage = action.payload.message;
                        state.sellers = action.payload.data.sellers;
                        state.totalSeller = action.payload.data.totalSeller;
                });
                builder.addCase(get_seller_request.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });

                // Get seller
                builder.addCase(get_seller.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(get_seller.fulfilled, (state, action) => {
                        state.loader = false;
                        state.successMessage = action.payload.message;
                        state.seller = action.payload.data.seller;
                });
                builder.addCase(get_seller.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });

                // Update seller status
                builder.addCase(seller_status_update.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(seller_status_update.fulfilled, (state, action) => {
                        state.loader = false;
                        state.successMessage = action.payload.message;
                        state.seller = action.payload.data.seller;
                });
                builder.addCase(seller_status_update.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });
        },
});

export const { messageClear } = sellerReducer.actions;
export default sellerReducer.reducer;
