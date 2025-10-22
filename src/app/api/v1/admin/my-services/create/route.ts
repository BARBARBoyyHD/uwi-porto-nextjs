import { postHandler } from "@/lib/api/postHandler";
import { errorResponse } from "@/utils/response";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { title, description, price, category } = await request.json();
    return await postHandler({
      table: "my_services",
      data: { title, description, price, category },
    });
  } catch (error:unknown) {
    if (error instanceof Error) {
      errorResponse({
        success: false,
        status: 500,
        message: error.message,
      });
    }
  }
}
