import { getHandler } from "@/lib/api/getHandler";
import { supabase } from "@/utils/server";

export async function GET() {
  return await getHandler({
    table: "certificates",
    column:
      "id, cert_name, issuer, issuer_date, expiration_date, image_url, cert_url, created_at",
      client:supabase
  });
}
