import { getHandler } from "@/lib/api/getHandler";
import { supabase } from "@/utils/server";

export async function GET() {
  return await getHandler({
    table: "projects",
    column: "id,project_name,description,tech,live_demo_url,image_url,created_at",
    client: supabase,
  });
}
