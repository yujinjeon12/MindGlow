import { NextResponse } from 'next/server';
import prisma from "@/client";

export async function DELETE(req: Request) {
  try {
    const { diaryId } = await req.json(); // 클라이언트에서 보내는 diaryId

    // diaryId가 유효한지 확인 후 삭제
    const diary = await prisma.diary.delete({
      where: { id: diaryId },
    });

    return NextResponse.json({ message: '일기가 삭제되었습니다.', diary }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: '일기 삭제 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
