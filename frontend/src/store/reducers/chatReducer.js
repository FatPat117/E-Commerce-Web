import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// customer register
export const add_friend = createAsyncThunk("chat/add_friend", async (info, { fulfillWithValue, rejectWithValue }) => {
        try {
                const response = await api.post("/chat/customer/add_friend", info, {
                        withCredentials: true,
                });
                console.log(response.data);

                return fulfillWithValue(response.data);
        } catch (error) {
                return rejectWithValue(error.response.data.message);
        }
});

const chatReducer = createSlice({
        name: "chat",
        initialState: {
                myFriends: [],
                friendMessages: [],
                currentFriend: null,
                errorMessage: "",
                successMessage: "",
        },
        reducers: {
                messageClear(state) {
                        state.errorMessage = "";
                        state.successMessage = "";
                },
        },
        // Customer register
        extraReducers: (builder) => {
                builder.addCase(add_friend.fulfilled, (state, action) => {
                        state.myFriends = action.payload.data.myFriends;
                        state.friendMessages = action.payload.data.messages;
                        state.currentFriend = action.payload.data.currentFriend;
                });
        },
});

export default chatReducer.reducer;

export const { messageClear } = chatReducer.actions;
