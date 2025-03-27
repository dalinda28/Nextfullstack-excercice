"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";
import { getCurrentExerciseUrlClient } from "@/lib/current-exercices-url-client";
import { Project } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};

export const ProjectsList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const currentUrl = getCurrentExerciseUrlClient();

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
          <Link
            href={`${currentUrl}/projects/${project.id}`}
            className="flex-1"
          >
            <Card className="border-l-4 border-l-primary hover:bg-muted/50 transition-colors">
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">{project.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {project.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
        {projects.length === 0 && !isLoading && (
          <p className="text-sm text-muted-foreground">No projects found</p>
        )}
        {isLoading && <Loader className="" />}
      </CardContent>
    </Card>
  );
};
