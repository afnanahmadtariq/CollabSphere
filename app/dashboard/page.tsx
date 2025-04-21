"use client"

import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock, FileText, MessageSquare, Plus, Users } from "lucide-react"
import Link from "next/link"
import { DashboardChart } from "@/components/dashboard-chart"

export default function DashboardPage() {
  const { user } = useAuth()
  const isManager = user?.role === "manager"

  // Mock data for dashboard
  const stats = [
    {
      title: "Total Projects",
      value: "12",
      icon: FileText,
      color: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300",
    },
    {
      title: "Tasks Completed",
      value: "64",
      icon: CheckCircle,
      color: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300",
    },
    {
      title: "Team Members",
      value: "8",
      icon: Users,
      color: "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300",
    },
    {
      title: "Messages",
      value: "142",
      icon: MessageSquare,
      color: "bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-300",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}! Here's an overview of your workspace.</p>
        </div>
        {isManager && (
          <Button asChild>
            <Link href="/dashboard/projects/new">
              <Plus className="mr-2 h-4 w-4" /> New Project
            </Link>
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground text-sm">{stat.title}</span>
                  <span className="text-2xl font-bold">{stat.value}</span>
                  <span className="text-xs text-muted-foreground">Last 30 days</span>
                </div>
                <div className={`p-2 rounded-full ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Progress</CardTitle>
          <CardDescription>Tasks completed vs. total tasks assigned per day</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <DashboardChart />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="recent">
        <TabsList>
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Tasks</TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your team's latest updates and activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    icon: MessageSquare,
                    color: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300",
                    title: 'New comment on "Homepage Redesign"',
                    description: 'Alex commented: "I\'ve completed the initial wireframes for review."',
                    time: "2h ago",
                  },
                  {
                    icon: CheckCircle,
                    color: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300",
                    title: 'Task completed: "Update API documentation"',
                    description: "Emily marked the task as completed.",
                    time: "4h ago",
                  },
                  {
                    icon: FileText,
                    color: "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300",
                    title: 'New project created: "Mobile App Development"',
                    description: "Alex created a new project and assigned 5 team members.",
                    time: "1d ago",
                  },
                  {
                    icon: Users,
                    color: "bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-300",
                    title: "New team member added",
                    description: "Jessica Taylor joined the Marketing team.",
                    time: "2d ago",
                  },
                  {
                    icon: MessageSquare,
                    color: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300",
                    title: 'New comment on "Database Migration"',
                    description: 'Michael commented: "I\'ve identified the performance bottleneck."',
                    time: "3d ago",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 border-b pb-4 last:border-0">
                    <div className={`p-2 rounded-full ${item.color}`}>
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">{item.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
              <CardDescription>Tasks due in the next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    icon: Clock,
                    color: "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300",
                    title: "Finalize API Documentation",
                    description: "Due in 2 days • High Priority",
                  },
                  {
                    icon: Clock,
                    color: "bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-300",
                    title: "Review Homepage Design",
                    description: "Due in 3 days • Medium Priority",
                  },
                  {
                    icon: Clock,
                    color: "bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-300",
                    title: "Implement User Authentication",
                    description: "Due in 4 days • Medium Priority",
                  },
                  {
                    icon: Clock,
                    color: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300",
                    title: "Create Marketing Assets",
                    description: "Due in 5 days • Low Priority",
                  },
                  {
                    icon: Clock,
                    color: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300",
                    title: "Prepare Monthly Report",
                    description: "Due in 7 days • Low Priority",
                  },
                ].map((task, i) => (
                  <div key={i} className="flex items-start gap-4 border-b pb-4 last:border-0">
                    <div className={`p-2 rounded-full ${task.color}`}>
                      <task.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{task.title}</p>
                      <p className="text-xs text-muted-foreground">{task.description}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
