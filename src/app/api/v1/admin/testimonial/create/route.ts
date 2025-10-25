import { postHandler } from "@/lib/api/postHandler";
import { uploadImage } from "@/services/uploadImageServices";
import { errorResponse } from "@/utils/response";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
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

  let image_url: string | null = null;

  if (image) {
    image_url = await uploadImage({ file: image, bucket: "testimonial" });
  }

  return await postHandler({
    table: "testimonials",
    data: {
      client_name,
      message,
      client_position,
      image_url,
    },
  });
}
