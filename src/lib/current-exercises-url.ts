import { headers } from "next/headers";

export const getCurrentExerciseUrl = async () => {
  let url = "";
  if (typeof window !== "undefined") {
    url = window.location.href;
  } else {
    const headerList = await headers();
    const xUrl = headerList.get("x-url");
    url = xUrl ?? "";
  }

  if (!url) return "";

  if (url?.includes("/final/")) {
    return url?.split("/final/")[0] + "/final";
  } else if (url?.includes("/code/")) {
    return url?.split("/code/")[0] + "/code";
  }

  return url;
};
