import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// Add to cart
export const add_to_cart = createAsyncThunk("cart/add_to_cart", async (data, { fulfillWithValue, rejectWithValue }) => {
        try {
                const response = await api.post("/cart/add-to-cart", data, {
                        withCredentials: true,
                });
                return fulfillWithValue(response.data);
        } catch (error) {
                return rejectWithValue(error.response.data.message);
        }
});

// Get to cart
export const get_cart_products = createAsyncThunk(
        "cart/get_cart_products",
        async (userId, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.get(`/cart/get-cart-products/${userId}`, {
                                withCredentials: true,
                        });
                        return fulfillWithValue(response.data);
                } catch (error) {
                        return rejectWithValue(error.response.data.message);
                }
        }
);

// Delete cart product
export const delete_cart_product = createAsyncThunk(
        "cart/delete_cart_product",
        async (id, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.delete(`/cart/delete-cart-product/${id}`, {
                                withCredentials: true,
                        });
                        return fulfillWithValue(response.data);
                } catch (error) {
                        return rejectWithValue(error.response.data.message);
                }
        }
);

// Increase Cart quantity
export const quantity_increment = createAsyncThunk(
        "cart/quantity_increment",
        async ({ cartId, quantity }, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.patch(`/cart/quantity-increment/${cartId}`, {
                                quantity,
                                withCredentials: true,
                        });
                        return fulfillWithValue(response.data);
                } catch (error) {
                        return rejectWithValue(error.response.data.message);
                }
        }
);

// Decrease Cart quantity
export const quantity_decrement = createAsyncThunk(
        "cart/quantity_decrement",
        async ({ cartId, quantity }, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.patch(`/cart/quantity-decrement/${cartId}`, {
                                quantity,
                                withCredentials: true,
                        });
                        return fulfillWithValue(response.data);
                } catch (error) {
                        return rejectWithValue(error.response.data.message);
                }
        }
);

// Add to wishlist
export const add_to_wishlist = createAsyncThunk(
        "cart/add_to_wishlist",
        async (info, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.post(`/cart/add-to-wishlist`, info, {
                                withCredentials: true,
                        });
                        return fulfillWithValue(response.data);
                } catch (error) {
                        return rejectWithValue(error.response.data.message);
                }
        }
);

// Get wishlist
export const get_wishlist_products = createAsyncThunk(
        "cart/get_wishlist",
        async (userId, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.get(`/cart/get-wishlist-products/${userId}`, {
                                withCredentials: true,
                        });
                        return fulfillWithValue(response.data);
                } catch (error) {
                        return rejectWithValue(error.response.data.message);
                }
        }
);

// Remove wishlist
export const remove_wishlist_product = createAsyncThunk(
        "cart/remove_wishlist_product",
        async (wishlistId, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.delete(`/cart/remove-wishlist-product/${wishlistId}`, {
                                withCredentials: true,
                        });

                        return fulfillWithValue(response.data);
                } catch (error) {
                        return rejectWithValue(error.response.data.message);
                }
        }
);

const cartReducer = createSlice({
        name: "cart",
        initialState: {
                loader: false,
                cartProducts: [],
                cartProductsTotal: 0,
                wishlistProducts: [],
                wishlistProductsTotal: 0,
                price: 0,
                shippingFee: 0,
                outOfStockProducts: [],
                errorMessage: "",
                successMessage: "",
                buyProductItem: 0,
        },
        reducers: {
                messageClear(state) {
                        state.errorMessage = "";
                        state.successMessage = "";
                },
                cartReset(state) {
                        state.cartProducts = [];
                        state.cartProductsTotal = 0;
                        state.wishlistProducts = [];
                        state.wishlistProductsTotal = 0;
                        state.price = 0;
                },
        },
        extraReducers: (builder) => {
                builder.addCase(add_to_cart.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(add_to_cart.fulfilled, (state, action) => {
                        state.loader = false;
                        state.cartProducts.push(action.payload.data);
                        state.cartProductsTotal = state.cartProductsTotal + 1;
                        state.successMessage = action.payload.message;
                });
                builder.addCase(add_to_cart.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });

                //  Get cart
                builder.addCase(get_cart_products.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(get_cart_products.fulfilled, (state, action) => {
                        state.loader = false;
                        state.cartProducts = action.payload.data.cartProducts;
                        state.price = action.payload.data.price;
                        state.cartProductsTotal =
                                action.payload.data.cartProductsTotal > 100
                                        ? "99+"
                                        : action.payload.data.cartProductsTotal;
                        state.shippingFee = action.payload.data.shippingFee;
                        state.outOfStockProducts = action.payload.data.outOfStockProducts;
                        state.buyProductItem = action.payload.data.buyProductItem;
                        state.successMessage = action.payload.message;
                });
                builder.addCase(get_cart_products.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });

                // Delete cart-product
                builder.addCase(delete_cart_product.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(delete_cart_product.fulfilled, (state, action) => {
                        state.loader = false;
                        state.cartProductsTotal = state.cartProductsTotal - 1;
                        state.successMessage = action.payload.message;
                });
                builder.addCase(delete_cart_product.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });

                // Increase cart product
                builder.addCase(quantity_increment.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(quantity_increment.fulfilled, (state, action) => {
                        state.loader = false;
                        state.cartProductsTotal = state.cartProductsTotal + 1;
                        state.successMessage = action.payload.message;
                });
                builder.addCase(quantity_increment.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });

                //Decrease cart product
                builder.addCase(quantity_decrement.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(quantity_decrement.fulfilled, (state, action) => {
                        state.loader = false;
                        state.cartProductsTotal = state.cartProductsTotal + 1;
                        state.successMessage = action.payload.message;
                });
                builder.addCase(quantity_decrement.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });

                //Add to wishlist
                builder.addCase(add_to_wishlist.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(add_to_wishlist.fulfilled, (state, action) => {
                        state.loader = false;
                        state.successMessage = action.payload.message;
                        state.wishlistProductsTotal =
                                state.wishlistProductsTotal > 0 ? state.wishlistProductsTotal + 1 : 1;
                        state.wishlistProducts.push(action.payload.data);
                });
                builder.addCase(add_to_wishlist.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });

                // Get wishlist product
                builder.addCase(get_wishlist_products.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(get_wishlist_products.fulfilled, (state, action) => {
                        state.loader = false;
                        state.wishlistProducts = action.payload.data.wishlistProducts;
                        state.wishlistProductsTotal = action.payload.data.wishlistProductsTotal;
                });
                builder.addCase(get_wishlist_products.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });

                // Delete wishlist product
                builder.addCase(remove_wishlist_product.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(remove_wishlist_product.fulfilled, (state, action) => {
                        state.loader = false;
                        state.successMessage = action.payload.message;
                        state.wishlistProducts = state.wishlistProducts.filter(
                                (product) => product._id !== action.payload.data.wishlistProduct._id
                        );
                        state.wishlistProductsTotal = state.wishlistProductsTotal - 1;
                });
                builder.addCase(remove_wishlist_product.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });
        },
});

export default cartReducer.reducer;

export const { messageClear, cartReset } = cartReducer.actions;
