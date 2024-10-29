const SkeletonText = () => {
  return <div className="h-4 bg-gray-200 rounded-md animate-pulse w-3/4" />;
};

const SkeletonTextBlock = () => {
  return (
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 rounded-md animate-pulse w-full" />
      <div className="h-4 bg-gray-200 rounded-md animate-pulse w-5/6" />
      <div className="h-4 bg-gray-200 rounded-md animate-pulse w-4/6" />
    </div>
  );
};

const SkeletonComment = () => {
  return (
    <div className="flex space-x-4">
      {/* Avatar */}
      <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
      <div className="flex-1 space-y-2">
        {/* Username */}
        <div className="h-4 bg-gray-200 rounded-md animate-pulse w-1/4" />
        {/* Comment text */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded-md animate-pulse w-full" />
          <div className="h-4 bg-gray-200 rounded-md animate-pulse w-5/6" />
        </div>
      </div>
    </div>
  );
};

const SkeletonCard = () => {
  return (
    <div className="w-full max-w-xs bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Image placeholder */}
      <div className="w-full h-32 bg-gray-200 animate-pulse" />

      <div className="p-3 space-y-3">
        {/* Category */}
        <div className="h-4 bg-gray-200 rounded-full animate-pulse w-16" />

        {/* Title */}
        <div className="h-5 bg-gray-200 rounded-md animate-pulse w-3/4" />

        {/* Description - single line */}
        <div className="h-4 bg-gray-200 rounded-md animate-pulse w-full" />

        {/* Footer with comment icon */}
        <div className="flex items-center pt-1">
          <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-3 bg-gray-200 rounded-md animate-pulse w-6 ml-2" />
        </div>
      </div>
    </div>
  );
};

const SkeletonButton = () => {
  return <div className="h-10 bg-gray-200 rounded-md animate-pulse w-24" />;
};

const SkeletonSearch = () => {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-gray-300 rounded-full animate-pulse" />
      <div className="h-10 bg-gray-200 rounded-full animate-pulse w-full" />
    </div>
  );
};

const SkeletonSelect = () => {
  return (
    <div className="relative">
      <div className="h-10 bg-gray-200 rounded-md animate-pulse w-full" />
      {/* Chevron icon placeholder */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 bg-gray-300 rounded animate-pulse" />
    </div>
  );
};

export {
  SkeletonText,
  SkeletonTextBlock,
  SkeletonComment,
  SkeletonCard,
  SkeletonButton,
  SkeletonSearch,
  SkeletonSelect,
};
