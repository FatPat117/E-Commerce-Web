import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// Get categories
export const get_category = createAsyncThunk("home/get_category", async (_, { fulfillWithValue, rejectWithValue }) => {
        try {
                const response = await api.get("/home/get-categories", {
                        withCredentials: true,
                });
                // console.log(response.data);
                return fulfillWithValue(response.data);
        } catch (error) {
                return rejectWithValue(error.response.data.message);
        }
});

// get products
export const get_products = createAsyncThunk("home/get_products", async (_, { fulfillWithValue, rejectWithValue }) => {
        try {
                const response = await api.get("/home/get-products", {
                        withCredentials: true,
                });
                // console.log(response.data);
                return fulfillWithValue(response.data);
        } catch (error) {
                return rejectWithValue(error.response.data.message);
        }
});

// get price range
export const price_range_product = createAsyncThunk(
        "home/price_range_product",
        async (_, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.get("/home/price-range-latest-product", {
                                withCredentials: true,
                        });
                        // console.log(response.data);
                        return fulfillWithValue(response.data);
                } catch (error) {
                        return rejectWithValue(error.response.data.message);
                }
        }
);

// Query product
export const query_products = createAsyncThunk(
        "home/query_products",
        async (query, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.get(
                                `/home/query-products?category=${query.category}&rating=${query.rating}&sortByPrice=${
                                        query.sortBy
                                }&lowPrice=${query.low}&highPrice=${query.high}&pageNumber=${
                                        query.currentPage
                                }&searchValue=${query.searchValue ? query.searchValue : ""}`,
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

const homeReducer = createSlice({
        name: "home",
        initialState: {
                loader: false,
                errorMessage: "",
                successMessage: "",
                categories: [],
                products: [],
                latestProduct: [],
                ratingProduct: [],
                discountProduct: [],
                totalProducts: 0,
                perPage: 2,
                priceRange: {
                        low: 0,
                        high: 1000,
                },
        },
        reducers: {},
        extraReducers: (builder) => {
                builder.addCase(get_category.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(get_category.fulfilled, (state, action) => {
                        state.loader = false;
                        state.categories = action.payload.data;
                        state.successMessage = action.payload.message;
                });

                builder.addCase(get_category.rejected, (state, action) => {
                        state.loader = false;
                        state.error = action.payload;
                });

                // get products
                builder.addCase(get_products.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(get_products.fulfilled, (state, action) => {
                        state.loader = false;
                        state.products = action.payload.data.products;
                        state.latestProduct = action.payload.data.latestProduct;
                        state.ratingProduct = action.payload.data.ratingProduct;
                        state.discountProduct = action.payload.data.discountProduct;
                });
                builder.addCase(get_products.rejected, (state, action) => {
                        state.loader = false;
                        state.error = action.payload;
                });

                // get price Range
                builder.addCase(price_range_product.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(price_range_product.fulfilled, (state, action) => {
                        state.loader = false;
                        state.products = action.payload.data.products;
                        state.latestProduct = action.payload.data.latestProduct;
                        state.priceRange = action.payload.data.priceRange;
                });
                builder.addCase(price_range_product.rejected, (state, action) => {
                        state.loader = false;
                        state.error = action.payload;
                });

                // Product query
                builder.addCase(query_products.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(query_products.fulfilled, (state, action) => {
                        state.loader = false;
                        state.products = action.payload.data.products;
                        state.totalProducts = action.payload.data.totalProducts;
                        state.perPage = action.payload.data.perPage;
                });
                builder.addCase(query_products.rejected, (state, action) => {
                        state.loader = false;
                        state.error = action.payload;
                });
        },
});

export default homeReducer.reducer;
