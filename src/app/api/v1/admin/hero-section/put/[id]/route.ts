import { putHandler } from "@/lib/api/putHandler";
import { uploadImage } from "@/services/uploadImageServices";
import { errorResponse } from "@/utils/response";
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

    let image_url: string | null = null;

    if (image) {
      image_url = await uploadImage({ file: image, bucket: "hero" });
    }

    // Only update image_url if a new image was uploaded
    const dataToUpdate: any= { full_name, summary, cta };
    if (image_url) dataToUpdate.image_url = image_url;

    return await putHandler({
      table: "hero_section",
      id,
      data: dataToUpdate,
      message: "Success updating hero",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return errorResponse({
        success: false,
        status: 500,
        message: error.message,
      });
    }
  }
}
