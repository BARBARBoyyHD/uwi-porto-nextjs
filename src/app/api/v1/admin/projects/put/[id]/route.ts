import { putHandler } from "@/lib/api/putHandler";
import { deleteImage } from "@/services/deleteImageService";
import { uploadImage } from "@/services/uploadImageServices";
import type { Params } from "@/types/params";
import { errorResponse } from "@/utils/response";
import { supabase } from "@/utils/server";
import { NextRequest } from "next/server";

export async function PUT(_request: NextRequest, { params }: Params) {
  const { id } = await params;

  if (!id) {
    return errorResponse({
      success: false,
      status: 400,
      message: "Missing required field: id",
    });
  }

  const formData = await _request.formData();

  const project_name = formData.get("project_name") as string;
  const description = formData.get("description") as string;
  const tech = formData.get("tech") as string;
  const live_demo_url = formData.get("live_demo_url") as string;
  const image = formData.get("image") as File | null;

  // 1️⃣ Get current record to know existing image URL
  const { data: existingProject, error: findError } = await supabase
    .from("projects")
    .select("image_url")
    .eq("id", id)
    .single();

  if (!existingProject) {
    return errorResponse({
      success: false,
      status: 404,
      message: "Project not found",
    });
  }

  let image_url: string | null = existingProject.image_url;

  // 2️⃣ If user uploaded a new image, upload new & delete old
  if (image) {
    const newImageUrl = await uploadImage({ file: image, bucket: "project" });

    // Delete old image if it exists
    if (image_url) {
      try {
        await deleteImage({
          bucket: "project",
          filePath: image_url,
        });
        console.log("🗑️ Deleted old image:", image_url);
      } catch (delErr) {
        console.warn("⚠️ Failed to delete old image:", delErr);
      }
    }

    image_url = newImageUrl;
  }

  // 3️⃣ Build updated payload
  const updatedData = {
    project_name,
    description,
    tech,
    live_demo_url,
    image_url,
  };

  // 4️⃣ Use reusable putHandler
  const result = await putHandler({
    table: "projects",
    id,
    data: updatedData,
    message: "Project updated successfully",
  });

  // 5️⃣ Return response
  return result;
}
