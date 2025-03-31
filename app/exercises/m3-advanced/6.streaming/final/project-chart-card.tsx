"use client";

import { format } from "date-fns";
import { TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ProjectWithDate } from "./types";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ProjectChartCardProps {
  projectData: ProjectWithDate[];
  trendPercentage: number;
  dateRange: {
    start: Date;
    end: Date;
  };
}

const chartConfig = {
  count: {
    label: "Created Projects",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ProjectChartCard({
  projectData,
  trendPercentage,
  dateRange,
}: ProjectChartCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Project Creation Timeline</CardTitle>
        <CardDescription>
          Last 10 days project creation activity
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[150px]">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart
            accessibilityLayer
            data={projectData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="var(--color-count)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {trendPercentage > 0 ? (
            <>
              Trending up by {trendPercentage}%{" "}
              <TrendingUp className="h-4 w-4" />
            </>
          ) : (
            <>Trending down by {Math.abs(trendPercentage)}%</>
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          {format(dateRange.start, "dd MMM yyyy")} -{" "}
          {format(dateRange.end, "dd MMM yyyy")}
        </div>
      </CardFooter>
    </Card>
  );
}
