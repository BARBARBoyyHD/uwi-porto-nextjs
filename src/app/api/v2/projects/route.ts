import { getHandler } from "@/lib/api/getHandler";

export async function GET() {
  return await getHandler({
    table: "my_services",
    column: "id,title,description,price,category,created_at",
  });
}
