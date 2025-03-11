import { LoadingButton } from "@/components/form/loading-button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { getRequiredAuth } from "@/lib/auth-helper";
import { getCurrentExerciseUrl } from "@/lib/current-exercises-url";
import { prisma } from "@/lib/prisma";
import { AlertCircle, ClipboardList, PlusCircle } from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export default async function ProjectsPage() {
  const user = await getRequiredAuth();

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
                <div key={project.id} className="flex items-center gap-2">
                  <Link
                    href={`${currentUrl}/projects/${project.id}`}
                    className="flex-1"
                  >
                    <Card className="border-l-4 border-l-primary hover:bg-muted/50 transition-colors">
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg">
                          {project.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {project.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                  <form>
                    <LoadingButton
                      formAction={async () => {
                        "use server";

                        await prisma.project.delete({
                          where: { id: project.id, userId: user.id },
                        });

                        revalidatePath(`${currentUrl}`);
                      }}
                      type="submit"
                      variant="destructive"
                    >
                      X
                    </LoadingButton>
                  </form>
                </div>
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
            <LoadingButton type="submit" className="w-full">
              Create Project
            </LoadingButton>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
