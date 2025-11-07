import { getHandler } from "@/lib/api/getHandler";
import { AdminRole } from "@/utils/roles";

export async function GET() {
  const client = await AdminRole();
  return await getHandler({
    table: "my_services",
    column: "id,title,description,price,category,created_at",
    client: client,
  });
}
