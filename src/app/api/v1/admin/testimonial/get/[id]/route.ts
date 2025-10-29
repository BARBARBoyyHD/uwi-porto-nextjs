import { getSingleHandler } from "@/lib/api/getHandler";
import { NextRequest } from "next/server";
import type { Params } from "@/types/params";
import { errorResponse } from "@/utils/response";
export async function GET(_request: NextRequest, { params }: Params) {
  const { id } =await params;
  if (!id) {
    return errorResponse({
      success: false,
      status: 400,
      message: "Missing required fields id",
    });
  }

  return await getSingleHandler({
    table: "testimonials",
    column:
      "id, client_name, message, client_position, image_url, created_at",
    id: id,
  });
}
