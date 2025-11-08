import { deleteImage } from "@/services/deleteImageService";
import { uploadImage } from "@/services/uploadImageServices";
import { errorResponse, successResponse } from "@/utils/response";
import { createClient } from "@/utils/supabaseClient";

interface PutHandlerProps<T extends Record<string, unknown>> {
  table: string;
  id: string;
  message: string;
  imageColumn?: string;
  bucket?: string;
  data: T;
  newImageFile?: File;
}

export async function putHandler<T extends Record<string, unknown>>({
  table,
  id,
  bucket,
  imageColumn,
  data,
  message,
  newImageFile,
}: PutHandlerProps<T>) {
  try {
    const supabase = await createClient();

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

    // ✅ Use Record<string, unknown> instead of any
    const updatedPayload: Record<string, unknown> = { ...data };

    // 2️⃣ Handle image upload if bucket + imageColumn + newImageFile exist
    if (bucket && imageColumn && newImageFile) {
      try {
        // 2a. Upload new image
        const publicUrl = await uploadImage({
          file: newImageFile,
          bucket,
        });

        // 2b. Delete old image if exists

        if (typeof findData === "object" && findData !== null) {
          const record = findData as Record<string, unknown>;
          const oldImageUrl = record[imageColumn];

          if (typeof oldImageUrl === "string" && oldImageUrl.trim() !== "") {
            await deleteImage({ filePath: oldImageUrl, bucket });
            console.log("🗑️ Deleted old image:", oldImageUrl);
          }
        } else {
          console.warn("⚠️ Unexpected data type from Supabase:", findData);
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
