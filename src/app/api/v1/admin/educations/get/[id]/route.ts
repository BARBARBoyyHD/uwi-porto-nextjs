import { getSingleHandler } from "@/lib/api/getHandler";
import { errorResponse } from "@/utils/response";
import { NextRequest } from "next/server";
import { AdminRole } from "@/utils/roles";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const client = await AdminRole();
  const { id } = params;
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
      column:
        "id,school_name,degree,description,field_of_study,start_date,end_date,score,created_at",
      id: id,
      client: client,
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
