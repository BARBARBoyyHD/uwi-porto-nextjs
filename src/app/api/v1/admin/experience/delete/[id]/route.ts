import { deleteHandler } from "@/lib/api/deleteHandler";
import { errorResponse } from "@/utils/response";
import { NextRequest } from "next/server";
import type { Params } from "@/types/params";

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  try {
    return await deleteHandler({ id, table: "experiences" });
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
