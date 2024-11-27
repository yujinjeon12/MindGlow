import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  let session;
  try {
    session = await auth(); // 세션 가져오기
  } catch (error) {
    console.error('Error fetching session:', error);
  }

  const path = req.nextUrl.pathname;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  // 조건 1: 세션이 있고, 로그인 페이지 접근 시 리다이렉트
  if (session && session.user?.email && path === "/login") {
    return NextResponse.redirect(`${baseUrl}`);
  }

  // 조건 2: 세션이 없고 특정 경로 접근 시 로그인 페이지로 리다이렉트
  if (!session && (path === "/write-emotion" || path === "/")) {
    return NextResponse.redirect(`${baseUrl}/login`);
  }
}
