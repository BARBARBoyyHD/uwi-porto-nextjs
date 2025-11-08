import { getSingleHandler } from "@/lib/api/getHandler";
import { supabase } from "@/utils/server";
import { NextRequest } from "next/server";

export async function GET( __request: NextRequest,{ params }: { params: Promise<{ id: string }> }) {
  const { id } =  await params;
  return getSingleHandler({
    table: "projects",
    column:
      "id,project_name,description,tech,live_demo_url,image_url,created_at",
    id: id,
    client: supabase,
  });
}
