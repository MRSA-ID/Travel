import { ChangeEvent, useState } from "react";
import { PaginationStateType } from "../article/useForm";
import { ErrorResponse } from "@/types";
import { useAppDispatch, useAppSelector } from "../redux-hooks";
import { getCategory } from "@/store/slices/categorySlices";

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
  const dispatch = useAppDispatch();
  const { total, pageSize, pageCount, items, isLoading } = useAppSelector(
    (state) => state.category,
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const loadCategory = async () => {
    const paramsWithoutPagination = {};
    const paramsWithPagination = {
      "pagination[pageSize]": pageSize,
    };

    await dispatch(
      getCategory({
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
    total,
    pageSize,
    pageCount,
    items,
    isLoading,
    setFormData,
    error,
    setError,
    errorMessage,
    setErrorMessage,
    handleChange,
    loadCategory,
    resetForm,
  };
};

export default useCategoryForm;
