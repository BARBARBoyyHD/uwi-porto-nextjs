import {supabase} from "@/utils/server";

interface UploadImageProps{
  file: File,
  bucket: string
}

export async function uploadImage({file, bucket}: UploadImageProps): Promise<string> {
  if (!file) throw new Error("No file provided");

  // Create a unique file name (to avoid overwriting)
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2)}.${fileExt}`;
  const filePath = `${fileName}`;

  // Upload file to Supabase storage
  const { error } = await supabase.storage.from(bucket).upload(filePath, file);

  if (error) throw error;

  // Get public URL
  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

  return data.publicUrl;
}
