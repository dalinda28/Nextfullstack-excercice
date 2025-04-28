import { getUser } from "@/lib/auth-session";
import { createZodRoute } from "next-zod-route";
import { NextResponse } from "next/server";

export const routeClient = createZodRoute({});

export const userRoute = routeClient.use(async ({ next }) => {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  return next({ ctx: { user } });
});
