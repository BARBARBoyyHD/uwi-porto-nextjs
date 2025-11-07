import { getSingleHandler } from "@/lib/api/getHandler";
import { supabase } from "@/utils/server";
import type { Params } from "@/types/params";
export async function GET({ params }: Params) {
  const { id } = await params;
  return getSingleHandler({
    table: "certificates",
    column:
      "id, cert_name, issuer, issuer_date, expiration_date, image_url, cert_url, created_at",
    id: id,
    client: supabase,
  });
}
