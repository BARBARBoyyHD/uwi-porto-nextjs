import { deleteHandler } from "@/lib/api/deleteHandler";
import { NextRequest } from "next/server";
import type { Params } from "@/types/params";

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  return await deleteHandler({ id, table: "job_role" });
}
