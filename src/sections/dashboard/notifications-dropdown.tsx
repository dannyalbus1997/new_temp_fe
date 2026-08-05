"use client"

import * as React from "react"
import { motion, type Variants } from "motion/react"
import { BellIcon, CheckCheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { NOTIFICATIONS } from "@/sections/dashboard/data"

export interface NotificationsDropdownProps {
  className?: string
}

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0 },
}

/**
 * Bell icon + dropdown for the welcome card. Standalone/mocked — "read"
 * state only lives in local state, wire it up to a real notifications
 * feed once one exists.
 */
export function NotificationsDropdown({ className }: NotificationsDropdownProps) {
  const [notifications, setNotifications] = React.useState(NOTIFICATIONS)
  const unreadCount = notifications.filter((n) => !n.read).length

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            aria-label={
              unreadCount > 0 ? `Notifications, ${unreadCount} unread` : "Notifications"
            }
            className={cn("relative", className)}
          />
        }
      >
        <BellIcon className="size-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex size-2.5">
            <motion.span
              className="absolute inset-0 rounded-full bg-primary"
              animate={{ scale: [0.9, 1.8], opacity: [0.7, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            />
            <span className="relative size-2.5 rounded-full bg-primary" />
          </span>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between px-3 py-2.5">
          <p className="text-sm font-semibold">Notifications</p>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto gap-1 px-1.5 py-1 text-xs"
              onClick={markAllRead}
            >
              <CheckCheckIcon className="size-3.5" />
              Mark all read
            </Button>
          )}
        </div>
        <DropdownMenuSeparator className="mx-0" />

        <ScrollArea className="max-h-80">
          <motion.div
            initial="hidden"
            animate="show"
            variants={listVariants}
            className="flex flex-col p-1"
          >
            {notifications.map((notification) => {
              const Icon = notification.icon
              return (
                <motion.div
                  key={notification.id}
                  variants={rowVariants}
                  className="flex items-start gap-3 rounded-lg px-2 py-2 hover:bg-accent/60"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <Icon className="size-4" />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                  {!notification.read && (
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  )}
                </motion.div>
              )
            })}
          </motion.div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
