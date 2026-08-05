"use client"

import { Columns3Icon } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { TableIconAction } from "@/components/table/table-icon-action"
import {
  useTableColumnFilter,
  type TableColumn,
} from "@/components/table/use-table-column-filter"

export interface TableColumnFilterProps {
  columns: TableColumn[]
  visibleColumns?: string[]
  onColumnVisibilityChange?: (visibleColumns: string[]) => void
  permanentColumns?: string[]
  disabled?: boolean
}

/**
 * Column-visibility toggle menu. Replaces the MUI `TableColumnFilter` from
 * `temp/table-components/table-column-filter/TableColumnFilter.tsx`.
 */
export function TableColumnFilter({
  columns,
  visibleColumns,
  onColumnVisibilityChange,
  permanentColumns = [],
  disabled,
}: TableColumnFilterProps) {
  const {
    visibleColumns: resolvedVisibleColumns,
    allColumnsVisible,
    handleColumnToggle,
    handleShowAll,
    handleResetAll,
  } = useTableColumnFilter({
    columns,
    visibleColumns,
    onColumnVisibilityChange,
    permanentColumns,
  })

  return (
    <TableIconAction
      icon={<Columns3Icon />}
      disabled={disabled}
      ariaLabel="Filter columns"
    >
      <DropdownMenuLabel>Columns</DropdownMenuLabel>
      <div className="flex items-center justify-between gap-2 px-1.5 py-1">
        <label className="flex items-center gap-1.5 text-sm select-none">
          <Checkbox
            checked={allColumnsVisible}
            onCheckedChange={(checked) =>
              checked ? handleShowAll() : handleResetAll()
            }
          />
          Show all
        </label>
        <button
          type="button"
          onClick={handleResetAll}
          className="text-xs font-medium text-primary hover:underline"
        >
          Reset
        </button>
      </div>
      <DropdownMenuSeparator />
      {columns.map((column) => {
        const isPermanent = permanentColumns.includes(column.id)
        return (
          <DropdownMenuCheckboxItem
            key={column.id}
            checked={resolvedVisibleColumns.includes(column.id)}
            disabled={isPermanent}
            onCheckedChange={(checked) =>
              handleColumnToggle(column.id, checked)
            }
          >
            {column.header}
          </DropdownMenuCheckboxItem>
        )
      })}
    </TableIconAction>
  )
}
