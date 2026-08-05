"use client"

import * as React from "react"
import { motion } from "motion/react"

import { buildAreaPath, buildSmoothPath, toPoints } from "@/sections/dashboard/charts/chart-utils"

export interface ComparisonLineChartProps {
  currentYear: number[]
  lastYear: number[]
  labels: string[]
  className?: string
}

const WIDTH = 1000
const HEIGHT = 260
const Y_TICK_COUNT = 5

/**
 * Dual-series comparison chart (current year vs. last year), with a
 * gradient fill under the current-year line — the big chart rendered
 * inside the assistant's reply in the reference dashboard.
 */
export function ComparisonLineChart({
  currentYear,
  lastYear,
  labels,
  className,
}: ComparisonLineChartProps) {
  const gradientId = React.useId()
  const max = Math.max(...currentYear, ...lastYear) * 1.1
  const roundedMax = Math.ceil(max / 1000) * 1000

  const currentPoints = toPoints(currentYear, WIDTH, HEIGHT, roundedMax)
  const lastPoints = toPoints(lastYear, WIDTH, HEIGHT, roundedMax)

  const yTicks = Array.from({ length: Y_TICK_COUNT + 1 }, (_, i) =>
    Math.round((roundedMax / Y_TICK_COUNT) * (Y_TICK_COUNT - i))
  )

  // Only every Nth label is drawn along the x-axis, matching the reference
  // chart's sparse month labels rather than one per data point.
  const xLabelStep = Math.max(1, Math.floor(currentYear.length / labels.length))

  return (
    <div className={className}>
      <div className="flex gap-3">
        <div className="flex w-10 flex-col justify-between py-1 text-xs text-muted-foreground">
          {yTicks.map((tick) => (
            <span key={tick}>{tick >= 1000 ? `${tick / 1000}k` : tick}</span>
          ))}
        </div>

        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          preserveAspectRatio="none"
          className="h-56 w-full overflow-visible"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--neuro-brand-from)" stopOpacity={0.4} />
              <stop offset="100%" stopColor="var(--neuro-brand-from)" stopOpacity={0} />
            </linearGradient>
          </defs>

          <motion.path
            d={buildAreaPath(currentPoints, HEIGHT)}
            fill={`url(#${gradientId})`}
            stroke="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          />

          <motion.path
            d={buildSmoothPath(lastPoints)}
            fill="none"
            stroke="var(--neuro-brand-from)"
            strokeWidth={2.5}
            strokeOpacity={0.6}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.path
            d={buildSmoothPath(currentPoints)}
            fill="none"
            stroke="var(--neuro-brand-to)"
            strokeWidth={3}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
      </div>

      <div className="ml-10 flex justify-between text-xs text-muted-foreground">
        {currentYear.map((_, index) =>
          index % xLabelStep === 0 && labels[index / xLabelStep] ? (
            <span key={index}>{labels[index / xLabelStep]}</span>
          ) : null
        )}
      </div>

      <div className="mt-4 flex items-center justify-center gap-6 text-sm">
        <span className="flex items-center gap-2 text-muted-foreground">
          <span className="size-2 rounded-full" style={{ background: "var(--neuro-brand-to)" }} />
          Current Year
        </span>
        <span className="flex items-center gap-2 text-muted-foreground">
          <span className="size-2 rounded-full" style={{ background: "var(--neuro-brand-from)" }} />
          Last Year
        </span>
      </div>
    </div>
  )
}
