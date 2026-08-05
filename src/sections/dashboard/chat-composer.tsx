"use client"

import * as React from "react"
import { PaperclipIcon, SendIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export interface ChatComposerProps {
  defaultValue?: string
  className?: string
}

/**
 * Message input pinned to the bottom of the chat panel. Standalone/mocked —
 * wire `handleSend` up to a real Neuro AI mutation once one exists.
 */
export function ChatComposer({ defaultValue = "", className }: ChatComposerProps) {
  const [value, setValue] = React.useState(defaultValue)

  function handleSend() {
    if (!value.trim()) return
    toast.info("Neuro AI is a UI demo — wire this up to a real backend.")
    setValue("")
  }

  return (
    <div className={className}>
      <div className="neuro-surface flex flex-col gap-2 rounded-xl p-3">
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
          placeholder="Ask Neuro AI anything about your finances..."
          className="min-h-16 resize-none border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
        />
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" aria-label="Attach file">
            <PaperclipIcon />
          </Button>
          <Button
            size="icon"
            aria-label="Send message"
            onClick={handleSend}
            className="neuro-brand-gradient border-0 text-white transition-transform hover:scale-[1.02] active:scale-[0.97]"
          >
            <SendIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}
