import $http from "@/api";
import { ParamsCategory } from "@/store/slices/categorySlices";
import { Pagination } from "@/types";
import {
  CategoryCreateRequest,
  CategoryUpdateRequest,
  Category,
} from "@/types/category";

function getList(params?: ParamsCategory) {
  return $http.get<{ data: Category[]; meta: Pagination }>("/api/categories", {
    params,
  });
}

function getDetail(documentId: string) {
  return $http.get<{ data: Category }>(`/api/categories/${documentId}`);
}
function create(data: CategoryCreateRequest) {
  return $http.post("/api/categories/", { data });
}

function update(documentId: string, data: CategoryUpdateRequest) {
  return $http.put(`/api/categories/${documentId}`, { data });
}
function deleteCategorie(documentId: string) {
  return $http.delete(`/api/categories/${documentId}`);
}

export { getList, getDetail, create, update, deleteCategorie };
