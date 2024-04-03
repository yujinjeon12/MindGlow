import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await auth();
  const path = req.nextUrl.pathname;

  if (session && session.user?.email && path == "/login") {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}`);
  }
  if (!session && path == "/emotions") {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/login`);
  }
}
