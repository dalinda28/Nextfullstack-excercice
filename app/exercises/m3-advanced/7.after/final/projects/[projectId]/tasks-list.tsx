"use client";

import { LoadingButton } from "@/components/form/loading-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { TaskStatus } from "@prisma/client";
import { Trash } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useOptimistic } from "react";
import { toast } from "sonner";
import { createTaskAction, deleteTaskAction } from "./update-project.action";

interface Task {
  title: string;
  id: string;
  isPending?: boolean;
  status: TaskStatus;
}

export interface TasksListProps {
  tasks: Task[];
  projectId: string;
}

export const TasksList = (props: TasksListProps) => {
  const [optimisticTasks, addOptimisticTask] = useOptimistic(
    props.tasks,
    (_currentTasks, newTasks: Task[]) => newTasks
  );
  const router = useRouter();
  const { execute: executeCreateTask, isPending } = useAction(
    createTaskAction,
    {
      onSuccess: () => {
        router.refresh();
      },
      onError: (error) => {
        toast.error(error.error.serverError);
      },
    }
  );
  const { execute: executeDeleteTask } = useAction(deleteTaskAction, {
    onSuccess: () => {
      router.refresh();
    },
  });

  const handleAddTask = async (formData: FormData) => {
    const title = formData.get("title");

    addOptimisticTask([
      ...props.tasks,
      {
        id: crypto.randomUUID(),
        title: title as string,
        isPending: true,
        status: "PENDING",
      },
    ]);

    executeCreateTask({
      projectId: props.projectId,
      title: title as string,
    });
  };

  const handleDeleteTask = async (taskId: string) => {
    addOptimisticTask(optimisticTasks.filter((task) => task.id !== taskId));

    executeDeleteTask(taskId);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        {optimisticTasks.map((task) => (
          <Card
            key={task.id}
            className={cn(
              "flex items-center p-4",
              task.isPending && "bg-accent animate-pulse"
            )}
          >
            <span
              className={cn("flex-1", {
                "text-muted-foreground ": task.isPending,
              })}
            >
              {task.title}
            </span>
            <Badge
              variant="outline"
              className={cn({
                "border-orange-400 text-orange-400": task.status === "PENDING",
                "border-green-400 text-green-400": task.status === "COMPLETED",
                "border-blue-400 text-blue-400": task.status === "IN_PROGRESS",
              })}
            >
              {task.status}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteTask(task.id)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </Card>
        ))}
      </div>
      <form action={handleAddTask} className="flex items-center gap-2">
        <Input type="text" name="title" placeholder="Add a task" />
        <LoadingButton forceLoading={isPending} type="submit">
          Add
        </LoadingButton>
      </form>
    </div>
  );
};
