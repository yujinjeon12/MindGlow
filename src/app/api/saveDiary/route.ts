import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/client";

export async function POST(req: NextRequest) {
    const session = await auth();
    const { title, weather, content, imageUrl } = await req.json();

    try {
        if(session?.user?.id) {
            const userId = session.user.id;
            const nickname = session.user.name;
            const diary = await prisma.diary.create({
                data: {
                    title,
                    weather,
                    content,
                    imageUrl,
                    userId,
                    nickname: nickname ?? '',
                }
            })
        }else{
            throw new Error('Session or session user ID is missing');
        }
        return NextResponse.json({ status: 200 });
    }catch (error) {
        return NextResponse.json({ error: 'Error creating diary data' }, { status: 500 });
    }
}