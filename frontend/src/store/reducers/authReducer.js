import { createSlice } from "@reduxjs/toolkit";

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
