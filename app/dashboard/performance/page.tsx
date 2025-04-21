"use client"

import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, Star, Users, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardChart } from "@/components/dashboard-chart"
import { DashboardPieChart } from "@/components/dashboard-pie-chart"

// Mock performance data
const teamMembers = [
  {
    id: "1",
    name: "Sarah Williams",
    role: "UI Designer",
    avatar: "SW",
    metrics: {
      taskCompletion: 92,
      timeEfficiency: 85,
      communicationScore: 78,
      overallRating: 4.5,
    },
  },
  {
    id: "2",
    name: "Michael Brown",
    role: "Frontend Developer",
    avatar: "MB",
    metrics: {
      taskCompletion: 88,
      timeEfficiency: 90,
      communicationScore: 82,
      overallRating: 4.3,
    },
  },
  {
    id: "3",
    name: "Emily Davis",
    role: "Backend Developer",
    avatar: "ED",
    metrics: {
      taskCompletion: 95,
      timeEfficiency: 87,
      communicationScore: 75,
      overallRating: 4.2,
    },
  },
  {
    id: "4",
    name: "David Wilson",
    role: "QA Tester",
    avatar: "DW",
    metrics: {
      taskCompletion: 90,
      timeEfficiency: 82,
      communicationScore: 88,
      overallRating: 4.0,
    },
  },
]

const projects = [
  {
    id: "1",
    name: "Website Redesign",
    progress: 65,
    startDate: "2025-04-01",
    dueDate: "2025-05-15",
  },
  {
    id: "2",
    name: "Mobile App Development",
    progress: 30,
    startDate: "2025-04-15",
    dueDate: "2025-06-30",
  },
  {
    id: "3",
    name: "Marketing Campaign",
    progress: 80,
    startDate: "2025-03-10",
    dueDate: "2025-04-30",
  },
]

export default function PerformancePage() {
  const { user } = useAuth()
  const isManager = user?.role === "manager"

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Performance Tracking</h1>
        <p className="text-muted-foreground">Monitor team performance metrics and evaluate project progress</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <Tabs defaultValue="team" className="w-full">
          <TabsList>
            <TabsTrigger value="team">Team Performance</TabsTrigger>
            <TabsTrigger value="projects">Project Progress</TabsTrigger>
          </TabsList>
          <TabsContent value="team" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col gap-2 items-center text-center">
                    <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                      <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                    </div>
                    <h3 className="text-xl font-bold">91%</h3>
                    <p className="text-sm text-muted-foreground">Average Task Completion</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col gap-2 items-center text-center">
                    <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-green-600 dark:text-green-300" />
                    </div>
                    <h3 className="text-xl font-bold">86%</h3>
                    <p className="text-sm text-muted-foreground">Time Efficiency</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col gap-2 items-center text-center">
                    <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                      <Users className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                    </div>
                    <h3 className="text-xl font-bold">81%</h3>
                    <p className="text-sm text-muted-foreground">Communication Score</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col gap-2 items-center text-center">
                    <div className="bg-amber-100 dark:bg-amber-900 p-3 rounded-full">
                      <Star className="h-6 w-6 text-amber-600 dark:text-amber-300" />
                    </div>
                    <h3 className="text-xl font-bold">4.3</h3>
                    <p className="text-sm text-muted-foreground">Overall Team Rating</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Task Completion</CardTitle>
                <CardDescription>Tasks completed vs. total tasks assigned per day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <DashboardChart />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Member Performance</CardTitle>
                <CardDescription>Individual performance metrics for each team member</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{member.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{member.name}</h4>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(member.metrics.overallRating)
                                  ? "text-yellow-500 fill-yellow-500"
                                  : i < member.metrics.overallRating
                                    ? "text-yellow-500 fill-yellow-500 opacity-50"
                                    : "text-muted-foreground"
                              }`}
                            />
                          ))}
                          <span className="ml-1 text-sm font-medium">{member.metrics.overallRating.toFixed(1)}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Task Completion</span>
                            <span className="font-medium">{member.metrics.taskCompletion}%</span>
                          </div>
                          <Progress value={member.metrics.taskCompletion} className="bg-blue-100 dark:bg-blue-900">
                            <div
                              className="h-full bg-blue-600 dark:bg-blue-400 rounded-full"
                              style={{ width: `${member.metrics.taskCompletion}%` }}
                            />
                          </Progress>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Time Efficiency</span>
                            <span className="font-medium">{member.metrics.timeEfficiency}%</span>
                          </div>
                          <Progress value={member.metrics.timeEfficiency} className="bg-green-100 dark:bg-green-900">
                            <div
                              className="h-full bg-green-600 dark:bg-green-400 rounded-full"
                              style={{ width: `${member.metrics.timeEfficiency}%` }}
                            />
                          </Progress>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Communication</span>
                            <span className="font-medium">{member.metrics.communicationScore}%</span>
                          </div>
                          <Progress
                            value={member.metrics.communicationScore}
                            className="bg-purple-100 dark:bg-purple-900"
                          >
                            <div
                              className="h-full bg-purple-600 dark:bg-purple-400 rounded-full"
                              style={{ width: `${member.metrics.communicationScore}%` }}
                            />
                          </Progress>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Project Progress</h2>
              <Select defaultValue="30days">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Task Distribution by Project</CardTitle>
                <CardDescription>Number of tasks assigned to each project</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <DashboardPieChart />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {projects.map((project) => (
                <Card key={project.id}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-lg">{project.name}</h3>
                        <span className="text-sm text-muted-foreground">
                          {new Date(project.startDate).toLocaleDateString()} -{" "}
                          {new Date(project.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              project.progress < 40
                                ? "bg-red-500"
                                : project.progress < 70
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                            }`}
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                        <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-md">
                          <div className="text-sm text-muted-foreground">Tasks Completed</div>
                          <div className="text-lg font-medium">24/36</div>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-md">
                          <div className="text-sm text-muted-foreground">Team Velocity</div>
                          <div className="text-lg font-medium">8.5 tasks/week</div>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-md">
                          <div className="text-sm text-muted-foreground">Estimated Completion</div>
                          <div className="text-lg font-medium">On Schedule</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance Insights</CardTitle>
                <CardDescription>Key insights and recommendations based on team performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800">
                    <h4 className="font-medium mb-2">Time Management Opportunity</h4>
                    <p className="text-sm">
                      The team is spending 20% more time on documentation tasks than the benchmark. Consider reviewing
                      the documentation process to identify efficiency improvements.
                    </p>
                  </div>
                  <div className="p-4 border rounded-md bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                    <h4 className="font-medium mb-2">Strong Communication</h4>
                    <p className="text-sm">
                      Team communication scores have improved by 15% over the last month. The daily standup meetings
                      appear to be having a positive impact.
                    </p>
                  </div>
                  <div className="p-4 border rounded-md bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                    <h4 className="font-medium mb-2">Resource Allocation</h4>
                    <p className="text-sm">
                      Consider redistributing resources from the Marketing Campaign project to the Mobile App
                      Development project, which is currently behind schedule by 10%.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <Button asChild className="ml-auto md:ml-0">
          <a href="/dashboard/performance/reviews">
            <FileText className="mr-2 h-4 w-4" /> View Reviews
          </a>
        </Button>
      </div>
    </div>
  )
}
