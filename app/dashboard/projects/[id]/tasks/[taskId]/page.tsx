"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { Calendar, Clock, MessageSquare, Paperclip } from "lucide-react"

// Mock task data
const task = {
  id: "2",
  title: "Develop homepage",
  description:
    "Implement the homepage based on approved wireframes. This should include responsive design for mobile, tablet, and desktop views. Use the design system components for consistency.",
  status: "In Progress",
  assignee: "Michael Brown",
  dueDate: "2025-04-20",
  priority: "High",
  project: {
    id: "1",
    name: "Website Redesign",
  },
  timeTracking: {
    estimated: 16,
    spent: 8,
  },
  comments: [
    {
      id: "1",
      author: "Sarah Williams",
      content: "I've uploaded the final wireframes to the shared folder. Let me know if you need any clarification.",
      timestamp: "2025-04-12T10:30:00",
    },
    {
      id: "2",
      author: "Michael Brown",
      content:
        "Thanks Sarah! I'll start implementing the design today. I might have some questions about the mobile navigation.",
      timestamp: "2025-04-12T11:15:00",
    },
    {
      id: "3",
      author: "Alex Johnson",
      content: "Remember to use the new color palette we agreed on in the last meeting.",
      timestamp: "2025-04-12T14:20:00",
    },
  ],
  attachments: [
    {
      id: "1",
      name: "homepage-wireframes.pdf",
      size: "2.4 MB",
      uploadedBy: "Sarah Williams",
      timestamp: "2025-04-10T15:45:00",
    },
    {
      id: "2",
      name: "design-system.sketch",
      size: "8.7 MB",
      uploadedBy: "Sarah Williams",
      timestamp: "2025-04-11T09:20:00",
    },
  ],
  history: [
    {
      id: "1",
      action: "Task created",
      user: "Alex Johnson",
      timestamp: "2025-04-10T09:00:00",
    },
    {
      id: "2",
      action: "Assigned to Michael Brown",
      user: "Alex Johnson",
      timestamp: "2025-04-10T09:05:00",
    },
    {
      id: "3",
      action: "Status changed from 'To Do' to 'In Progress'",
      user: "Michael Brown",
      timestamp: "2025-04-12T11:30:00",
    },
  ],
}

export default function TaskDetailPage() {
  const { user } = useAuth()
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [status, setStatus] = useState(task.status)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus)

    // In a real app, this would call an API to update the task status
    toast({
      title: "Status updated",
      description: `Task status changed to ${newStatus}`,
    })

    // Update the task history
    const newHistoryEntry = {
      id: `history-${Date.now()}`,
      action: `Status changed from '${task.status}' to '${newStatus}'`,
      user: user?.name || "Current User",
      timestamp: new Date().toISOString(),
    }

    // In a real app, this would be handled by the API
    console.log("Task status updated:", newStatus)
    console.log("New history entry:", newHistoryEntry)
  }

  const handleAddComment = () => {
    if (!comment.trim()) return

    setIsSubmitting(true)
    // In a real app, this would call an API to add the comment
    setTimeout(() => {
      toast({
        title: "Comment added",
        description: "Your comment has been added to the task",
      })
      setComment("")
      setIsSubmitting(false)
    }, 1000)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-600 dark:text-red-400"
      case "Medium":
        return "text-yellow-600 dark:text-yellow-400"
      case "Low":
        return "text-green-600 dark:text-green-400"
      default:
        return "text-muted-foreground"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "To Do":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
      case "In Progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
        <div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <span className="sr-only">Back</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">{task.title}</h1>
          </div>
          <p className="text-muted-foreground mt-1">
            Task in{" "}
            <Button
              variant="link"
              className="p-0 h-auto"
              onClick={() => router.push(`/dashboard/projects/${task.project.id}`)}
            >
              {task.project.name}
            </Button>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Update status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="To Do">To Do</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{task.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Comments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {task.comments.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                  <Avatar>
                    <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{comment.author}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(comment.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                </div>
              ))}

              <Separator />

              <div className="flex gap-4">
                <Avatar>
                  <AvatarFallback>{user?.name.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <Textarea
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                  />
                  <div className="flex justify-between items-center">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Paperclip className="h-3 w-3" />
                      Attach
                    </Button>
                    <Button size="sm" onClick={handleAddComment} disabled={!comment.trim() || isSubmitting}>
                      {isSubmitting ? "Sending..." : "Comment"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge className={getStatusColor(status)}>{status}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Assignee</span>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback>{task.assignee.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{task.assignee}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Due Date</span>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm">{new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Priority</span>
                <span className={`text-sm font-medium ${getPriorityColor(task.priority)}`}>{task.priority}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Time Tracking</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm">
                    {task.timeTracking.spent}h / {task.timeTracking.estimated}h
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="attachments">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="attachments">Attachments</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <TabsContent value="attachments" className="mt-4">
              <Card>
                <CardContent className="p-4 space-y-3">
                  {task.attachments.map((attachment) => (
                    <div key={attachment.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Paperclip className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{attachment.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {attachment.size} • {attachment.uploadedBy}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="history" className="mt-4">
              <Card>
                <CardContent className="p-4 space-y-3">
                  {task.history.map((event) => (
                    <div key={event.id} className="flex gap-2">
                      <div className="w-1 bg-border rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm">{event.action}</p>
                        <p className="text-xs text-muted-foreground">
                          {event.user} • {new Date(event.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <MessageSquare className="h-4 w-4" /> Related Conversations
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <Button variant="outline" className="w-full" asChild>
                <a href="/dashboard/chat">View in Chat</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
