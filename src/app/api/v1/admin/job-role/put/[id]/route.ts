import { putHandler } from "@/lib/api/putHandler";
import { errorResponse } from "@/utils/response";
import { NextRequest } from "next/server";
import type { Params } from "@/types/params";

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    console.log(id)
    const {role_name} = await request.json();
    return await putHandler({
      id:id,
      table: "job_role",
      data: { role_name },
      message: "Job role updated successfully",
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
