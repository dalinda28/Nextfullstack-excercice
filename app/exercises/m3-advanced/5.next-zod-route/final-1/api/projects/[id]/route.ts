import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { userRoute } from "../../../route-client";

// Get a single project
export const GET = userRoute
  .query(z.object({}))
  .handler(async (request, { ctx, params }) => {
    const project = await prisma.project.findUnique({
      where: {
        id: params.id,
        userId: ctx.user.id,
      },
    });

    if (!project) {
      return Response.json({ error: "Project not found" }, { status: 404 });
    }

    return { project };
  });

// Delete a project
export const DELETE = userRoute
  .query(z.object({}))
  .handler(async (request, { ctx, params }) => {
    const project = await prisma.project.delete({
      where: {
        id: params.id,
        userId: ctx.user.id,
      },
    });

    return { project };
  });

// Update a project
export const PATCH = userRoute
  .body(
    z.object({
      name: z.string().optional(),
      description: z.string().optional(),
    })
  )
  .handler(async (request, { ctx, params, body }) => {
    const project = await prisma.project.update({
      where: {
        id: params.id,
        userId: ctx.user.id,
      },
      data: body,
    });

    return { project };
  });
