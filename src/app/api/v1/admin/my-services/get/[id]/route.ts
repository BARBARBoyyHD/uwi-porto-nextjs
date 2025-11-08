import { getSingleHandler } from "@/lib/api/getHandler";
import { AdminRole } from "@/utils/roles";
import { NextRequest } from "next/server";


export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  const client = await AdminRole()
  const { id } = params;
  return await getSingleHandler({
    table: "my_services",
    column: "id,title,description,price,category,created_at",
    id: id,
    client:client
  });
}
