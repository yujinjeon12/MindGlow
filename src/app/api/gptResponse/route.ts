import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import OpenAI from "openai";
import prisma from "@/client";

const openai = new OpenAI();

export async function POST(req: NextRequest) {
  const { content, id } = await req.json();
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('Missing OpenAI API Key');
  }
  
  if (!content) {
    return NextResponse.json({ error: 'Diary entry is required' }, { status: 400 });
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'gpt-3.5-turbo-instruct',
        prompt: `Here is a diary entry: "${content}". Reply in 2-3 sentences in Korean as a supportive friend with empathy, emotional encouragement, and positive feedback.`,
        max_tokens: 300,
        temperature: 0.5,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    const replyMsg = response.data.choices[0].text.trim();
    // 새로운 AI 응원 메시지 저장
    const savedResponse = await prisma.aIResponse.create({
      data: {
        content: replyMsg,
        diaryId: id,     
      },
    });
    return NextResponse.json({ reply: replyMsg });
  } catch (error) {
    // Step 1: Check if error is an AxiosError
    if (axios.isAxiosError(error)) {
      // Step 2: Check if status is 429
      if (error.response && error.response.status === 429) {
        console.error('Rate limit exceeded. Try again later.');
        return NextResponse.json({ error: 'Rate limit exceeded. Please try again later.' }, { status: 429 });
      }

      // Handle other Axios errors if needed
      console.error('Axios error:', error.message);
    } else if (error instanceof Error) {
      // Handle general Error objects
      console.error('General error:', error.message);
    } else {
      // Handle unexpected error types
      console.error('Unexpected error:', error);
    }
    
    // Default error response
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
