"use client";

import { ProjectCard } from "@/components/features/projects/project-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";
import { useDebounce } from "@/hooks/use-debounce";
import { getCurrentExerciseUrlClient } from "@/lib/current-exercices-url-client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const ProjectsList = () => {
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const currentUrl = getCurrentExerciseUrlClient();

  const { data, isLoading } = useQuery({
    queryKey: ["projects", debounceSearch],
    queryFn: async () => {
      const response = await fetch(`/api/projects?q=${debounceSearch}`);
      const data = await response.json();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return data as { projects: any[] };
    },
  });

  const projects = data?.projects ?? [];

  return (
    <Card>
      <CardHeader>
        <Input
          placeholder="Search projects"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} currentUrl={currentUrl} />
        ))}
        {projects.length === 0 && !isLoading && (
          <p className="text-sm text-muted-foreground">No projects found</p>
        )}
        {isLoading && <Loader className="" />}
      </CardContent>
    </Card>
  );
};
