import { ChangeEvent, useState } from "react";
import { PaginationStateType } from "../article/useForm";
import { ErrorResponse } from "@/types";

export interface CategoryFormData {
  name: string;
}

export const TABLE_COLUMNS = [
  { prop: "no", label: "No" },
  { prop: "title", label: "Nama Kategori" },
  { prop: "description", label: "Deskripsi" },
  { prop: "action", label: "Aksi" },
];

export const INITIAL_FORM_STATE: CategoryFormData = {
  name: "",
};

export const INITIAL_PAGINATION_STATE: PaginationStateType = {
  page: 1,
  per_page: 10,
};

const useCategoryForm = () => {
  const [formData, setFormData] =
    useState<CategoryFormData>(INITIAL_FORM_STATE);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
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
    resetForm,
  };
};

export default useCategoryForm;
