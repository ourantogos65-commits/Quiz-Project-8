import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const POST = async (req: Request) => {
  const { title, content } = await req.json();
  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Generate a summary and quiz questions from this article:\n${content}`,
  });
  console.log(content);
  return NextResponse.json(result);
};
