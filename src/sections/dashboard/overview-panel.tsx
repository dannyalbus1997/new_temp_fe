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
        <span className={amount.startsWith("-") ? "text-foreground" : "text-emerald-400"}>
          {amount}
        </span>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.status === "Completed" ? "default" : "secondary"}>
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
        {DASHBOARD_STATS.map((stat) => (
          <motion.div
            key={stat.label}
            variants={statCardVariants}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="neuro-surface rounded-xl p-4"
          >
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className="mt-1 text-xl font-semibold">{stat.value}</p>
            <p
              className={cn(
                "mt-1 flex items-center gap-1 text-xs font-medium",
                stat.trend === "up" ? "text-emerald-400" : "text-destructive"
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
        ))}
      </motion.div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={sectionVariants}
        transition={{ delay: 0.25 }}
        className="neuro-surface rounded-xl p-4"
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
