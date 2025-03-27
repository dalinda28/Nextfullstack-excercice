"use client";

import { LoadingButton } from "@/components/form/loading-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  useZodForm,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createProjectAction } from "./project.action";
import { ProjectFormSchema } from "./project.schema";

export const CreateProjectForm = () => {
  const router = useRouter();
  const form = useZodForm({
    schema: ProjectFormSchema,
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { execute, isPending } = useAction(createProjectAction, {
    onSuccess: () => {
      toast.success("Project created");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.error.serverError);
    },
  });

  return (
    <Form
      form={form}
      onSubmit={(values) => execute(values)}
      className="space-y-4"
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Project Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter project name" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe your project"
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <LoadingButton forceLoading={isPending} type="submit" className="w-full">
        Create Project
      </LoadingButton>
    </Form>
  );
};
