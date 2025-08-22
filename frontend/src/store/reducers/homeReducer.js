import { createSlice } from "@reduxjs/toolkit";

const homeReducer = createSlice({
        name: "home",
        initialState: {
                categories: [],
        },
        reducers: {},
        extraReducers: (builder) => {},
});

export default homeReducer.reducer;
