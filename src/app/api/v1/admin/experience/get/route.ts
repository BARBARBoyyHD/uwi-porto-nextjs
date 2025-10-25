import { getHandler } from "@/lib/api/getHandler";
import { errorResponse } from "@/utils/response";
import { tree } from "next/dist/build/templates/app-page";

export async function GET() {
  try {
    return await getHandler({
      table: "experiences",
      column: "id,company_name,position,description,created_at",
    });
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
