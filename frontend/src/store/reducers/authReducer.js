import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
export const customer_register = createAsyncThunk(
        "auth/customer_register",
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
                messageClear(state) {
                        state.errorMessage = "";
                        state.successMessage = "";
                },
        },
        extraReducers: (builder) => {
                builder.addCase(customer_register.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(customer_register.fulfilled, (state, action) => {
                        state.loader = false;
                        state.userInfo = action.payload.data.customer;
                        state.successMessage = action.payload.message;
                });
                builder.addCase(customer_register.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });
        },
});

export default authReducer.reducer;

export const { messageClear } = authReducer.actions;
