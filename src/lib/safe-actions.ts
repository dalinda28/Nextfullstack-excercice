import { getUser } from "@/lib/auth-session";
import { createSafeActionClient } from "next-safe-action";

export class SafeActionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SafeActionError";
  }
}

export const action = createSafeActionClient({
  handleServerError: (error) => {
    if (error instanceof SafeActionError) {
      return error.message;
    }

    console.error(error);

    return "An unexpected error occurred";
  },
});

export const userAction = action.use(async ({ next }) => {
  const user = await getUser();

  if (!user) {
    throw new SafeActionError("User not found");
  }

  return next({ ctx: { user } });
});
