import { putHandler } from "@/lib/api/putHandler";
import { normalizeDate } from "@/utils/normalizeDate";
import { errorResponse } from "@/utils/response";
import { NextRequest } from "next/server";
import type { ExperienceForm } from "@/types/experience";

interface Params {
  params: {
    id: string;
  };
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = params;
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
    } else {
      data.end_date = null;
    }
    return await putHandler({
      id,
      table: "experiences",
      data: {
        ...data,
      },
      message: "Experience updated successfully",
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
