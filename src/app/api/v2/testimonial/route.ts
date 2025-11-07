import { getHandler } from "@/lib/api/getHandler";
import { supabase } from "@/utils/server";

export async function GET() {
  return await getHandler({
    table: "testimonials",
    column: "id,client_name,message,client_position,image_url,created_at",
    client: supabase,
  });
}
