import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createClient } from "@/utils/supabaseClient";

export async function middleware(request: NextRequest) {
  // Always sync Supabase auth session
  const response = await updateSession(request);
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isProtectedApi = path.startsWith("/api/v2/admin");
  const isProtectedPage = path.startsWith("/admin");

  // If user is not authenticated
  if (!user && (isProtectedApi || isProtectedPage)) {
    if (isProtectedApi) {
      // Return JSON for API routes
      return NextResponse.json(
        {
          success: false,
          status: 401,
          message: "Unauthorized",
          error: "Unauthorized access — please login first",
        },
        { status: 401 }
      );
    } else {
      // Redirect for page routes
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/admin-login";
      return NextResponse.redirect(redirectUrl);
    }
  }

  return response;
}

export const config = {
  matcher: ["/confirm", "/admin/:path*", "/api/v2/:path*"],
};
