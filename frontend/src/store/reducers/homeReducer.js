import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
export const get_category = createAsyncThunk("home/get_category", async (_, { fulfillWithValue, rejectWithValue }) => {
        try {
                const response = await api.get("/home/get-categories", {
                        withCredentials: true,
                });
                console.log(response.data);
                return fulfillWithValue(response.data);
        } catch (error) {
                return rejectWithValue(error.response.data.message);
        }
});

const homeReducer = createSlice({
        name: "home",
        initialState: {
                categories: [],
        },
        reducers: {},
        extraReducers: (builder) => {
                builder.addCase(get_category.fulfilled, (state, action) => {
                        state.categories = action.payload;
                });
        },
});

export default homeReducer.reducer;
