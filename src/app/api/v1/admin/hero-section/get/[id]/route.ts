import { getSingleHandler } from "@/lib/api/getHandler";
import { NextRequest } from "next/server";
import type { Params } from "@/types/params";
import { AdminRole } from "@/utils/roles";
export async function GET(_request: NextRequest, { params }: Params) {
  const client = await AdminRole()
  const { id } = await params;
  return await getSingleHandler({
    table: "hero_section",
    column: "id,full_name,summary,image_url,cta,created_at",
    id,
    client:client
  });
}
