"use client"

import * as React from "react"
import { InboxIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface NoContentFoundProps {
  /** Inline min-height applied to the wrapper. Defaults to `"16rem"`. */
  height?: string
  className?: string
  /** Hide the icon/illustration slot. Defaults to `true` (shown). */
  imageVisibility?: boolean
  /** Custom icon/illustration. Defaults to a muted circle with `InboxIcon`. */
  icon?: React.ReactNode
  message?: React.ReactNode
  subMessage?: React.ReactNode
  children?: React.ReactNode
  /** Show the action button. Defaults to `false`. */
  buttonVisibility?: boolean
  buttonText?: string
  onButtonClick?: () => void
}

/**
 * Centered empty-state block used by tables (and anywhere else a "no data"
 * placeholder is needed). Replaces the MUI `NoContentFound` component from
 * `temp/table-components/no-content-found/index.tsx`.
 */
export function NoContentFound({
  height = "16rem",
  className,
  imageVisibility = true,
  icon,
  message = "No data found",
  subMessage = "There's nothing to show here yet.",
  children,
  buttonVisibility = false,
  buttonText = "Refresh",
  onButtonClick,
}: NoContentFoundProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 text-center",
        className
      )}
      style={{ minHeight: height }}
    >
      {imageVisibility && (
        <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
          {icon ?? <InboxIcon className="size-6" />}
        </div>
      )}

      <div className="flex flex-col items-center gap-1">
        {typeof message === "string" ? (
          <p className="text-sm font-medium text-foreground">{message}</p>
        ) : (
          message
        )}
        {subMessage &&
          (typeof subMessage === "string" ? (
            <p className="text-sm text-muted-foreground">{subMessage}</p>
          ) : (
            subMessage
          ))}
      </div>

      {children}

      {buttonVisibility && (
        <Button variant="outline" size="sm" onClick={onButtonClick}>
          {buttonText}
        </Button>
      )}
    </div>
  )
}
