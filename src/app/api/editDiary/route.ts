import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/client";

export async function PUT(request: Request) {
  try {
    const session = await auth();
    const { id, title, weather, createdAt, content } = await request.json();

    // 해당 일기가 존재하는지 확인
    const existingDiary = await prisma.diary.findUnique({
      where: { id },
    });

    if (!existingDiary) {
      return NextResponse.json({ error: 'Diary not found' }, { status: 404 });
    }

    // 세션과 사용자의 ID가 유효한지 확인
    if (session?.user?.id) {
      // 해당 ID와 일치하는 다이어리가 있는지 확인하고, 업데이트
      const updatedDiary = await prisma.diary.update({
        where: {
          id: id, // 요청에서 받은 다이어리 ID
        },
        data: {
          title,
          createdAt,
          weather,
          content,
        }
      });

      return NextResponse.json({ status: 200, diary: updatedDiary });
    } else {
      throw new Error('Session or session user ID is missing');
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error updating diary data' }, { status: 500 });
  }
}
