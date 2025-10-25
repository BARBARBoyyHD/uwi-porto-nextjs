import { putHandler } from "@/lib/api/putHandler";
import { deleteImage } from "@/services/deleteImageService";
import { uploadImage } from "@/services/uploadImageServices";
import { errorResponse } from "@/utils/response";
import { supabase } from "@/utils/server";
import { NextRequest } from "next/server";

interface PutProps {
  params: {
    id: string;
  };
}

export async function PUT(request: NextRequest, { params }: PutProps) {
  const { id } = params;
  if (!id) {
    return errorResponse({
      success: false,
      status: 400,
      message: "Missing required field: id",
    });
  }

  try {
    // --- 1️⃣ Parse Form Data ---
    const formData = await request.formData();
    const full_name = formData.get("full_name") as string;
    const summary = formData.get("summary") as string;
    const cta = formData.get("cta") as string;
    const image = formData.get("image") as File | null;

    if (!full_name || !summary || !cta) {
      return errorResponse({
        success: false,
        status: 400,
        message: "Missing required fields",
      });
    }

    // --- 2️⃣ Fetch existing hero entry ---
    const { data: existingHero, error: findError } = await supabase
      .from("hero_section")
      .select("image_url")
      .eq("id", id)
      .single();

    if (findError || !existingHero) {
      return errorResponse({
        success: false,
        status: 404,
        message: "Hero section not found",
      });
    }

    let image_url = existingHero.image_url;

    // --- 3️⃣ If a new image was uploaded ---
    if (image) {
      const newImageUrl = await uploadImage({ file: image, bucket: "hero" });

      // Delete old image if exists
      if (image_url) {
        try {
          await deleteImage({
            bucket: "hero",
            filePath: image_url,
          });
          console.log("🗑️ Deleted old image:", image_url);
        } catch (delErr) {
          console.warn("⚠️ Failed to delete old image:", delErr);
        }
      }

      image_url = newImageUrl;
    }

    // --- 4️⃣ Prepare updated data ---
    const dataToUpdate = {
      full_name,
      summary,
      cta,
      ...(image_url && { image_url }),
    };

    // --- 5️⃣ Update record ---
    return await putHandler({
      table: "hero_section",
      id,
      data: dataToUpdate,
      message: "✅ Hero section updated successfully",
    });
  } catch (error: unknown) {
    console.error("❌ PUT /hero_section error:", error);
    return errorResponse({
      success: false,
      status: 500,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    });
  }
}
