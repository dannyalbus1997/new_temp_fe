import { NoContentFound } from "@/components/table"
import { cn } from "@/lib/utils"
import type { DashboardNavItem } from "@/sections/dashboard/types"

export interface PlaceholderPanelProps {
  item: DashboardNavItem
  className?: string
}

/**
 * Shared "coming soon" panel for the nav items that don't have a real
 * section built yet (Accounts, Transactions, Reports, Investments, Loans,
 * Taxes) — keeps the sidebar fully clickable instead of dead-ending.
 */
export function PlaceholderPanel({ item, className }: PlaceholderPanelProps) {
  const Icon = item.icon

  return (
    <div className={cn("neuro-surface flex flex-1 items-center justify-center rounded-xl", className)}>
      <NoContentFound
        icon={<Icon className="size-6" />}
        message={item.label}
        subMessage="This section isn't built yet — coming soon."
      />
    </div>
  )
}
