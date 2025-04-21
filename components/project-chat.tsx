"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Paperclip, Send } from "lucide-react"

type ProjectChatProps = {
  projectId: string
  projectName: string
}

// Mock messages data for project chat
const mockMessages = [
  {
    id: "1",
    sender: "Alex Johnson",
    content: "Hey team, I've just updated the project timeline. Please check it out when you have a moment.",
    timestamp: "2025-04-15T09:30:00",
    isCurrentUser: false,
  },
  {
    id: "2",
    sender: "Sarah Williams",
    content: "I've completed the wireframes for the homepage. I'll share them in our next meeting.",
    timestamp: "2025-04-15T10:15:00",
    isCurrentUser: false,
  },
  {
    id: "3",
    sender: "Michael Brown",
    content: "Looking good! I can start implementing the frontend once the designs are approved.",
    timestamp: "2025-04-15T10:20:00",
    isCurrentUser: false,
  },
  {
    id: "4",
    sender: "Current User",
    content: "Great progress everyone! Let's schedule a review meeting tomorrow at 10 AM.",
    timestamp: "2025-04-15T10:45:00",
    isCurrentUser: true,
  },
  {
    id: "5",
    sender: "Emily Davis",
    content: "Works for me. I'll prepare the backend API documentation by then.",
    timestamp: "2025-04-15T11:00:00",
    isCurrentUser: false,
  },
  {
    id: "6",
    sender: "Current User",
    content: "Perfect! Looking forward to seeing everyone's progress.",
    timestamp: "2025-04-15T11:05:00",
    isCurrentUser: true,
  },
]

export function ProjectChat({ projectId, projectName }: ProjectChatProps) {
  const { user } = useAuth()
  const [messageText, setMessageText] = useState("")
  const [chatMessages, setChatMessages] = useState(mockMessages)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    scrollToBottom()
  }, [chatMessages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (messageText.trim() === "" && !selectedFile) return

    const newMessage = {
      id: `msg-${Date.now()}`,
      sender: "Current User",
      content: messageText,
      timestamp: new Date().toISOString(),
      isCurrentUser: true,
      file: selectedFile
        ? {
            name: selectedFile.name,
            size: `${(selectedFile.size / 1024).toFixed(1)} KB`,
          }
        : undefined,
    }

    setChatMessages([...chatMessages, newMessage])
    setMessageText("")
    setSelectedFile(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {chatMessages.map((message) => (
            <div key={message.id} className={`flex ${message.isCurrentUser ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-3 max-w-[80%] ${message.isCurrentUser ? "flex-row-reverse" : ""}`}>
                {!message.isCurrentUser && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {!message.isCurrentUser && <span className="text-sm font-medium">{message.sender}</span>}
                    <span className="text-xs text-muted-foreground">
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <div
                    className={`rounded-lg px-3 py-2 ${
                      message.isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    {message.file && (
                      <div className="mt-2 p-2 bg-background/50 rounded text-xs flex items-center gap-1">
                        <Paperclip className="h-3 w-3" />
                        <span>
                          {message.file.name} ({message.file.size})
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        {selectedFile && (
          <div className="mb-2 p-2 bg-muted rounded-md flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Paperclip className="h-4 w-4" />
              <span>
                {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setSelectedFile(null)}>
              ✕
            </Button>
          </div>
        )}
        <div className="flex items-end gap-2">
          <label htmlFor="file-upload" className="cursor-pointer">
            <Button variant="outline" size="icon" className="h-8 w-8 shrink-0" type="button">
              <Paperclip className="h-4 w-4" />
              <span className="sr-only">Attach file</span>
            </Button>
            <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
          </label>
          <div className="relative flex-1">
            <Input
              placeholder="Type your message..."
              className="pr-10 py-6 resize-none"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <Button
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={handleSendMessage}
            disabled={messageText.trim() === "" && !selectedFile}
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
