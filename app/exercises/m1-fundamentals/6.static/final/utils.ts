import fs from "fs/promises";
import path from "path";

const dataFilePath = path.join(
  process.cwd(),
  "app/exercises/m1-fundamentals/6.static/data.json"
);

interface Item {
  slug: string;
  title: string;
  content: string;
}

export const getItems = async () => {
  const data = JSON.parse(await fs.readFile(dataFilePath, "utf8"));
  return data as Item[];
};

export const getItemBySlug = async (slug: string) => {
  const data = await getItems();
  return data.find((item) => item.slug === slug);
};
