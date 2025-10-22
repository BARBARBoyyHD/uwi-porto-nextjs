import { getSingleHandler } from "@/lib/api/getHandler";
import { errorResponse } from "@/utils/response";
import { NextRequest } from "next/server";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { id } = params;
    return await getSingleHandler({
      table: "my_services",
      column: "id,title,description,price,category,created_at",
      id: id,
    });
  } catch (error:unknown) {
    if (error instanceof Error) {
      return errorResponse({
        success: false,
        status: 500,
        message: error.message,
      });
    }
  }
}
