"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentExerciseUrlClient } from "@/lib/current-exercices-url-client";
import { useEffect, useState } from "react";

interface Project {
  id: string;
  name: string;
  description: string;
}

interface ApiResponse {
  project?: Project;
  projects?: Project[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tasks?: any[];
  error?: string;
}

interface ApiResult {
  url: string;
  method: string;
  response: ApiResponse;
}

export default function Page() {
  const [results, setResults] = useState<ApiResult[]>([]);
  const currentUrl = getCurrentExerciseUrlClient();

  useEffect(() => {
    const fetchResults = async () => {
      const newResults: ApiResult[] = [];

      // 1. First get projects with q=p
      const projectsResponse = await fetch(`${currentUrl}/api/projects?q=p`);
      const projectsData = await projectsResponse.json();
      newResults.push({
        url: "/api/projects?q=p",
        method: "GET",
        response: projectsData,
      });

      // Get first project ID if available
      const firstProject = projectsData.projects?.[0];
      if (!firstProject) {
        setResults(newResults);
        return;
      }

      // 2. Get single project
      const projectResponse = await fetch(
        `${currentUrl}/api/projects/${firstProject.id}`
      );
      const projectData = await projectResponse.json();
      newResults.push({
        url: `/api/projects/${firstProject.id}`,
        method: "GET",
        response: projectData,
      });

      // 3. Update project
      const updateResponse = await fetch(
        `${currentUrl}/api/projects/${firstProject.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: `${firstProject.name} (updated)`,
          }),
        }
      );
      const updateData = await updateResponse.json();
      newResults.push({
        url: `/api/projects/${firstProject.id}`,
        method: "PATCH",
        response: updateData,
      });

      // 4. Get project tasks
      const tasksResponse = await fetch(
        `${currentUrl}/api/projects/${firstProject.id}/tasks`
      );
      const tasksData = await tasksResponse.json();
      newResults.push({
        url: `/api/projects/${firstProject.id}/tasks`,
        method: "GET",
        response: tasksData,
      });

      setResults(newResults);
    };

    fetchResults().catch((error) => {
      console.error("Failed to fetch:", error);
    });
  }, [currentUrl]);

  return (
    <div className="space-y-8 p-8">
      <div className="flex flex-col gap-4">
        {results.map((result) => (
          <Card key={`${result.method} ${result.url}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <span className="rounded bg-primary px-2 py-1 text-primary-foreground">
                  {result.method}
                </span>
                {result.url}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="rounded-lg bg-muted p-4 text-sm">
                {JSON.stringify(result.response, null, 2)}
              </pre>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
