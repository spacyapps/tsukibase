import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const ua = request.headers.get("user-agent") ?? "";
  if (/Mobile|Android|iPhone|iPad/i.test(ua)) {
    return NextResponse.redirect(new URL("/mobile", request.url));
  }
}

export const config = {
  matcher: "/",
};
