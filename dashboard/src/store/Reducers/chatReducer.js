import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// get all customers
export const get_customers = createAsyncThunk(
        "chat/get_customers",
        async (sellerId, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.get(`/chat/seller/get-customers/${sellerId}`, {
                                withCredentials: true,
                        });
                        // console.log(response.data);

                        return fulfillWithValue(response.data);
                } catch (error) {
                        return rejectWithValue(error.response.data.message);
                }
        }
);

const chatReducer = createSlice({
        name: "chat",
        initialState: {
                myFriends: [],
                friendMessages: [],
                customers: [],
                messages: [],
                activeCustomer: [],
                activeSeller: [],
                activeAdmin: null,
                friends: [],
                sellerAdminMessage: [],
                currentSeller: null,
                currentCustomer: null,
                sellers: [],
        },
        reducers: {
                messageClear(state) {
                        state.errorMessage = "";
                        state.successMessage = "";
                },
        },
        // Customer register
        extraReducers: (builder) => {},
});

export default chatReducer.reducer;

export const { messageClear } = chatReducer.actions;
