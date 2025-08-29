import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// customer register
export const customer_register = createAsyncThunk(
        "auth/customer_register",
        async (data, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.post("/customer/customer-register", data, {
                                withCredentials: true,
                        });
                        // console.log(response.data);
                        localStorage.setItem("customerToken", response.data.data.token);
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
                currentFriend: {},
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
        extraReducers: (builder) => {},
});

export default chatReducer.reducer;

export const { messageClear } = chatReducer.actions;
