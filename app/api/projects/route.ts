import { prisma } from "@/lib/prisma";
import { userRoute } from "@app/exercises/m3-advanced/5.next-zod-route/final-2/route-client";
import { z } from "zod";

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
      orderBy: {
        createdAt: "desc",
      },
    });

    return { projects };
  });
