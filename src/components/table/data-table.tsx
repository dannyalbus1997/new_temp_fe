"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type RowSelectionState,
  type SortingState,
} from "@tanstack/react-table"
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { IsFetching } from "@/components/table/is-fetching"
import { NoContentFound } from "@/components/table/no-content-found"

/** Per-column sort opt-in, read off `ColumnDef.meta`. */
interface TableColumnMeta {
  sortable?: boolean
}

/** A single-column sort descriptor, or `null` when unsorted. */
export interface TableSort {
  id: string
  desc: boolean
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]

  isLoading?: boolean
  isFetching?: boolean
  isError?: boolean
  /** Rendered instead of the default error `NoContentFound` when `isError` is true. */
  errorState?: React.ReactNode
  /** Rendered instead of the default empty `NoContentFound` when there are zero rows. */
  emptyState?: React.ReactNode

  /**
   * Server-driven sort callback. When provided, sorting is treated as
   * manual: the table only tracks local state for the header arrow UI and
   * calls this with the next sort (or `null` once cycled back to unsorted)
   * — it never sorts `data` itself.
   */
  onSortByChange?: (sort: TableSort | null) => void

  /** Show the pagination footer. Defaults to `true`. */
  pagination?: boolean
  pageIndex?: number
  pageCount?: number
  onPageChange?: (pageIndex: number) => void

  enableRowSelection?: boolean
  onSelectionChange?: (rows: TData[]) => void

  showSerialNo?: boolean
  serialNoTitle?: string

  onRowClick?: (row: TData) => void

  className?: string
}

const SKELETON_ROW_COUNT = 5
const SELECT_COLUMN_ID = "__select"
const SERIAL_NO_COLUMN_ID = "__serialNo"

/**
 * Generic, server-driven TanStack Table wrapper with loading/error/empty
 * states, a fetching overlay, manual sorting, manual pagination, row
 * selection, and an optional serial-number column. Recreates
 * `temp/custom-table/index.tsx` (`CustomTable`) on top of the shadcn table
 * primitives.
 *
 * For simple, fully client-side tables prefer the lighter
 * `src/components/data-table/data-table.tsx` instead.
 */
export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
  isFetching = false,
  isError = false,
  errorState,
  emptyState,
  onSortByChange,
  pagination = true,
  pageIndex,
  pageCount,
  onPageChange,
  enableRowSelection = false,
  onSelectionChange,
  showSerialNo = false,
  serialNoTitle = "#",
  onRowClick,
  className,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>(
    {}
  )

  const tableColumns = React.useMemo<ColumnDef<TData, TValue>[]>(() => {
    const injected: ColumnDef<TData, TValue>[] = []

    if (enableRowSelection) {
      injected.push({
        id: SELECT_COLUMN_ID,
        header: ({ table }) => {
          const isAllSelected = table.getIsAllPageRowsSelected()
          const isSomeSelected = table.getIsSomePageRowsSelected()
          return (
            <Checkbox
              checked={isAllSelected}
              indeterminate={!isAllSelected && isSomeSelected}
              onCheckedChange={(checked) =>
                table.toggleAllPageRowsSelected(checked === true)
              }
              aria-label="Select all rows"
            />
          )
        },
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(checked) => row.toggleSelected(checked === true)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
      })
    }

    if (showSerialNo) {
      const pageSize = data.length || 1
      injected.push({
        id: SERIAL_NO_COLUMN_ID,
        header: serialNoTitle,
        cell: ({ row }) =>
          pageIndex !== undefined
            ? pageIndex * pageSize + row.index + 1
            : row.index + 1,
        enableSorting: false,
      })
    }

    return [...injected, ...columns]
  }, [columns, enableRowSelection, showSerialNo, serialNoTitle, pageIndex, data.length])

  const table = useReactTable({
    data,
    columns: tableColumns,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    enableRowSelection,
    getCoreRowModel: getCoreRowModel(),
  })

  React.useEffect(() => {
    if (!onSelectionChange) return
    onSelectionChange(
      table.getSelectedRowModel().flatRows.map((row) => row.original)
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowSelection])

  function handleSortClick(columnId: string) {
    setSorting((prev) => {
      const current = prev.find((sort) => sort.id === columnId)
      const next: SortingState = !current
        ? [{ id: columnId, desc: false }]
        : !current.desc
          ? [{ id: columnId, desc: true }]
          : []

      onSortByChange?.(next[0] ?? null)
      return next
    })
  }

  const columnCount = tableColumns.length
  const rows = table.getRowModel().rows

  if (isLoading) {
    return (
      <div className={cn("flex flex-col gap-3", className)}>
        <div className="rounded-lg border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {Array.from({ length: columnCount }).map((_, index) => (
                  <TableHead key={index}>
                    <Skeleton className="h-4 w-20" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: SKELETON_ROW_COUNT }).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {Array.from({ length: columnCount }).map((_, colIndex) => (
                    <TableCell key={colIndex}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="relative">
        <div className="rounded-lg border overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const meta = header.column.columnDef.meta as
                      | TableColumnMeta
                      | undefined
                    const sortable = !!meta?.sortable
                    const sortState = sorting.find(
                      (sort) => sort.id === header.column.id
                    )

                    return (
                      <TableHead
                        key={header.id}
                        className={cn(sortable && "cursor-pointer select-none")}
                        onClick={
                          sortable
                            ? () => handleSortClick(header.column.id)
                            : undefined
                        }
                      >
                        <span className="inline-flex items-center gap-1">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                          {sortable &&
                            (sortState ? (
                              sortState.desc ? (
                                <ArrowDownIcon className="size-3.5" />
                              ) : (
                                <ArrowUpIcon className="size-3.5" />
                              )
                            ) : (
                              <ArrowUpDownIcon className="size-3.5 text-muted-foreground" />
                            ))}
                        </span>
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isError ? (
                <TableRow>
                  <TableCell colSpan={columnCount} className="p-0 whitespace-normal">
                    {errorState ?? (
                      <NoContentFound message="Something went wrong" />
                    )}
                  </TableCell>
                </TableRow>
              ) : rows.length ? (
                rows.map((row) => (
                  <TableRow
                    key={row.id}
                    onClick={onRowClick ? () => onRowClick(row.original) : undefined}
                    className={cn(onRowClick && "cursor-pointer")}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columnCount} className="p-0 whitespace-normal">
                    {emptyState ?? <NoContentFound />}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <IsFetching isFetching={isFetching} />
      </div>

      {pagination && (
        <div className="flex items-center justify-end gap-3">
          <span className="text-sm text-muted-foreground">
            Page {(pageIndex ?? 0) + 1} of {pageCount ?? 1}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange?.((pageIndex ?? 0) - 1)}
            disabled={(pageIndex ?? 0) === 0}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange?.((pageIndex ?? 0) + 1)}
            disabled={pageCount !== undefined && (pageIndex ?? 0) >= pageCount - 1}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
