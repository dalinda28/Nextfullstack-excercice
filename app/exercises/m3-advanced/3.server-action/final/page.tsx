import { ProjectCard } from "@/components/features/projects/project-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { AlertCircle, ClipboardList, PlusCircle } from "lucide-react";
import { revalidatePath } from "next/cache";

export default async function ProjectsPage() {
  const user = await getRequiredUser();

  const currentUrl = await getCurrentExerciseUrl();

  const projects = await prisma.project.findMany({
    where: {
      userId: user.id,
    },
  });

  const createProject = async (formData: FormData) => {
    "use server";
    const name = formData.get("name");
    const description = formData.get("description");
    await prisma.project.create({
      data: {
        name: name as string,
        userId: user.id,
        description: description as string,
      },
    });
    revalidatePath(`${currentUrl}`);
  };

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            <CardTitle>My Projects </CardTitle>
          </div>
          <CardDescription>Manage your projects and tasks</CardDescription>
        </CardHeader>
        <CardContent>
          {projects.length > 0 ? (
            <div className="grid gap-4">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  {...project}
                  currentUrl={currentUrl}
                />
              ))}
            </div>
          ) : (
            <Alert className="bg-muted/50">
              <AlertCircle className="size-4" />
              <AlertTitle>No projects found</AlertTitle>
              <AlertDescription>
                You don't have any projects yet. Create your first project
                below.
              </AlertDescription>
            </Alert>
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
          <form action={createProject} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter project name"
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
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Create Project
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
