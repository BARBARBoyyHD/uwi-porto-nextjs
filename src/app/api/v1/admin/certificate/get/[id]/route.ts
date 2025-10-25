import { getSingleHandler } from "@/lib/api/getHandler";
import { NextRequest } from "next/server";
import type { Params } from "@/types/params";
import { errorResponse } from "@/utils/response";
export async function GET(_request: NextRequest, { params }: Params) {
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
      table: "certificates",
      column:
        "id, cert_name, issuer, issuer_date, expiration_date, image_url, cert_url, created_at",
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
