import { postHandler } from "@/lib/api/postHandler";
import { errorResponse } from "@/utils/response";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const role_name = formData.get("role_name") as string;

    return await postHandler({
      table: "job_role",
      data: { role_name }, // ✅ fixed
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
