"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface TableActionProps {
  /** `DropdownMenuItem`s (or similar) to render inside the menu. */
  children: React.ReactNode
  label?: string
  disabled?: boolean
  className?: string
}

/**
 * Dropdown-menu trigger button for table-level bulk actions. Replaces the
 * MUI `<Menu>`-based `TableAction` from
 * `temp/table-components/table-action/index.tsx`.
 */
export function TableAction({
  children,
  label = "Select",
  disabled,
  className,
}: TableActionProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" disabled={disabled} className={cn(className)} />
        }
      >
        {label}
        <ChevronDownIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>{children}</DropdownMenuContent>
    </DropdownMenu>
  )
}
