"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Plus, X } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

export default function NewProjectPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    startDate: new Date(),
    dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    status: "Planning",
    teamMembers: [] as string[],
  })
  const [selectedMember, setSelectedMember] = useState("")

  // Mock team members data
  const availableTeamMembers = [
    { id: "1", name: "Sarah Williams", role: "UI Designer" },
    { id: "2", name: "Michael Brown", role: "Frontend Developer" },
    { id: "3", name: "Emily Davis", role: "Backend Developer" },
    { id: "4", name: "David Wilson", role: "QA Tester" },
    { id: "5", name: "Jessica Taylor", role: "Content Writer" },
  ]

  const handleAddMember = () => {
    if (selectedMember && !projectData.teamMembers.includes(selectedMember)) {
      setProjectData({
        ...projectData,
        teamMembers: [...projectData.teamMembers, selectedMember],
      })
      setSelectedMember("")
    }
  }

  const handleRemoveMember = (member: string) => {
    setProjectData({
      ...projectData,
      teamMembers: projectData.teamMembers.filter((m) => m !== member),
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validate form
    if (!projectData.name || !projectData.description || !projectData.startDate || !projectData.dueDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // In a real app, this would call an API to create the project
    const newProject = {
      id: `project-${Date.now()}`,
      name: projectData.name,
      description: projectData.description,
      startDate: projectData.startDate.toISOString(),
      dueDate: projectData.dueDate.toISOString(),
      status: projectData.status,
      teamMembers: projectData.teamMembers,
      createdBy: user?.name,
      createdAt: new Date().toISOString(),
    }

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Project created",
        description: `Project "${projectData.name}" has been created successfully.`,
      })
      setIsLoading(false)
      router.push("/dashboard/projects")

      // In a real app, this would be handled by the API
      console.log("Project created:", newProject)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Project</h1>
        <p className="text-muted-foreground">Create a new project and assign team members</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>Enter the basic information about your project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                placeholder="Enter project name"
                value={projectData.name}
                onChange={(e) => setProjectData({ ...projectData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter project description"
                rows={4}
                value={projectData.description}
                onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !projectData.startDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {projectData.startDate ? format(projectData.startDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={projectData.startDate}
                      onSelect={(date) => date && setProjectData({ ...projectData, startDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !projectData.dueDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {projectData.dueDate ? format(projectData.dueDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={projectData.dueDate}
                      onSelect={(date) => date && setProjectData({ ...projectData, dueDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Initial Status</Label>
              <Select
                value={projectData.status}
                onValueChange={(value) => setProjectData({ ...projectData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Planning">Planning</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="On Hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label>Team Members</Label>
              <div className="flex gap-2">
                <Select value={selectedMember} onValueChange={setSelectedMember}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select team members" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTeamMembers.map((member) => (
                      <SelectItem key={member.id} value={member.name}>
                        {member.name} ({member.role})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button type="button" onClick={handleAddMember} disabled={!selectedMember}>
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Add Member</span>
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {projectData.teamMembers.map((member) => (
                  <div
                    key={member}
                    className="flex items-center gap-1 bg-secondary text-secondary-foreground px-3 py-1 rounded-full"
                  >
                    <span className="text-sm">{member}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 rounded-full"
                      onClick={() => handleRemoveMember(member)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Project"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
