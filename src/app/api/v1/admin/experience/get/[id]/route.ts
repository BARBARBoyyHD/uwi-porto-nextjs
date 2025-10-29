import { getSingleHandler } from "@/lib/api/getHandler";
import { errorResponse } from "@/utils/response";
import { NextRequest } from "next/server";
import type { Params } from "@/types/params";

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
      table: "experiences",
      column: "id,company_name,position,description,start_date,end_date,currently_working,created_at",
      id,
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
