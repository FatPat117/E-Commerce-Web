import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// Add to cart
export const add_to_cart = createAsyncThunk("cart/add_to_cart", async (data, { fulfillWithValue, rejectWithValue }) => {
        try {
                const response = await api.post("/cart/add-to-cart", data, {
                        withCredentials: true,
                });
                // console.log(response.data);
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
                        console.log(response.data);
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
                        state.cartProducts = action.payload.data.cardProducts;
                        state.price = action.payload.data.price;
                        state.cartProductsTotal = action.payload.data.cartProductsTotal;
                        state.shippingFee = action.payload.data.shippingFee;
                        state.outOfStockProducts = action.payload.data.outOfStockProducts;
                        state.buyProductItem = action.payload.data.buyProductItem;
                        state.successMessage = action.payload.message;
                });
                builder.addCase(get_cart_products.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });
        },
});

export default cartReducer.reducer;

export const { messageClear } = cartReducer.actions;
