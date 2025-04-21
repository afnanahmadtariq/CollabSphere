"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Paperclip, Send, Plus, FileText, Users } from "lucide-react"

// Mock chat data
const chatChannels = [
  {
    id: "1",
    name: "Website Redesign",
    type: "project",
    unread: 3,
  },
  {
    id: "2",
    name: "Mobile App Development",
    type: "project",
    unread: 0,
  },
  {
    id: "3",
    name: "Marketing Campaign",
    type: "project",
    unread: 5,
  },
  {
    id: "4",
    name: "General",
    type: "channel",
    unread: 0,
  },
  {
    id: "5",
    name: "Random",
    type: "channel",
    unread: 2,
  },
]

const directMessages = [
  {
    id: "dm1",
    name: "Alex Johnson",
    online: true,
    unread: 0,
  },
  {
    id: "dm2",
    name: "Sarah Williams",
    online: true,
    unread: 2,
  },
  {
    id: "dm3",
    name: "Michael Brown",
    online: false,
    unread: 0,
  },
  {
    id: "dm4",
    name: "Emily Davis",
    online: true,
    unread: 0,
  },
]

// Messages organized by channel/conversation ID
const initialMessages = {
  // Project channels
  "1": [
    {
      id: "1-1",
      sender: "Alex Johnson",
      content: "Hey team, I've just updated the project timeline for the website redesign. Please check it out when you have a moment.",
      timestamp: "2025-04-15T09:30:00",
      isCurrentUser: false,
    },
    {
      id: "1-2", 
      sender: "Current User",
      content: "Thanks Alex, I'll take a look shortly.",
      timestamp: "2025-04-15T09:45:00",
      isCurrentUser: true,
    },
  ],
  "2": [
    {
      id: "2-1",
      sender: "Sarah Williams",
      content: "I've completed the wireframes for the mobile app. I'll share them in our next meeting.",
      timestamp: "2025-04-15T10:15:00",
      isCurrentUser: false,
    },
    {
      id: "2-2",
      sender: "Michael Brown",
      content: "Looking good! I can start implementing the frontend once the designs are approved.",
      timestamp: "2025-04-15T10:20:00",
      isCurrentUser: false,
    },
  ],
  "3": [
    {
      id: "3-1",
      sender: "Emily Davis",
      content: "Marketing campaign materials are ready for review.",
      timestamp: "2025-04-15T11:00:00",
      isCurrentUser: false,
    },
  ],
  // General channels
  "4": [],
  "5": [],
  // Direct messages
  "dm1": [
    {
      id: "dm1-1",
      sender: "Alex Johnson",
      content: "Do you have time for a quick call today?",
      timestamp: "2025-04-15T13:30:00",
      isCurrentUser: false,
    },
  ],
  "dm2": [
    {
      id: "dm2-1",
      sender: "Sarah Williams",
      content: "I need your input on the new design system.",
      timestamp: "2025-04-15T14:15:00",
      isCurrentUser: false,
    },
    {
      id: "dm2-2",
      sender: "Current User",
      content: "Happy to help. Let's discuss after the standup.",
      timestamp: "2025-04-15T14:20:00",
      isCurrentUser: true,
    },
  ],
  "dm3": [],
  "dm4": [
    {
      id: "dm4-1",
      sender: "Emily Davis",
      content: "Just sent you the API documentation.",
      timestamp: "2025-04-15T15:00:00",
      isCurrentUser: false,
    },
  ],
}

export default function ChatPage() {
  const { user } = useAuth()
  const [activeChannel, setActiveChannel] = useState(chatChannels[0])
  const [messageText, setMessageText] = useState("")
  const [messagesByChannel, setMessagesByChannel] = useState(initialMessages)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Get current channel's messages
  const currentMessages = messagesByChannel[activeChannel.id] || []

  useEffect(() => {
    scrollToBottom()
  }, [currentMessages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (messageText.trim() === "") return

    const newMessage = {
      id: `${activeChannel.id}-${Date.now()}`,
      sender: "Current User",
      content: messageText,
      timestamp: new Date().toISOString(),
      isCurrentUser: true,
    }

    // Update messages for the active channel only
    setMessagesByChannel(prev => ({
      ...prev,
      [activeChannel.id]: [...(prev[activeChannel.id] || []), newMessage]
    }))
    
    setMessageText("")

    // In a real app, this would send the message to the server
    console.log("Message sent to", activeChannel.name, ":", newMessage)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="h-[calc(100vh-8rem)]">
      <div className="grid h-full grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
        <div className="hidden md:flex flex-col h-full">
          <Card className="flex-1 flex flex-col h-full">
            <CardHeader className="px-4 py-3">
              <CardTitle className="text-lg">Conversations</CardTitle>
            </CardHeader>
            <Tabs defaultValue="channels" className="flex-1 flex flex-col">
              <TabsList className="grid grid-cols-2 mx-4">
                <TabsTrigger value="channels">Channels</TabsTrigger>
                <TabsTrigger value="direct">Direct</TabsTrigger>
              </TabsList>
              <TabsContent value="channels" className="flex-1 flex flex-col">
                <div className="px-4 py-2 flex justify-between items-center">
                  <h3 className="text-sm font-medium">Project Channels</h3>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Add Channel</span>
                  </Button>
                </div>
                <ScrollArea className="flex-1">
                  <div className="px-2 py-1 space-y-1">
                    {chatChannels
                      .filter((c) => c.type === "project")
                      .map((channel) => (
                        <Button
                          key={channel.id}
                          variant={activeChannel.id === channel.id ? "secondary" : "ghost"}
                          className="w-full justify-start gap-2 h-9 px-2"
                          onClick={() => setActiveChannel(channel)}
                        >
                          <FileText className="h-4 w-4" />
                          <span className="truncate">{channel.name}</span>
                          {channel.unread > 0 && (
                            <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                              {channel.unread}
                            </span>
                          )}
                        </Button>
                      ))}
                  </div>
                  <div className="px-4 py-2 flex justify-between items-center">
                    <h3 className="text-sm font-medium">General Channels</h3>
                  </div>
                  <div className="px-2 py-1 space-y-1">
                    {chatChannels
                      .filter((c) => c.type === "channel")
                      .map((channel) => (
                        <Button
                          key={channel.id}
                          variant={activeChannel.id === channel.id ? "secondary" : "ghost"}
                          className="w-full justify-start gap-2 h-9 px-2"
                          onClick={() => setActiveChannel(channel)}
                        >
                          <Users className="h-4 w-4" />
                          <span className="truncate">{channel.name}</span>
                          {channel.unread > 0 && (
                            <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                              {channel.unread}
                            </span>
                          )}
                        </Button>
                      ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="direct" className="flex-1 flex flex-col">
                <div className="px-4 py-2 flex justify-between items-center">
                  <h3 className="text-sm font-medium">Direct Messages</h3>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">New Message</span>
                  </Button>
                </div>
                <ScrollArea className="flex-1">
                  <div className="px-2 py-1 space-y-1">
                    {directMessages.map((dm) => (
                      <Button
                        key={dm.id}
                        variant={activeChannel.id === dm.id ? "secondary" : "ghost"}
                        className="w-full justify-start gap-2 h-9 px-2"
                        onClick={() => setActiveChannel(dm)}
                      >
                        <div className="relative">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>{dm.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {dm.online && (
                            <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-1 ring-background"></span>
                          )}
                        </div>
                        <span className="truncate">{dm.name}</span>
                        {dm.unread > 0 && (
                          <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                            {dm.unread}
                          </span>
                        )}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
        <Card className="flex flex-col h-full">
          <CardHeader className="px-6 py-3 border-b">
            <div className="flex items-center">
              <CardTitle className="text-lg">{activeChannel.name}</CardTitle>
              <div className="ml-auto flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Users className="h-4 w-4" />
                  <span className="sr-only">Members</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {currentMessages.length > 0 ? (
                  currentMessages.map((message) => (
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
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-32 text-muted-foreground">
                    No messages yet. Start the conversation!
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            <div className="p-4 border-t">
              <div className="flex items-end gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8 shrink-0">
                  <Paperclip className="h-4 w-4" />
                  <span className="sr-only">Attach file</span>
                </Button>
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
                  disabled={messageText.trim() === ""}
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
