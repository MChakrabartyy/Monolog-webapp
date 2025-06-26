"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, Heart } from "lucide-react"
import Link from "next/link"

interface JournalEntry {
  id: string
  title: string
  content: string
  timestamp: Date
}

interface JournalSidebarProps {
  entries: JournalEntry[]
  selectedEntry: JournalEntry | null
  onSelectEntry: (entry: JournalEntry) => void
  onNewEntry: () => void
  collapsed: boolean
  onToggleCollapse: () => void
}

export function JournalSidebar({ entries, selectedEntry, onSelectEntry, onNewEntry, collapsed }: JournalSidebarProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div
      className={`${collapsed ? "w-0" : "w-80"} transition-all duration-300 bg-gray-900/20 backdrop-blur-sm border-r border-white/10 flex flex-col relative z-10 overflow-hidden`}
    >
      {!collapsed && (
        <>
          {/* Header */}
          <div className="p-4 border-b border-white/10">
            <Link
              href="/"
              className="flex items-center space-x-2 mb-4 text-lg font-semibold text-gray-200 hover:text-rose-400 transition-colors font-serif"
            >
              <Heart className="h-5 w-5" />
              <span>Monolog</span>
            </Link>
            <Button
              onClick={onNewEntry}
              className="w-full flex items-center space-x-2 bg-gradient-to-r from-rose-600/80 to-violet-600/80 hover:from-rose-700/90 hover:to-violet-700/90 backdrop-blur-sm"
            >
              <Plus className="h-4 w-4" />
              <span>New Entry</span>
            </Button>
          </div>

          {/* Entries List */}
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-2">
              {entries.map((entry) => (
                <Card
                  key={entry.id}
                  className={`p-3 cursor-pointer transition-all duration-200 hover:shadow-md border ${
                    selectedEntry?.id === entry.id
                      ? "bg-rose-900/30 border-rose-700/50 shadow-lg"
                      : "bg-gray-700/20 hover:bg-gray-700/40 border-white/10 hover:border-white/20"
                  } backdrop-blur-sm`}
                  onClick={() => onSelectEntry(entry)}
                >
                  <h3 className="font-medium text-sm text-gray-200 truncate mb-1">{entry.title}</h3>
                  <p className="text-xs text-gray-400 line-clamp-2 mb-2">{entry.content.substring(0, 80)}...</p>
                  <p className="text-xs text-gray-500">{formatDate(entry.timestamp)}</p>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </>
      )}
    </div>
  )
}
