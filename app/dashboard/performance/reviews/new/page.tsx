"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Mock team members data
const teamMembers = [
  { id: "1", name: "Sarah Williams", role: "UI Designer" },
  { id: "2", name: "Michael Brown", role: "Frontend Developer" },
  { id: "3", name: "Emily Davis", role: "Backend Developer" },
  { id: "4", name: "David Wilson", role: "QA Tester" },
  { id: "5", name: "Jessica Taylor", role: "Content Writer" },
  { id: "6", name: "Robert Martinez", role: "SEO Specialist" },
]

// Mock projects data
const projects = [
  { id: "1", name: "Website Redesign" },
  { id: "2", name: "Mobile App Development" },
  { id: "3", name: "Marketing Campaign" },
  { id: "4", name: "Database Migration" },
]

export default function NewReviewPage() {
  const { user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const preselectedEmployee = searchParams.get("employee") || ""
  const preselectedProject = searchParams.get("project") || ""

  const [reviewData, setReviewData] = useState({
    employee: preselectedEmployee,
    project: preselectedProject,
    taskCompletion: 80,
    timeEfficiency: 80,
    communicationScore: 80,
    qualityOfWork: 80,
    teamCollaboration: 80,
    overallRating: 4,
    strengths: "",
    areasForImprovement: "",
    additionalComments: "",
  })

  const handleSliderChange = (name: string, value: number[]) => {
    setReviewData({
      ...reviewData,
      [name]: value[0],
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validate form
    if (!reviewData.employee || !reviewData.project) {
      toast({
        title: "Missing information",
        description: "Please select an employee and project.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Calculate overall metrics
    const metrics = {
      taskCompletion: reviewData.taskCompletion,
      timeEfficiency: reviewData.timeEfficiency,
      communicationScore: reviewData.communicationScore,
      qualityOfWork: reviewData.qualityOfWork,
      teamCollaboration: reviewData.teamCollaboration,
      overallRating: reviewData.overallRating,
    }

    // In a real app, this would call an API to submit the review
    const reviewSubmission = {
      employee: reviewData.employee,
      project: reviewData.project,
      metrics,
      strengths: reviewData.strengths,
      areasForImprovement: reviewData.areasForImprovement,
      additionalComments: reviewData.additionalComments,
      submittedBy: user?.name,
      submittedDate: new Date().toISOString(),
    }

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Review submitted",
        description: `Performance review for ${reviewData.employee} has been submitted successfully.`,
      })
      setIsLoading(false)
      router.push("/dashboard/performance/reviews")

      // In a real app, this would be handled by the API
      console.log("Review submitted:", reviewSubmission)
    }, 1500)
  }

  const getSelectedTeamMember = () => {
    return teamMembers.find((member) => member.name === reviewData.employee)
  }

  const selectedMember = getSelectedTeamMember()

  if (!user || user.role !== "manager") {
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
        <h1 className="text-3xl font-bold tracking-tight">New Performance Review</h1>
        <p className="text-muted-foreground">Submit a performance review for a team member</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Review Details</CardTitle>
              <CardDescription>Select the employee and project for this review</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="employee">Employee</Label>
                <Select
                  value={reviewData.employee}
                  onValueChange={(value) => setReviewData({ ...reviewData, employee: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamMembers.map((member) => (
                      <SelectItem key={member.id} value={member.name}>
                        {member.name} ({member.role})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="project">Project</Label>
                <Select
                  value={reviewData.project}
                  onValueChange={(value) => setReviewData({ ...reviewData, project: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.name}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedMember && (
                <div className="pt-4">
                  <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                    <Avatar>
                      <AvatarFallback>{selectedMember.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{selectedMember.name}</div>
                      <div className="text-sm text-muted-foreground">{selectedMember.role}</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Rate the employee's performance in different areas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Task Completion</Label>
                  <span className="text-sm font-medium">{reviewData.taskCompletion}%</span>
                </div>
                <Slider
                  value={[reviewData.taskCompletion]}
                  min={0}
                  max={100}
                  step={5}
                  onValueChange={(value) => handleSliderChange("taskCompletion", value)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Time Efficiency</Label>
                  <span className="text-sm font-medium">{reviewData.timeEfficiency}%</span>
                </div>
                <Slider
                  value={[reviewData.timeEfficiency]}
                  min={0}
                  max={100}
                  step={5}
                  onValueChange={(value) => handleSliderChange("timeEfficiency", value)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Communication</Label>
                  <span className="text-sm font-medium">{reviewData.communicationScore}%</span>
                </div>
                <Slider
                  value={[reviewData.communicationScore]}
                  min={0}
                  max={100}
                  step={5}
                  onValueChange={(value) => handleSliderChange("communicationScore", value)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Quality of Work</Label>
                  <span className="text-sm font-medium">{reviewData.qualityOfWork}%</span>
                </div>
                <Slider
                  value={[reviewData.qualityOfWork]}
                  min={0}
                  max={100}
                  step={5}
                  onValueChange={(value) => handleSliderChange("qualityOfWork", value)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Team Collaboration</Label>
                  <span className="text-sm font-medium">{reviewData.teamCollaboration}%</span>
                </div>
                <Slider
                  value={[reviewData.teamCollaboration]}
                  min={0}
                  max={100}
                  step={5}
                  onValueChange={(value) => handleSliderChange("teamCollaboration", value)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Overall Rating (1-5)</Label>
                  <span className="text-sm font-medium">{reviewData.overallRating}</span>
                </div>
                <Slider
                  value={[reviewData.overallRating]}
                  min={1}
                  max={5}
                  step={0.5}
                  onValueChange={(value) => handleSliderChange("overallRating", value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Feedback</CardTitle>
              <CardDescription>Provide detailed feedback for the employee</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="strengths">Strengths</Label>
                <Textarea
                  id="strengths"
                  placeholder="What did the employee do well?"
                  rows={3}
                  value={reviewData.strengths}
                  onChange={(e) => setReviewData({ ...reviewData, strengths: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="areasForImprovement">Areas for Improvement</Label>
                <Textarea
                  id="areasForImprovement"
                  placeholder="What could the employee improve on?"
                  rows={3}
                  value={reviewData.areasForImprovement}
                  onChange={(e) => setReviewData({ ...reviewData, areasForImprovement: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalComments">Additional Comments</Label>
                <Textarea
                  id="additionalComments"
                  placeholder="Any other feedback or comments?"
                  rows={3}
                  value={reviewData.additionalComments}
                  onChange={(e) => setReviewData({ ...reviewData, additionalComments: e.target.value })}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit Review"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  )
}
