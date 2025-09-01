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

// get all messages
export const get_customer_messages = createAsyncThunk(
        "chat/get_customer_messages",
        async (customerId, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.get(`/chat/seller/get-customer-messages/${customerId}`, {
                                withCredentials: true,
                        });
                        // console.log(response.data);
                        return fulfillWithValue(response.data);
                } catch (error) {
                        return rejectWithValue(error.response.data.message);
                }
        }
);

// Send message
export const send_message = createAsyncThunk(
        "chat/send_message",
        async (data, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.post(`/chat/seller/send-message-to-customer`, data, {
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
        extraReducers: (builder) => {
                // get customer
                builder.addCase(get_customers.fulfilled, (state, action) => {
                        state.customers = action.payload.data.customers;
                });

                // Get customer Message
                builder.addCase(get_customer_messages.fulfilled, (state, action) => {
                        state.messages = action.payload.data.messages;
                        state.currentCustomer = action.payload.data.currentCustomer;
                });

                builder.addCase(send_message.fulfilled, (state, action) => {
                        let tempFriends = state.customers;
                        let index = tempFriends.findIndex(
                                (friend) =>
                                        friend.friendId.toString() === action.payload.data.message.receiverId.toString()
                        );
                        while (index > 0) {
                                let temp = tempFriends[index];
                                tempFriends[index] = tempFriends[index - 1];
                                tempFriends[index - 1] = temp;
                                index--;
                        }
                        state.customers = tempFriends;

                        state.messages = [...state.messages, action.payload.data.message];
                        state.successMessage = action.payload.message;
                });
        },
});

export default chatReducer.reducer;

export const { messageClear } = chatReducer.actions;
