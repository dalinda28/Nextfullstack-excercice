import fs from "fs/promises";
import path from "path";

interface Data {
  slug: string;
  title: string;
  content: string;
}

const dataPath = path.join(
  process.cwd(),
  "/app/exercises/m1-fundamentals/6.static/data.json"
);

export const getPosts = async () => {
  const fileContent = await fs.readFile(dataPath, "utf-8");
  const json = JSON.parse(fileContent);
  return json as Data[];
};
