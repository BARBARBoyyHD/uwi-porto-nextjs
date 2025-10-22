// app/api/hero/[id]/route.ts
import { deleteHandler } from "@/lib/api/deleteHandler";
import { errorResponse } from "@/utils/response";

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;


  if (!id) {
    return errorResponse({
      success: false,
      status: 400,
      message: "Missing required field: id",
    });
  }

  return await deleteHandler({table: "hero_section",id:id,bucket:"hero",imageColumn:"image_url"});
}
