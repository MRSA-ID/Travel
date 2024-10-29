export type PaginationData = {
  meta: Pagination;
};

export type Pagination = {
  pagination: PaginationType;
};

export type PaginationType = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export interface ErrorResponse {
  status: number;
  name: string;
  message: string;
  details: ErrorDetailsType | object;
}

type ErrorDetailsType = {
  errors: ErrorDetailType[];
};

type ErrorDetailType = {
  path: string[];
  message: string;
  name: string;
};

export type ErrorSetter = (error: ErrorResponse | null) => void;
export type MessageSetter = (message: string | null) => void;
