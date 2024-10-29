/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import useCommentForm, {
  INITIAL_PAGINATION_STATE,
  TABLE_COLUMNS,
} from "@/hooks/comments/useForm";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { ErrorResponse, ErrorSetter, MessageSetter } from "@/types";
import toast from "react-hot-toast";
import {
  deletesComments,
  getComments,
  getCommentsDetail,
  resetComments,
} from "@/store/slices/commentSlices";
import { getAvatarUrl, getParams } from "@/utils/helper";
import { Button } from "@headlessui/react";
import {
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import DataTable from "@/components/DataTable";
import CommentModal from "@/components/dashboard/CommentModal";
import { getArticles, resetArticles } from "@/store/slices/articleSlices";

const CommentsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [documentId, setDocumentId] = useState("");
  const [articleCommentCover, setArticleCommentCover] = useState("");
  const [isDocumentIdLoaded, setIsDocumentIdLoaded] = useState(false);
  const [paginationPage, setPaginationPage] = useState(
    INITIAL_PAGINATION_STATE,
  );

  const form = useCommentForm();
  const dispatch = useAppDispatch();
  const {
    items,
    paginationData,
    isLoading: isLoadingComments,
  } = useAppSelector((state) => state.comment);

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
    loadArticles();
  }
  function handleCloseModal() {
    setIsModalOpen(false);
    setDocumentId("");
    setArticleCommentCover("");
    form.resetForm();
    loadComments();
    dispatch(resetArticles());
  }

  useEffect(() => {
    loadComments();
    return () => {
      dispatch(resetComments());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, paginationPage]);

  useEffect(() => {
    if (documentId && !isDocumentIdLoaded) {
      loadCommentsDetail(documentId);
      setIsDocumentIdLoaded(true);
    }
    return () => {
      setIsDocumentIdLoaded(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, documentId]);

  const loadComments = async () => {
    const params = getParams(paginationPage, "Comments");
    await dispatch(getComments(params));
  };

  const loadArticles = async () => {
    const params = getParams(paginationPage, "Article");
    await dispatch(getArticles(params));
  };

  const loadCommentsDetail = async (id: string) => {
    const params = getParams(paginationPage, "Comments");
    try {
      await dispatch(getComments(params));
      const category = await dispatch(
        getCommentsDetail({ dokId: id, param: params }),
      ).unwrap();
      setArticleCommentCover(category.article?.cover_image_url as string);
      form.setFormData({
        content: category.content,
        article: category.article?.id as number,
      });
    } catch (error) {
      console.error(error);
      toast.error(error as string);
    }
  };

  const handleDeleteComments = async (id: string) => {
    try {
      await dispatch(deletesComments(id));
      toast.success("Berhasil Menghapus Kategori");
      await loadComments();
    } catch (err: any) {
      handleError(err, form.setError, form.setErrorMessage);
      toast.error("Gagal Menghapus Kategori");
    }
  };

  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold leading-7">Comments</h1>
        </div>
        <div className="mt-6 rounded-lg bg-white p-6">
          <div className="flex flex-col items-center justify-start gap-4 lg:flex-row 2xl:gap-6">
            {/* button open modal create */}
            <Button
              // onClick={submit}
              className="group font-Syne w-full lg:w-1/4 flex justify-center items-center font-medium border bg-black text-white italic border-gray-400 px-5 py-3 text-xl transition-colors duration-300 rounded-md hover:ring-4 ring-black/25"
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
            loading={isLoadingComments}
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
                  <div className="flex items-center justify-start gap-3">
                    <div
                      className="inline-block h-10 w-10 flex-none rounded-full object-cover"
                      style={{
                        backgroundImage: `url(${getAvatarUrl(item.user?.username as string)})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                    <div className="flex flex-col items-start justify-start gap-1">
                      <span className="text-sm font-medium capitalize text-black">
                        {(item.user && item.user.username) || "-"}
                      </span>
                      <span className="text-xs bg-neutral-300/25 rounded-tl-none rounded-xl font-normal text-neutral-700 text-ellipsis p-2.5">
                        {item.content || "Tidak Ada Comment"}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm min-w-[300px] max-w-[550px] font-medium capitalize text-black">
                  <img
                    src={
                      (item.article && item.article.cover_image_url) ||
                      "https://placehold.co/400x200/png"
                    }
                    alt={
                      item.article && item.article.title + "_image_" + item.id
                    }
                    className="w-full max-w-[400px] h-[200px] object-cover rounded-md"
                  />
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
                      onClick={() => handleDeleteComments(item.documentId)}
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

      <CommentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        documentId={documentId}
        articleCover={articleCommentCover}
        form={form}
      />
    </>
  );
};

export default CommentsPage;
