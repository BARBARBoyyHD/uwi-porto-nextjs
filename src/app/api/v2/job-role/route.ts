import { getHandler } from "@/lib/api/getHandler";
import { supabase } from "@/utils/server";

export async function GET() {
  return await getHandler({
    table: "job_role",
    column: "id,role_name,created_at",
    client: supabase,
  });
}
