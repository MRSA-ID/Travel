/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorResponse } from "@/types";
import { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux-hooks";
import { uploads } from "@/store/slices/uploadSlices";
import toast from "react-hot-toast";
import { ArticleFormData } from "./article/useForm";

const useUpload = (
  setFormData: (fn: (prev: ArticleFormData) => ArticleFormData) => void,
) => {
  const [errorUpload, setErrorUpload] = useState<ErrorResponse | null>(null);
  const [errorUploadMessage, setErrorUploadMessage] = useState<string | null>(
    null,
  );
  const dispatch = useAppDispatch();
  const { isLoading: isLoadingUpload } = useAppSelector(
    (state) => state.upload,
  );

  const handlePickImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setFormData((prev) => ({ ...prev, cover_image_url: "" }));
      return;
    }

    try {
      const response = await dispatch(uploads({ files: file })).unwrap();
      if (response) {
        setFormData((prev) => ({
          ...prev,
          cover_image_url: response.url as string,
        }));
      }
    } catch (err: any) {
      handleUploadError(err);
    }
  };

  const handleUploadError = (err: any) => {
    if (err.error) {
      setErrorUpload(err.error);
      toast.error("Failed to Upload Image");
    } else {
      setErrorUploadMessage(err.message || err);
    }
  };

  return {
    errorUpload,
    errorUploadMessage,
    isLoadingUpload,
    handlePickImage,
  };
};

export default useUpload;
