import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const categoryAdd = createAsyncThunk(
        "category/categoryAdd",
        async ({ name, image }, { fulfillWithValue, rejectWithValue }) => {
                try {
                        const formData = new FormData();
                        formData.append("name", name);
                        formData.append("image", image);
                        const response = await api.post("/category", formData, { withCredentials: true });
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
        },
        reducers: {
                messageClear: (state) => {
                        state.successMessage = "";
                        state.errorMessage = "";
                },
        },
        extraReducers: (builder) => {
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
        },
});

export default categoryReducer.reducer;
