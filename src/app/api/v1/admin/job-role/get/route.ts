import { getHandler } from "@/lib/api/getHandler";
import { AdminRole } from "@/utils/roles";

export async function GET() {
  const client = await AdminRole()
  return await getHandler({
    table: "job_role",
    column: "id,role_name,created_at",
    client: client
  });
}
