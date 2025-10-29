import { getSingleHandler } from "@/lib/api/getHandler";
import { errorResponse } from "@/utils/response";
import type { Params } from "@/types/params";
import { NextRequest } from "next/server";
export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  if (!id) {
    return errorResponse({
      success: false,
      status: 400,
      message: "Missing required fields id",
    });
  }
  try {
    return await getSingleHandler({
      table: "educations",
      column:"id,school_name,degree,description,field_of_study,start_date,end_date,created_at",
      id: id,
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
