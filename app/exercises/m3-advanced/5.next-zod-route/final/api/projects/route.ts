import { getRequiredUser } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { routeClient } from "../../route-client";

export const GET = routeClient
  .query(
    z.object({
      q: z.coerce.string(),
    })
  )
  .handler(async (request, { query }) => {
    const user = await getRequiredUser();
    const projects = await prisma.project.findMany({
      where: {
        userId: user.id,
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
