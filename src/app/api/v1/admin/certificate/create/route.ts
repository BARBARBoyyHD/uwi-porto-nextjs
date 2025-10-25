import { postHandler } from "@/lib/api/postHandler";
import { uploadImage } from "@/services/uploadImageServices";
import { normalizeDate } from "@/utils/normalizeDate";
import { errorResponse } from "@/utils/response";
import { NextRequest } from "next/server";

export async function POST(_request: NextRequest) {
  const formData = await _request.formData();
  const cert_name = formData.get("cert_name") as string;
  const issuer = formData.get("issuer") as string;
  const issuer_date = formData.get("issuer_date") as string;
  const expiration_date = formData.get("expiration_date") as string;
  const image = formData.get("image") as File | null;
  const cert_url = formData.get("cert_url") as string;

  let image_url: string | null = null;

  if (!cert_name || !issuer || !issuer_date || !expiration_date) {
    return errorResponse({
      success: false,
      status: 400,
      message: "Missing required fields",
    });
  }

  if (image) {
    image_url = await uploadImage({ file: image, bucket: "certificate" });
  }

  const postResult = await postHandler({
    table: "certificates",
    data: {
      cert_name,
      issuer,
      issuer_date: normalizeDate(issuer_date),
      expiration_date: normalizeDate(expiration_date),
      image_url,
      cert_url,
    },
  });

  return postResult;
}
