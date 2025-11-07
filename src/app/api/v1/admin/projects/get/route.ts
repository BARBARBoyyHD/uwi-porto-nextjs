import { getHandler } from "@/lib/api/getHandler";
import { errorResponse } from "@/utils/response";
import { AdminRole } from "@/utils/roles";

export async function GET() {
  const client = await AdminRole();
  return await getHandler({
    table: "projects",
    column:
      "id,project_name,description,tech,live_demo_url,image_url,created_at",
    client: client,
  });
}
