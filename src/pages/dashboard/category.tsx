/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import useCategoryForm, {
  INITIAL_PAGINATION_STATE,
  TABLE_COLUMNS,
} from "@/hooks/category/useForm";
import { ErrorResponse, ErrorSetter, MessageSetter } from "@/types";
import toast from "react-hot-toast";
import { getParams } from "@/utils/helper";
import {
  getCategory,
  getCategoryDetail,
  deletesCategory,
  resetCategory,
} from "@/store/slices/categorySlices";
import InputSearch from "@/components/InputSearch";
import { Button } from "@headlessui/react";
import {
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import DataTable from "@/components/DataTable";
import CategoryModal from "@/components/dashboard/CategoryModal";

const CategoryPage = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [documentId, setDocumentId] = useState("");
  const [isDocumentIdLoaded, setIsDocumentIdLoaded] = useState(false);
  const [paginationPage, setPaginationPage] = useState(
    INITIAL_PAGINATION_STATE,
  );

  const form = useCategoryForm();
  const dispatch = useAppDispatch();
  const {
    items,
    paginationData,
    isLoading: isLoadingCategory,
  } = useAppSelector((state) => state.category);

  function handleError(
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
    } else {
      setErrorMessage(err);
    }
  }

  function changePerPage(limit: number) {
    setPaginationPage((prev) => ({
      ...prev,
      per_page: limit,
    }));
  }

  function changePage(to: number) {
    setPaginationPage((prev) => ({
      ...prev,
      page: to,
    }));
  }

  function handleOpenModal(id?: string) {
    if (id) setDocumentId(id);
    setIsModalOpen(true);
  }
  function handleCloseModal() {
    setIsModalOpen(false);
    setDocumentId("");
    form.resetForm();
    loadCategory();
  }

  useEffect(() => {
    loadCategory();
    return () => {
      dispatch(resetCategory());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, search, paginationPage]);

  useEffect(() => {
    if (documentId && !isDocumentIdLoaded) {
      loadCategoryDetail(documentId);
      setIsDocumentIdLoaded(true);
    }
    return () => {
      setIsDocumentIdLoaded(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, documentId]);

  const loadCategory = async () => {
    const params = getParams(paginationPage);
    await dispatch(getCategory({ filters: params }));
  };

  const loadCategoryDetail = async (id: string) => {
    try {
      await dispatch(getCategory({}));
      const category = await dispatch(getCategoryDetail(id)).unwrap();
      form.setFormData({
        name: category.name,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await toast.promise(dispatch(deletesCategory(id)), {
        loading: "...",
        success: "Success Delete",
        error: "Error Delete",
      });
      await loadCategory();
    } catch (err: any) {
      handleError(err, form.setError, form.setErrorMessage);
    }
  };

  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold leading-7">Article</h1>
        </div>
        <div className="mt-6 rounded-lg bg-white p-6">
          <div className="flex flex-col items-center justify-start gap-4 lg:flex-row 2xl:gap-6">
            {/* input search */}
            <InputSearch onSearch={setSearch} />
            {/* button open modal create */}
            <Button
              // onClick={submit}
              className="group font-Syne w-full lg:w-auto flex justify-center items-center font-medium border bg-black text-white italic border-gray-400 px-5 py-3 text-xl transition-colors duration-300 rounded-md hover:ring-4 ring-black/25"
              onClick={() => handleOpenModal()}
            >
              <PlusIcon className="size-6 fill-white " />
              <span>Tambah</span>
            </Button>
          </div>
          <DataTable
            columns={TABLE_COLUMNS}
            empty={items?.length === 0}
            footTable
            loading={isLoadingCategory}
            pagination={paginationData}
            onChangePageData={changePerPage}
            onChangePagination={changePage}
            // onRetry={handleRetry}
          >
            {items?.map((item, i) => (
              <tr className="whitespace-nowrap p-4 text-sm font-medium" key={i}>
                <td className="whitespace-nowrap p-4 text-sm font-medium capitalize text-black">
                  {i + 1}
                </td>
                <td className="whitespace-nowrap p-4 text-sm font-medium capitalize text-black">
                  {item.name || "-"}
                </td>
                <td className="whitespace-nowrap p-4 text-sm font-medium capitalize text-black">
                  {item.description || "-"}
                </td>
                <td className=" p-4 text-sm font-medium text-black">
                  <div className="flex gap-2 justify-center items-center">
                    <Button
                      onClick={() => handleOpenModal(item.documentId)}
                      className="bg-orange-500 p-2 rounded-lg"
                    >
                      <PencilSquareIcon className="size-6 fill-white " />
                    </Button>
                    <Button
                      onClick={() => handleDeleteCategory(item.documentId)}
                      className="bg-red-500 p-2 rounded-lg"
                    >
                      <TrashIcon className="size-6 fill-white " />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </DataTable>
        </div>
      </div>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        documentId={documentId}
        form={form}
      />
    </>
  );
};

export default CategoryPage;
