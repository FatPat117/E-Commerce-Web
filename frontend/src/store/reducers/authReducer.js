import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
export const custormer_register = createAsyncThunk(
        "auth/custormer_register",
        async (data, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.post("/customer/customer-register", data, {
                                withCredentials: true,
                        });
                        console.log(response.data);
                        localStorage.setItem("customerToken", JSON.stringify(response.data.token));
                        return fulfillWithValue(response.data);
                } catch (error) {
                        return rejectWithValue(error.response.data.message);
                }
        }
);

const authReducer = createSlice({
        name: "auth",
        initialState: {
                loader: false,
                userInfo: null,
                errorMessage: "",
                successMessage: "",
        },
        reducers: {
                messageClear(state, action) {
                        state.errorMessage = "";
                        state.successMessage = "";
                },
        },
        extraReducers: (builder) => {},
});

export default authReducer.reducer;

export const { messageClear } = authReducer.actions;
