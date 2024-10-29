import React, { useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  RefreshCw,
} from "lucide-react";
import { PaginationType } from "@/types";

type Column = {
  prop: string;
  label: string;
};

interface DataTableProps {
  columns: Column[];
  loading?: boolean;
  empty?: boolean;
  footTable?: boolean;
  pagination?: PaginationType;
  error?: string | null;
  children?: React.ReactNode;
  onChangePageData?: (value: number) => void;
  onChangePagination?: (value: number) => void;
  onRetry?: () => void;
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  loading = false,
  empty = false,
  footTable = false,
  pagination,
  error = null,
  children,
  onChangePageData,
  onChangePagination,
  onRetry,
}) => {
  const [perPage, setPerPage] = useState(pagination?.pageSize || 10);

  const handlePerPageChange = (value: number) => {
    setPerPage(value);
    onChangePageData?.(value);
  };

  const handlePageChange = (page: number) => {
    if (pagination && page >= 1 && page <= pagination.pageCount) {
      onChangePagination?.(page);
    }
  };

  return (
    <div>
      <div className="relative z-10 mt-6 grid">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table className="w-full min-w-[903px] divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr className="uppercase">
                    {columns.map((column, index) => (
                      <th
                        key={index}
                        scope="col"
                        className={`whitespace-nowrap px-4 py-3.5 text-left text-sm font-semibold text-gray-900 ${
                          index === columns.length - 1
                            ? "w-44"
                            : index === columns.length - 2
                              ? "w-60"
                              : ""
                        }`}
                      >
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {loading ? (
                    <tr>
                      <td colSpan={100} className="py-24">
                        <div className="flex items-center justify-center">
                          <div className="h-11 w-11 animate-spin rounded-full border-4 border-gray-200 border-t-gray-800" />
                        </div>
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={100} className="py-24">
                        <div className="flex flex-col items-center justify-center">
                          <p className="mb-4 text-gray-500">{error}</p>
                          <button
                            onClick={onRetry}
                            className="inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
                          >
                            <RefreshCw className="h-5 w-5" />
                            <span>Refresh</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : empty ? (
                    <tr>
                      <td
                        colSpan={100}
                        className="py-24 text-center text-gray-500"
                      >
                        Belum Ada Data Saat Ini
                      </td>
                    </tr>
                  ) : (
                    children
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {footTable && (
        <div className="mt-6 flex flex-col items-center justify-between gap-8 xl:flex-row">
          {pagination && (
            <div className="flex items-center justify-start gap-4">
              <span className="text-left text-base font-normal text-gray-500">
                Showing {pagination.page} - {pagination.pageSize} of{" "}
                {pagination.total}
              </span>

              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="inline-flex h-10 w-24 items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none">
                  {perPage}
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </Menu.Button>

                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {[2, 5, 10, 15].map((value) => (
                        <Menu.Item key={value}>
                          {({ active }) => (
                            <button
                              onClick={() => handlePerPageChange(value)}
                              className={`${
                                active ? "bg-gray-100" : ""
                              } block w-full px-4 py-2 text-left text-sm text-gray-700`}
                            >
                              {value}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          )}

          {pagination && (
            <nav className="relative z-0 inline-flex space-x-2">
              <button
                type="button"
                disabled={pagination.page <= 1}
                onClick={() => handlePageChange(pagination.page - 1)}
                className={`inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-sm font-medium ${
                  pagination.page <= 1
                    ? "cursor-not-allowed text-gray-300"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {Array.from({ length: pagination.pageCount }, (_, index) => {
                const pageNum = index + 1;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    disabled={pagination.page === pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium ${
                      pagination.page === pageNum
                        ? "bg-neutral-400 text-white hover:bg-neutral-700"
                        : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                type="button"
                disabled={pagination.page >= pagination.pageCount}
                onClick={() => handlePageChange(pagination.page + 1)}
                className={`inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-sm font-medium ${
                  pagination.page >= pagination.pageCount
                    ? "cursor-not-allowed text-gray-300"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </nav>
          )}
        </div>
      )}
    </div>
  );
};

export default DataTable;
