import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// Add Banner
export const add_banner = createAsyncThunk("banner/add_banner", async (info, { fulfillWithValue, rejectWithValue }) => {
        try {
                const response = await api.post(`/dashboard/banner/`, info, {
                        withCredentials: true,
                });
                console.log(response.data);
                return fulfillWithValue(response.data);
        } catch (error) {
                return rejectWithValue(error.response.data.message);
        }
});

const bannerReducer = createSlice({
        name: "banner",
        initialState: {
                successMessage: "",
                errorMessage: "",
                loader: false,
                banners: [],
                banner: "",
        },
        reducers: {
                messageClear: (state) => {
                        state.successMessage = "";
                        state.errorMessage = "";
                },
        },
        extraReducers: (builder) => {
                // Add banner
        },
});

export const { messageClear } = bannerReducer.actions;
export default bannerReducer.reducer;
