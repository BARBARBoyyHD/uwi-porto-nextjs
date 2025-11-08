import { getSingleHandler } from "@/lib/api/getHandler";
import { NextRequest } from "next/server";
import { errorResponse } from "@/utils/response";
import { AdminRole } from "@/utils/roles";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const client = await AdminRole();
  const { id } = await params;
  if (!id) {
    return errorResponse({
      success: false,
      status: 400,
      message: "Missing required fields id",
    });
  }

  return await getSingleHandler({
    table: "testimonials",
    column: "id, client_name, message, client_position, image_url, created_at",
    id: id,
    client: client,
  });
}
