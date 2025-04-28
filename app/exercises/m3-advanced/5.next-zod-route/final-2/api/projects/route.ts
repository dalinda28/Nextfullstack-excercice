import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { userRoute } from "../../route-client";

export const GET = userRoute
  .query(
    z.object({
      q: z.coerce.string(),
    })
  )
  .handler(async (request, { query, ctx }) => {
    const projects = await prisma.project.findMany({
      where: {
        userId: ctx.user.id,
        ...(query.q && {
          OR: [
            { name: { contains: query.q, mode: "insensitive" } },
            { description: { contains: query.q, mode: "insensitive" } },
          ],
        }),
      },
    });

    return { projects };
  });
