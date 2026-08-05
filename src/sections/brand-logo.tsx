import { BoltIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export interface BrandLogoProps {
  className?: string
  iconClassName?: string
  /** Hide the "NeuroBank" wordmark and render the icon mark only. */
  iconOnly?: boolean
}

/**
 * Shared gradient logo mark used by both the dashboard sidebar
 * (`src/sections/dashboard/sidebar.tsx`) and the auth screens
 * (`src/sections/auth/auth-shell.tsx`).
 */
export function BrandLogo({ className, iconClassName, iconOnly }: BrandLogoProps) {
  return (
    <span className={cn("flex items-center gap-2 font-semibold", className)}>
      <span
        className={cn(
          "neuro-brand-gradient flex size-9 shrink-0 items-center justify-center rounded-lg",
          iconClassName
        )}
      >
        <BoltIcon className="size-5 text-white" />
      </span>
      {!iconOnly && "NeuroBank"}
    </span>
  )
}
