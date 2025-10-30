import { getHandler } from "@/lib/api/getHandler";

export async function GET() {
  return await getHandler({
    table: "educations",
    column: "id,school_name,degree,description,start_date,end_date,created_at",
  });
}
