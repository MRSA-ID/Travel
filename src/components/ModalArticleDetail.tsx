/* eslint-disable @typescript-eslint/no-explicit-any */
import { Article } from "@/types/articles";
import { Button } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/16/solid";

type CardArticleProps = {
  isOpen: boolean;
  onClose: () => void;
  article: Article | null;
  isLoading: boolean;
  error: any;
};

const ModalArticleDetail = ({
  isOpen,
  onClose,
  article,
  isLoading,
  error,
}: CardArticleProps) => {
  if (!isOpen) return null;

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] shadow-xl">
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="h-64 flex items-center justify-center flex-col gap-4">
            <p className="text-red-500 font-medium">Failed to load article</p>
            <Button
              onClick={onClose}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Close
            </Button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-neutral-800 flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-Syne font-bold">{article?.title}</h2>
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
                    <span className="ml-auto bg-black/5 px-3 py-1 rounded-full text-sm">
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
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Comments ({article.comments.length})
                    </h3>
                    <div className="space-y-4">
                      {article.comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                            {comment?.user?.username?.[0]?.toUpperCase() || "U"}
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
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalArticleDetail;
