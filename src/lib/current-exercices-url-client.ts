export const getCurrentExerciseUrlClient = () => {
  let url = "";
  if (typeof window !== "undefined") {
    url = window.location.href;
  }

  if (!url) return "";

  if (url?.includes("/final-")) {
    return (
      url?.split("/final-")[0] +
      "/final-" +
      url?.split("/final-")[1]?.split("/")[0]
    );
  } else if (url?.includes("/final/")) {
    return url?.split("/final/")[0] + "/final";
  } else if (url?.includes("/code/")) {
    return url?.split("/code/")[0] + "/code";
  }

  return url;
};
