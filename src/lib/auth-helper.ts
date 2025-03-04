import { User } from "@prisma/client";
import { unauthorized } from "next/navigation";
import { baseAuth } from "./auth";

export const auth = async () => {
  const session = await baseAuth();

  if (!session) {
    return undefined;
  }
  return session.user as User;
};

export const requiredAuth = async () => {
  const user = await auth();
  if (!user) {
    unauthorized();
  }
  return user;
};
