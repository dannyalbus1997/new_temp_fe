"use client"

import * as React from "react"
import { EllipsisVerticalIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface TableIconActionProps {
  /** `DropdownMenuItem`s (or similar) to render inside the menu. */
  children: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
  className?: string
  ariaLabel?: string
}

/**
 * Icon-only dropdown-menu trigger for per-row (or per-toolbar) actions.
 * Replaces the MUI `TableIconActions` from
 * `temp/table-components/table-icon-action/index.tsx`.
 */
export function TableIconAction({
  children,
  icon,
  disabled,
  className,
  ariaLabel = "Open actions menu",
}: TableIconActionProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            disabled={disabled}
            aria-label={ariaLabel}
            className={cn(className)}
          />
        }
      >
        {icon ?? <EllipsisVerticalIcon />}
      </DropdownMenuTrigger>
      <DropdownMenuContent>{children}</DropdownMenuContent>
    </DropdownMenu>
  )
}
