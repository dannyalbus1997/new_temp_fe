"use client"

import { motion, type Variants } from "motion/react"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/table"
import { ComparisonLineChart } from "@/sections/dashboard/charts/comparison-line-chart"
import {
  DASHBOARD_STATS,
  DASHBOARD_TRANSACTIONS,
  INCOME_COMPARISON_CURRENT_YEAR,
  INCOME_COMPARISON_LABELS,
  INCOME_COMPARISON_LAST_YEAR,
  type DashboardStat,
  type DashboardTransaction,
} from "@/sections/dashboard/data"

export interface OverviewPanelProps {
  className?: string
}

const statGridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const statCardVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

// Icon chip background per stat accent — kept out of `data.ts` since it's
// pure presentation, not demo data. Soft tinted background + saturated
// icon color, tuned to stay legible in both light and dark `.neuro`.
const STAT_ACCENT_CLASSES: Record<DashboardStat["accent"], string> = {
  sky: "bg-sky-500/10 text-sky-500 dark:text-sky-400",
  emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  violet: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
}

// Soft tinted badges instead of the button-style `default`/`secondary`
// variants — those two read as "featured" vs. "muted/inactive" rather than
// "done" vs. "in progress", which misrepresents a routine Pending status.
const STATUS_BADGE_CLASSES: Record<DashboardTransaction["status"], string> = {
  Completed: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Pending: "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
}

const transactionColumns: ColumnDef<DashboardTransaction>[] = [
  { accessorKey: "merchant", header: "Merchant" },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "date", header: "Date" },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.original.amount
      return (
        <span className={amount.startsWith("-") ? "text-foreground" : "text-emerald-500 dark:text-emerald-400"}>
          {amount}
        </span>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline" className={STATUS_BADGE_CLASSES[row.original.status]}>
        {row.original.status}
      </Badge>
    ),
  },
]

/**
 * "Dashboard" nav tab — stat cards, the income comparison chart, and a
 * recent-transactions table (reusing the `DataTable` component built for
 * `src/components/table`). Not part of `dashboard.webp` itself, but rounds
 * out the admin panel so the default nav item isn't empty.
 */
export function OverviewPanel({ className }: OverviewPanelProps) {
  return (
    <div className={cn("flex min-w-0 flex-1 flex-col gap-4", className)}>
      <motion.div
        initial="hidden"
        animate="show"
        variants={statGridVariants}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {DASHBOARD_STATS.map((stat) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              variants={statCardVariants}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="neuro-surface rounded-xl p-4"
            >
              <span
                className={cn(
                  "flex size-8 items-center justify-center rounded-lg",
                  STAT_ACCENT_CLASSES[stat.accent]
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <p className="mt-3 text-xs text-muted-foreground">{stat.label}</p>
              <p className="mt-1 text-xl font-semibold">{stat.value}</p>
              <p
                className={cn(
                  "mt-1 flex items-center gap-1 text-xs font-medium",
                  stat.trend === "up" ? "text-emerald-500 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"
                )}
              >
                {stat.trend === "up" ? (
                  <ArrowUpIcon className="size-3" />
                ) : (
                  <ArrowDownIcon className="size-3" />
                )}
                {stat.delta}
              </p>
            </motion.div>
          )
        })}
      </motion.div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={sectionVariants}
        transition={{ delay: 0.25 }}
        className="neuro-surface-accent rounded-xl p-4"
      >
        <p className="mb-2 text-sm font-semibold">Income — current vs. last year</p>
        <ComparisonLineChart
          currentYear={INCOME_COMPARISON_CURRENT_YEAR}
          lastYear={INCOME_COMPARISON_LAST_YEAR}
          labels={INCOME_COMPARISON_LABELS}
        />
      </motion.div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={sectionVariants}
        transition={{ delay: 0.35 }}
        className="neuro-surface flex-1 rounded-xl p-4"
      >
        <p className="mb-3 text-sm font-semibold">Recent transactions</p>
        <DataTable
          columns={transactionColumns}
          data={DASHBOARD_TRANSACTIONS}
          pagination={false}
        />
      </motion.div>
    </div>
  )
}
