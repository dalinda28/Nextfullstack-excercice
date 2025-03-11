"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getCurrentExerciseUrlClient } from "@/lib/current-exercices-url-client";
import { Project } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { updateProjectAction } from "./update-project.action";

export const ProjectForm = ({ project }: { project: Project }) => {
  const router = useRouter();
  const currentUrl = getCurrentExerciseUrlClient();

  const [state, action, isPending] = useActionState(updateProjectAction, {
    projectId: project.id,
    success: false,
    error: "",
  });

  useEffect(() => {
    if (!state.success) return;
    router.push(`${currentUrl}`);
    router.refresh();
  }, [state.success, currentUrl, router]);

  return (
    <div className="space-y-4">
      <form action={action} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Project Name
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter project name"
            defaultValue={project.name}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium">
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Describe your project"
            className="min-h-[100px]"
            defaultValue={project.description || ""}
            required
          />
        </div>
        {state.error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Updating..." : "Update Project"}
        </Button>
      </form>
    </div>
  );
};
