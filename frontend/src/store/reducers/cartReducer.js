import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// Get categories
export const add_to_cart = createAsyncThunk("cart/add_to_cart", async (_, { fulfillWithValue, rejectWithValue }) => {
        try {
                const response = await api.post("/home/product/add-to-cart", {
                        withCredentials: true,
                });
                return fulfillWithValue(response.data);
        } catch (error) {
                return rejectWithValue(error.response.data.message);
        }
});

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
                outOfStockProducts: 0,
                errorMessage: "",
                successMessage: "",
        },
        reducers: {
                messageClear(state) {
                        state.errorMessage = "";
                        state.successMessage = "";
                },
        },
        extraReducers: (builder) => {},
});

export default cartReducer.reducer;

export const { messageClear } = cartReducer.actions;
