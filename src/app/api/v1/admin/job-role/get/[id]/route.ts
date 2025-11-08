import { NextRequest } from "next/server";
import { getSingleHandler } from "@/lib/api/getHandler";
import { AdminRole } from "@/utils/roles";

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  const client = await AdminRole();
  const { id } = params;
  return await getSingleHandler({
    table: "job_role",
    column: "id,role_name,created_at",
    id: id,
    client: client,
  });
}
