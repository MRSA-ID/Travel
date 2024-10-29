import { CommentsType } from "@/types/articles";
import { Category } from "@/types/category";
import { Users } from "@/types/users";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/16/solid";

type CardArticleProps = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  cover_image_url: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: null;
  user: Users;
  category: Category | null;
  comments: CommentsType;
  localizations: [unknown];
  onClick: (val: string) => void;
};

const CardArticle = ({
  documentId,
  title,
  description,
  cover_image_url,
  category,
  comments,
  onClick,
}: CardArticleProps) => {
  return (
    <div
      onClick={() => onClick(documentId as string)}
      className="w-full max-w-xs cursor-pointer bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      {/* Image */}
      <img
        src={cover_image_url || "https://placehold.co/400x200/png"}
        alt={title}
        className="w-full h-32 object-cover"
      />

      <div className="p-3 space-y-3">
        <span className="inline-block px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
          {category?.name}
        </span>

        <h3 className="font-medium text-gray-900 text-sm leading-5 h-10 overflow-hidden">
          {title}
        </h3>

        <p className="text-sm text-gray-500 truncate">{description}</p>

        {/* Footer with comment icon */}
        <div className="flex items-center pt-1">
          {/* Chat Bubble Icon dari Heroicons */}
          <ChatBubbleOvalLeftEllipsisIcon className="size-6 fill-gray-400" />
          <span className="text-xs text-gray-500 ml-2">{comments?.length}</span>
        </div>
      </div>
    </div>
  );
};

export default CardArticle;
