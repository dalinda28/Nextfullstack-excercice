import { NextRequest, NextResponse } from "next/server";
import { getData, writeData } from "./utils";

export const GET = async () => {
  return NextResponse.json(await getData());
};

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const name = body.name;

  if (!name) {
    return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  }

  const data = await getData();
  data.push({
    id: Date.now(),
    name,
  });
  await writeData(data);

  return NextResponse.json(await getData());
};
