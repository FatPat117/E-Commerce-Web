import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
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

// customer login
export const customer_login = createAsyncThunk(
        "auth/customer_login",
        async (data, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.post("/customer/customer-login", data, {
                                withCredentials: true,
                        });
                        console.log(response.data);
                        localStorage.setItem("customerToken", response.data.data.token);
                        return fulfillWithValue(response.data);
                } catch (error) {
                        return rejectWithValue(error.response.data.message);
                }
        }
);

// Generate jwt token
const decodeToken = (token) => {
        if (token) {
                const userInfo = jwtDecode(token);

                return userInfo.data;
        }
        return null;
};

const authReducer = createSlice({
        name: "auth",
        initialState: {
                loader: false,
                userInfo: decodeToken(localStorage.getItem("customerToken")),
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

                // Customer login
                builder.addCase(customer_login.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(customer_login.fulfilled, (state, action) => {
                        const userInfo = decodeToken(action.payload.data.token);
                        state.loader = false;
                        state.userInfo = userInfo;
                        state.successMessage = action.payload.message;
                });
                builder.addCase(customer_login.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });
        },
});

export default authReducer.reducer;

export const { messageClear } = authReducer.actions;
