"use client";

import type { PaginationProps } from "@mui/material";
import type { AccessorFn } from "@tanstack/react-table";
import { INoContentFoundProps } from "../table-components/no-content-found/no-content-found.interface";
import { IApiErrorStateProps } from "../api-error-state/ApiErrorState.interface";

interface columns {
  accessorFn?: AccessorFn<any>;
  id: string;
  cell: (info: any) => void;
  header: any;
  isSortable?: boolean;
}

export interface CustomTableProps {
  columns: columns[];
  data: any;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  isFetching?: boolean;
  isPagination?: boolean;
  totalPages?: number;
  maxHeight?: number;
  minHeight?: number;
  currentPage?: number;
  onPageChange?: any;
  onSortByChange?: any;
  tableContainerSX?: any;
  showSerialNo?: boolean;
  serialNoTitle?: string;
  rootSX?: any;
  onSelected?: (e: any) => void;
  paginationProps?: PaginationProps;
  onRowClick?: (rowData: any) => void;
  noContentFoundProps?: INoContentFoundProps;
  apiErrorStateProps?: IApiErrorStateProps;
  setPage?: any;
  paginationPageKeyName?: string;
  paginationLimit?: number;
}
