import { deleteHandler } from "@/lib/api/deleteHandler";
import { deleteImage } from "@/services/deleteImageService";
import { errorResponse } from "@/utils/response";
import { NextRequest } from "next/server";
import type { Params } from "@/types/params";

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = params;
  if (!id) {
    return errorResponse({
      success: false,
      status: 400,
      message: "Missing required fields id",
    });
  }
  try {
    return await deleteHandler({ id:id, table: "projects",bucket:"project",imageColumn:"image_url" });
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse({
        success: false,
        status: 500,
        message: error.message,
      });
    }
  }
}
