import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

const initialState = {
        successMessage: "",
        errorMessage: "",
        loader: false,
        userInfo: null,
};

export const admin_login = createAsyncThunk("auth/admin_login", async (data, { rejectWithValue, fulfillWithValue }) => {
        try {
                const response = await api.post("/auth/admin-login", data, {
                        withCredentials: true,
                });
                const { token } = response.data.data;
                localStorage.setItem("accessToken", token);
                // console.log(response.data);

                return fulfillWithValue(response.data); // trả về data
        } catch (err) {
                // console.log(err.response.data.message);
                return rejectWithValue(err.response.data.message); // trả về message
        }
});

export const authReducer = createSlice({
        name: "auth",
        initialState,
        reducers: {
                messageClear: (state) => {
                        state.successMessage = "";
                        state.errorMessage = "";
                },
        },
        extraReducers: (builder) => {
                builder.addCase(admin_login.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(admin_login.fulfilled, (state, action) => {
                        state.loader = false;
                        state.userInfo = action.payload.data;
                        state.successMessage = action.payload.message;
                        state.errorMessage = "";
                });
                builder.addCase(admin_login.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });
        },
});

export const { messageClear } = authReducer.actions;
export default authReducer.reducer;
