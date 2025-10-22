import { deleteHandler } from "@/lib/api/deleteHandler";
import { NextRequest } from "next/server";

interface Params {
  params: {
    id: string;
  };
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = params;
  return await deleteHandler({ id, table: "job_role" });
}
