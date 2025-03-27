import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRequiredUser } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";
import { Edit } from "lucide-react";
import { notFound } from "next/navigation";
import { ProjectForm } from "./project-form";

export default async function ProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
  const user = await getRequiredUser();
  const projectId = params.projectId;

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
      userId: user.id,
    },
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Edit className="h-5 w-5 text-primary" />
            <CardTitle>Edit Project</CardTitle>
          </div>
          <CardDescription>Update your project details</CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectForm project={project} />
        </CardContent>
      </Card>
    </div>
  );
}
