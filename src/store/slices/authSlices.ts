/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $http from "@/api";
import { submitLogin, getProfile, submitRegister } from "@/api/auth";
import { Users } from "@/types/users";
import { LoginRequest, AuthResponse, RegisterRequest } from "@/types/auth";
import { cryptoUtils } from "@/utils/crypto";

// Constants
export const USER_LOCAL_STORAGE_KEY = "u";
export const TOKEN_LOCAL_STORAGE_KEY = "t";

interface AuthState {
  user: Users | null;
  token: string | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  token: (localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)
    ? cryptoUtils.decrypt(
        localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY) as string,
      )
    : null) as string | null,
  user: (localStorage.getItem(USER_LOCAL_STORAGE_KEY)
    ? JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY) as string)
    : null) as Users | null,
  isLoading: false,
};

// ini actions
export const login = createAsyncThunk(
  "auth/login",
  async (payload: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await submitLogin(payload);
      const { jwt, user } = response.data as AuthResponse;

      // // Get user profile
      // const userProfile = await dispatch(getMe()).unwrap();
      return { jwt, user };
    } catch (err: any) {
      // Mengambil error response dari API
      if (err.response?.data) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue(err);
      }
    }
  },
);

export const register = createAsyncThunk(
  "auth/register",
  async (payload: RegisterRequest, { rejectWithValue }) => {
    try {
      const response = await submitRegister(payload);
      const { jwt, user } = response.data as AuthResponse;

      // Get user profile
      // const userProfile = await dispatch(updateAuth()).unwrap();
      return { jwt, user };
    } catch (err: any) {
      // Mengambil error response dari API
      if (err.response?.data) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue(err);
      }
    }
  },
);

export const getMe = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProfile();
      const profileData = response.data.data as Users;

      return profileData;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Failed to fetch profile");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
      localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
      delete $http.defaults.headers.common["Authorization"];
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload?.jwt as string;
        state.user = action.payload?.user as Users;
        state.isLoading = false;
        localStorage.setItem(
          TOKEN_LOCAL_STORAGE_KEY,
          cryptoUtils.encrypt(action.payload?.jwt as string),
        );
        localStorage.setItem(
          USER_LOCAL_STORAGE_KEY,
          // cryptoUtils.encrypt(JSON.stringify(action.payload?.user as Users))
          JSON.stringify(action.payload?.user as Users),
        );

        // Update axios default headers
        $http.defaults.headers.common["Authorization"] =
          `Bearer ${action.payload?.jwt}`;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.token = null;
        state.user = null;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload?.jwt as string;
        state.user = action.payload?.user as Users;
        state.isLoading = false;
        localStorage.setItem(
          TOKEN_LOCAL_STORAGE_KEY,
          cryptoUtils.encrypt(action.payload?.jwt as string),
        );
        localStorage.setItem(
          USER_LOCAL_STORAGE_KEY,
          // cryptoUtils.encrypt(JSON.stringify(action.payload?.user as Users))
          // JSON.stringify(action.payload?.user as Users)
          JSON.stringify(action.payload?.user as Users),
        );

        // Update axios default headers
        $http.defaults.headers.common["Authorization"] =
          `Bearer ${action.payload?.jwt}`;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.token = null;
        state.user = null;
      })
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(getMe.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
