import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// Add Banner
export const add_banner = createAsyncThunk("banner/add_banner", async (info, { fulfillWithValue, rejectWithValue }) => {
        try {
                const response = await api.post(`/dashboard/banner/`, info, {
                        withCredentials: true,
                });
                // console.log(response.data);
                return fulfillWithValue(response.data);
        } catch (error) {
                return rejectWithValue(error.response.data.message);
        }
});

// Get Banner
export const get_banner = createAsyncThunk(
        "banner/get_banner",
        async (productId, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.get(`/dashboard/banner/${productId}`, {
                                withCredentials: true,
                        });
                        // console.log(response.data);
                        return fulfillWithValue(response.data);
                } catch (error) {
                        return rejectWithValue(error.response.data.message);
                }
        }
);

// Update Banner
export const update_banner = createAsyncThunk(
        "banner/update_banner",
        async ({ bannerId, info }, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.patch(`/dashboard/banner/${bannerId}`, info, {
                                withCredentials: true,
                        });
                        // console.log(response.data);
                        return fulfillWithValue(response.data);
                } catch (error) {
                        return rejectWithValue(error.response.data.message);
                }
        }
);
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
                builder.addCase(add_banner.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(add_banner.fulfilled, (state, action) => {
                        state.loader = false;
                        state.successMessage = action.payload.message;
                        state.banner = action.payload.data.banner;
                });
                builder.addCase(add_banner.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });

                // Get banner
                builder.addCase(get_banner.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(get_banner.fulfilled, (state, action) => {
                        state.loader = false;
                        state.banner = action.payload.data.banner;
                });
                builder.addCase(get_banner.rejected, (state, action) => {
                        state.loader = false;

                        state.banner = "";
                });

                // Update banner
                builder.addCase(update_banner.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(update_banner.fulfilled, (state, action) => {
                        state.loader = false;
                        state.successMessage = action.payload.message;
                        state.banner = action.payload.data.banner;
                });
                builder.addCase(update_banner.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });
        },
});

export const { messageClear } = bannerReducer.actions;
export default bannerReducer.reducer;
