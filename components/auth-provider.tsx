"use client"

import type React from "react"

import { createContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

type User = {
  id: string
  name: string
  email: string
  role: "manager" | "team_member"
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string, role: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    // Redirect logic
    if (!isLoading) {
      const publicPaths = ["/", "/login", "/signup", "/forgot-password"]
      const isPublicPath = publicPaths.includes(pathname)

      if (!user && !isPublicPath) {
        router.push("/login")
      } else if (user && isPublicPath && pathname !== "/") {
        router.push("/dashboard")
      }
    }
  }, [user, isLoading, pathname, router])

  const login = async (email: string, password: string) => {
    // Mock login - in a real app, this would call an API
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Simulate successful login
        if (email && password) {
          const mockUser: User = {
            id: "user-1",
            name: email.split("@")[0],
            email,
            role: email.includes("manager") ? "manager" : "team_member",
          }

          setUser(mockUser)
          localStorage.setItem("user", JSON.stringify(mockUser))
          resolve()
        } else {
          reject(new Error("Invalid credentials"))
        }
      }, 1000)
    })
  }

  const signup = async (name: string, email: string, password: string, role: string) => {
    // Mock signup - in a real app, this would call an API
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password) {
          const mockUser: User = {
            id: "user-" + Date.now(),
            name,
            email,
            role: role === "manager" ? "manager" : "team_member",
          }

          setUser(mockUser)
          localStorage.setItem("user", JSON.stringify(mockUser))
          resolve()
        } else {
          reject(new Error("Invalid user data"))
        }
      }, 1000)
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>{children}</AuthContext.Provider>
}

export { AuthContext }
