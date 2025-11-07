import { getHandler } from "@/lib/api/getHandler";
import { errorResponse } from "@/utils/response";
import { AdminRole } from "@/utils/roles";

export async function GET() {
  const client = await AdminRole();
  try {
    return await getHandler({
      table: "certificates",
      column:
        "id, cert_name, issuer, issuer_date, expiration_date, image_url, cert_url, created_at",
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
