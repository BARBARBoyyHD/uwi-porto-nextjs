import { putHandler } from "@/lib/api/putHandler";
import { errorResponse } from "@/utils/response";
import { NextRequest } from "next/server";
import type { Params } from "@/types/params";
import type { EducationsForm } from "@/types/educations";
import { normalizeDate } from "@/utils/normalizeDate";

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = params;
  if (!id) {
    return errorResponse({
      success: false,
      status: 400,
      message: "Missing required fields id",
    });
  }
  try {
    const {
      school_name,
      degree,
      description,
      field_of_study,
      start_date,
      end_date,
      score,
    } = await request.json();
    const data: EducationsForm = {
      school_name,
      degree,
      score,
      field_of_study,
      start_date: normalizeDate(start_date),
      end_date: normalizeDate(end_date),
      description,
    };
    return await putHandler({
      id,
      table: "educations",
      data: data,
      message: "Education updated successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse({
        success: false,
        status: 500,
        message: error.message,
      });
    }
  }
}
