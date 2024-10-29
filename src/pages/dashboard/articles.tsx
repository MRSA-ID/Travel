/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import {
  getArticles,
  getArticleDetail,
  resetArticles,
  deletesArticle,
} from "@/store/slices/articleSlices";
import { getCategory } from "@/store/slices/categorySlices";
import { Button } from "@headlessui/react";
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import { toast } from "react-hot-toast";
import DataTable from "@/components/DataTable";
import ArticleModal from "@/components/dashboard/ArticleModal";
import useArticleForm, {
  INITIAL_PAGINATION_STATE,
  TABLE_COLUMNS,
} from "@/hooks/article/useForm";
import { getParams } from "@/utils/helper";
import useUpload from "@/hooks/useUpload";
import { ErrorResponse, ErrorSetter, MessageSetter } from "@/types";
import InputSearch from "@/components/InputSearch";

const Articles = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [documentId, setDocumentId] = useState("");
  const [isDocumentIdLoaded, setIsDocumentIdLoaded] = useState(false);
  const [paginationPage, setPaginationPage] = useState(
    INITIAL_PAGINATION_STATE,
  );

  const form = useArticleForm();
  const upload = useUpload(form.setFormData);
  const dispatch = useAppDispatch();

  const {
    items,
    paginationData,
    isLoading: isLoadingArticle,
  } = useAppSelector((state) => state.articles);

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
      toast.error(err.message);
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
    dispatch(getCategory());
  }
  function handleCloseModal() {
    setIsModalOpen(false);
    setDocumentId("");
    form.resetForm();
    loadArticles();
  }

  useEffect(() => {
    loadArticles();
    return () => {
      dispatch(resetArticles());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, search, paginationPage]);

  useEffect(() => {
    if (documentId && !isDocumentIdLoaded) {
      loadArticleDetailAndCategory(documentId);
      setIsDocumentIdLoaded(true);
    }
    return () => {
      setIsDocumentIdLoaded(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, documentId]);

  const loadArticles = async () => {
    const params = getParams(paginationPage, "Article", search);
    await dispatch(getArticles(params));
  };

  const loadArticleDetailAndCategory = async (id: string) => {
    const params = getParams(paginationPage, "Article", search);
    try {
      await dispatch(getCategory());
      const article = await dispatch(
        getArticleDetail({ dokId: id, param: params }),
      ).unwrap();
      form.setFormData({
        title: article.title,
        description: article.description,
        cover_image_url: article.cover_image_url,
        category: article.category.id as number,
      });
    } catch (error) {
      console.error(error);
      toast.error(error as string);
    }
  };

  const handleDeleteArticle = async (id: string) => {
    try {
      await dispatch(deletesArticle(id));
      toast.success("Berhasil Menghapus Artikel");
      await loadArticles();
    } catch (err: any) {
      handleError(err, form.setError, form.setErrorMessage);
      toast.error("Gagal Menghapus Artikel");
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
            loading={isLoadingArticle}
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
                <td className="p-4 text-sm min-w-[300px] max-w-[550px] font-medium capitalize text-black">
                  <img
                    src={
                      item.cover_image_url || "https://placehold.co/400x200/png"
                    }
                    alt={item.title + "_image_" + item.id}
                    className="w-full max-w-[400px] h-[200px] object-cover rounded-md"
                  />
                </td>
                <td className="whitespace-nowrap p-4 text-sm font-medium capitalize text-black">
                  {item.title || "-"}
                </td>
                <td className="whitespace-nowrap p-4 text-sm font-medium capitalize text-black">
                  {item.description || "-"}
                </td>
                <td className="whitespace-nowrap p-4 text-sm font-medium capitalize text-black">
                  {(item.category && item.category.name) || "-"}
                </td>
                <td className="whitespace-nowrap p-4 text-sm font-medium capitalize text-black">
                  {(item.comments && item.comments.length) || "0"}
                </td>
                <td className="whitespace-nowrap p-4 text-sm font-medium capitalize text-black">
                  <div className="flex flex-col items-start justify-start gap-1">
                    <span className="text-sm font-medium capitalize text-bs-black-1">
                      {item.user.username}
                    </span>
                    <span className="text-xs font-normal text-bs-black-2">
                      {item.user.email}
                    </span>
                  </div>
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
                      onClick={() => handleDeleteArticle(item.documentId)}
                      className="bg-red-500 p-2 rounded-lg"
                    >
                      <TrashIcon className="size-6 fill-white " />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}

            {/* Table rows go here */}
          </DataTable>
        </div>
      </div>

      <ArticleModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        documentId={documentId}
        form={form}
        upload={upload}
      />
    </>
  );
};

export default Articles;
