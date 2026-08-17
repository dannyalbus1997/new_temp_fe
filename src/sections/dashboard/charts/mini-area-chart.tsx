"use client"

import * as React from "react"
import { motion } from "motion/react"

import { buildAreaPath, buildSmoothPath, toPoints } from "@/sections/dashboard/charts/chart-utils"

export interface MiniAreaChartProps {
  data: number[]
  labels: string[]
  /** Caption shown above the current-value figure, e.g. "Year Income". */
  title?: string
  className?: string
}

const WIDTH = 1000
const HEIGHT = 140

/**
 * Small gradient-filled overview chart — the compact Jan–Dec strip above
 * the conversation in the reference dashboard.
 */
export function MiniAreaChart({ data, labels, title, className }: MiniAreaChartProps) {
  const gradientId = React.useId()
  const max = Math.max(...data) * 1.15
  const points = toPoints(data, WIDTH, HEIGHT, max)
  const linePath = buildSmoothPath(points)
  const areaPath = buildAreaPath(points, HEIGHT)
  const latest = data[data.length - 1]

  return (
    <div className={className}>
      <div>
        {title && (
          <p className="text-xs font-medium text-muted-foreground">{title}</p>
        )}
        <p className="text-xl font-semibold">{latest.toLocaleString()}</p>
      </div>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="none"
        className="h-28 w-full overflow-visible"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--neuro-brand-from)" stopOpacity={0.45} />
            <stop offset="100%" stopColor="var(--neuro-brand-from)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <motion.path
          d={areaPath}
          fill={`url(#${gradientId})`}
          stroke="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        />
        <motion.path
          d={linePath}
          fill="none"
          stroke="var(--neuro-brand-to)"
          strokeWidth={3}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="flex justify-between text-xs text-muted-foreground">
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  )
}
