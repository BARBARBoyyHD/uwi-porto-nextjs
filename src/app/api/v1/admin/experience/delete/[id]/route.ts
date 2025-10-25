import { deleteHandler } from "@/lib/api/deleteHandler";
import { errorResponse } from "@/utils/response";
import { NextRequest } from "next/server";
interface Params {
  params: {
    id: string;
  };
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = params;
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
