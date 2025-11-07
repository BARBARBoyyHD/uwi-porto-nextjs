import { errorResponse, successResponse } from "@/utils/response";
import { supabase } from "@/utils/server";
import { SupabaseClient } from "@supabase/supabase-js";

interface GetHandlerProps {
  table: string;
  column: string;
  id?: string;
  client: SupabaseClient;
}

export async function getHandler({ table, column, client }: GetHandlerProps) {
  try {
    const { data, error } = await client
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

export async function getSingleHandler({
  table,
  column,
  id,
  client,
}: GetHandlerProps) {
  try {
    const { data, error } = await client
      .from(table)
      .select(column || "*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return errorResponse({
        success: false,
        status: 404,
        message: "Data not found",
      });
    }

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
