import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getRequiredUser } from "@/lib/auth-session";
import { getCurrentExerciseUrl } from "@/lib/current-exercises-url";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import { TitleUpdateForm } from "./title-edit-form";

export default async function ProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
  const user = await getRequiredUser();
  const projectId = params.projectId;
  const currentUrl = await getCurrentExerciseUrl();

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
      userId: user.id,
    },
    include: {
      tasks: true,
    },
  });

  const handleUpdateTitle = async (title: string) => {
    "use server";
    const _user = await getRequiredUser();
    await prisma.project.update({
      where: { id: projectId, userId: _user.id },
      data: { name: title },
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    revalidatePath(`${currentUrl}/projects/${projectId}`);
  };

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <TitleUpdateForm title={project.name} onUpdate={handleUpdateTitle} />
        </CardHeader>
        <CardContent>
          <p>{project.description}</p>
          <div className="flex flex-col gap-2">
            {project.tasks.map((task) => (
              <div key={task.id}>
                <p>{task.title}</p>
              </div>
            ))}
            {project.tasks.length === 0 && (
              <p className="text-sm text-muted-foreground">No tasks found</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
