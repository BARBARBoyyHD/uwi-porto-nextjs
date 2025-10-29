import { putHandler } from "@/lib/api/putHandler";
import { deleteImage } from "@/services/deleteImageService";
import { uploadImage } from "@/services/uploadImageServices";
import { NextRequest } from "next/server";
import type { Params } from "@/types/params";
import { errorResponse } from "@/utils/response";
import { supabase } from "@/utils/server";
import { normalizeDate } from "@/utils/normalizeDate";

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params;
  if (!id) {
    return errorResponse({
      success: false,
      status: 400,
      message: "Missing required fields id",
    });
  }

  try {
    const formData = await request.formData();
    const cert_name = formData.get("cert_name") as string;
    const issuer = formData.get("issuer") as string;
    const issuer_date = formData.get("issuer_date") as string;
    const expiration_date = formData.get("expiration_date") as string;
    const image = formData.get("image") as File | null;
    const cert_url = formData.get("cert_url") as string;
    const { data: existingCertificate, error: findError } = await supabase
      .from("certificates")
      .select("image_url")
      .eq("id", id)
      .single();
    if (!existingCertificate) {
      return errorResponse({
        success: false,
        status: 404,
        message: "Project not found",
      });
    }
    let image_url: string | null = existingCertificate.image_url;

    // 2️⃣ If user uploaded a new image, upload new & delete old
    if (image) {
      const newImageUrl = await uploadImage({ file: image, bucket: "certificate" });

      // Delete old image if it exists
      if (image_url) {
        try {
          await deleteImage({
            bucket: "certificate",
            filePath: image_url,
          });
        } catch (delErr) {
          console.warn("⚠️ Failed to delete old image:", delErr);
        }
      }

      image_url = newImageUrl;
    }

    const updatedData = {
      cert_name,
      issuer,
      issuer_date: normalizeDate(issuer_date),
      expiration_date: normalizeDate(expiration_date),
      image_url,
      cert_url,
    };

    return await putHandler({
      table: "certificates",
      id: id,
      data: updatedData,
      message: "Certificate updated successfully",
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
