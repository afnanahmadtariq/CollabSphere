"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Edit,
  FileText,
  MessageSquare,
  Plus,
  Users,
} from "lucide-react";
import { ProjectChat } from "@/components/project-chat";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

// Mock project data
const project = {
  id: "1",
  name: "Website Redesign",
  description:
    "Redesign the company website with a modern look and improved UX",
  status: "In Progress",
  members: [
    { id: "1", name: "Alex Johnson", role: "Project Manager" },
    { id: "2", name: "Sarah Williams", role: "UI Designer" },
    { id: "3", name: "Michael Brown", role: "Frontend Developer" },
    { id: "4", name: "Emily Davis", role: "Backend Developer" },
    { id: "5", name: "David Wilson", role: "QA Tester" },
  ],
  tasks: [
    {
      id: "1",
      title: "Create wireframes",
      description: "Design initial wireframes for homepage and key pages",
      status: "Completed",
      assignee: "Sarah Williams",
      dueDate: "2025-04-10",
      priority: "High",
    },
    {
      id: "2",
      title: "Develop homepage",
      description: "Implement the homepage based on approved wireframes",
      status: "In Progress",
      assignee: "Michael Brown",
      dueDate: "2025-04-20",
      priority: "High",
    },
    {
      id: "3",
      title: "Set up API endpoints",
      description: "Create necessary API endpoints for the website",
      status: "To Do",
      assignee: "Emily Davis",
      dueDate: "2025-04-25",
      priority: "Medium",
    },
    {
      id: "4",
      title: "QA Testing",
      description: "Test all implemented features and report bugs",
      status: "To Do",
      assignee: "David Wilson",
      dueDate: "2025-05-05",
      priority: "Medium",
    },
    {
      id: "5",
      title: "Content migration",
      description: "Migrate content from old website to new website",
      status: "To Do",
      assignee: "Alex Johnson",
      dueDate: "2025-05-10",
      priority: "Low",
    },
  ],
  startDate: "2025-04-01",
  dueDate: "2025-05-15",
};

export default function ProjectDetailPage() {
  const { user } = useAuth();
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const isManager = user?.role === "manager";
  const [newTaskOpen, setNewTaskOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskAssignee, setTaskAssignee] = useState("");
  const [taskPriority, setTaskPriority] = useState("Medium");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [showChat, setShowChat] = useState(false);
  // const [newTask, setNewTask] = useState({
  //   title: "",
  //   description: "",
  //   assignee: "",
  //   priority: "Medium",
  //   dueDate: "",
  // });

  const handleAddTask = () => {
    // Validate form
    if (!taskTitle || !taskDescription || !taskAssignee || !taskDueDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would call an API to add the task
    const newTask = {
      id: `task-${Date.now()}`,
      title: taskTitle,
      description: taskDescription,
      status: "To Do",
      assignee: taskAssignee,
      dueDate: taskDueDate,
      priority: taskPriority,
    };
    project.tasks.push(newTask);

    toast({
      title: "Task added",
      description: `Task "${taskTitle}" has been added to the project.`,
    });

    // Reset form and close dialog
    setTaskTitle("");
    setTaskDescription("");
    setTaskAssignee("");
    setTaskPriority("Medium");
    setTaskDueDate("");
    setNewTaskOpen(false);

    // In a real app, this would refresh the task list
    console.log("New task created:", newTask);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "To Do":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-600 dark:text-red-400";
      case "Medium":
        return "text-yellow-600 dark:text-yellow-400";
      case "Low":
        return "text-green-600 dark:text-green-400";
      default:
        return "text-muted-foreground";
    }
  };

  const completedTasks = project.tasks.filter(
    (t) => t.status === "Completed"
  ).length;
  const totalTasks = project.tasks.length;
  const progressPercentage = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">
              {project.name}
            </h1>
            <Badge className={getStatusColor(project.status)}>
              {project.status}
            </Badge>
          </div>
          <p className="text-muted-foreground mt-1">{project.description}</p>
        </div>
        {isManager && (
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Edit className="h-4 w-4" /> Edit Project
            </Button>
            <Dialog open={newTaskOpen} onOpenChange={setNewTaskOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" /> Add Task
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Task</DialogTitle>
                  <DialogDescription>
                    Create a new task for this project. Fill in the details
                    below.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Task Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter task title"
                      value={taskTitle}
                      onChange={(e) => setTaskTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Enter task description"
                      value={taskDescription}
                      onChange={(e) => setTaskDescription(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="assignee">Assignee</Label>
                      <Select
                        value={taskAssignee}
                        onValueChange={setTaskAssignee}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select team member" />
                        </SelectTrigger>
                        <SelectContent>
                          {project.members.map((member) => (
                            <SelectItem key={member.id} value={member.name}>
                              {member.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select
                        value={taskPriority}
                        onValueChange={setTaskPriority}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={taskDueDate}
                      onChange={(e) => setTaskDueDate(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setNewTaskOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddTask}>Add Task</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
              <Calendar className="h-5 w-5" /> Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <div className="text-sm text-muted-foreground">Start Date</div>
                <div className="font-medium">
                  {new Date(project.startDate).toLocaleDateString()}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm text-muted-foreground">Due Date</div>
                <div className="font-medium">
                  {new Date(project.dueDate).toLocaleDateString()}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Progress</div>
                <Progress
                  value={progressPercentage}
                  className="h-2"
                  indicatorColor="bg-blue-500"
                />
                <div className="text-sm text-right">
                  {completedTasks}/{totalTasks} tasks completed (
                  {progressPercentage}%)
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
              <Users className="h-5 w-5" /> Team Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {project.members.map((member) => (
                <div key={member.id} className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {member.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 border-amber-200 dark:border-amber-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
              <MessageSquare className="h-5 w-5" /> Project Chat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <MessageSquare className="h-8 w-8" />
                <p>Project chat messages</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowChat(true)}
                  className="bg-white dark:bg-gray-800"
                >
                  Open Chat
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" /> Tasks
          </CardTitle>
          <CardDescription>
            Manage and track all tasks for this project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Tasks</TabsTrigger>
              <TabsTrigger value="todo">To Do</TabsTrigger>
              <TabsTrigger value="inprogress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="space-y-4">
                {project.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{task.title}</h3>
                        <Badge className={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {task.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-4 items-center">
                      <div className="text-sm">
                        <span className="text-muted-foreground">
                          Assignee:{" "}
                        </span>
                        {task.assignee}
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Due: </span>
                        {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">
                          Priority:{" "}
                        </span>
                        <span className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </span>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={`/dashboard/projects/${params.id}/tasks/${task.id}`}
                        >
                          View
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="todo">
              <div className="space-y-4">
                {project.tasks
                  .filter((t) => t.status === "To Do")
                  .map((task) => (
                    <div
                      key={task.id}
                      className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{task.title}</h3>
                          <Badge className={getStatusColor(task.status)}>
                            {task.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {task.description}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-4 items-center">
                        <div className="text-sm">
                          <span className="text-muted-foreground">
                            Assignee:{" "}
                          </span>
                          {task.assignee}
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Due: </span>
                          {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">
                            Priority:{" "}
                          </span>
                          <span className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </span>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={`/dashboard/projects/${params.id}/tasks/${task.id}`}
                          >
                            View
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="inprogress">
              <div className="space-y-4">
                {project.tasks
                  .filter((t) => t.status === "In Progress")
                  .map((task) => (
                    <div
                      key={task.id}
                      className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{task.title}</h3>
                          <Badge className={getStatusColor(task.status)}>
                            {task.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {task.description}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-4 items-center">
                        <div className="text-sm">
                          <span className="text-muted-foreground">
                            Assignee:{" "}
                          </span>
                          {task.assignee}
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Due: </span>
                          {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">
                            Priority:{" "}
                          </span>
                          <span className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </span>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={`/dashboard/projects/${params.id}/tasks/${task.id}`}
                          >
                            View
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="completed">
              <div className="space-y-4">
                {project.tasks
                  .filter((t) => t.status === "Completed")
                  .map((task) => (
                    <div
                      key={task.id}
                      className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{task.title}</h3>
                          <Badge className={getStatusColor(task.status)}>
                            {task.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {task.description}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-4 items-center">
                        <div className="text-sm">
                          <span className="text-muted-foreground">
                            Assignee:{" "}
                          </span>
                          {task.assignee}
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Due: </span>
                          {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">
                            Priority:{" "}
                          </span>
                          <span className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </span>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={`/dashboard/projects/${params.id}/tasks/${task.id}`}
                          >
                            View
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Project Chat Dialog */}
      <Dialog open={showChat} onOpenChange={setShowChat}>
        <DialogContent className="max-w-3xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>Project Chat: {project.name}</DialogTitle>
            <DialogDescription>
              Communicate with your team about this project
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-hidden">
            <ProjectChat
              projectId={params.id as string}
              projectName={project.name}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
