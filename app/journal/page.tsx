"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { JournalSidebar } from "@/components/journal-sidebar"
import { IraAssistant } from "@/components/ira-assistant"
import { Brain, Save, Sparkles, Menu, Heart } from "lucide-react"

interface JournalEntry {
  id: string
  title: string
  content: string
  timestamp: Date
}

const dummyEntries: JournalEntry[] = [
  {
    id: "1",
    title: "Morning Reflections",
    content:
      "Today I woke up feeling grateful for the small things in life. The way the sunlight filtered through my window reminded me that every day is a new beginning...",
    timestamp: new Date("2024-01-15T08:30:00"),
  },
  {
    id: "2",
    title: "Thoughts on Growth",
    content:
      "I've been thinking about personal growth lately. It's fascinating how we can change so much while still remaining fundamentally ourselves...",
    timestamp: new Date("2024-01-14T19:45:00"),
  },
  {
    id: "3",
    title: "Weekend Adventures",
    content:
      "Spent the weekend hiking in the mountains. There's something about being in nature that puts everything into perspective...",
    timestamp: new Date("2024-01-13T16:20:00"),
  },
  {
    id: "4",
    title: "Creative Breakthrough",
    content: "Had an amazing creative session today. Sometimes the best ideas come when you least expect them...",
    timestamp: new Date("2024-01-12T14:15:00"),
  },
  {
    id: "5",
    title: "Quiet Evening",
    content: "Tonight I just sat in silence for a while. In our busy world, we often forget the power of stillness...",
    timestamp: new Date("2024-01-11T21:30:00"),
  },
]

const prompts = [
  "What are three things you're grateful for today?",
  "Describe a moment when you felt truly alive.",
  "What would you tell your younger self?",
  "What's a challenge you're currently facing and how might you approach it?",
  "Write about a person who has influenced your life.",
  "What does success mean to you right now?",
  "Describe your ideal day from start to finish.",
  "What's something you've learned about yourself recently?",
]

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>(dummyEntries)
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null)
  const [currentContent, setCurrentContent] = useState("")
  const [isNewEntry, setIsNewEntry] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true) // Start collapsed
  const [displayName, setDisplayName] = useState("friend")
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // Get display name from localStorage
    const storedName = localStorage.getItem("displayName")
    if (storedName) {
      setDisplayName(storedName)
    }
  }, [])

  useEffect(() => {
    if (selectedEntry && !isNewEntry) {
      setCurrentContent(selectedEntry.content)
    }
  }, [selectedEntry, isNewEntry])

  const handleNewEntry = () => {
    setSelectedEntry(null)
    setCurrentContent("")
    setIsNewEntry(true)
  }

  const handleSelectEntry = (entry: JournalEntry) => {
    setSelectedEntry(entry)
    setIsNewEntry(false)
  }

  const handleSave = async () => {
    if (!currentContent.trim()) return

    setIsSaving(true)

    // Show saving state
    const savingToast = "Saving your thoughts..."

    // Simulate processing time for optimization
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate intelligent title based on content
    const generateTitle = (content: string): string => {
      const lines = content
        .trim()
        .split("\n")
        .filter((line) => line.trim())
      const firstLine = lines[0]?.trim() || ""

      // Remove common starting words and get meaningful content
      const cleanedFirst = firstLine.replace(/^(today|yesterday|this morning|tonight|i|my|the|a|an)\s+/i, "").trim()

      // If first line is substantial, use it
      if (cleanedFirst.length > 10 && cleanedFirst.length < 60) {
        return cleanedFirst.charAt(0).toUpperCase() + cleanedFirst.slice(1)
      }

      // Otherwise, analyze content for key themes
      const content_lower = content.toLowerCase()
      const themes = [
        { keywords: ["grateful", "thankful", "appreciate", "blessing"], title: "Gratitude Reflections" },
        { keywords: ["dream", "dreamed", "nightmare", "sleep"], title: "Dream Journal" },
        { keywords: ["work", "job", "career", "meeting", "project"], title: "Work Thoughts" },
        { keywords: ["love", "relationship", "partner", "family"], title: "Relationship Reflections" },
        { keywords: ["anxious", "worried", "stress", "anxiety"], title: "Working Through Anxiety" },
        { keywords: ["happy", "joy", "excited", "celebration"], title: "Moments of Joy" },
        { keywords: ["sad", "disappointed", "hurt", "pain"], title: "Processing Emotions" },
        { keywords: ["goal", "plan", "future", "hope"], title: "Future Planning" },
        { keywords: ["memory", "remember", "childhood", "past"], title: "Memory Lane" },
        { keywords: ["learn", "growth", "change", "better"], title: "Personal Growth" },
        { keywords: ["nature", "walk", "outside", "weather"], title: "Nature Connection" },
        { keywords: ["creative", "art", "music", "write"], title: "Creative Expression" },
      ]

      for (const theme of themes) {
        if (theme.keywords.some((keyword) => content_lower.includes(keyword))) {
          return theme.title
        }
      }

      // Fallback to date-based title
      const now = new Date()
      const timeOfDay = now.getHours() < 12 ? "Morning" : now.getHours() < 17 ? "Afternoon" : "Evening"
      return `${timeOfDay} Thoughts`
    }

    // Optimize content (clean up formatting, fix spacing)
    const optimizeContent = (content: string): string => {
      return (
        content
          .trim()
          // Fix multiple line breaks
          .replace(/\n{3,}/g, "\n\n")
          // Fix spacing around punctuation
          .replace(/\s+([.!?])/g, "$1")
          .replace(/([.!?])\s*\n/g, "$1\n")
          // Ensure proper paragraph spacing
          .replace(/\n([A-Z])/g, "\n\n$1")
          // Clean up extra spaces
          .replace(/[ \t]+/g, " ")
          .replace(/\n /g, "\n")
      )
    }

    const optimizedContent = optimizeContent(currentContent)
    const intelligentTitle = generateTitle(optimizedContent)

    if (isNewEntry) {
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        title: intelligentTitle,
        content: optimizedContent,
        timestamp: new Date(),
      }
      setEntries([newEntry, ...entries])

      // Success feedback
      console.log(`✨ Entry saved: "${intelligentTitle}"`)

      // Reset for new entry
      setSelectedEntry(null)
      setCurrentContent("")
      setIsNewEntry(false)
    } else if (selectedEntry) {
      const updatedEntries = entries.map((entry) =>
        entry.id === selectedEntry.id
          ? {
              ...entry,
              content: optimizedContent,
              title: intelligentTitle,
            }
          : entry,
      )
      setEntries(updatedEntries)

      // Success feedback
      console.log(`✨ Entry updated: "${intelligentTitle}"`)

      // Reset for new entry
      setSelectedEntry(null)
      setCurrentContent("")
      setIsNewEntry(false)
    }

    setIsSaving(false)
  }

  const handleGetPrompt = () => {
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)]
    setCurrentContent((prev) => (prev ? `${prev}\n\n${randomPrompt}\n\n` : `${randomPrompt}\n\n`))
  }

  const handleSummarize = () => {
    if (!currentContent.trim()) return

    const summaries = [
      "This entry reflects on gratitude and mindfulness, highlighting the importance of appreciating small moments in daily life.",
      "A thoughtful exploration of personal growth and self-discovery, emphasizing the balance between change and authenticity.",
      "An introspective piece about finding clarity and perspective through connection with nature and solitude.",
      "A creative reflection on inspiration and the unexpected nature of breakthrough moments in artistic endeavors.",
      "A meditation on the value of silence and stillness in our increasingly busy and connected world.",
    ]

    const randomSummary = summaries[Math.floor(Math.random() * summaries.length)]
    setCurrentContent((prev) => `${prev}\n\n--- AI Summary ---\n${randomSummary}`)
  }

  return (
    <div className="flex h-screen bg-black relative overflow-hidden">
      {/* Moving Starfield */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="night-stars"></div>
        <div className="night-stars2"></div>
        <div className="night-stars3"></div>
        <div className="night-stars4"></div>
        <div className="night-stars5"></div>
        <div className="night-stars6"></div>
      </div>

      {/* Sidebar */}
      <JournalSidebar
        entries={entries}
        selectedEntry={selectedEntry}
        onSelectEntry={handleSelectEntry}
        onNewEntry={handleNewEntry}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Header */}
        <div className="border-b border-white/10 bg-gray-900/20 backdrop-blur-sm px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-gray-700/50"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Main Writing Area - ChatGPT Style */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-4xl space-y-6">
            {!isNewEntry && !selectedEntry ? (
              // Welcome screen
              <div className="text-center space-y-8">
                <div className="flex items-center justify-center space-x-2 mb-8">
                  <Heart className="h-6 w-6 text-rose-400" />
                  <h1 className="text-3xl font-bold text-gray-200 font-serif floating-text">
                    Want to start your next monolog, {displayName}?
                  </h1>
                </div>
              </div>
            ) : null}

            {/* Text Input Area */}
            <div className="relative">
              <Card className="border border-white/10 shadow-xl bg-gray-900/30 backdrop-blur-sm">
                <div className="relative">
                  <Textarea
                    value={currentContent}
                    onChange={(e) => setCurrentContent(e.target.value)}
                    placeholder={
                      !isNewEntry && !selectedEntry
                        ? "Write your heart out..."
                        : isNewEntry
                          ? "Write your heart out..."
                          : "Continue your thoughts..."
                    }
                    className="min-h-[300px] resize-none border-0 text-base leading-relaxed focus-visible:ring-0 bg-transparent text-gray-200 placeholder:text-gray-500 p-6 pr-16"
                    onFocus={() => {
                      if (!isNewEntry && !selectedEntry) {
                        handleNewEntry()
                      }
                    }}
                  />

                  {/* Ira Assistant */}
                  <IraAssistant currentContent={currentContent} onContentUpdate={setCurrentContent} />
                </div>
              </Card>

              {/* Action Buttons - Right side below text box */}
              <div className="flex justify-end space-x-3 mt-4">
                <Button
                  onClick={handleGetPrompt}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2 border-white/10 bg-gray-700/30 text-gray-300 hover:bg-gray-600/50 hover:text-white backdrop-blur-sm"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Get Prompt</span>
                </Button>
                <Button
                  onClick={handleSummarize}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2 border-white/10 bg-gray-700/30 text-gray-300 hover:bg-gray-600/50 hover:text-white backdrop-blur-sm"
                  disabled={!currentContent.trim()}
                >
                  <Brain className="h-4 w-4" />
                  <span>Summarize</span>
                </Button>
                <Button
                  onClick={handleSave}
                  size="sm"
                  className="flex items-center space-x-2 bg-gradient-to-r from-rose-600/80 to-violet-600/80 hover:from-rose-700/90 hover:to-violet-700/90 backdrop-blur-sm"
                  disabled={!currentContent.trim() || isSaving}
                >
                  <Save className="h-4 w-4" />
                  <span>{isSaving ? "Saving..." : "Save"}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
