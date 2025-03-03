import { NextRequest, NextResponse } from "next/server";
import { getData, writeData } from "../utils";

export const DELETE = async (
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) => {
  const params = await context.params;
  const id = Number(params.id);

  const data = await getData();
  const newData = data.filter((d) => d.id !== id);
  await writeData(newData);

  return NextResponse.json(await getData());
};
