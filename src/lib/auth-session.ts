import { headers } from "next/headers";
import { unauthorized } from "next/navigation";
import { auth } from "./auth";

export const getUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return undefined;
  }
  return session.user;
};

export const getRequiredUser = async () => {
  const user = await getUser();
  if (!user) {
    unauthorized();
  }
  return user;
};
