"use client";

import { createProjectAction } from "@/components/features/projects/project.action";
import { LoadingButton } from "@/components/form/loading-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useQueryClient } from "@tanstack/react-query";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

export const CreateProjectForm = () => {
  const queryClient = useQueryClient();

  const { execute, isPending } = useAction(createProjectAction, {
    onSuccess: () => {
      toast.success("Project created");
      void queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error) => {
      toast.error(error.error.serverError);
    },
  });

  const createProject = (formData: FormData) => {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    execute({
      name,
      description,
    });
  };

  return (
    <form
      action={async (formData) => {
        createProject(formData);
      }}
      className="space-y-4"
    >
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

      <LoadingButton forceLoading={isPending} type="submit" className="w-full">
        Create Project
      </LoadingButton>
    </form>
  );
};
