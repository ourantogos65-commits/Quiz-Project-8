

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
export async function GET() {
  try {
    const res = await prisma.articles.findMany();
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "failed to fetch" }, { status: 500 });
  }
}
const ai = new GoogleGenAI({});

export const POST = async (req: Request) => {
  try {
    const { summary } = await req.json();

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate 5 multiple choice questions based on this article: ${summary}. Return the response in this exact JSON format:
      [
        {
          "question": "Question text here",
          "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
          "answer": "0"
        }
      ]
      Make sure the response is valid JSON and the answer is the index (0-3) of the correct option.`,
    });

    const quizText = result?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const cleaned = quizText?.slice(7, quizText?.length - 3);

    const quiz = JSON.parse(cleaned);
    return NextResponse.json({ quiz });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate quiz" },
      { status: 500 }
    );
  }
};
