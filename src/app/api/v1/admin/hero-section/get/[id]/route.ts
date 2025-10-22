import { getSingleHandler } from "@/lib/api/getHandler";
import { errorResponse, successResponse } from "@/utils/response";
import supabase from "@/utils/supabaseClient";
import { NextRequest } from "next/server";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = params;
  return await getSingleHandler({
    table: "hero_section",
    column: "id,full_name,summary,image_url,cta,created_at",
    id,
  });
}
