import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// Add product
export const add_product = createAsyncThunk(
        "product/add_product",
        async (product, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.post("/product", product, {
                                withCredentials: true,
                                headers: {
                                        "Content-Type": "multipart/form-data",
                                },
                        });
                        // console.log(response.data);
                        return fulfillWithValue(response.data);
                } catch (error) {
                        return rejectWithValue(error.response.data.message);
                }
        }
);

// Get product
export const get_product = createAsyncThunk(
        "product/get_product",
        async ({ perPage, page, searchValue }, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.get(
                                `/product?perPage=${perPage}&page=${page}&searchValue=${searchValue}`,
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

const productReducer = createSlice({
        name: "product",
        initialState: {
                successMessage: "",
                errorMessage: "",
                loader: false,
                products: [],
                totalProduct: 0,
        },
        reducers: {
                messageClear: (state) => {
                        state.successMessage = "";
                        state.errorMessage = "";
                },
        },
        extraReducers: (builder) => {
                // Add product
                builder.addCase(add_product.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(add_product.fulfilled, (state, action) => {
                        state.loader = false;
                        state.successMessage = action.payload.message;
                        state.products.push(action.payload.data.product);
                });
                builder.addCase(add_product.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });

                //  get product
                builder.addCase(get_product.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(get_product.fulfilled, (state, action) => {
                        state.loader = false;
                        state.successMessage = action.payload.message;
                        state.totalProduct = action.payload.data.totalProduct;
                        state.products = action.payload.data.product;
                });
                builder.addCase(get_product.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });
        },
});

export const { messageClear } = productReducer.actions;
export default productReducer.reducer;
