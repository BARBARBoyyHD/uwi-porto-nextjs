import { getHandler } from "@/lib/api/getHandler";
import { supabase } from "@/utils/server";

export async function GET() {
  return await getHandler({
    table: "hero_section",
    column: "id,full_name,summary,image_url,cta,created_at",
    client: supabase,
  });
}
