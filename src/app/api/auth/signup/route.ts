import { NextResponse } from "next/server";
import prisma from "@/client";

export async function POST(req: Request) {
  const bcrypt = require("bcryptjs");
  const { email, name, password } = await req.json();
  const exists = await prisma.user.findUnique({ where: { email: email } });

  if (exists) {
    return NextResponse.json({
      status: 400,
      message: "이미 가입된 이메일입니다.",
    });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = await prisma.user.create({
    data: {
      email: email,
      name: name,
      password: hashedPassword,
    },
  });
  if (user) {
    return NextResponse.json({ status: 200 });
  } else {
    return NextResponse.json({
      status: 500,
      message: "회원가입에 실패했습니다. 다시 시도해주세요.",
    });
  }
}
