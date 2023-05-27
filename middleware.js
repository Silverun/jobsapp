import { NextResponse } from "next/server";
import { headers } from "next/headers";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const requestHeaders = new Headers(request.headers);
  console.log(request.headers);
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/",
};
