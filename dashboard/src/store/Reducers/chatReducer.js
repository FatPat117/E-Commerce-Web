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

// Get sellers
export const get_sellers = createAsyncThunk(
        "chat/get_sellers",
        async (sellerId, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.get(`/chat/admin/get-sellers`, {
                                withCredentials: true,
                        });
                        // console.log(response.data);

                        return fulfillWithValue(response.data);
                } catch (error) {
                        return rejectWithValue(error.response.data.message);
                }
        }
);

// Send message to seller
export const send_message_admin_to_seller = createAsyncThunk(
        "chat/send_message_to_seller",
        async (data, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.post(`/chat/admin/send-message-to-seller`, data, {
                                withCredentials: true,
                        });
                        // console.log(response.data);
                        return fulfillWithValue(response.data);
                } catch (error) {
                        return rejectWithValue(error.response.data.message);
                }
        }
);

// get admin message
export const get_admin_messages = createAsyncThunk(
        "chat/get_admin_messages",
        async (sellerId, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.get(`/chat/admin/get-admin-messages/${sellerId}`, {
                                withCredentials: true,
                        });
                        // console.log(response.data);
                        return fulfillWithValue(response.data);
                } catch (error) {
                        return rejectWithValue(error.response.data.message);
                }
        }
);

// Get admin message from seller
export const get_seller_messages = createAsyncThunk(
        "chat/get_seller_messages",
        async (_, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.get(`/chat/seller/get-seller-messages`, {
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
                updateMessage(state, action) {
                        state.messages = [...state.messages, action.payload];
                },
                updateSellers(state, action) {
                        state.activeSeller = action.payload;
                },
                updateCustomer(state, action) {
                        state.activeCustomer = action.payload;
                },
                updateAdminMessage(state, action) {
                        state.sellerAdminMessage = [...state.sellerAdminMessage, action.payload];
                },
                updateSellerMessage(state, action) {
                        state.sellerAdminMessage = [...state.sellerAdminMessage, action.payload];
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

                // Get seller
                builder.addCase(get_sellers.fulfilled, (state, action) => {
                        state.sellers = action.payload.data.sellers;
                });

                // Send message from admin to seller
                builder.addCase(send_message_admin_to_seller.fulfilled, (state, action) => {
                        state.sellerAdminMessage = [...state.sellerAdminMessage, action.payload.data.message];
                        state.successMessage = action.payload.message;
                });

                // Get admin message
                builder.addCase(get_admin_messages.fulfilled, (state, action) => {
                        state.sellerAdminMessage = action.payload.data.messages;
                        state.currentSeller = action.payload.data.seller;
                });

                // Get seller message
                builder.addCase(get_seller_messages.fulfilled, (state, action) => {
                        state.sellerAdminMessage = action.payload.data.messages;
                });
        },
});

export default chatReducer.reducer;

export const { messageClear, updateMessage, updateSellers, updateCustomer, updateAdminMessage, updateSellerMessage } =
        chatReducer.actions;
