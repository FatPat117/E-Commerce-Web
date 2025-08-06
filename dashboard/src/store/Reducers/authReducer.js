import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
        successMessage: "",
        errorMessage: "",
        loader: false,
        userInfo: null,
};

export const admin_login = createAsyncThunk("auth/admin_login", async (data) => {
        console.log(data);
        // const response = await api.post("/admin-login", data, {
        //         withCredentials: true,
        // });
        // return response.data;
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
