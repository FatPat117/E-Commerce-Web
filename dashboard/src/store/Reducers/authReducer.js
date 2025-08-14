import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import api from "../../api/api";

export const admin_login = createAsyncThunk("auth/admin_login", async (data, { rejectWithValue, fulfillWithValue }) => {
        try {
                const response = await api.post("/auth/admin-login", data, {
                        withCredentials: true,
                });
                const { token } = response.data.data;
                localStorage.setItem("accessToken", token);
                // console.log(response.data);

                return fulfillWithValue(response.data); // trả về data
        } catch (err) {
                // console.log(err.response.data.message);
                return rejectWithValue(err.response.data.message); // trả về message
        }
});

export const seller_register = createAsyncThunk(
        "auth/seller_register",
        async (data, { rejectWithValue, fulfillWithValue }) => {
                try {
                        const response = await api.post("/auth/seller-register", data, {
                                withCredentials: true,
                        });

                        const { token } = response.data.data;
                        localStorage.setItem("accessToken", token);
                        // console.log(response.data);

                        return fulfillWithValue(response.data); // trả về data
                } catch (err) {
                        // console.log(err.response.data.message);
                        return rejectWithValue(err.response.data.message); // trả về message
                }
        }
);

export const seller_login = createAsyncThunk(
        "auth/seller_login",
        async (data, { rejectWithValue, fulfillWithValue }) => {
                try {
                        const response = await api.post("/auth/seller-login", data, {
                                withCredentials: true,
                        });
                        const { token } = response.data.data;
                        localStorage.setItem("accessToken", token);
                        // console.log(response.data);

                        return fulfillWithValue(response.data); // trả về data
                } catch (err) {
                        // console.log(err.response.data.message);
                        return rejectWithValue(err.response.data.message); // trả về message
                }
        }
);

export const get_user_info = createAsyncThunk(
        "auth/get_user_info",
        async (data, { rejectWithValue, fulfillWithValue }) => {
                try {
                        const response = await api.get("/auth/get-info", {
                                withCredentials: true,
                        });
                        console.log(response.data);

                        return fulfillWithValue(response.data); // trả về data
                } catch (err) {
                        // console.log(err.response.data.message);
                        return rejectWithValue(err.response.data.message); // trả về message
                }
        }
);

const returnRole = (token) => {
        if (token) {
                const decodedToken = jwtDecode(token);
                const expireTime = new Date(decodedToken.exp * 1000);

                if (new Date() > expireTime) {
                        localStorage.removeItem("accessToken");
                        return null;
                }

                return decodedToken.role;
        } else {
                return null;
        }
};

const initialState = {
        successMessage: "",
        errorMessage: "",
        loader: false,
        userInfo: null,
        role: returnRole(localStorage.getItem("accessToken")),
        token: localStorage.getItem("accessToken"),
};
export const authReducer = createSlice({
        name: "auth",
        initialState,
        reducers: {
                messageClear: (state) => {
                        state.successMessage = "";
                        state.errorMessage = "";
                },
        },
        extraReducers: (builder) => {
                // Admin_login
                builder.addCase(admin_login.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(admin_login.fulfilled, (state, action) => {
                        state.loader = false;
                        state.token = action.payload.data.token;
                        state.successMessage = action.payload.message;
                        state.role = returnRole(action.payload.data.token);
                        state.errorMessage = "";
                });
                builder.addCase(admin_login.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });

                // Seller register
                builder.addCase(seller_register.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(seller_register.fulfilled, (state, action) => {
                        state.loader = false;
                        state.token = action.payload.data.token;
                        state.userInfo = action.payload.data.newSeller;
                        state.successMessage = action.payload.message;
                        state.role = returnRole(action.payload.data.token);
                        state.errorMessage = "";
                });
                builder.addCase(seller_register.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });

                // Seller login
                builder.addCase(seller_login.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(seller_login.fulfilled, (state, action) => {
                        state.loader = false;
                        state.token = action.payload.data.token;
                        state.userInfo = action.payload.data.newSeller;
                        state.successMessage = action.payload.message;
                        state.errorMessage = "";
                        state.role = returnRole(action.payload.data.token);
                });
                builder.addCase(seller_login.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });

                // Get user info
                builder.addCase(get_user_info.pending, (state) => {
                        state.loader = true;
                });
                builder.addCase(get_user_info.fulfilled, (state, action) => {
                        state.loader = false;
                        state.userInfo = action.payload.data;
                        state.successMessage = action.payload.message;
                        state.errorMessage = "";
                });
                builder.addCase(get_user_info.rejected, (state, action) => {
                        state.loader = false;
                        state.errorMessage = action.payload;
                });
        },
});

export const { messageClear } = authReducer.actions;
export default authReducer.reducer;
