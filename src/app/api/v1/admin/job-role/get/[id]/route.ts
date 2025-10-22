import { NextRequest } from "next/server";
import { getSingleHandler } from "@/lib/api/getHandler";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = params;
  return await getSingleHandler({
    table: "job_role",
    column: "id,role_name,created_at",
    id:id,
  });
}
