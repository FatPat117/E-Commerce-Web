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

// Get products
export const get_products = createAsyncThunk(
        "product/get_products",
        async ({ perPage, page, searchValue }, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.get(
                                `/product?perPage=${perPage}&page=${page}&searchValue=${searchValue}`,
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

// Get discount products
export const get_discount_products = createAsyncThunk(
        "product/get_discount_products",
        async ({ perPage, page, searchValue }, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.get(
                                `/product/discount-products?perPage=${perPage}&page=${page}&searchValue=${searchValue}`,
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

// get product by id
export const get_product = createAsyncThunk(
        "product/get_product",
        async (productId, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.get(`/product/${productId}`, {
                                withCredentials: true,
                        });
                        console.log(response.data);
                        return fulfillWithValue(response.data);
                } catch (error) {
                        return rejectWithValue(error.response.data.message);
                }
        }
);

// update product by id
export const update_product = createAsyncThunk(
        "product/update_product",
        async (product, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.patch(`/product/${product.productId}`, product, {
                                withCredentials: true,
                        });
                        // console.log(response.data);
                        return fulfillWithValue(response.data);
                } catch (error) {
                        return rejectWithValue(error.response.data.message);
                }
        }
);

// update product image by id
export const product_image_update = createAsyncThunk(
        "product/product_image_update",
        async (product, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const formData = new FormData();
                        formData.append("oldImage", product.oldImage);
                        formData.append("newImage", product.newImage);
                        formData.append("productId", product.productId);

                        const response = await api.patch(
                                `/product/product-image-update/${product.productId}`,
                                formData,
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
                product: {},
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
                        state.products.push(action.payload.data.products);
                });
                builder.addCase(add_product.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });

                //  get products
                builder.addCase(get_products.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(get_products.fulfilled, (state, action) => {
                        state.loader = false;
                        state.successMessage = action.payload.message;
                        state.totalProduct = action.payload.data.totalProduct;
                        state.products = action.payload.data.products;
                });
                builder.addCase(get_products.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });

                //  get discount products
                builder.addCase(get_discount_products.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(get_discount_products.fulfilled, (state, action) => {
                        state.loader = false;
                        state.successMessage = action.payload.message;
                        state.totalProduct = action.payload.data.totalProduct;
                        state.products = action.payload.data.products;
                });
                builder.addCase(get_discount_products.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });

                // Get product by id
                builder.addCase(get_product.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(get_product.fulfilled, (state, action) => {
                        state.loader = false;
                        state.successMessage = action.payload.message;
                        state.product = action.payload.data.product;
                });
                builder.addCase(get_product.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });

                // update product by id
                builder.addCase(update_product.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(update_product.fulfilled, (state, action) => {
                        state.loader = false;
                        state.successMessage = action.payload.message;
                        state.product = action.payload.data.product;
                });
                builder.addCase(update_product.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });

                // upload image by Id
                builder.addCase(product_image_update.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(product_image_update.fulfilled, (state, action) => {
                        state.loader = false;
                        state.successMessage = action.payload.message;
                        state.product = action.payload.data.product;
                });
                builder.addCase(product_image_update.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });
        },
});

export const { messageClear } = productReducer.actions;
export default productReducer.reducer;
