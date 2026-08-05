"use client";

import { forwardRef, JSX, useImperativeHandle, useState, useRef } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import {
  TableHead,
  TableContainer,
  TableBody,
  Table,
  Box,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import type { CustomTableProps } from "./custom-table.types";
import { StyledTableCell, StyledTableRow, styles } from "./custom-table.styles";
import { IsFetching, NoContentFound } from "../table-components";
import { ApiErrorState } from "../api-error-state";
import { CustomPagination } from "../custom-pagination";
import { PAGINATION } from "@shared/utils";
import { CustomTableSkeleton } from "../skeletons";

const EMPTY_ARRAY: [] = [];

export const CustomTable = forwardRef(function CustomTable(
  {
    columns,
    data,
    isFetching = false,
    isLoading = false,
    isError = false,
    isSuccess = false,
    totalPages = 1,
    currentPage = 1,
    onPageChange,
    onSortByChange,
    isPagination = true,
    tableContainerSX = {},
    rootSX = {},
    showSerialNo = false,
    serialNoTitle = "SR",
    onSelected = () => {
      return null;
    },
    paginationProps,
    onRowClick,
    noContentFoundProps,
    apiErrorStateProps,
    setPage,
    paginationPageKeyName = "offset",
    paginationLimit = PAGINATION?.PAGE_LIMIT,
  }: CustomTableProps,
  ref,
): JSX.Element {
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);

  const theme = useTheme();

  let columnsData = columns;
  const refSortData = (() => {
    const sortDataMap: any = {};
    for (const colData of columns) {
      if (colData?.isSortable) sortDataMap[colData?.id] = 0;
    }
    return sortDataMap;
  })();

  const sortRef = useRef(refSortData);

  const handleSortBy = (colId: string) => {
    sortRef.current[colId]++;
    if (sortRef.current[colId] % 2 === 1) {
      setSorting([{ id: colId, desc: false }]);
      onSortByChange?.({ id: colId, sortOrder: 1 });
    } else {
      setSorting([{ id: colId, desc: true }]);
      onSortByChange?.({ id: colId, sortOrder: -1 });
    }
  };

  const getIconColor = (colId: string, direction: number) => {
    const sortedColumn = sorting.find((sort) => sort.id === colId);
    if (sortedColumn) {
      return sortedColumn.desc === (direction === -1)
        ? theme.palette.primary.main
        : theme.palette.grey[500];
    }
    return theme.palette.grey[500];
  };

  if (showSerialNo) {
    columnsData = [
      ...(columns[0]?.id === "select"
        ? [
            columns[0],
            {
              accessorFn: (row: any) => row,
              id: "srNo",
              cell: ({ row, index }: any): JSX.Element => {
                const recordsPerPage = 10;
                let rowIndex = Number(index + 1);
                if (isNaN(rowIndex)) {
                  rowIndex = Number(row.id);
                }
                if (isNaN(rowIndex) || isNaN(currentPage)) {
                  return <Box>Invalid</Box>;
                }
                const serialNumber =
                  (currentPage - 1) * recordsPerPage + rowIndex + 1;
                return <Box>{serialNumber}</Box>;
              },
              header: serialNoTitle,
              isSortable: false,
            },
            ...columns.slice(1),
          ]
        : [
            {
              accessorFn: (row: any) => row,
              id: "srNo",
              cell: ({ row, index }: any): JSX.Element => {
                const recordsPerPage = paginationLimit ?? 10;
                let rowIndex = Number(index + 1);
                if (isNaN(rowIndex)) {
                  rowIndex = Number(row.id);
                }
                if (isNaN(rowIndex) || isNaN(currentPage)) {
                  return <Box>Invalid</Box>;
                }
                const serialNumber =
                  (currentPage - 1) * recordsPerPage + rowIndex + 1;
                return <Box>{serialNumber}</Box>;
              },
              header: serialNoTitle,
              isSortable: false,
            },
            ...columns,
          ]),
    ];
  } else null;

  const enableRowSelection = columns.some((c: any) => c.id === "select");

  const table = useReactTable({
    data: data ?? EMPTY_ARRAY,
    columns: columnsData,
    state: {
      rowSelection,
      sorting,
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    enableRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  onSelected(table.getSelectedRowModel().flatRows);
  useImperativeHandle(
    ref,
    () => ({
      resetRowSelection: () => {
        setRowSelection({});
      },
      onSelectedRow: () => table.getSelectedRowModel().flatRows,
      table,
    }),
    [setRowSelection, table],
  );

  if (isLoading) return <CustomTableSkeleton />;

  return (
    <Grid container sx={{ position: "relative", ...rootSX }}>
      <IsFetching isFetching={isFetching} />
      <Grid size={12}>
        {/* Table Container */}
        <Box sx={{ overflowX: "auto" }}>
          <TableContainer sx={styles.tableContainer(tableContainerSX, theme)}>
            <Table stickyHeader>
              {/* Table Head */}
              <TableHead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <StyledTableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header: any) => (
                      <StyledTableCell key={header.id}>
                        <Box
                          onClick={() =>
                            header.column.columnDef.isSortable &&
                            handleSortBy(header?.id)
                          }
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            cursor: header.column.columnDef.isSortable
                              ? "pointer"
                              : "default",
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                          {header.column.columnDef.isSortable && (
                            <Box
                              display="flex"
                              flexDirection="column"
                              alignItems="center"
                              gap={0}
                            >
                              <ArrowDropUpRoundedIcon
                                sx={{
                                  fontSize: 25,
                                  color: getIconColor(header.id, 1),
                                  marginBottom: -2,
                                }}
                              />
                              <ArrowDropDownRoundedIcon
                                sx={{
                                  fontSize: 25,
                                  color: getIconColor(header.id, -1),
                                }}
                              />
                            </Box>
                          )}
                        </Box>
                      </StyledTableCell>
                    ))}
                  </StyledTableRow>
                ))}
              </TableHead>

              {/* Table Body */}
              {isSuccess && table.getRowModel().rows.length > 0 && (
                <TableBody>
                  {table.getRowModel().rows.map((row) => (
                    <StyledTableRow
                      key={row.id}
                      onClick={() => onRowClick?.(row.original)}
                      sx={{
                        cursor: onRowClick ? "pointer" : "default",
                        "&:hover": onRowClick
                          ? { backgroundColor: theme.palette.grayscale[100] }
                          : undefined,
                      }}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <StyledTableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </StyledTableCell>
                      ))}
                    </StyledTableRow>
                  ))}
                </TableBody>
              )}
            </Table>

            {/* No Content or Error */}
            {isError ? (
              <Grid container sx={styles.error(theme)}>
                <Grid>
                  <ApiErrorState {...apiErrorStateProps} />
                </Grid>
              </Grid>
            ) : (
              table.getRowModel().rows.length === 0 && (
                <Grid container sx={styles.error(theme)}>
                  <Grid>
                    <NoContentFound {...noContentFoundProps} />
                  </Grid>
                </Grid>
              )
            )}
          </TableContainer>
        </Box>

        <Grid container>
          <Grid size={12}>
            {isSuccess && isPagination && (
              <CustomPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                paginationProps={paginationProps}
                setPage={setPage}
                pageKeyName={paginationPageKeyName}
                limit={paginationLimit}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
});
