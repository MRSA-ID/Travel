/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postMultipart } from "@/api/upload";
import { UploadRequest, UploadResponse } from "@/types/upload";

interface CommentState {
  files: UploadResponse | null;
  isLoading: boolean;
  messageSuccess: string | null;
}

const initialState: CommentState = {
  files: null,
  isLoading: false,
  messageSuccess: "",
};

export const uploads = createAsyncThunk(
  "upload/file",
  async (request: UploadRequest, { rejectWithValue }) => {
    try {
      const response = await postMultipart(request);
      const [fileData] = response.data;

      return fileData as UploadResponse;
    } catch (error: any) {
      // Mengambil error response dari API
      if (error.response?.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error);
      }
    }
  },
);

const commentSlices = createSlice({
  name: "comments",
  initialState,
  reducers: {
    // Reset state ke nilai awal
    resetState: (state) => {
      state.files = null;
      state.messageSuccess = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploads.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploads.fulfilled, (state, action) => {
        state.isLoading = false;
        state.files = action.payload;
        console.log("action.payload: ", action.payload);
      })
      .addCase(uploads.rejected, (state) => {
        state.isLoading = false;
        state.files = null;
      });
  },
});

export const { resetState } = commentSlices.actions;
export default commentSlices.reducer;
