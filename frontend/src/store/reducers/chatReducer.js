import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// add friend
export const add_friend = createAsyncThunk("chat/add_friend", async (info, { fulfillWithValue, rejectWithValue }) => {
        try {
                const response = await api.post("/chat/customer/add-friend", info, {
                        withCredentials: true,
                });
                // console.log(response.data);

                return fulfillWithValue(response.data);
        } catch (error) {
                return rejectWithValue(error.response.data.message);
        }
});

// send message
export const send_message = createAsyncThunk(
        "chat/send_message",
        async (info, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.post("/chat/customer/send-message-to-seller", info, {
                                withCredentials: true,
                        });
                        console.log(response.data);

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
                builder.addCase(send_message.fulfilled, (state, action) => {
                        let tempFriends = state.myFriends;
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
                        state.myFriends = tempFriends;

                        state.friendMessages = [...state.friendMessages, action.payload.data.message];
                        state.successMessage = action.payload.message;
                });
        },
});

export default chatReducer.reducer;

export const { messageClear } = chatReducer.actions;
