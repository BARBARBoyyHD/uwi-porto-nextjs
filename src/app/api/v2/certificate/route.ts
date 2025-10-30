import { getHandler } from "@/lib/api/getHandler";

export async function GET() {
  return await getHandler({
    table: "certificates",
    column:
      "id, cert_name, issuer, issuer_date, expiration_date, image_url, cert_url, created_at",
  });
}
