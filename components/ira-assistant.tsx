"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, X, Send } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

interface IraAssistantProps {
  currentContent: string
  onContentUpdate: (content: string) => void
}

export function IraAssistant({ currentContent, onContentUpdate }: IraAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [conversation, setConversation] = useState<Array<{ role: "user" | "assistant"; content: string }>>([])

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newConversation = [...conversation, { role: "user" as const, content: message }]

    // Simulate Ira's response
    const responses = [
      "That's a fascinating perspective! Have you considered exploring how this connects to your past experiences?",
      "I can sense there's more depth to this thought. What emotions are coming up as you write about this?",
      "This reminds me of a pattern I've noticed in your previous entries. Would you like to explore that connection?",
      "Your writing shows real vulnerability here. How does it feel to put these thoughts into words?",
      "I'm curious about what led you to this realization. Can you walk me through your thought process?",
      "This seems like an important moment of growth for you. What would you tell someone else going through something similar?",
      "Your heart is really speaking through these words. What would happen if you leaned even deeper into this feeling?",
    ]

    const randomResponse = responses[Math.floor(Math.random() * responses.length)]

    setTimeout(() => {
      setConversation([...newConversation, { role: "assistant", content: randomResponse }])
    }, 1000)

    setConversation(newConversation)
    setMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Ira Button */}
      <div className="absolute bottom-4 right-4">
        <div className="relative group">
          <Button
            onClick={() => setIsOpen(!isOpen)}
            size="sm"
            className="rounded-full w-10 h-10 bg-gradient-to-r from-violet-600/80 to-indigo-600/80 hover:from-violet-700/90 hover:to-indigo-700/90 backdrop-blur-sm border border-white/10 shadow-lg"
          >
            <MessageCircle className="h-4 w-4" />
          </Button>

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800/90 text-gray-200 text-xs rounded-lg backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Talk more about it with Ira
          </div>
        </div>
      </div>

      {/* Ira Chat Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-4 w-80 max-h-96 z-50">
          <Card className="border border-white/10 shadow-xl bg-gray-800/90 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg text-gray-200 flex items-center space-x-2">
                    <MessageCircle className="h-5 w-5 text-violet-400" />
                    <span>Ira</span>
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-sm">Your writing companion</CardDescription>
                </div>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Conversation */}
              <div className="max-h-48 overflow-y-auto space-y-3">
                {conversation.length === 0 ? (
                  <div className="text-gray-400 text-sm text-center py-4">
                    Hi! I'm Ira, your writing companion. I'm here to help you explore your thoughts deeper. What's on
                    your mind?
                  </div>
                ) : (
                  conversation.map((msg, index) => (
                    <div
                      key={index}
                      className={`text-sm ${
                        msg.role === "user"
                          ? "text-gray-200 bg-violet-600/20 p-2 rounded-lg ml-4"
                          : "text-gray-300 bg-gray-700/30 p-2 rounded-lg mr-4"
                      }`}
                    >
                      {msg.content}
                    </div>
                  ))
                )}
              </div>

              {/* Input */}
              <div className="flex space-x-2">
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask Ira about your thoughts..."
                  className="flex-1 min-h-[60px] text-sm bg-gray-700/50 border-gray-600 text-gray-200 placeholder:text-gray-500 focus:border-violet-500 focus:ring-violet-500"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  disabled={!message.trim()}
                  className="bg-gradient-to-r from-violet-600/80 to-indigo-600/80 hover:from-violet-700/90 hover:to-indigo-700/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
