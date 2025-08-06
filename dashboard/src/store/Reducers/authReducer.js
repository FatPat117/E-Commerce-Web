import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        successMessage: "",
        errorMessage: "",
        loader: false,
        userInfo: null,
};

export const authReducer = createSlice({
        name: "auth",
        initialState,
        reducers: {
                setSuccessMessage: (state, action) => {
                        state.successMessage = action.payload;
                },
        },
        extraReducers: {},
});

export const { setSuccessMessage } = authReducer.actions;
export default authReducer.reducer;
