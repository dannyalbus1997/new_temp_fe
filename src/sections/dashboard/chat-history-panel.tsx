"use client"

import { motion, type Variants } from "motion/react"
import { MessageSquareTextIcon, PlusIcon, SearchIcon, SettingsIcon, Trash2Icon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CHAT_HISTORY } from "@/sections/dashboard/data"
import type { ChatHistoryItem } from "@/sections/dashboard/types"

export interface ChatHistoryPanelProps {
  className?: string
}

type ChatHistoryRow =
  | { type: "heading"; key: string; heading: string }
  | { type: "item"; key: string; item: ChatHistoryItem }

// Flattened once, outside the component: `CHAT_HISTORY` is static demo
// data, and flattening the groups into one list of rows is what lets a
// single `motion` stagger cascade through every heading + item uniformly.
const CHAT_HISTORY_ROWS: ChatHistoryRow[] = CHAT_HISTORY.flatMap((group) => [
  { type: "heading", key: `heading-${group.heading}`, heading: group.heading },
  ...group.items.map(
    (item): ChatHistoryRow => ({ type: "item", key: item.key, item })
  ),
])

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
}

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0 },
}

/**
 * "NeuroBank AI" chat sidebar — new chat / search actions, grouped chat
 * history, and settings footer, matching `dashboard.webp`.
 */
export function ChatHistoryPanel({ className }: ChatHistoryPanelProps) {
  return (
    <div className={cn("neuro-surface flex w-72 shrink-0 flex-col rounded-xl p-4", className)}>
      <p className="mb-3 text-sm font-semibold">NeuroBank AI</p>

      <div className="mb-4 flex gap-2">
        <Button className="neuro-brand-gradient flex-1 border-0 text-white transition-transform hover:scale-[1.02] active:scale-[0.97]">
          <PlusIcon />
          New chat
        </Button>
        <Button variant="outline" size="icon" aria-label="Search chats">
          <SearchIcon />
        </Button>
      </div>

      <ScrollArea className="-mx-1 flex-1 px-1">
        <motion.div
          initial="hidden"
          animate="show"
          variants={listVariants}
          className="flex flex-col gap-0.5"
        >
          {CHAT_HISTORY_ROWS.map((row) =>
            row.type === "heading" ? (
              <motion.p
                key={row.key}
                variants={rowVariants}
                className="mt-3 mb-1.5 px-2 text-xs font-medium text-muted-foreground first:mt-0"
              >
                {row.heading}
              </motion.p>
            ) : (
              <motion.div
                key={row.key}
                variants={rowVariants}
                className={cn(
                  "group flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm",
                  row.item.active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent/50",
                  row.item.muted && "opacity-50"
                )}
              >
                <MessageSquareTextIcon className="size-4 shrink-0" />
                <span className="flex-1 truncate">{row.item.label}</span>
                {row.item.active && (
                  <>
                    <Trash2Icon className="size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    <span
                      className="size-1.5 shrink-0 rounded-full"
                      style={{ background: "var(--neuro-brand-to)" }}
                    />
                  </>
                )}
              </motion.div>
            )
          )}
        </motion.div>
      </ScrollArea>

      <Button variant="ghost" className="mt-2 justify-start gap-2 text-muted-foreground">
        <SettingsIcon />
        Settings
      </Button>
    </div>
  )
}
