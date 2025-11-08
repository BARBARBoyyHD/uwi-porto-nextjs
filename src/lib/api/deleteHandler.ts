import { deleteImage } from "@/services/deleteImageService";
import { errorResponse, successResponse } from "@/utils/response";
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
    // 1️⃣ Select dynamic columns
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

    // 2️⃣ Delete image from bucket if applicable
    if (bucket && imageColumn) {
      if (typeof findData === "object" && findData !== null) {
        const record = findData as Record<string, unknown>;
        const imageValue = record[imageColumn];

        if (typeof imageValue === "string" && imageValue.trim() !== "") {
          try {
            await deleteImage({ filePath: imageValue, bucket });
          } catch (imgError) {
            console.warn("⚠️ Image deletion failed:", imgError);
          }
        }
      } else {
        console.warn("⚠️ Unexpected data type from Supabase:", findData);
      }
    }

    // 3️⃣ Delete record from table
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
