import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export async function POST(req: NextRequest){
    const { image } = await req.json();

    if(!image){
        return NextResponse.json({ error: 'Image data is required'}, { status: 400 });
    }

    const buffer = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    const key = `${uuidv4()}.png`;

    try {
        await s3.send(new PutObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME!,
          Key: key,
          Body: buffer,
          ContentEncoding: 'base64',
          ContentType: 'image/png',
        }));
    
        const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    
        return NextResponse.json({ url: imageUrl });
    }catch (error) {
        return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
    }
}