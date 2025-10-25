import { uploadImage } from "@/services/uploadImageServices";
import { NextRequest } from "next/server";
import type { ProjectsFrom } from "@/types/projects";
import { errorResponse } from "@/utils/response";
import { postHandler } from "@/lib/api/postHandler";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const project_name = formData.get("project_name") as string;
    const description = formData.get("description") as string;
    const tech = formData.get("tech") as string;
    const live_demo_url = formData.get("live_demo_url") as string;
    const image = formData.get("image") as File | null;

    // ✅ Validate required fields
    if (!project_name || !description || !tech) {
      return errorResponse({
        success: false,
        status: 400,
        message: "Missing required fields",
      });
    }

    let image_url: string | null = null;

    if (image) {
      image_url = await uploadImage({ file: image, bucket: "project" });
    }

    // ✅ Insert record into Supabase table
    const postResult = await postHandler({
      table: "projects",
      data: {
        project_name,
        description,
        tech,
        live_demo_url,
        image_url,
      },
    });

    return postResult;
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
