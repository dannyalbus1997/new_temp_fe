"use client"

import * as React from "react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { NotificationsDropdown } from "@/sections/dashboard/notifications-dropdown"
import { ThemeModeToggle } from "@/sections/dashboard/theme-mode-toggle"

export interface WelcomeCardProps {
  name: string
  className?: string
}

/**
 * Date + greeting card at the top of the sidebar, matching the reference
 * dashboard. `new Date()` is only read once on mount (client-only) so the
 * date reflects the visitor's local day without risking a hydration
 * mismatch against the server-rendered markup.
 */
export function WelcomeCard({ name, className }: WelcomeCardProps) {
  // Lazy initializer instead of an effect: this is read once, on mount,
  // with day-level granularity — a server/client render-time mismatch is
  // not realistically possible, so there's nothing here worth
  // synchronizing via `useEffect` + `setState`.
  const [today] = React.useState(() =>
    new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
      .format(new Date())
      .toUpperCase()
  )

  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <Avatar className="size-9">
          <AvatarFallback className="neuro-brand-gradient text-white">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-1.5">
          <ThemeModeToggle />
          <NotificationsDropdown />
        </div>
      </div>
      <p className="mt-3 text-xs font-medium tracking-wide text-muted-foreground">
        {today}
      </p>
      <p className="text-lg font-semibold">Welcome back, {name}!</p>
    </div>
  )
}
