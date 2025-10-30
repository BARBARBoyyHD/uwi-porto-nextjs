import { deleteHandler } from "@/lib/api/deleteHandler";
import type { Params } from "@/types/params";
import { errorResponse } from "@/utils/response";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest, { params }: Params) {
  const { id } = await params;

  if (!id) {
    return errorResponse({
      success: false,
      status: 400,
      message: "Missing required fields id",
    });
  }

  return await deleteHandler({
    id: id,
    table: "testimonials",
    bucket: "testimonial",
    imageColumn: "image_url",
  });
}
