import { putHandler } from "@/lib/api/putHandler";
import type { Params } from "@/types/params";
import { NextRequest } from "next/server";

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
