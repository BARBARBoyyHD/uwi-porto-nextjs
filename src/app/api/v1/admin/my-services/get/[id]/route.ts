import { getSingleHandler } from "@/lib/api/getHandler";
import type { Params } from "@/types/params";
import { NextRequest } from "next/server";
export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  return await getSingleHandler({
    table: "my_services",
    column: "id,title,description,price,category,created_at",
    id: id,
  });
}
