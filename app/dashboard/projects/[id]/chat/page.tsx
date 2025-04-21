"use client"

import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { ProjectChat } from "@/components/project-chat"

// Mock project data
const projects = [
  {
    id: "1",
    name: "Website Redesign",
  },
  {
    id: "2",
    name: "Mobile App Development",
  },
  {
    id: "3",
    name: "Marketing Campaign",
  },
]

export default function ProjectChatPage() {
  const params = useParams()
  const projectId = params.id as string

  // Find the project by ID
  const project = projects.find((p) => p.id === projectId) || { id: projectId, name: "Unknown Project" }

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)]">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/dashboard/projects/${projectId}`}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back to project</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">{project.name} - Chat</h1>
      </div>

      <Card className="flex flex-col h-[calc(100%-4rem)]">
        <CardHeader className="px-6 py-3 border-b">
          <CardTitle className="text-lg flex items-center justify-between">
            <span>Project Chat</span>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/projects/${projectId}`}>View Project Details</Link>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <ProjectChat projectId={projectId} projectName={project.name} />
        </CardContent>
      </Card>
    </div>
  )
}
