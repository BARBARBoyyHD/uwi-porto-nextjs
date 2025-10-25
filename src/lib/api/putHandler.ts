import { deleteImage } from "@/services/deleteImageService";
import { uploadImage } from "@/services/uploadImageServices";
import { errorResponse, successResponse } from "@/utils/response";
import { supabase } from "@/utils/server";

interface PutHandlerProps<T> {
  table: string;
  id: string;
  message: string;
  imageColumn?: string; // e.g., "image_url"
  bucket?: string; // e.g., "projects"
  data: T; // includes other updated fields
  newImageFile?: File; // optional new image
}

export async function putHandler<T extends Record<string, any>>({
  table,
  id,
  bucket,
  imageColumn,
  data,
  message,
  newImageFile,
}: PutHandlerProps<T>) {
  try {
    // 1️⃣ Check if record exists
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

    let updatedPayload: Record<string, any> = { ...data };

    // 2️⃣ Handle image upload if bucket + imageColumn + newImageFile exist
    if (bucket && imageColumn && newImageFile) {
      try {
        // 2a. Upload new image
        const publicUrl = await uploadImage({
          file: newImageFile,
          bucket,
        });

        // 2b. Delete old image if exists
        const oldImageUrl = (findData as Record<string, any>)[imageColumn];
        if (oldImageUrl) {
          await deleteImage({ filePath: oldImageUrl, bucket });
          console.log("🗑️ Deleted old image:", oldImageUrl);
        }

        // 2c. Set new image URL in update payload
        updatedPayload[imageColumn] = publicUrl;
      } catch (imgError) {
        console.warn("⚠️ Image update failed:", imgError);
      }
    }

    // 3️⃣ Update record in database
    const { data: updatedData, error } = await supabase
      .from(table)
      .update(updatedPayload)
      .eq("id", id)
      .select("id")
      .single();

    if (error) throw new Error(error.message);

    return successResponse({
      success: true,
      status: 200,
      message,
      data: updatedData,
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
