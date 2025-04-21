"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Mock data for the chart
const data = [
  { name: "Mon", completed: 5, total: 8 },
  { name: "Tue", completed: 7, total: 10 },
  { name: "Wed", completed: 4, total: 6 },
  { name: "Thu", completed: 8, total: 12 },
  { name: "Fri", completed: 6, total: 9 },
  { name: "Sat", completed: 3, total: 5 },
  { name: "Sun", completed: 2, total: 3 },
];

export function DashboardChart() {
  return (
    <ChartContainer
      config={{
        completed: {
          label: "Completed Tasks",
          color: "hsl(var(--chart-1))",
        },
        total: {
          label: "Total Tasks",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <ChartTooltip />
          <Legend />
          <Bar
            dataKey="completed"
            fill="var(--color-completed)"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="total"
            fill="var(--color-total)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
