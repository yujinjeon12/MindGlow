import prisma from "@/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const bcrypt = require("bcryptjs");
  const { email, password } = await req.json();

  // Find user by email
  const user = await prisma.user.findUnique({ where: { email: email } });
  if (!user) {
    return NextResponse.json(
      { error: "아이디 또는 비밀번호가 일치하지 않습니다." },
      { status: 401 }
    );
  } else {
    // Check password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { error: "아이디 또는 비밀번호가 일치하지 않습니다." },
        { status: 401 }
      );
    } else {
      return NextResponse.json({ user: user, status: 200 });
    }
  }
}
