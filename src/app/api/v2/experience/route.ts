import { getHandler } from "@/lib/api/getHandler";

export async function GET() {
  return await getHandler({
    table: "experiences",
    column:
      "id,company_name,position,description,start_date,end_date,currently_working,created_at",
  });
}
