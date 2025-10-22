import { deleteImage } from "@/services/deleteImageService";
import { errorResponse, successResponse } from "@/utils/response";
import { supabase } from "@/utils/server";


interface DeleteHandlerProps {
  id: string;
  table: string;
  bucket?: string; // optional — only needed if deleting an image
  imageColumn?: string // optional — only needed if deleting an image
}

export async function deleteHandler({
  id,
  table,
  bucket,
  imageColumn,
}: DeleteHandlerProps) {
  if (!id || !table) {
    return errorResponse({
      success: false,
      status: 400,
      message: "Missing required fields: id or table",
    });
  }

  try {
    // 1️⃣ Find the record first
    const { data: findData, error: findError } = await supabase
      .from(table)
      .select(`id`)
      .eq("id", id)
      .single();

    if (findError || !findData) {
      return errorResponse({
        success: false,
        status: 404,
        message: "Data not found",
      });
    }

    // 2️⃣ Delete image if bucket and image exist
    // 2️⃣ Delete image if bucket and image exist
    let imageUrl: string 

    if (
      bucket &&
      imageColumn &&
      findData &&
      (findData as Record<string, any>)[imageColumn]
    ) {
      imageUrl = (findData as Record<string, any>)[imageColumn];
      try {
        await deleteImage({filePath:imageUrl, bucket:bucket});
        console.log("🗑️ Deleted image:", imageUrl);
      } catch (imgError) {
        console.warn("⚠️ Image deletion failed:", imgError);
      }
    }

    // 3️⃣ Delete record
    const { error: deleteError } = await supabase
      .from(table)
      .delete()
      .eq("id", id);
    if (deleteError) throw new Error(deleteError.message);

    return successResponse({
      success: true,
      status: 200,
      message: "Data deleted successfully",
      data: { id },
    });
  } catch (error: unknown) {
    if (error instanceof Error)
      return errorResponse({
        success: false,
        status: 500,
        message: error.message,
      });

    return errorResponse({
      success: false,
      status: 500,
      message: "Unknown error occurred",
    });
  }
}
