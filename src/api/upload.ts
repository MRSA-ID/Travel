import $http from "@/api";
import { UploadRequest } from "@/types/upload";

function postMultipart(payload: UploadRequest) {
  return $http.post(`/api/upload`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export { postMultipart };
