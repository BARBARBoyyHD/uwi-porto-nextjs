import { deleteHandler } from "@/lib/api/deleteHandler";
import { errorResponse } from "@/utils/response";
import { NextRequest } from "next/server";
import type { Params } from "@/types/params";

export async function DELETE(req: NextRequest, { params }: Params) {
  const { id } = params;
  if (!id) {
    return errorResponse({
      success: false,
      status: 400,
      message: "Missing required fields id",
    });
  }
  try {
    return await deleteHandler({
      id,
      table: "educations",

    })
  } catch (error) {
    if (error instanceof Error) {
      errorResponse({
        success: false,
        status: 500,
        message: error.message,
      });
    }
  }
}
