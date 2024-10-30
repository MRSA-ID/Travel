import { ChangeEvent, useState } from "react";
import { PaginationStateType } from "../article/useForm";
import { ErrorResponse } from "@/types";
import { useAppDispatch, useAppSelector } from "../redux-hooks";
import { getComments } from "@/store/slices/commentSlices";

export interface CommentFormData {
  content: string;
  article: number | null;
}

export const TABLE_COLUMNS = [
  { prop: "no", label: "No" },
  { prop: "comment", label: "Comment" },
  { prop: "article", label: "Artikel" },
  { prop: "action", label: "Aksi" },
];

export const INITIAL_FORM_STATE: CommentFormData = {
  content: "",
  article: null,
};

export const INITIAL_PAGINATION_STATE: PaginationStateType = {
  page: 1,
  per_page: 10,
};

const useCommentForm = () => {
  const [formData, setFormData] = useState<CommentFormData>(INITIAL_FORM_STATE);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { total, pageSize, pageCount, items, isLoading } = useAppSelector(
    (state) => state.comment,
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === "article" ? Number(e.target.value) : e.target.value,
    }));
  };

  const handleArticleSelect = (articleId: number | null) => {
    setFormData((prev) => ({
      ...prev,
      article: articleId,
    }));
  };

  const loadComments = async () => {
    const paramsWithoutPagination = {
      "populate[article]": "*",
      "populate[user]": "*",
    };
    const paramsWithPagination = {
      "pagination[pageSize]": pageSize,
      "populate[article]": "*",
      "populate[user]": "*",
    };
    await dispatch(
      getComments({
        filters: pageCount > 1 ? paramsWithPagination : paramsWithoutPagination,
        currentPath: "dashboard",
      }),
    );
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_STATE);
    setError(null);
    setErrorMessage(null);
  };

  return {
    formData,
    pageSize,
    total,
    pageCount,
    items,
    isLoading,
    setFormData,
    error,
    setError,
    errorMessage,
    setErrorMessage,
    handleChange,
    handleArticleSelect,
    loadComments,
    resetForm,
  };
};

export default useCommentForm;
