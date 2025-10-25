import { getHandler } from "@/lib/api/getHandler";
import { errorResponse } from "@/utils/response";

export async function GET() {
  try {
    return await getHandler({
      table: "educations",
      column: "id,school_name,degree,description,created_at",
    });
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
