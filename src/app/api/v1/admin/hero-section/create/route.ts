import { postHandler } from "@/lib/api/postHandler";
import { uploadImage } from "@/services/uploadImageServices";
import { errorResponse } from "@/utils/response";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const full_name = formData.get("full_name") as string;
    const summary = formData.get("summary") as string;
    const cta = formData.get("cta") as string;
    const image = formData.get("image") as File | null;

    // ✅ Validate required fields
    if (!full_name || !summary || !cta) {
      return errorResponse({
        success: false,
        status: 400,
        message: "Missing required fields",
      });
    }

    let image_url: string | null = null;

    if(image){
      image_url = await uploadImage({file:image, bucket:"hero"});
    }
    // ✅ Insert record into Supabase table
    const postResult = await postHandler({
      table: "hero_section",
      data: { full_name, summary, cta, image_url },
    });

    return postResult;
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
