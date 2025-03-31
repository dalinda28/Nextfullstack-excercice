"use server";

import { prisma } from "@/lib/prisma";
import { SafeActionError, userAction } from "@/lib/safe-actions";
import { EventType } from "@prisma/client";
import { after } from "next/server";
import { z } from "zod";

export const updateProjectAction = userAction
  .schema(
    z.object({
      projectId: z.string(),
      name: z.string().min(1),
      description: z.string().min(1),
    })
  )
  .action(async ({ parsedInput, ctx }) => {
    const { projectId, name, description } = parsedInput;
    const user = ctx.user;

    const prevProject = await prisma.project.findUnique({
      where: {
        id: projectId,
        userId: user.id,
      },
      select: {
        name: true,
        description: true,
      },
    });

    if (!prevProject) {
      throw new SafeActionError("Project not found");
    }

    const updatedProject = await prisma.project.update({
      where: {
        id: projectId,
        userId: user.id,
      },
      data: {
        name,
        description,
      },
    });

    after(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (!prevProject) {
        throw new SafeActionError("Project not found");
      }
      await prisma.event.create({
        data: {
          type: EventType.PROJECT_UPDATED,
          userId: user.id,
          relationId: projectId,
          data: {
            prev: {
              name: prevProject?.name,
              description: prevProject?.description,
            },
            new: {
              name: updatedProject.name,
              description: updatedProject.description,
            },
          },
        },
      });
    });

    return {
      success: true,
      projectId,
    };
  });

export const createTaskAction = userAction
  .schema(
    z.object({
      projectId: z.string(),
      title: z.string().min(1),
    })
  )
  .action(async ({ parsedInput, ctx }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const { projectId, title } = parsedInput;
    const user = ctx.user;

    const task = await prisma.task.create({
      data: {
        title,
        description: "",
        project: {
          connect: {
            id: projectId,
            userId: user.id,
          },
        },
      },
    });

    after(async () => {
      await prisma.event.create({
        data: {
          type: EventType.TASK_CREATED,
          userId: user.id,
          relationId: task.id,
          data: {
            prev: {},
            new: task,
          },
        },
      });
    });

    return {
      success: true,
    };
  });

export const deleteTaskAction = userAction
  .schema(z.string())
  .action(async ({ parsedInput, ctx }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const taskId = parsedInput;
    const user = ctx.user;

    try {
      const task = await prisma.task.findUnique({
        where: { id: taskId },
      });

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

      after(async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await prisma.event.create({
          data: {
            type: EventType.TASK_DELETED,
            userId: user.id,
            relationId: taskId,
            data: {
              prev: task,
              new: {},
            },
          },
        });
      });

      return {
        success: true,
      };
    } catch {
      return {
        success: false,
        error: "Task contains bad words",
      };
    }
  });
