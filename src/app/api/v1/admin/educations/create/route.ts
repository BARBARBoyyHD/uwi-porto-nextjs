import { postHandler } from "@/lib/api/postHandler";
import { normalizeDate } from "@/utils/normalizeDate";
import { errorResponse } from "@/utils/response";
import { NextRequest } from "next/server";
import type { EducationsForm } from "@/types/educations";

export async function POST(request: NextRequest) {
  try {
    const {
      school_name,
      degree,
      field_of_study,
      score,
      description,
      start_date,
      end_date,
    } = await request.json();

    if (!school_name || !degree || !field_of_study || !score || !start_date) {
      return errorResponse({
        success: false,
        status: 400,
        message: "Missing required fields",
      });
    }

    const data: EducationsForm = {
      school_name,
      degree,
      field_of_study,
      score,
      description,
      start_date: normalizeDate(start_date)!,
      end_date: normalizeDate(end_date)!,
    };

    return await postHandler({
      table: "educations",
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
