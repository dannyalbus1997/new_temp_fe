"use client";
import { useState, useEffect, useCallback, useMemo, MouseEvent } from "react";
import { TableColumnFilterPropsI } from "./TableColumnFilter.interface";

export const useTableColumnFilter = (props: TableColumnFilterPropsI) => {
  const {
    columns = [],
    visibleColumns: controlledVisibleColumns,
    onColumnVisibilityChange,
    permanentColumns = [],
  } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [internalVisibleColumns, setInternalVisibleColumns] = useState<
    string[]
  >(() => {
    const defaultColumns =
      controlledVisibleColumns || columns.map((col) => col.id);
    // Ensure permanent columns are always included
    const columnsWithPermanent = [
      ...new Set([...permanentColumns, ...defaultColumns]),
    ];
    return columnsWithPermanent;
  });

  // Ensure permanent columns are always included in visibleColumns
  const visibleColumns = useMemo(() => {
    const baseColumns = controlledVisibleColumns ?? internalVisibleColumns;
    return [...new Set([...permanentColumns, ...baseColumns])];
  }, [controlledVisibleColumns, internalVisibleColumns, permanentColumns]);

  const open = Boolean(anchorEl);

  useEffect(() => {
    if (controlledVisibleColumns !== undefined) {
      // Ensure permanent columns are always included
      const columnsWithPermanent = [
        ...new Set([...permanentColumns, ...controlledVisibleColumns]),
      ];
      setInternalVisibleColumns(columnsWithPermanent);
    }
  }, [controlledVisibleColumns, permanentColumns]);

  const handleClick = useCallback((event: MouseEvent<HTMLElement>) => {
    event?.stopPropagation();
    setAnchorEl(event?.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleColumnToggle = useCallback(
    (columnId: string, checked: boolean) => {
      // Prevent toggling off permanent columns
      if (!checked && permanentColumns.includes(columnId)) {
        return;
      }

      let newVisibleColumns: string[];
      if (checked) {
        newVisibleColumns = [...visibleColumns, columnId];
      } else {
        newVisibleColumns = visibleColumns.filter((id) => id !== columnId);
      }

      // Ensure permanent columns are always included
      const columnsWithPermanent = [
        ...new Set([...permanentColumns, ...newVisibleColumns]),
      ];

      if (!controlledVisibleColumns) {
        setInternalVisibleColumns(columnsWithPermanent);
      }
      onColumnVisibilityChange?.(columnsWithPermanent);
    },
    [
      visibleColumns,
      controlledVisibleColumns,
      onColumnVisibilityChange,
      permanentColumns,
    ],
  );

  const handleShowAll = useCallback(() => {
    const allColumnIds = columns.map((col) => col.id);
    // Ensure permanent columns are always included
    const columnsWithPermanent = [
      ...new Set([...permanentColumns, ...allColumnIds]),
    ];
    if (!controlledVisibleColumns) {
      setInternalVisibleColumns(columnsWithPermanent);
    }
    onColumnVisibilityChange?.(columnsWithPermanent);
  }, [
    columns,
    controlledVisibleColumns,
    onColumnVisibilityChange,
    permanentColumns,
  ]);

  const handleResetAll = useCallback(() => {
    // Reset to all columns (not empty), ensuring permanent columns are included
    const allColumnIds = columns.map((col) => col.id);
    const columnsWithPermanent = [
      ...new Set([...permanentColumns, ...allColumnIds]),
    ];
    if (!controlledVisibleColumns) {
      setInternalVisibleColumns(columnsWithPermanent);
    }
    onColumnVisibilityChange?.(columnsWithPermanent);
  }, [
    columns,
    controlledVisibleColumns,
    onColumnVisibilityChange,
    permanentColumns,
  ]);

  const allColumnsVisible =
    columns.length > 0 &&
    columns.every((col) => visibleColumns.includes(col.id));
  const noColumnsVisible = visibleColumns.length === 0;

  return {
    anchorEl,
    open,
    visibleColumns,
    allColumnsVisible,
    noColumnsVisible,
    handleClick,
    handleClose,
    handleColumnToggle,
    handleShowAll,
    handleResetAll,
  };
};
