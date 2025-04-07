import { ProjectCard } from "@/components/features/projects/project-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRequiredUser } from "@/lib/auth-session";
import { getCurrentExerciseUrl } from "@/lib/current-exercises-url";
import { prisma } from "@/lib/prisma";

export default async function ProjectsPage() {
  const user = await getRequiredUser();
  const currentUrl = await getCurrentExerciseUrl();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const projects = await prisma.project.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
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
    </div>
  );
}
