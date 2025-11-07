import { SUPABASE_AUTH_TOKEN } from "@/config/supabaseKey";
import { supabase } from "@/utils/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Logout failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  cookieStore.delete(SUPABASE_AUTH_TOKEN);

  // Redirect safely
  return NextResponse.json({ message: "Logout successful" }, { status: 200 });
}
