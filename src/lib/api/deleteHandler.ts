import { successResponse, errorResponse } from "@/utils/response";
import { deleteImage } from "@/services/deleteImageService";
import { createClient } from "@/utils/supabaseClient";

interface DeleteHandlerProps {
  id: string | number;
  table: string;
  bucket?: string;
  imageColumn?: string;
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
  const supabase = await createClient();

  try {
    // 1️⃣ Dynamically select columns
    const selectColumns = imageColumn ? `id, ${imageColumn}` : "id";

    const { data: findData, error: findError } = await supabase
      .from(table)
      .select(selectColumns)
      .eq("id", id)
      .single();

    if (findError || !findData) {
      return errorResponse({
        success: false,
        status: 404,
        message: "Data not found",
      });
    }

    if (
      bucket &&
      imageColumn &&
      (findData as Record<string, any>)[imageColumn]
    ) {
      const imageUrl = (findData as Record<string, any>)[imageColumn] as string;
      try {
        await deleteImage({ filePath: imageUrl, bucket });
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
    if (error instanceof Error) {
      return errorResponse({
        success: false,
        status: 500,
        message: error.message,
      });
    }

    return errorResponse({
      success: false,
      status: 500,
      message: "Unknown error occurred",
    });
  }
}
