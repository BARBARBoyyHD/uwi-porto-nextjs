import { errorResponse, successResponse } from "@/utils/response";
import { supabase } from "@/utils/server";

interface PutHandlerProps<T> {
  table: string;
  id: string;
  message: string;
  data: T;
}

export async function putHandler<T>({
  table,
  id,
  data,
  message,
}: PutHandlerProps<T>) {
  
  try {
    
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

    const { data: updatedData, error } = await supabase
      .from(table)
      .update(data)
      .eq("id", id)
      .select("id")
      .single();
      
    if (error) throw new Error(error.message);

    return successResponse({
      success: true,
      status: 200,
      message: message,
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
  }
}
