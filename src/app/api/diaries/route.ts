import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/client";

export async function GET(req: NextRequest) {
    const session = await auth();

    try {
        if (session?.user?.id) {
            const userId = session.user.id;

            // 모든 사용자의 일기 데이터를 가져옵니다
            const diaries = await prisma.diary.findMany({
                orderBy: {
                    createdAt: 'desc', // 최신순
                },
            });
            return NextResponse.json({ status: 200, diaries });
        } else {
            throw new Error('Session or session user ID is missing');
        }
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching diary data' }, { status: 500 });
    }
}
