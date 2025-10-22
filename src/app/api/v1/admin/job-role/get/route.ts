import { getHandler } from "@/lib/api/getHandler";

export async function GET() {
  return await getHandler({
    table: "job_role",
    column: "id,role_name,created_at",
  });
}
