import $http from "@/api";
import { ParamsArticle } from "@/store/slices/articleSlices";
import { Pagination } from "@/types";
import { RequestArticle, ArticlesList, Article } from "@/types/articles";

function getList(params: ParamsArticle) {
  return $http.get<{ data: ArticlesList[]; meta: Pagination }>(
    "/api/articles",
    { params },
  );
}

function getDetail(documentId: string, params: ParamsArticle) {
  return $http.get<{ data: Article }>(`/api/articles/${documentId}`, {
    params,
  });
}
function create(data: RequestArticle) {
  return $http.post("/api/articles", { data });
}

function update(documentId: string, data: RequestArticle) {
  return $http.put(`/api/articles/${documentId}`, { data });
}
function deleteArticle(documentId: string) {
  return $http.delete(`/api/articles/${documentId}`);
}

export { getList, getDetail, create, update, deleteArticle };
