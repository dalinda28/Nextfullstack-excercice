import fs from "fs/promises";
import path from "path";

interface Data {
  id: number;
  name: string;
}

const dataPath = path.join(
  process.cwd(),
  "/app/exercises/m1-fundamentals/5.route-handler/data.json"
);

export const getData = async () => {
  const fileContent = await fs.readFile(dataPath, "utf-8");
  const json = JSON.parse(fileContent);
  return json as Data[];
};

export const writeData = async (data: Data[]) => {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2), "utf-8");
};
