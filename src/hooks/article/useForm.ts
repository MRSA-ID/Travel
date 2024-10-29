import { ErrorResponse } from "@/types";
import { ChangeEvent, useState } from "react";

export interface ArticleFormData {
  title: string;
  description: string;
  cover_image_url: string;
  category: number | null;
}

export interface PaginationStateType {
  page: number;
  per_page: number;
}

export const TABLE_COLUMNS = [
  { prop: "no", label: "No" },
  { prop: "cover", label: "Cover" },
  { prop: "title", label: "Judul Artikel" },
  { prop: "description", label: "Deskripsi" },
  { prop: "category", label: "Kategori" },
  { prop: "count comments", label: "Banyaknya Comment" },
  { prop: "creator", label: "Creator Article" },
  { prop: "action", label: "Aksi" },
];

export const INITIAL_FORM_STATE: ArticleFormData = {
  title: "",
  description: "",
  cover_image_url: "",
  category: null,
};

export const INITIAL_PAGINATION_STATE: PaginationStateType = {
  page: 1,
  per_page: 10,
};

const useArticleForm = () => {
  const [formData, setFormData] = useState<ArticleFormData>(INITIAL_FORM_STATE);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: Number(e.target.value),
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
    handleChangeSelect,
    resetForm,
  };
};

export default useArticleForm;
