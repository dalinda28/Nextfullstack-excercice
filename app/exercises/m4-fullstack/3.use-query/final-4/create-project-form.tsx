"use client";

import { createProjectAction } from "@/components/features/projects/project.action";
import { LoadingButton } from "@/components/form/loading-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { validationErrorToString } from "@/lib/actions-utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const CreateProjectForm = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const result = await createProjectAction({
        name: formData.get("name") as string,
        description: formData.get("description") as string,
      });

      if (!result) {
        throw new Error("Something went wrong");
      }

      if (result?.serverError) {
        throw new Error(result.serverError);
      }

      if (result?.validationErrors) {
        return validationErrorToString(result.validationErrors);
      }

      return result.data;
    },
    onSuccess: () => {
      toast.success("Project created");
      void queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <form
      action={async (formData) => {
        await mutation.mutateAsync(formData);
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

      <LoadingButton type="submit" className="w-full">
        Create Project
      </LoadingButton>
    </form>
  );
};
