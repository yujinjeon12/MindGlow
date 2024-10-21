import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

// 환경 변수 확인
if (!process.env.AWS_REGION || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    throw new Error("AWS 환경 변수가 설정되어 있지 않습니다.");
}

// S3 클라이언트 생성
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

export async function POST(req: NextRequest){
    const { image } = await req.json();

    // 이미지 데이터 유효성 검사
    if (!image) {
        return NextResponse.json({ error: 'Image data is required' }, { status: 400 });
    }

    // base64 문자열을 버퍼로 변환
    const buffer = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    const key = `${uuidv4()}.png`; // 고유한 파일 이름 생성

    try {
        if (!process.env.AWS_S3_BUCKET_NAME) {
            throw new Error("AWS S3 버킷 이름이 설정되어 있지 않습니다.");
        }
        
        await s3.send(new PutObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: key,
          Body: buffer,
          ContentType: 'image/png',
        }));
    
        const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    
        return NextResponse.json({ url: imageUrl });
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to upload image' }, { status: 500 });
    }
}