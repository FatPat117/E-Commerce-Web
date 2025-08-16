import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// Add category
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
                        // console.log(response.data);
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
        },
        reducers: {
                messageClear: (state) => {
                        state.successMessage = "";
                        state.errorMessage = "";
                },
        },
        extraReducers: (builder) => {
                // Add category
                builder.addCase(add_category.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(add_category.fulfilled, (state, action) => {
                        state.loader = false;
                        state.successMessage = action.payload.message;
                        state.categories.push(action.payload.data.category);
                });
                builder.addCase(add_category.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });
        },
});

export const { messageClear } = sellerReducer.actions;
export default sellerReducer.reducer;
