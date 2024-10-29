/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getList,
  getDetail,
  create,
  update,
  deleteArticle,
} from "@/api/article";
import { ArticlesList, Article, RequestArticle } from "@/types/articles";
import { PaginationType } from "@/types";

interface ArticlesState {
  items: ArticlesList[] | [] | null | undefined;
  item: Article | null;
  paginationData: PaginationType | undefined;
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
  hasMore: boolean;
  isLoading: boolean;
  errorDetailArticle: string | null | undefined;
  messageSuccess: string | null;
}

interface DocIdWithForm {
  dokId: string;
  form: RequestArticle;
}

interface DocIdWithParam {
  dokId: string;
  param: ParamsArticle;
}

export interface ParamsArticle {
  "pagination[page]"?: number;
  "pagination[pageSize]"?: number;
  "populate[comments][populate][user]"?: string;
  "populate[user]"?: string;
  "populate[category]"?: string;
  "filters[title][$eqi]"?: string;
  "filters[category][name][$eqi]"?: string;
  populate?: string;
}

const initialState: ArticlesState = {
  items: [],
  item: null,
  paginationData: undefined,
  page: 1,
  pageSize: 10,
  pageCount: 1,
  total: 1,
  hasMore: true,
  isLoading: false,
  errorDetailArticle: null,
  messageSuccess: "",
};

export const getArticles = createAsyncThunk(
  "articles/getArticles",
  async (filters: ParamsArticle, { rejectWithValue }) => {
    try {
      const { data: response } = await getList(filters);
      const { data, meta } = response;

      return {
        articles: data,
        pagination: meta.pagination,
        hasMore: data.length === 10,
      };
      // return { data, meta, hasMore: data.length === 10 };
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

export const getArticleDetail = createAsyncThunk(
  "articles/getArticleDetail",
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

export const createArticle = createAsyncThunk(
  "articles/create",
  async (request: RequestArticle, { rejectWithValue }) => {
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

export const updateArticle = createAsyncThunk(
  "articles/update",
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

export const deletesArticle = createAsyncThunk(
  "articles/delete",
  async (documentId: string, { rejectWithValue }) => {
    try {
      const response = await deleteArticle(documentId);

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

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.pageSize = action.payload;
    },
    resetArticles: (state) => {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
    },
    resetArticle: (state) => {
      state.item = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paginationData = action.payload.pagination;
        state.page = action.payload.pagination.page;
        state.pageCount = action.payload.pagination.pageCount;
        state.pageSize = action.payload.pagination.pageSize;
        state.total = action.payload.pagination.total;
        state.items = action.payload.articles;
        // state.hasMore = action.payload.hasMore;
        // state.total = action.payload.data.total;
        // state.page = action.payload.data.page;
        // state.limit = action.payload.data.limit;
      })
      .addCase(getArticles.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getArticleDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getArticleDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.item = action.payload;
      })
      .addCase(getArticleDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.errorDetailArticle = action.error.message;
      })
      .addCase(createArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messageSuccess = action.payload;
      })
      .addCase(createArticle.rejected, (state) => {
        state.isLoading = false;
        state.messageSuccess = null;
      })
      .addCase(updateArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messageSuccess = action.payload;
      })
      .addCase(updateArticle.rejected, (state) => {
        state.isLoading = false;
        state.messageSuccess = null;
      })
      .addCase(deletesArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletesArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messageSuccess = action.payload;
      })
      .addCase(deletesArticle.rejected, (state) => {
        state.isLoading = false;
        state.messageSuccess = null;
      });
  },
});

export const { resetArticles, setPage, setLimit, resetArticle } =
  articleSlice.actions;
export default articleSlice.reducer;
