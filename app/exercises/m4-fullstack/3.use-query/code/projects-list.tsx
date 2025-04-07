"use client";

import { ProjectCard } from "@/components/features/projects/project-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";
import { useDebounce } from "@/hooks/use-debounce";
import { getCurrentExerciseUrlClient } from "@/lib/current-exercices-url-client";
import { Project } from "@prisma/client";
import { useEffect, useState } from "react";

export const ProjectsList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const currentUrl = getCurrentExerciseUrlClient();

  // 🦁 Remplace par useQuery
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      const result = await fetch(
        `${currentUrl}/api/projects?q=${debounceSearch}`
      ).then((res) => res.json());
      setProjects(result.projects);
      setIsLoading(false);
    };
    fetchProjects();
  }, [debounceSearch]);

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
