"use client"

import { Loader2Icon } from "lucide-react"

export interface IsFetchingProps {
  isFetching: boolean
}

/**
 * Loading overlay shown on top of an already-rendered table while a
 * background refetch is in flight. Replaces the MUI `IsFetching` component
 * from `temp/table-components/is-fetching/index.tsx`.
 *
 * Render inside a `relative`-positioned wrapper around the table so the
 * overlay covers it (`absolute inset-0`).
 */
export function IsFetching({ isFetching }: IsFetchingProps) {
  if (!isFetching) return null

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/70">
      <Loader2Icon className="size-6 animate-spin text-muted-foreground" />
    </div>
  )
}
