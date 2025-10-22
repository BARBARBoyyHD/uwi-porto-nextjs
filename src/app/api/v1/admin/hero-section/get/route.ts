import { getHandler } from "@/lib/api/getHandler";
import { updateSession } from "@/utils/supabase/middleware";

export async function GET() {
  
  return await getHandler({
    table: "hero_section",
    column: "id,full_name,summary,image_url,cta,created_at",
  });
}
