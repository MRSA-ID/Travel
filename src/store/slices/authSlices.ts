import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $http from "@/api";
import { submitLogin, getProfile } from "@/api/auth";
import { Users } from "@/types/users";
import { LoginRequest } from "@/types/auth";
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
    ? cryptoUtils.decrypt(
        localStorage.getItem(USER_LOCAL_STORAGE_KEY) as string,
      )
    : null) as Users | null,
  isLoading: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async (payload: LoginRequest, { dispatch }) => {
    const response = await submitLogin(payload);
    const { jwt } = response.data.data;

    localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, cryptoUtils.encrypt(jwt));

    // Update axios default headers
    $http.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

    // Get user profile
    await dispatch(updateAuth());

    return response.data.data;
  },
);

export const updateAuth = createAsyncThunk("auth/updateProfile", async () => {
  const response = await getProfile();
  const profileData = response.data.data;

  localStorage.setItem(
    USER_LOCAL_STORAGE_KEY,
    cryptoUtils.encrypt(JSON.stringify(profileData)),
  );

  return profileData;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
      localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
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
        state.token = action.payload.jwt;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateAuth.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
