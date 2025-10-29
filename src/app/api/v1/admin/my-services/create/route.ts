import { postHandler } from "@/lib/api/postHandler";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { title, description, price, category } = await request.json();
  return await postHandler({
    table: "my_services",
    data: { title, description, price, category },
  });
}
