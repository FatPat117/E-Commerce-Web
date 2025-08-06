import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

const initialState = {
        successMessage: "",
        errorMessage: "",
        loader: false,
        userInfo: null,
};

export const admin_login = createAsyncThunk("auth/admin_login", async (data) => {
        try {
                const response = await api.post("/auth/admin-login", data, {
                        withCredentials: true,
                });
                return response.data;
        } catch (err) {
                console.log(err.response.data.message);
        }
});

export const authReducer = createSlice({
        name: "auth",
        initialState,
        reducers: {
                setSuccessMessage: (state, action) => {
                        state.successMessage = action.payload;
                },
        },
        extraReducers: (builder) => {},
});

export const { setSuccessMessage } = authReducer.actions;
export default authReducer.reducer;
