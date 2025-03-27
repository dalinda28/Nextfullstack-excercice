"use server";

import { getRequiredUser } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";

export const updateProjectAction = async (
  state: { projectId: string; success: boolean; error: string },
  formData: FormData
) => {
  const user = await getRequiredUser();
  const name = formData.get("name");
  const description = formData.get("description");

  await prisma.project.update({
    where: {
      id: state.projectId,
      userId: user.id,
    },
    data: {
      name: name as string,
      description: description as string,
    },
  });

  return {
    success: true,
    error: "",
    projectId: state.projectId,
  };
};
