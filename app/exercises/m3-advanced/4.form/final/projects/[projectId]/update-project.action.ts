"use server";

import { getRequiredUser } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";

export const updateProjectAction = async (
  state: { projectId: string; success: boolean; error: string },
  formData: FormData
) => {
  const user = await getRequiredUser();
  const name = formData.get("name");
  const description = formData.get("description");

  await prisma.project.update({
    where: {
      id: state.projectId,
      userId: user.id,
    },
    data: {
      name: name as string,
      description: description as string,
    },
  });

  return {
    success: true,
    error: "",
    projectId: state.projectId,
  };
};

export const createTaskAction = async (params: {
  projectId: string;
  title: string;
}) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const user = await getRequiredUser();

  await prisma.task.create({
    data: {
      title: params.title,
      description: "",
      project: {
        connect: {
          id: params.projectId,
          userId: user.id,
        },
      },
    },
  });

  return {
    success: true,
    error: "",
  };
};

export const deleteTaskAction = async (taskId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const user = await getRequiredUser();

  try {
    await prisma.task.delete({
      where: {
        id: taskId,
        title: {
          not: {
            contains: "bad",
          },
        },
        project: {
          userId: user.id,
        },
      },
    });
  } catch {
    return {
      success: false,
      error: "Task contains bad words",
    };
  }

  return {
    success: true,
    error: "",
  };
};
