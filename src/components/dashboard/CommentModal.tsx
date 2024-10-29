/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from "react";
import useCommentForm from "@/hooks/comments/useForm";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import toast from "react-hot-toast";
import { ErrorResponse, ErrorSetter, MessageSetter } from "@/types";
import { createComments, updateComments } from "@/store/slices/commentSlices";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
  Label,
} from "@headlessui/react";
import {
  XCircleIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
} from "@heroicons/react/16/solid";
import { getAvatarUrl } from "@/utils/helper";
import { ArticlesList } from "@/types/articles";

const CommentModal: FC<{
  isOpen: boolean;
  onClose: () => void;
  documentId: string;
  articleCover: string | undefined;
  form: ReturnType<typeof useCommentForm>;
}> = ({ isOpen, onClose, documentId, form, articleCover }) => {
  const [previewImage, setPreview] = useState("");
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.comment);
  const { items } = useAppSelector((state) => state.articles);
  const { user } = useAppSelector((state) => state.auth);

  function handleSelectImage(data: ArticlesList) {
    form.handleArticleSelect(data.id);
    setPreview(data.cover_image_url);
  }

  function handleSubmitError(
    err: any,
    setError: ErrorSetter,
    setErrorMessage: MessageSetter,
    documentId?: string,
  ) {
    if (err.error) {
      const errorResponse = err.error as ErrorResponse;

      switch (errorResponse.status) {
        case 400:
          setError(errorResponse);
          toast.error(
            documentId
              ? "Data tidak valid untuk edit comment"
              : "Data tidak valid untuk membuat comment",
          );
          break;
        default:
          setError(errorResponse);
          toast.error(
            errorResponse.message || "Terjadi kesalahan yang tidak diketahui",
          );
      }
    } else if (err.message) {
      setErrorMessage(err.message);
      toast.error(err.message);
    } else {
      setErrorMessage(err);
    }
  }

  function handleClose() {
    setPreview("");
    onClose();
  }

  const handleSubmit = async () => {
    form.setError(null);
    try {
      if (documentId) {
        await dispatch(
          updateComments({ dokId: documentId, form: form.formData }),
        ).unwrap();
        toast.success("Berhasil Edit Comment");
      } else {
        await dispatch(createComments(form.formData)).unwrap();
        toast.success("Berhasil Membuat Comment");
      }
      form.resetForm();
      onClose();
    } catch (err: any) {
      handleSubmitError(err, form.setError, form.setErrorMessage);
    }
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-lg"
      onClose={handleClose}
    >
      <DialogPanel
        transition
        className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] shadow-xl overflow-auto duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
      >
        <div className="flex flex-col items-center w-full text-black p-6">
          {/* header */}
          <div className="flex justify-between items-center w-full flex-wrap-reverse">
            <DialogTitle as="h3" className="text-2xl/7 font-medium text-black">
              {documentId ? "Edit Comment" : "Comment"}
            </DialogTitle>
            <Button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <XMarkIcon className="h-5 w-5 fill-black" />
            </Button>
          </div>
          {/* start Error Form Buat Artikel */}
          <div
            id="error"
            className={` ${(form.error && !Object.keys(form.error.details).length) || form.errorMessage !== null ? "" : "hidden"} flex text-red-400 font-semibold items-center capitalize text-sm bg-red-100 p-2 gap-2 rounded-md`}
          >
            <XCircleIcon className="size-4 fill-red-400" />
            <span>
              {form.error && !Object.keys(form.error.details).length
                ? form.error.message
                : ""}
              {form.errorMessage}
            </span>
          </div>
          {/* end error */}

          <form className="gap-6 w-full max-w-xl pt-4">
            <Field>
              {documentId && (
                <img
                  src={articleCover || "https://placehold.co/600x400/png"}
                  alt="test"
                  className="w-full max-w-[600px] h-[400px] object-cover rounded-md"
                />
              )}
              {!documentId && items && items.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-medium mb-3">Select Article</h4>

                  <img
                    src={previewImage || "https://placehold.co/600x400/png"}
                    alt="preview_image"
                    className="w-full max-w-[600px] h-[400px] object-cover rounded-md"
                  />

                  <div className="overflow-auto h-[200px] mt-2 px-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4">
                      {items.map((article, i) => (
                        <div
                          key={i}
                          className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                            form.formData.article === article.id
                              ? "border-blue-500 shadow-lg"
                              : "border-gray-200 hover:border-blue-300"
                          }`}
                          onClick={() => handleSelectImage(article)}
                        >
                          <img
                            src={
                              article.cover_image_url ||
                              "https://placehold.co/600x400/png"
                            }
                            alt={article.title}
                            className="w-full h-32 object-cover"
                          />
                          <div className="p-3">
                            <h5 className="font-medium text-sm line-clamp-1">
                              {article.title}
                            </h5>
                            {form.formData.article === article.id && (
                              // <div className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full">
                              // </div>
                              <CheckCircleIcon className="absolute top-2 right-2 fill-blue-500 size-5" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Field>
            <Field className="flex items-center justify-start gap-2 mt-2">
              <div
                className="inline-block h-10 w-10 flex-none rounded-full object-cover"
                style={{
                  backgroundImage: `url(${getAvatarUrl(user?.username as string)})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="flex flex-col w-full items-start justify-start">
                <Label htmlFor="content" className="text-sm/6 font-medium">
                  {user?.username}
                </Label>
                <div className="relative w-full">
                  <Input
                    id="content"
                    name="content"
                    type="text"
                    placeholder="..."
                    required
                    className={`mt-3 block w-full outline-none rounded-xl border-none bg-black/5 py-3 pl-3 pr-10 text-sm/6 autofill:bg-yellow-200`}
                    value={form.formData.content}
                    onChange={form.handleChange}
                  />
                  <Button
                    // onClick={submit}
                    className="absolute inset-y-3 bottom-0 right-0 flex items-center pl-3 pr-4 bg-black/20 rounded-r-xl"
                    onClick={handleSubmit}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="size-4 animate-spin rounded-full border-4 border-gray-200 border-t-gray-800" />
                      </div>
                    ) : (
                      <PaperAirplaneIcon className="size-4 fill-gray-600" />
                    )}
                  </Button>
                </div>
              </div>
            </Field>
          </form>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default CommentModal;
