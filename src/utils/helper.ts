import { PaginationStateType } from "@/hooks/article/useForm";

// Generate avatar placeholder with fallback
export const getAvatarUrl = (username: string): string => {
  if (!username) return "https://via.placeholder.com/40/CCE0E3/1F2933/?text=U";
  const initials = username.match(/\b\w/g)?.join("");
  return `https://via.placeholder.com/40/CCE0E3/1F2933/?text=${initials}`;
};

export function formatTimestamp(ts: string): string {
  const date = new Date(ts);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short", // Menghasilkan nama bulan singkat (Jan, Feb, dll.)
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Format waktu 12 jam (AM/PM)
  };
  return date.toLocaleString("en-US", options);
}

type isForType =
  | "Article"
  | "Category"
  | "Comments"
  | "AddCommentsPopulateUser"
  | "AddUser"
  | "AddCategory"
  | "addFilterCategory"
  | "_";

export const getParams = (
  pagination: PaginationStateType,
  isFor?: isForType,
  search?: string,
  srtComment?: boolean,
) => {
  const baseParams = {
    "pagination[page]": pagination.page,
    "pagination[pageSize]": pagination.per_page,
    // "populate[comments][populate][user]": "*",
    // "populate[user]": "*",
    // "populate[category]": "*",
  };
  switch (isFor) {
    case "Article":
      return search
        ? {
            ...baseParams,
            "populate[user]": "*",
            "populate[category]": "*",
            "filters[title][$eqi]": search,
          }
        : {
            ...baseParams,
            "populate[comments][populate][user]": "*",
            "populate[user]": "*",
            "populate[category]": "*",
          };
    case "Category":
      return {
        ...baseParams,
        "populate[comments][populate][user]": "*",
        "populate[user]": "*",
        "populate[category]": "*",
      };
    case "Comments":
      return srtComment
        ? {
            ...baseParams,
            "populate[article]": "*",
            "sort[0]": "title:desc",
            "populate[user]": "*",
          }
        : {
            ...baseParams,
            "populate[article]": "*",
            "populate[user]": "*",
          };
    case "AddCommentsPopulateUser":
      return {
        ...baseParams,
        "populate[comments][populate][user]": "*",
      };
    case "AddUser":
      return {
        ...baseParams,
        "populate[user]": "*",
      };
    case "AddCategory":
      return {
        ...baseParams,
        "populate[category]": "*",
      };
    case "addFilterCategory":
      return {
        ...baseParams,
        "filters[category][name][$eqi]": "*",
      };
    default:
      return search
        ? { ...baseParams, "filters[title][$eqi]": search }
        : baseParams;
  }
};
