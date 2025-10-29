import { putHandler } from "@/lib/api/putHandler";
import { errorResponse } from "@/utils/response";
import { NextRequest } from "next/server";
import type { Params } from "@/types/params";

export async function PUT(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const { title, description, price, category } = await _request.json();
  return await putHandler({
    id,
    table: "my_services",
    data: { title, description, price, category },
    message: "My service updated successfully",
  });
}
