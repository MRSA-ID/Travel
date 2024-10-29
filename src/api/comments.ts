import $http from "@/api";
import { ParamsComments } from "@/store/slices/commentSlices";
import { Pagination } from "@/types";
import {
  CommentCreateRequest,
  CommentUpdateRequest,
  Comments,
} from "@/types/comments";

function getList(params: ParamsComments) {
  return $http.get<{ data: Comments[]; meta: Pagination }>("/api/comments", {
    params,
  });
}

function getDetail(documentId: string, params: ParamsComments) {
  return $http.get<{ data: Comments }>(`/api/comments/${documentId}`, {
    params,
  });
}
function create(data: CommentCreateRequest) {
  return $http.post("/api/comments/", { data });
}

function update(documentId: string, data: CommentUpdateRequest) {
  return $http.put(`/api/comments/${documentId}`, { data });
}
function deleteComments(documentId: string) {
  return $http.delete(`/api/comments/${documentId}`);
}

export { getList, getDetail, create, update, deleteComments };
