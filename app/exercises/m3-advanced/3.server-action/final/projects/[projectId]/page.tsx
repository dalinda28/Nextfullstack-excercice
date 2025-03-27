import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getRequiredUser } from "@/lib/auth-session";
import { getCurrentExerciseUrl } from "@/lib/current-exercises-url";
import { prisma } from "@/lib/prisma";
import { Edit } from "lucide-react";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

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
  });

  if (!project) {
    notFound();
  }

  const updateProject = async (formData: FormData) => {
    "use server";
    const name = formData.get("name");
    const description = formData.get("description");

    await prisma.project.update({
      where: {
        id: projectId,
        userId: user.id,
      },
      data: {
        name: name as string,
        description: description as string,
      },
    });

    revalidatePath(`${currentUrl}`);
    redirect(`${currentUrl}`);
  };

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
          <form action={updateProject} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter project name"
                defaultValue={project.name}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your project"
                className="min-h-[100px]"
                defaultValue={project.description || ""}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Update Project
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
