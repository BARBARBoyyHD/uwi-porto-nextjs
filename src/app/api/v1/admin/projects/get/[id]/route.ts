import { getSingleHandler } from "@/lib/api/getHandler";
import { errorResponse } from "@/utils/response";
import { NextRequest } from "next/server";
import { AdminRole } from "@/utils/roles";

interface Params{
  params: {
    id: string;
  }
}

export async function GET(_request: NextRequest, { params }: Params) {
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
      table: "projects",
      column:
        "id,project_name,description,tech,live_demo_url,image_url,created_at",
      id,
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
