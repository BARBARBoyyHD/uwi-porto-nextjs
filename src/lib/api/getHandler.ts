import { errorResponse, successResponse } from "@/utils/response";
import { supabase } from "@/utils/server";


interface GetHandlerProps {
  table: string;
  column?: string;
  id?: string;
}

export async function getHandler({ table, column }: GetHandlerProps) {
  try {
    const { data, error } = await supabase
      .from(table)
      .select(`${column ? column : "*"}`);

    if (error) {
      throw new Error(error.message);
    }

    if (data.length === 0) {
      return errorResponse({
        success: false,
        status: 404,
        message: "No data found",
      });
    }

    return successResponse({
      success: true,
      status: 200,
      message: "Success",
      data: data,
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

export async function getSingleHandler({ table, column, id }: GetHandlerProps) {
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

    const { data, error } = await supabase
      .from(table)
      .select(`${column ? column : "*"}`)
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);

    return successResponse({
      success: true,
      status: 200,
      message: "Success",
      data,
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
