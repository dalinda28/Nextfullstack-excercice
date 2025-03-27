"use server";

import { prisma } from "@/lib/prisma";
import { ProjectFormSchema } from "./project.schema";
import { userAction } from "./safe-action";

export const createProjectAction = userAction
  .schema(ProjectFormSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { name, description } = parsedInput;
    const user = ctx.user;

    const project = await prisma.project.create({
      data: { name, description, userId: user.id },
    });

    return project;
  });
