import { getSingleHandler } from "@/lib/api/getHandler";
import { NextRequest } from "next/server";
import type { Params } from "@/types/params";

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  return await getSingleHandler({
    table: "hero_section",
    column: "id,full_name,summary,image_url,cta,created_at",
    id,
  });
}
