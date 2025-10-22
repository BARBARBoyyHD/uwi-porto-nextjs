import { supabase } from "@/utils/server";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    const token = data.session?.access_token;
    if (!token) {
      return NextResponse.json({ error: "No token received" }, { status: 500 });
    }

    // ✅ Store token in cookie
    const response = NextResponse.json({
      message: "Login successful",
      user: data.user,
    });

    response.cookies.set({
      name: "sb-access-token",
      value: token,
      httpOnly: true,
      secure: false, // for localhost/Postman
      sameSite: "lax", // allows sending in cross-site requests
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
