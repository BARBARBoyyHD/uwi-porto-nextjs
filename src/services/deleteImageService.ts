import {supabase} from "@/utils/server";

/**
 * Delete an image from a Supabase storage bucket
 * @param bucket - name of the bucket (e.g., "hero")
 * @param filePath - path of the file inside the bucket (e.g., "uploads/1729334033421-hero.png")
 */

interface DeleteImageProps {
  bucket: string;
  filePath: string;
}

export async function deleteImage({
  bucket,
  filePath,
}: DeleteImageProps): Promise<void> {
  if (!filePath) throw new Error("No file path provided");

  const relativePath = filePath.includes(`/storage/v1/object/public/${bucket}/`)
    ? filePath.split(`/storage/v1/object/public/${bucket}/`)[1]
    : filePath;

  const { error } = await supabase.storage.from(bucket).remove([relativePath]);

  if (error) throw error;
}
