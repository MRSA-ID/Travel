/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getList,
  getDetail,
  create,
  update,
  deleteComments,
} from "@/api/comments";
import {
  Comments,
  CommentCreateRequest,
  CommentUpdateRequest,
} from "@/types/comments";
import { PaginationType } from "@/types";

interface CommentState {
  items: Comments[] | [] | null | undefined;
  item: Comments | null;
  paginationData: PaginationType | undefined;
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
  isLoading: boolean;
  messageSuccess: string | null;
}

interface DocIdWithForm {
  dokId: string;
  form: CommentUpdateRequest;
}

interface DocIdWithParam {
  dokId: string;
  param: ParamsComments;
}

const initialState: CommentState = {
  items: [],
  item: null,
  paginationData: undefined,
  page: 1,
  pageSize: 10,
  pageCount: 1,
  total: 1,
  isLoading: false,
  messageSuccess: "",
};

export interface ParamsComments {
  "pagination[page]"?: number;
  "pagination[pageSize]"?: number;
  "populate[article]"?: string;
  "sort[0]"?: string;
  "populate[user]"?: string;
}

export const getComments = createAsyncThunk(
  "comments/getComments",
  async (filters: ParamsComments, { rejectWithValue }) => {
    try {
      const { data: response } = await getList(filters);
      const { data, meta } = response;

      return {
        comments: data,
        pagination: meta.pagination,
      };
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

export const getCommentsDetail = createAsyncThunk(
  "comments/getCommentsDetail",
  async (request: DocIdWithParam, { rejectWithValue }) => {
    try {
      const response = await getDetail(request.dokId, request.param);

      return response.data.data;
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

export const createComments = createAsyncThunk(
  "comments/create",
  async (request: CommentCreateRequest, { rejectWithValue }) => {
    try {
      const response = await create(request);

      return response.data.data;
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

export const updateComments = createAsyncThunk(
  "comments/update",
  async (request: DocIdWithForm, { rejectWithValue }) => {
    try {
      const response = await update(request.dokId, request.form);

      return response.data.data;
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

export const deletesComments = createAsyncThunk(
  "comments/delete",
  async (documentId: string, { rejectWithValue }) => {
    try {
      const response = await deleteComments(documentId);

      return response.data.data;
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
    resetComments: (state) => {
      state.items = [];
      state.item = null;
      state.messageSuccess = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.comments;
        state.paginationData = action.payload.pagination;
      })
      .addCase(getComments.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getCommentsDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCommentsDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.item = action.payload;
      })
      .addCase(getCommentsDetail.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messageSuccess = action.payload;
      })
      .addCase(createComments.rejected, (state) => {
        state.isLoading = false;
        state.messageSuccess = null;
      })
      .addCase(updateComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messageSuccess = action.payload;
      })
      .addCase(updateComments.rejected, (state) => {
        state.isLoading = false;
        state.messageSuccess = null;
      })
      .addCase(deletesComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletesComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messageSuccess = action.payload;
      })
      .addCase(deletesComments.rejected, (state) => {
        state.isLoading = false;
        state.messageSuccess = null;
      });
  },
});

export const { resetComments } = commentSlices.actions;
export default commentSlices.reducer;
