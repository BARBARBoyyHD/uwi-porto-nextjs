import { getHandler } from "@/lib/api/getHandler";
import { errorResponse } from "@/utils/response";

export async function GET() {
  try {
    return await getHandler({
      table: "certificates",
      column:
        "id, cert_name, issuer, issuer_date, expiration_date, image_url, cert_url, created_at",
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
