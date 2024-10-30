/* eslint-disable @typescript-eslint/no-explicit-any */
import useCommentForm from "@/hooks/comments/useForm";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { setLoading } from "@/store/slices/articleSlices";
import { createComments } from "@/store/slices/commentSlices";
import { ErrorResponse, ErrorSetter, MessageSetter } from "@/types";
import { Article } from "@/types/articles";
import { Button, Field, Input, Label } from "@headlessui/react";
import { PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useEffect } from "react";
import toast from "react-hot-toast";

type CardArticleProps = {
  isOpen: boolean;
  onClose: () => void;
  article: Article | null;
  onLoadArticle: (documentId: string) => void;
  onLoadArticles: () => void;
  isLoading: boolean;
  error: any;
};

const ModalArticleDetail = ({
  isOpen,
  onClose,
  article,
  onLoadArticle,
  onLoadArticles,
  isLoading,
  error,
}: CardArticleProps) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { isLoading: isLoadingComment } = useAppSelector(
    (state) => state.comment,
  );
  const form = useCommentForm();

  useEffect(() => {
    return () => {
      form.handleArticleSelect(article?.id as number);
    };
  }, []);

  if (!isOpen) return null;

  const formatRelativeTime = (dateString: string) => {
    const date: Date = new Date(dateString);
    const now: Date = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInSeconds < 60) return "just now";
    if (diffInMinutes < 60)
      return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`;
    if (diffInHours < 24)
      return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
    if (diffInDays < 30)
      return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
    if (diffInMonths < 12)
      return `${diffInMonths} ${diffInMonths === 1 ? "month" : "months"} ago`;
    return `${diffInYears} ${diffInYears === 1 ? "year" : "years"} ago`;
  };

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
          toast.error("Terjadi Kesalahan Saat Mengirim Comment");
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
    form.handleArticleSelect(null);
    onClose();
  }

  const handleSubmit = async () => {
    form.setError(null);
    setLoading(true);
    try {
      await dispatch(createComments(form.formData)).unwrap();
      toast.success("Berhasil Mengirim Comment");
      form.resetForm();
      // handleClose();
      setTimeout(() => {
        onLoadArticle(article?.documentId as string);
        onLoadArticles();
        setLoading(false);
      }, 500);
    } catch (err: any) {
      handleSubmitError(err, form.setError, form.setErrorMessage);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] shadow-xl">
        {
          // isLoading ? (
          // 	<div className="h-64 flex items-center justify-center">
          // 		<div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
          // 	</div>
          // ) :
          error ? (
            <div className="h-64 flex items-center justify-center flex-col gap-4">
              <p className="text-red-500 font-medium">Failed to load article</p>
              <Button
                onClick={handleClose}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                Close
              </Button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="text-neutral-800 flex items-center justify-between p-6 border-b">
                <h2 className="text-2xl font-Syne font-bold">
                  {article?.title}
                </h2>
                <Button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <XMarkIcon className="h-5 w-5 fill-black" />
                </Button>
              </div>

              {/* Scrollable Content */}
              <div className="text-neutral-800 overflow-y-auto max-h-[calc(90vh-8rem)]">
                <div className="p-6">
                  {/* Article Image */}
                  {article?.cover_image_url && (
                    <div className="relative w-full h-[300px] mb-6 rounded-lg overflow-hidden">
                      <img
                        src={article.cover_image_url}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Article Meta */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      {article?.user?.username?.[0]?.toUpperCase() || "U"}
                    </div>
                    <div>
                      <p className="font-semibold">{article?.user?.username}</p>
                      <p className="text-sm text-gray-500">
                        {article?.createdAt &&
                          formatRelativeTime(article.createdAt)}
                      </p>
                    </div>
                    {article?.category && (
                      <span className="ml-auto text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-sm">
                        {article.category.name}
                      </span>
                    )}
                  </div>

                  {/* Article Content */}
                  <div className="prose max-w-none mb-8">
                    {article?.description}
                  </div>

                  {/* Comments Section */}
                  {article?.comments && article.comments.length > 0 && (
                    <div className="relative border-t pt-6">
                      {isLoading && (
                        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-200/35 flex justify-center items-center">
                          <div className="flex items-center justify-center">
                            <div className="size-4 animate-spin rounded-full border-4 border-white border-t-gray-800" />
                          </div>
                        </div>
                      )}
                      <h3 className="text-lg font-semibold mb-4">
                        Comments ({article.comments.length})
                      </h3>
                      <div className="space-y-4 max-h-52 overflow-auto">
                        {!isLoading &&
                          article.comments.map((comment) => (
                            <div
                              key={comment.id}
                              className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                            >
                              <div className="h-8 w-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                                {comment?.user?.username?.[0]?.toUpperCase() ||
                                  "U"}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-4">
                                  <p className="font-medium truncate">
                                    {comment?.user?.username}
                                  </p>
                                  <p className="text-sm text-gray-500 flex-shrink-0">
                                    {comment?.createdAt &&
                                      formatRelativeTime(comment.createdAt)}
                                  </p>
                                </div>
                                <p className="mt-1 text-gray-600">
                                  {comment.content}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                  <Field className="flex items-center justify-start gap-2 mt-2">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                      {user?.username?.[0]?.toUpperCase() || "U"}
                    </div>
                    {/* input sent message */}
                    <div className="flex flex-col w-full items-start justify-start">
                      <Label
                        htmlFor="content"
                        className="text-sm/6 font-medium"
                      >
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
                          onChange={(e) => {
                            form.handleArticleSelect(article?.id as number);
                            form.handleChange(e);
                          }}
                        />
                        <Button
                          // onClick={submit}
                          className="absolute inset-y-3 bottom-0 right-0 flex items-center pl-3 pr-4 bg-black/20 rounded-r-xl"
                          onClick={handleSubmit}
                        >
                          {isLoadingComment ? (
                            <div className="flex items-center justify-center">
                              <div className="size-4 animate-spin rounded-full border-4 border-gray-200 border-t-gray-800" />
                            </div>
                          ) : (
                            <PaperAirplaneIcon className="size-4 fill-gray-600" />
                          )}
                        </Button>
                      </div>
                    </div>
                    {/* ajhir input sent message */}
                  </Field>
                </div>
              </div>
            </>
          )
        }
      </div>
    </div>
  );
};

export default ModalArticleDetail;
