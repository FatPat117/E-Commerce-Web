import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// Add category
export const add_category = createAsyncThunk(
        "category/add_category",
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
export const get_category = createAsyncThunk(
        "category/get_category",
        async ({ perPage, page, searchValue }, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.get(
                                `/category?perPage=${perPage}&page=${page}&searchValue=${searchValue}`,
                                {
                                        withCredentials: true,
                                }
                        );
                        // console.log(response.data);
                        return fulfillWithValue(response.data);
                } catch (error) {
                        return rejectWithValue(error.response.data.message);
                }
        }
);

// Update category
export const update_category = createAsyncThunk(
        "category/update_category",
        async ({ name, image, categoryId }, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const formData = new FormData();
                        formData.append("name", name);
                        if (image) formData.append("image", image);
                        const response = await api.patch(`/category/${categoryId}`, formData, {
                                withCredentials: true,
                        });
                        // console.log(response.data);
                        return fulfillWithValue(response.data);
                } catch (error) {
                        return rejectWithValue(error.response.data.message);
                }
        }
);

// Delete category
export const delete_category = createAsyncThunk(
        "category/delete_category",
        async (categoryId, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const response = await api.delete(`/category/${categoryId}`, {
                                withCredentials: true,
                        });
                        // console.log(response.data);
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
                builder.addCase(add_category.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(add_category.fulfilled, (state, action) => {
                        state.loader = false;
                        state.successMessage = action.payload.message;
                        state.categories.push(action.payload.data.category);
                });
                builder.addCase(add_category.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });

                //  get category
                builder.addCase(get_category.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(get_category.fulfilled, (state, action) => {
                        state.loader = false;
                        state.totalCategory = action.payload.data.totalCategory;
                        state.categories = action.payload.data.category;
                });
                builder.addCase(get_category.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });

                // update category
                builder.addCase(update_category.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(update_category.fulfilled, (state, action) => {
                        state.loader = false;
                        state.successMessage = action.payload.message;
                        const index = state.categories.findIndex((cat) => cat._id == action.payload.data.category._id);

                        if (index != -1) {
                                state.categories[index] = action.payload.data.category;
                        }
                });
                builder.addCase(update_category.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });

                // Delete category
                builder.addCase(delete_category.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(delete_category.fulfilled, (state, action) => {
                        state.loader = false;
                        state.successMessage = action.payload.message;
                        state.categories = state.categories.filter(
                                (cat) => cat._id != action.payload.data.deleteCategory._id
                        );
                });
                builder.addCase(delete_category.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });
        },
});

export const { messageClear } = categoryReducer.actions;
export default categoryReducer.reducer;
