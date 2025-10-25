import { postHandler } from "@/lib/api/postHandler";
import { normalizeDate } from "@/utils/normalizeDate";
import { errorResponse } from "@/utils/response";
import { NextRequest } from "next/server";
import type { ExperienceForm } from "@/types/experience";



export async function POST(request: NextRequest) {
  try {
    const {
      company_name,
      position,
      start_date,
      end_date,
      description,
      currently_working,
    } = await request.json();

    if (!company_name || !position || !start_date) {
      return errorResponse({
        success: false,
        status: 400,
        message: "Missing required fields",
      });
    }

    const isCurrentlyWorking =
      typeof currently_working === "string"
        ? currently_working === "true"
        : currently_working;

    const data: ExperienceForm = {
      company_name,
      position,
      start_date: normalizeDate(start_date)!,
      description,
      currently_working: isCurrentlyWorking,
    };

    if (!isCurrentlyWorking && end_date) {
      data.end_date = normalizeDate(end_date)!;
    }

    return await postHandler({
      table: "experiences",
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
