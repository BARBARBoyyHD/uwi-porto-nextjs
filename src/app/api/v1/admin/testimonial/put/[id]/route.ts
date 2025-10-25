import { putHandler } from "@/lib/api/putHandler";
import { deleteImage } from "@/services/deleteImageService";
import { uploadImage } from "@/services/uploadImageServices";
import type { Params } from "@/types/params";
import { NextRequest } from "next/server";
import { errorResponse } from "@/utils/response";
import { supabase } from "@/utils/server";

export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = params;
  if (!id) {
    return errorResponse({
      success: false,
      status: 400,
      message: "Missing required fields id",
    });
  }

  const formData = await req.formData();
  const client_name = formData.get("client_name") as string;
  const message = formData.get("message") as string;
  const client_position = formData.get("client_position") as string;
  const image = formData.get("image") as File | null;

  if (!client_name || !message || !client_position) {
    return errorResponse({
      success: false,
      status: 400,
      message: "Missing required fields",
    });
  }
  const { data: existingProject, error: findError } = await supabase
    .from("testimonials")
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
    const newImageUrl = await uploadImage({
      file: image,
      bucket: "testimonial",
    });

    // Delete old image if it exists
    if (image_url) {
      try {
        await deleteImage({
          bucket: "testimonial",
          filePath: image_url,
        });
      } catch (delErr) {
        console.warn("⚠️ Failed to delete old image:", delErr);
      }
    }

    image_url = newImageUrl;
  }

  return await putHandler({
    table: "testimonials",
    id,
    data: {
      client_name,
      message,
      client_position,
      image_url,
    },
    message: "Testimonial updated successfully",
  });
}
