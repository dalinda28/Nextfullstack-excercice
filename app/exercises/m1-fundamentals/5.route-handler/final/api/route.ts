import fs from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

const dataFilePath = path.join(
  process.cwd(),
  "app/exercises/m1-fundamentals/5.route-handler/data.json"
);

export async function GET() {
  const data = JSON.parse(await fs.readFile(dataFilePath, "utf8"));
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newItem = {
    id: Date.now(),
    ...body,
  };

  const data = JSON.parse(await fs.readFile(dataFilePath, "utf8"));
  data.push(newItem);
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));

  return NextResponse.json(newItem, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const json = await req.json();
  const id = json.id;

  let data = JSON.parse(await fs.readFile(dataFilePath, "utf8"));
  data = data.filter(
    (item: { id: number }) => item.id !== parseInt(id as string, 10)
  );
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));

  return NextResponse.json({ message: `Item with id ${id} deleted` });
}
