"use server";

import { getRequiredUser } from "@/lib/auth-session";
import { verifyBadWord } from "@/lib/bad-words";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export const updateProjectAction = async (
  state: { projectId: string; success: boolean; error: string },
  formData: FormData
) => {
  const user = await getRequiredUser();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  if (!name || !description) {
    return {
      ...state,
      success: false,
      error: "Name and description are required",
    };
  }

  if (verifyBadWord(name).hasBadWord) {
    return {
      ...state,
      success: false,
      error: "Name contains bad words",
    };
  }

  if (verifyBadWord(description).hasBadWord) {
    return {
      ...state,
      success: false,
      error: "Description contains bad words",
    };
  }

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

  redirect("/");

  return {
    ...state,
    success: true,
    error: "",
  };
};
