import { putHandler } from "@/lib/api/putHandler";
import { errorResponse } from "@/utils/response";
import { NextRequest } from "next/server";

interface Params {
  params: {
    id: string;
  };
}
export async function PUT(_request: NextRequest, { params }: Params) {
  try {
    const { id } = params;
    const { title, description, price, category } = await _request.json();
    return await putHandler({
      id,
      table: "my_services",
      data: { title, description, price, category },
      message: "My service updated successfully",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return errorResponse({
        success: false,
        status: 500,
        message: error.message,
      });
    }
  }
}
