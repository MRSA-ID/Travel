import { ChangeEvent, useState } from "react";
import { PaginationStateType } from "../article/useForm";
import { ErrorResponse } from "@/types";

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === "article" ? Number(e.target.value) : e.target.value,
    }));
  };

  const handleArticleSelect = (articleId: number) => {
    setFormData((prev) => ({
      ...prev,
      article: articleId,
    }));
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_STATE);
    setError(null);
    setErrorMessage(null);
  };

  return {
    formData,
    setFormData,
    error,
    setError,
    errorMessage,
    setErrorMessage,
    handleChange,
    handleArticleSelect,
    resetForm,
  };
};

export default useCommentForm;
