import { getHandler } from "@/lib/api/getHandler";
import { supabase } from "@/utils/server";

export async function GET() {
  return await getHandler({
    table: "educations",
    column: "id,school_name,degree,description,start_date,end_date,score,created_at",
    client: supabase,
  });
}
