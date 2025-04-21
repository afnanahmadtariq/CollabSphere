"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, Plus, Search, UserPlus } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// Mock team data
const teamMembers = [
  {
    id: "1",
    name: "Alex Johnson",
    role: "Project Manager",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    department: "Management",
    joinDate: "2023-01-15",
    projects: ["Website Redesign", "Marketing Campaign"],
    status: "Active",
  },
  {
    id: "2",
    name: "Sarah Williams",
    role: "UI Designer",
    email: "sarah.williams@example.com",
    phone: "+1 (555) 234-5678",
    department: "Design",
    joinDate: "2023-03-10",
    projects: ["Website Redesign", "Mobile App Development"],
    status: "Active",
  },
  {
    id: "3",
    name: "Michael Brown",
    role: "Frontend Developer",
    email: "michael.brown@example.com",
    phone: "+1 (555) 345-6789",
    department: "Engineering",
    joinDate: "2023-02-05",
    projects: ["Website Redesign"],
    status: "Active",
  },
  {
    id: "4",
    name: "Emily Davis",
    role: "Backend Developer",
    email: "emily.davis@example.com",
    phone: "+1 (555) 456-7890",
    department: "Engineering",
    joinDate: "2023-04-20",
    projects: ["Website Redesign", "Database Migration"],
    status: "Active",
  },
  {
    id: "5",
    name: "David Wilson",
    role: "QA Tester",
    email: "david.wilson@example.com",
    phone: "+1 (555) 567-8901",
    department: "Quality Assurance",
    joinDate: "2023-05-15",
    projects: ["Website Redesign", "Mobile App Development"],
    status: "Active",
  },
  {
    id: "6",
    name: "Jessica Taylor",
    role: "Content Writer",
    email: "jessica.taylor@example.com",
    phone: "+1 (555) 678-9012",
    department: "Marketing",
    joinDate: "2023-06-01",
    projects: ["Marketing Campaign"],
    status: "On Leave",
  },
  {
    id: "7",
    name: "Robert Martinez",
    role: "SEO Specialist",
    email: "robert.martinez@example.com",
    phone: "+1 (555) 789-0123",
    department: "Marketing",
    joinDate: "2023-04-10",
    projects: ["Marketing Campaign"],
    status: "Active",
  },
  {
    id: "8",
    name: "Jennifer Garcia",
    role: "UX Researcher",
    email: "jennifer.garcia@example.com",
    phone: "+1 (555) 890-1234",
    department: "Design",
    joinDate: "2023-07-05",
    projects: ["Mobile App Development"],
    status: "Active",
  },
];

export default function TeamPage() {
  const { user } = useAuth();
  const isManager = user?.role === "manager";
  const [searchQuery, setSearchQuery] = useState("");
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    phone: "",
  });

  if (!isManager) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Access Restricted</h2>
          <p className="text-muted-foreground">
            You need manager permissions to view this page.
          </p>
        </div>
      </div>
    );
  }

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddMember = () => {
    // In a real app, this would call an API to add the team member
    if (
      !newMember.name ||
      !newMember.email ||
      !newMember.role ||
      !newMember.department
    ) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    console.log("Adding team member:", newMember);
    teamMembers.push({
      ...newMember,
      id: (teamMembers.length + 1).toString(),
      status: "Active",
      joinDate: new Date().toISOString(),
      projects: [],
    });

    // Reset form and close dialog
    setNewMember({
      name: "",
      email: "",
      role: "",
      department: "",
      phone: "",
    });
    setAddMemberOpen(false);

    toast({
      title: "Team member added",
      description: `${newMember.name} has been added to the team.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "On Leave":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Inactive":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
          <p className="text-muted-foreground">
            Manage your team members and their project assignments
          </p>
        </div>
        <Dialog open={addMemberOpen} onOpenChange={setAddMemberOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" /> Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Team Member</DialogTitle>
              <DialogDescription>
                Add a new member to your team. They will receive an invitation
                email.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={newMember.name}
                  onChange={(e) =>
                    setNewMember({ ...newMember, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={newMember.email}
                  onChange={(e) =>
                    setNewMember({ ...newMember, email: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    placeholder="Frontend Developer"
                    value={newMember.role}
                    onChange={(e) =>
                      setNewMember({ ...newMember, role: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={newMember.department}
                    onValueChange={(value) =>
                      setNewMember({ ...newMember, department: value })
                    }
                  >
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Management">Management</SelectItem>
                      <SelectItem value="Quality Assurance">
                        Quality Assurance
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input
                  id="phone"
                  placeholder="+1 (555) 123-4567"
                  value={newMember.phone}
                  onChange={(e) =>
                    setNewMember({ ...newMember, phone: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddMemberOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddMember}>Add Member</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search team members..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Tabs
          defaultValue="all"
          className="w-auto"
          onValueChange={(value) =>
            setSearchQuery(value === "all" ? "" : value)
          }
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="engineering">Engineering</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            Manage your team members and their project assignments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
              <div className="col-span-3">Name</div>
              <div className="col-span-2">Role</div>
              <div className="col-span-2">Department</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-3">Contact</div>
            </div>
            <div className="divide-y">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="grid grid-cols-12 px-4 py-3 items-center"
                >
                  <div className="col-span-3 flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-xs text-muted-foreground">
                        Joined {new Date(member.joinDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2">{member.role}</div>
                  <div className="col-span-2">{member.department}</div>
                  <div className="col-span-2">
                    <Badge className={getStatusColor(member.status)}>
                      {member.status}
                    </Badge>
                  </div>
                  <div className="col-span-3 flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-3 w-3" />
                      <span className="truncate">{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-3 w-3" />
                      <span>{member.phone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project Assignments</CardTitle>
          <CardDescription>
            View and manage team member project assignments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              "Website Redesign",
              "Mobile App Development",
              "Marketing Campaign",
              "Database Migration",
            ].map((project) => (
              <div key={project} className="space-y-3">
                <h3 className="font-medium text-lg">{project}</h3>
                <div className="flex flex-wrap gap-2">
                  {teamMembers
                    .filter((member) => member.projects.includes(project))
                    .map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full"
                      >
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {member.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{member.name}</span>
                      </div>
                    ))}
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full h-8 gap-1"
                  >
                    <Plus className="h-3 w-3" /> Add Member
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
