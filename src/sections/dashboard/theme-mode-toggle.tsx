"use client"

import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

export interface ThemeModeToggleProps {
  className?: string
}

/**
 * Compact light/dark pill toggle for the welcome card, matching the small
 * sun/moon control in `dashboard.webp`. Drives the same `next-themes`
 * `.dark` class the rest of the app uses (see `ThemeToggle` for the fuller
 * light/dark/system dropdown) — this is just a quicker binary switch.
 *
 * Like `ThemeToggle`, this avoids a JS "mounted" check (and the
 * server/client flash that comes with one): the sliding knob and icon
 * colors are driven purely by Tailwind's `dark:` variant, which tracks the
 * `.dark` class next-themes' inline script sets before hydration.
 */
export function ThemeModeToggle({ className }: ThemeModeToggleProps) {
  const { setTheme } = useTheme()

  return (
    <div
      className={cn(
        "relative inline-flex items-center rounded-full bg-muted p-1",
        className
      )}
    >
      <span
        aria-hidden
        className="absolute top-1 left-1 size-6 rounded-full bg-background shadow-sm transition-transform duration-300 ease-out dark:translate-x-6"
      />
      <button
        type="button"
        aria-label="Light mode"
        onClick={() => setTheme("light")}
        className="relative z-10 flex size-6 items-center justify-center rounded-full text-foreground transition-colors dark:text-muted-foreground"
      >
        <SunIcon className="size-3.5" />
      </button>
      <button
        type="button"
        aria-label="Dark mode"
        onClick={() => setTheme("dark")}
        className="relative z-10 flex size-6 items-center justify-center rounded-full text-muted-foreground transition-colors dark:text-foreground"
      >
        <MoonIcon className="size-3.5" />
      </button>
    </div>
  )
}
