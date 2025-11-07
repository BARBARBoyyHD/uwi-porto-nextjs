import { getHandler } from "@/lib/api/getHandler";
import { AdminRole } from "@/utils/roles";

export async function GET() {
  const client = await AdminRole();
  return await getHandler({
    table: "hero_section",
    column: "id,full_name,summary,image_url,cta,created_at",
    client: client,
  });
}
