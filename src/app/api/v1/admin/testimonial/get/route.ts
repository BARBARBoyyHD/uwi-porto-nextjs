import { getHandler } from "@/lib/api/getHandler";
import { AdminRole } from "@/utils/roles";

export async function GET() {
  const client = await AdminRole()
  return await getHandler({
    table: "testimonials",
    column: "id,client_name,message,client_position,image_url,created_at",
    client: client
  });
}
