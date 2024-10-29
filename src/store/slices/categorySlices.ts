/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getList,
  getDetail,
  create,
  update,
  deleteCategorie,
} from "@/api/category";
import {
  Category,
  CategoryCreateRequest,
  CategoryUpdateRequest,
} from "@/types/category";
import { PaginationType } from "@/types";

interface CategoryState {
  items: Category[] | [] | null | undefined;
  item: Category | null;
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
  form: CategoryUpdateRequest;
}

export interface ParamsCategory {
  "pagination[page]"?: number;
  "pagination[pageSize]"?: number;
  "populate[comments][populate][user]"?: string;
  "populate[user]"?: string;
  "populate[category]"?: string;
  "filters[title][$eqi]"?: string;
  "filters[category][name][$eqi]"?: string;
  populate?: string;
}

const initialState: CategoryState = {
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

export const getCategory = createAsyncThunk(
  "category/getCategory",
  async (filters?: ParamsCategory, { rejectWithValue }) => {
    try {
      const { data: response } = await getList(filters);
      const { data, meta } = response;

      return {
        category: data,
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

export const getCategoryDetail = createAsyncThunk(
  "category/getCategoryDetail",
  async (documentId: string, { rejectWithValue }) => {
    try {
      const response = await getDetail(documentId);

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

export const createCategory = createAsyncThunk(
  "category/create",
  async (request: CategoryCreateRequest, { rejectWithValue }) => {
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

export const updateCategory = createAsyncThunk(
  "category/update",
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

export const deletesCategory = createAsyncThunk(
  "category/delete",
  async (documentId: string, { rejectWithValue }) => {
    try {
      const response = await deleteCategorie(documentId);

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

const categorySlices = createSlice({
  name: "category",
  initialState,
  reducers: {
    // Reset state ke nilai awal
    resetCategory: (state) => {
      state.items = [];
      state.item = null;
      state.messageSuccess = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.category;
        state.paginationData = action.payload.pagination;
      })
      .addCase(getCategory.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getCategoryDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategoryDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.item = action.payload;
      })
      .addCase(getCategoryDetail.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messageSuccess = action.payload;
      })
      .addCase(createCategory.rejected, (state) => {
        state.isLoading = false;
        state.messageSuccess = null;
      })
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messageSuccess = action.payload;
      })
      .addCase(updateCategory.rejected, (state) => {
        state.isLoading = false;
        state.messageSuccess = null;
      })
      .addCase(deletesCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletesCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messageSuccess = action.payload;
      })
      .addCase(deletesCategory.rejected, (state) => {
        state.isLoading = false;
        state.messageSuccess = null;
      });
  },
});

export const { resetCategory } = categorySlices.actions;
export default categorySlices.reducer;
