import { getHandler } from "@/lib/api/getHandler";
import { errorResponse } from "@/utils/response";

export async function GET() {
  try {
    return await getHandler({
      table: "my_services",
      column: "id,title,description,price,category,created_at",
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
