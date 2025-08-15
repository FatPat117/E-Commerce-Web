import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// Add category
export const categoryAdd = createAsyncThunk(
        "category/categoryAdd",
        async ({ name, image }, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const formData = new FormData();
                        formData.append("name", name);
                        formData.append("image", image);
                        const response = await api.post("/category", formData, {
                                withCredentials: true,
                                headers: {
                                        "Content-Type": "multipart/form-data",
                                },
                        });
                        // console.log(response.data);
                        return fulfillWithValue(response.data);
                } catch (error) {
                        return rejectWithValue(error.response.data.message);
                }
        }
);

// Get category
export const categoryGet = createAsyncThunk(
        "category/categoryGet",
        async ({ perPage, page, searchValue }, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.get(
                                `/category?perPage=${perPage}&page=${page}&searchValue=${searchValue}`,
                                {
                                        withCredentials: true,
                                }
                        );
                        console.log(response.data);
                        return fulfillWithValue(response.data);
                } catch (error) {
                        return rejectWithValue(error.response.data.message);
                }
        }
);

const categoryReducer = createSlice({
        name: "category",
        initialState: {
                successMessage: "",
                errorMessage: "",
                loader: false,
                categories: [],
                totalCategory: 0,
        },
        reducers: {
                messageClear: (state) => {
                        state.successMessage = "";
                        state.errorMessage = "";
                },
        },
        extraReducers: (builder) => {
                // Add category
                builder.addCase(categoryAdd.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(categoryAdd.fulfilled, (state, action) => {
                        state.loader = false;
                        state.successMessage = action.payload.message;
                        state.categories.push(action.payload.data.category);
                });
                builder.addCase(categoryAdd.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });

                //  get category
                builder.addCase(categoryGet.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(categoryGet.fulfilled, (state, action) => {
                        state.loader = false;
                        state.successMessage = action.payload.message;
                        state.totalCategory = action.payload.data.totalCategory;
                        state.categories = action.payload.data.category;
                });
                builder.addCase(categoryGet.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });
        },
});

export const { messageClear } = categoryReducer.actions;
export default categoryReducer.reducer;
