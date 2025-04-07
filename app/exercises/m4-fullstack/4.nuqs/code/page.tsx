import { CreateProjectForm } from "@/components/features/projects/create-project-form";
import { ProjectCard } from "@/components/features/projects/project-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRequiredUser } from "@/lib/auth-session";
import { getCurrentExerciseUrl } from "@/lib/current-exercises-url";
import { prisma } from "@/lib/prisma";
import { PlusCircle } from "lucide-react";
import { SearchInput } from "./search-input";
// Note: import from 'nuqs/server' to avoid the "use client" directive

// 🦁 Créer un searchParamsCache pour la page

export default async function ProjectsPage() {
  const user = await getRequiredUser();
  const currentUrl = await getCurrentExerciseUrl();
  // 🦁 Remplace par le `q` du searchParams
  const query = "";

  const projects = await prisma.project.findMany({
    where: {
      userId: user.id,
      ...(query
        ? {
            OR: [
              { name: { contains: query, mode: "insensitive" } },
              { description: { contains: query, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <SearchInput />
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              {...project}
              currentUrl={currentUrl}
            />
          ))}
          {projects.length === 0 && (
            <p className="text-sm text-muted-foreground">No projects found</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5 text-primary" />
            <CardTitle>Create New Project</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CreateProjectForm />
        </CardContent>
      </Card>
    </div>
  );
}
