import { supabase } from "@/utils/server";

interface UploadImageProps {
  file: File;
  bucket: string;
}

export async function uploadImage({
  file,
  bucket,
}: UploadImageProps): Promise<string> {
  try {
    if (!file) throw new Error("No file provided");

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        contentType: file.type, // ensure Supabase knows it's an image
        upsert: false,
      });
    if (error) throw error;

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
    return data.publicUrl;
  } catch (err) {
    console.error("❌ Image upload failed:", err);
    throw err; // rethrow so upper-level handler knows it failed
  }
}
