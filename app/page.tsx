import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, CheckCircle, Users, MessageSquare, BarChart3 } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground">CS</span>
            </div>
            <span>CollabSphere</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How it works
            </Link>
            <Link href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-24 sm:py-32">
          <div className="flex flex-col items-center text-center gap-4 md:gap-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold">Smart Team Collaboration Platform</h1>
              <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
                Seamlessly manage projects, communicate with your team, and track performance all in one place.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button size="lg" className="gap-2">
                  Get started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline">
                  Log in to your account
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="container py-24 sm:py-32 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Powerful Features</h2>
            <p className="text-muted-foreground md:text-xl max-w-[800px] mx-auto">
              Everything you need to manage your team and projects effectively
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 shadow-sm border flex flex-col items-center text-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Project & Task Management</h3>
              <p className="text-muted-foreground">
                Create projects, assign tasks, set deadlines, and track progress with an intuitive interface.
              </p>
              <ul className="text-left space-y-2 mt-4 w-full">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Multiple project support</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Task assignment & prioritization</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Kanban-style task boards</span>
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm border flex flex-col items-center text-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Real-Time Communication</h3>
              <p className="text-muted-foreground">
                Chat with your team in project-specific channels or direct messages with file sharing support.
              </p>
              <ul className="text-left space-y-2 mt-4 w-full">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Project-based chat channels</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Direct messaging</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>File sharing capabilities</span>
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm border flex flex-col items-center text-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Performance Tracking</h3>
              <p className="text-muted-foreground">
                Monitor team performance with detailed analytics and customizable evaluation criteria.
              </p>
              <ul className="text-left space-y-2 mt-4 w-full">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Task completion metrics</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Time tracking analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Performance review system</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-8">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 font-bold">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground">CS</span>
            </div>
            <span>CollabSphere</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2025 CollabSphere. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
