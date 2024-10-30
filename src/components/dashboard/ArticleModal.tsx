/* eslint-disable @typescript-eslint/no-explicit-any */
import useArticleForm from "@/hooks/article/useForm";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import useUpload from "@/hooks/useUpload";
import { createArticle, updateArticle } from "@/store/slices/articleSlices";
import { ErrorResponse } from "@/types";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
  Label,
  Select,
} from "@headlessui/react";
import {
  ChevronDownIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import { FC } from "react";
import toast from "react-hot-toast";

type ErrorSetter = (error: ErrorResponse | null) => void;
type MessageSetter = (message: string | null) => void;

const ArticleModal: FC<{
  isOpen: boolean;
  onClose: () => void;
  documentId: string;
  form: ReturnType<typeof useArticleForm>;
  upload: ReturnType<typeof useUpload>;
}> = ({ isOpen, onClose, documentId, form, upload }) => {
  const dispatch = useAppDispatch();
  const { isLoading: isLoadingArticle } = useAppSelector(
    (state) => state.articles,
  );
  const { items: itemCategory } = useAppSelector((state) => state.category);

  function handleSubmitError(
    err: any,
    setError: ErrorSetter,
    setErrorMessage: MessageSetter,
  ) {
    if (err.error) {
      const errorResponse = err.error as ErrorResponse;

      switch (errorResponse.status) {
        case 400:
          setError(errorResponse);
          break;
        default:
          setError(errorResponse);
      }
    } else if (err.message) {
      setErrorMessage(err.message);
      toast.error(err.message);
    } else {
      setErrorMessage(err);
    }
  }

  const handleSubmit = async () => {
    form.setError(null);
    try {
      if (documentId) {
        await toast.promise(
          dispatch(
            updateArticle({ dokId: documentId, form: form.formData }),
          ).unwrap(),
          {
            loading: "...",
            success: "Success Update",
            error: "Failed Update",
          },
        );
      } else {
        await toast.promise(dispatch(createArticle(form.formData)).unwrap(), {
          loading: "...",
          success: "Success Save",
          error: "Failed Save",
        });
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
      onClose={onClose}
    >
      <DialogPanel
        transition
        className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] shadow-xl overflow-auto duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
      >
        <div className="flex flex-col items-center w-full text-black p-6">
          {/* header */}
          <div className="flex justify-between items-center w-full flex-wrap-reverse">
            <DialogTitle as="h3" className="text-2xl/7 font-medium text-black">
              {documentId ? "Edit Article" : "Membuat Article"}
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
              <h2 className="text-sm/6 font-medium inline-block">
                Upload Thumbnail Artikel
              </h2>
              <span className="text-red-400 font-semibold text-sm pl-1">*</span>
              {/* error upload Message */}
              <div
                id="error"
                className={` ${(upload.errorUpload && !Object.keys(upload.errorUpload.details).length) || upload.errorUploadMessage !== null ? "" : "hidden"} flex text-red-400 font-semibold items-center capitalize text-sm bg-red-100 p-2 gap-2 my-2 rounded-md`}
              >
                <XCircleIcon className="size-4 fill-red-400" />
                <span>
                  {upload.errorUpload &&
                  !Object.keys(upload.errorUpload.details).length
                    ? upload.errorUpload.message
                    : ""}
                  {upload.errorUploadMessage}
                </span>
              </div>
              <img
                src={
                  form.formData.cover_image_url ||
                  "https://placehold.co/400x200/png"
                }
                alt="test"
                className="w-full max-w-[400px] h-[200px] object-cover rounded-md"
              />

              <Input
                id="image-upload"
                name="cover"
                type="file"
                accept="image/jpg, image/png, image/jpeg"
                className={`hidden`}
                onChange={upload.handlePickImage}
              />
              <label
                htmlFor="image-upload"
                className="font-Syne mt-2 block w-max font-medium border bg-white italic border-gray-400 px-3 py-1 hover:bg-black text-base hover:text-white transition-colors duration-300 rounded-md cursor-pointer"
              >
                {upload.isLoadingUpload ? "Uploading..." : "Upload Image"}
              </label>
            </Field>
            <Field>
              <Label htmlFor="title" className="text-sm/6 font-medium ">
                Judul Artikel
              </Label>
              <span className="text-red-400 font-semibold text-sm pl-1">*</span>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Sample Test 10000"
                required
                className={`mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 autofill:bg-yellow-200`}
                value={form.formData.title}
                onChange={form.handleChange}
              />
            </Field>
            <Field className="mt-4">
              <Label htmlFor="description" className="text-sm/6 font-medium ">
                Deskripsi Artikel
              </Label>
              <span className="text-red-400 font-semibold text-sm pl-1">*</span>
              <Input
                id="description"
                name="description"
                type="text"
                placeholder="Deskripsi Artikel"
                required
                className={`mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6`}
                value={form.formData.description}
                onChange={form.handleChange}
              />
            </Field>
            <Field className="mt-4">
              <Label htmlFor="description" className="text-sm/6 font-medium ">
                Category
              </Label>
              <span className="text-red-400 font-semibold text-sm pl-1">*</span>
              <div className="w-36">
                <Select
                  name="category"
                  className={`
										font-Syne mb-2 font-medium border bg-white italic text-black border-gray-400 px-5 py-1 hover:bg-black hover:text-white transition-colors duration-300 rounded-md focus:outline-none overflow-auto
									`}
                  onChange={form.handleChangeSelect}
                >
                  <option value="">Kategori</option>
                  {itemCategory &&
                    itemCategory.map((category, index) => {
                      return (
                        <option
                          value={category.id}
                          selected={
                            documentId
                              ? category.id === form.formData.category
                              : false
                          }
                          key={index}
                        >
                          {category.name}
                        </option>
                      );
                    })}
                </Select>
                <ChevronDownIcon
                  className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                  aria-hidden="true"
                />
              </div>
            </Field>
            <Button
              // onClick={submit}
              className="font-Syne w-full mt-5 font-medium border bg-white italic border-gray-400 px-5 py-3 hover:bg-black text-xl hover:text-white transition-colors duration-300 rounded-md"
              onClick={handleSubmit}
            >
              {isLoadingArticle
                ? "Sedang Proses..."
                : documentId
                  ? "Edit Artikel"
                  : "Buat Artikel"}
            </Button>
          </form>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default ArticleModal;
