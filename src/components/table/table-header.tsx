"use client"

import * as React from "react"
import { SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

export interface TableHeaderProps {
  onSearch: (value: string) => void
  placeholder?: string
  className?: string
  /** Which side of the toolbar the search input is aligned to. Defaults to `"start"`. */
  position?: "start" | "end"
}

/**
 * Debounced search input for table toolbars. Replaces the MUI `TableHeader`
 * component from `temp/table-components/table-header/index.tsx`.
 *
 * NOTE: this export's name collides with `TableHeader` from
 * `@/components/ui/table` (the `<thead>` wrapper). They live in different
 * modules so this is fine, but alias one of them if you need both in the
 * same file, e.g.
 * `import { TableHeader as TableSearchHeader } from "@/components/table/table-header"`.
 */
export function TableHeader({
  onSearch,
  placeholder = "Search",
  className,
  position = "start",
}: TableHeaderProps) {
  const [value, setValue] = React.useState("")
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const next = event.target.value
    setValue(next)

    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      onSearch(next)
    }, 300)
  }

  return (
    <div
      className={cn(
        "flex w-full items-center",
        position === "start" ? "justify-start" : "justify-end",
        className
      )}
    >
      <InputGroup className="max-w-xs">
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          autoComplete="off"
        />
      </InputGroup>
    </div>
  )
}
