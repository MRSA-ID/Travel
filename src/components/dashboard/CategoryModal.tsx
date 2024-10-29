/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import useCategoryForm from "@/hooks/category/useForm";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { createCategory, updateCategory } from "@/store/slices/categorySlices";
import { ErrorResponse, ErrorSetter, MessageSetter } from "@/types";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
  Label,
} from "@headlessui/react";
import { XCircleIcon, XMarkIcon } from "@heroicons/react/16/solid";
import toast from "react-hot-toast";

const CategoryModal: FC<{
  isOpen: boolean;
  onClose: () => void;
  documentId: string;
  form: ReturnType<typeof useCategoryForm>;
}> = ({ isOpen, onClose, documentId, form }) => {
  const dispatch = useAppDispatch();
  const { isLoading: isLoadingCategory } = useAppSelector(
    (state) => state.category,
  );

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
              ? "Data tidak valid untuk edit kategori"
              : "Data tidak valid untuk membuat kategori",
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

  const handleSubmit = async () => {
    form.setError(null);
    try {
      if (documentId) {
        await dispatch(
          updateCategory({ dokId: documentId, form: form.formData }),
        ).unwrap();
        toast.success("Berhasil Edit Kategori");
      } else {
        await dispatch(createCategory(form.formData)).unwrap();
        toast.success("Berhasil Membuat Kategori");
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
              {documentId ? "Edit Kategori" : "Membuat Kategori"}
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
              <Label htmlFor="name" className="text-sm/6 font-medium ">
                Nama Kategori
              </Label>
              <span className="text-red-400 font-semibold text-sm pl-1">*</span>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Sample Test 10000"
                required
                className={`mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 autofill:bg-yellow-200`}
                value={form.formData.name}
                onChange={form.handleChange}
              />
            </Field>
            <Button
              // onClick={submit}
              className="font-Syne w-full mt-5 font-medium border bg-white italic border-gray-400 px-5 py-3 hover:bg-black text-xl hover:text-white transition-colors duration-300 rounded-md"
              onClick={handleSubmit}
            >
              {isLoadingCategory
                ? "Sedang Proses..."
                : documentId
                  ? "Edit Kategori"
                  : "Buat Kategori"}
            </Button>
          </form>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default CategoryModal;
