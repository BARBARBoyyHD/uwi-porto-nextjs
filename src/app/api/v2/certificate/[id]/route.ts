import { getSingleHandler } from "@/lib/api/getHandler";
import { supabase } from "@/utils/server";
import { NextRequest } from "next/server";

export async function GET(_request:NextRequest,{ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return getSingleHandler({
    table: "certificates",
    column:
      "id, cert_name, issuer, issuer_date, expiration_date, image_url, cert_url, created_at",
    id: id,
    client: supabase,
  });
}
