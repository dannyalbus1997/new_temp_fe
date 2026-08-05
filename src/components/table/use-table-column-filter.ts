"use client"

import * as React from "react"

export interface TableColumn {
  id: string
  header: string
}

export interface UseTableColumnFilterProps {
  columns: TableColumn[]
  /** Controlled visible-column ids. Omit to manage visibility internally. */
  visibleColumns?: string[]
  onColumnVisibilityChange?: (visibleColumns: string[]) => void
  /** Column ids that can never be hidden. */
  permanentColumns?: string[]
}

/**
 * Column-visibility toggling logic behind `TableColumnFilter`. Ported from
 * `temp/table-components/table-column-filter/useTableColumnFilter.ts`, minus
 * the MUI anchor-element (`anchorEl`/`open`) state — the `DropdownMenu` used
 * by `TableColumnFilter` manages its own open state.
 */
export function useTableColumnFilter({
  columns,
  visibleColumns: controlledVisibleColumns,
  onColumnVisibilityChange,
  permanentColumns = [],
}: UseTableColumnFilterProps) {
  const [internalVisibleColumns, setInternalVisibleColumns] = React.useState<
    string[]
  >(() => {
    const defaultColumns =
      controlledVisibleColumns ?? columns.map((col) => col.id)
    return [...new Set([...permanentColumns, ...defaultColumns])]
  })

  // Ensure permanent columns are always included, whether the visibility
  // list is controlled or internally managed. When controlled, this reads
  // `controlledVisibleColumns` directly (no need to mirror it into
  // `internalVisibleColumns` via an effect) — the internal state only
  // matters as the source of truth while uncontrolled.
  const visibleColumns = React.useMemo(() => {
    const baseColumns = controlledVisibleColumns ?? internalVisibleColumns
    return [...new Set([...permanentColumns, ...baseColumns])]
  }, [controlledVisibleColumns, internalVisibleColumns, permanentColumns])

  const handleColumnToggle = React.useCallback(
    (columnId: string, checked: boolean) => {
      // Permanent columns can never be toggled off.
      if (!checked && permanentColumns.includes(columnId)) {
        return
      }

      const nextColumns = checked
        ? [...visibleColumns, columnId]
        : visibleColumns.filter((id) => id !== columnId)

      const columnsWithPermanent = [
        ...new Set([...permanentColumns, ...nextColumns]),
      ]

      if (controlledVisibleColumns === undefined) {
        setInternalVisibleColumns(columnsWithPermanent)
      }
      onColumnVisibilityChange?.(columnsWithPermanent)
    },
    [
      visibleColumns,
      controlledVisibleColumns,
      onColumnVisibilityChange,
      permanentColumns,
    ]
  )

  const handleShowAll = React.useCallback(() => {
    const allColumnIds = columns.map((col) => col.id)
    const columnsWithPermanent = [
      ...new Set([...permanentColumns, ...allColumnIds]),
    ]
    if (controlledVisibleColumns === undefined) {
      setInternalVisibleColumns(columnsWithPermanent)
    }
    onColumnVisibilityChange?.(columnsWithPermanent)
  }, [
    columns,
    controlledVisibleColumns,
    onColumnVisibilityChange,
    permanentColumns,
  ])

  // Mirrors the original behavior: "reset" restores every column to
  // visible (not empty) — the same outcome as `handleShowAll`.
  const handleResetAll = React.useCallback(() => {
    handleShowAll()
  }, [handleShowAll])

  const allColumnsVisible =
    columns.length > 0 &&
    columns.every((col) => visibleColumns.includes(col.id))

  return {
    visibleColumns,
    allColumnsVisible,
    handleColumnToggle,
    handleShowAll,
    handleResetAll,
  }
}
