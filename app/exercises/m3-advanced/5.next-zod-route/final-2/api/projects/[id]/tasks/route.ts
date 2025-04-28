import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { userRoute } from "../../../../route-client";

export const GET = userRoute
  .query(z.object({}))
  .handler(async (request, { ctx, params }) => {
    const tasks = await prisma.task.findMany({
      where: {
        projectId: params.id,
        project: {
          userId: ctx.user.id,
        },
      },
    });

    return { tasks };
  });
