"use client"

import { motion, type Variants } from "motion/react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { ComparisonLineChart } from "@/sections/dashboard/charts/comparison-line-chart"
import { MiniAreaChart } from "@/sections/dashboard/charts/mini-area-chart"
import { ChatComposer } from "@/sections/dashboard/chat-composer"
import {
  CHAT_DRAFT,
  CHAT_MESSAGES,
  INCOME_COMPARISON_CURRENT_YEAR,
  INCOME_COMPARISON_LABELS,
  INCOME_COMPARISON_LAST_YEAR,
  YEAR_OVERVIEW_LABELS,
  YEAR_OVERVIEW_SERIES,
} from "@/sections/dashboard/data"
import { BrandLogo } from "@/sections/brand-logo"

export interface ChatPanelProps {
  className?: string
}

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const userMessageVariants: Variants = {
  hidden: { opacity: 0, x: 16 },
  show: { opacity: 1, x: 0 },
}

const assistantMessageVariants: Variants = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0 },
}

/**
 * The "Neuro AI" main panel — overview chart header, conversation thread,
 * and composer. Matches `dashboard.webp`.
 */
export function ChatPanel({ className }: ChatPanelProps) {
  return (
    <div className={cn("flex min-w-0 flex-1 flex-col gap-4", className)}>
      <div className="neuro-surface rounded-xl p-4">
        <MiniAreaChart data={YEAR_OVERVIEW_SERIES} labels={YEAR_OVERVIEW_LABELS} />
      </div>

      <ScrollArea className="flex-1">
        <motion.div
          initial="hidden"
          animate="show"
          variants={listVariants}
          className="flex flex-col gap-4 pr-1"
        >
          {CHAT_MESSAGES.map((message) =>
            message.role === "user" ? (
              <motion.div
                key={message.id}
                variants={userMessageVariants}
                className="flex items-start justify-end gap-3"
              >
                <p className="neuro-surface max-w-md rounded-xl rounded-tr-sm px-4 py-2.5 text-sm">
                  {message.content}
                </p>
                <Avatar className="size-8 shrink-0">
                  <AvatarFallback className="neuro-brand-gradient text-xs text-white">
                    GE
                  </AvatarFallback>
                </Avatar>
              </motion.div>
            ) : (
              <motion.div
                key={message.id}
                variants={assistantMessageVariants}
                className="neuro-surface flex flex-col gap-3 rounded-xl rounded-tl-sm p-4"
              >
                <div className="flex items-center gap-2">
                  <BrandLogo iconOnly iconClassName="size-6 rounded-md" />
                  <span className="text-sm font-medium">NeuroAI</span>
                </div>
                <p className="text-sm text-muted-foreground">{message.content}</p>
                {message.chart === "comparison" && (
                  <ComparisonLineChart
                    currentYear={INCOME_COMPARISON_CURRENT_YEAR}
                    lastYear={INCOME_COMPARISON_LAST_YEAR}
                    labels={INCOME_COMPARISON_LABELS}
                    className="mt-2"
                  />
                )}
              </motion.div>
            )
          )}
        </motion.div>
      </ScrollArea>

      <ChatComposer defaultValue={CHAT_DRAFT} />
    </div>
  )
}
