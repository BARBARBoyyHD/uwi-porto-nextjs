import { getHandler } from "@/lib/api/getHandler";
import { supabase } from "@/utils/server";

export async function GET() {
  return await getHandler({
    table: "experiences",
    column:
      "id,company_name,position,description,start_date,end_date,currently_working,created_at",
    client: supabase,
  });
}
