"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Search, Plus, Star } from "lucide-react"

// Mock review data
const reviews = [
  {
    id: "1",
    employee: "Sarah Williams",
    role: "UI Designer",
    project: "Website Redesign",
    submittedBy: "Alex Johnson",
    submittedDate: "2025-03-15",
    status: "Completed",
    overallRating: 4.5,
  },
  {
    id: "2",
    employee: "Michael Brown",
    role: "Frontend Developer",
    project: "Website Redesign",
    submittedBy: "Alex Johnson",
    submittedDate: "2025-03-15",
    status: "Completed",
    overallRating: 4.3,
  },
  {
    id: "3",
    employee: "Emily Davis",
    role: "Backend Developer",
    project: "Database Migration",
    submittedBy: "Alex Johnson",
    submittedDate: "2025-02-28",
    status: "Completed",
    overallRating: 4.7,
  },
  {
    id: "4",
    employee: "David Wilson",
    role: "QA Tester",
    project: "Mobile App Development",
    submittedBy: "Alex Johnson",
    submittedDate: "2025-01-20",
    status: "Completed",
    overallRating: 4.0,
  },
]

// Mock pending reviews
const pendingReviews = [
  {
    id: "5",
    employee: "Jessica Taylor",
    role: "Content Writer",
    project: "Marketing Campaign",
    dueDate: "2025-04-30",
    status: "Pending",
  },
  {
    id: "6",
    employee: "Robert Martinez",
    role: "SEO Specialist",
    project: "Marketing Campaign",
    dueDate: "2025-04-30",
    status: "Pending",
  },
]

export default function PerformanceReviewsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const isManager = user?.role === "manager"
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("all")

  if (!isManager) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Access Restricted</h2>
          <p className="text-muted-foreground">You need manager permissions to view this page.</p>
        </div>
      </div>
    )
  }

  const filteredReviews = [...reviews, ...pendingReviews].filter(
    (review) =>
      review.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (review.role && review.role.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const displayedReviews =
    filter === "all"
      ? filteredReviews
      : filter === "completed"
        ? filteredReviews.filter((r) => r.status === "Completed")
        : filteredReviews.filter((r) => r.status === "Pending")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Performance Reviews</h1>
          <p className="text-muted-foreground">Manage and track team member performance reviews</p>
        </div>
        <Button asChild>
          <a href="/dashboard/performance/reviews/new">
            <Plus className="mr-2 h-4 w-4" /> New Review
          </a>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search reviews..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Tabs defaultValue="all" className="w-auto" value={filter} onValueChange={setFilter}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>
        </Tabs>
        <Select defaultValue="recent">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="rating-high">Highest Rating</SelectItem>
            <SelectItem value="rating-low">Lowest Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Reviews</CardTitle>
          <CardDescription>View and manage performance reviews for your team members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
              <div className="col-span-3">Employee</div>
              <div className="col-span-3">Project</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-2">Rating</div>
            </div>
            <div className="divide-y">
              {displayedReviews.length === 0 ? (
                <div className="px-4 py-6 text-center text-muted-foreground">No reviews found</div>
              ) : (
                displayedReviews.map((review) => (
                  <div key={review.id} className="grid grid-cols-12 px-4 py-3 items-center">
                    <div className="col-span-3 flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{review.employee.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{review.employee}</div>
                        <div className="text-xs text-muted-foreground">{review.role}</div>
                      </div>
                    </div>
                    <div className="col-span-3">{review.project}</div>
                    <div className="col-span-2">
                      <Badge
                        className={
                          review.status === "Completed"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                        }
                      >
                        {review.status}
                      </Badge>
                    </div>
                    <div className="col-span-2 text-sm">
                      {review.status === "Completed"
                        ? new Date(review.submittedDate).toLocaleDateString()
                        : `Due: ${new Date(review.dueDate).toLocaleDateString()}`}
                    </div>
                    <div className="col-span-2">
                      {review.status === "Completed" ? (
                        <div className="flex items-center">
                          <div className="flex mr-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-3 w-3 ${
                                  star <= review.overallRating
                                    ? "text-yellow-500 fill-yellow-500"
                                    : star <= review.overallRating + 0.5
                                      ? "text-yellow-500 fill-yellow-500 opacity-50"
                                      : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm">{review.overallRating.toFixed(1)}</span>
                        </div>
                      ) : (
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={`/dashboard/performance/reviews/new?employee=${review.employee}&project=${review.project}`}
                          >
                            Complete
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
