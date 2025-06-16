import { NextResponse } from "next/server";

export function middleware(request: any) {
  // Add any authentication middleware logic here
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
