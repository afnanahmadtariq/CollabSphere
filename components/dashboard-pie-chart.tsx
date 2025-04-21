"use client"

import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for the pie chart
const data = [
  { name: "Website Redesign", value: 36, color: "#3b82f6" },
  { name: "Mobile App Development", value: 24, color: "#10b981" },
  { name: "Marketing Campaign", value: 18, color: "#f59e0b" },
  { name: "Database Migration", value: 12, color: "#6366f1" },
  { name: "Other Projects", value: 10, color: "#ec4899" },
]

export function DashboardPieChart() {
  return (
    <ChartContainer
      config={{
        tasks: {
          label: "Tasks",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
