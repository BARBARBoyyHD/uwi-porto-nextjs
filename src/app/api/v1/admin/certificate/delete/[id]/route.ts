import { deleteHandler } from "@/lib/api/deleteHandler";
import { deleteImage } from "@/services/deleteImageService";
import { errorResponse } from "@/utils/response";
import { NextRequest } from "next/server";
import type { Params } from "@/types/params";
export async function DELETE(request: NextRequest, { params }: Params) {
  const { id } = await params;
  try {
    return deleteHandler({
      id: id,
      table: "certificates",
      bucket: "certificate",
      imageColumn: "image_url",
    });
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse(error);
    }
  }
}
