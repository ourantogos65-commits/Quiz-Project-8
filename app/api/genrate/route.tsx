// import { GoogleGenAI } from "@google/genai";
// import { NextResponse } from "next/server";

// const ai = new GoogleGenAI({});

// export const POST = async (req: Request) => {
//   const {content} = await req.json();
//   const result = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: `Please provide a concise summary of the following article: ${content}`,
//   });
// console.log(result)
//   return NextResponse.json(result);

// };
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({});

export const POST = async (req: Request) => {
  try {
    const { title, content } = await req.json();

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Please provide a concise summary of the following article: ${content}`,
    });

    console.log(" content:", content);
    console.log("result:", result);
    const summary = result?.candidates?.[0]?.content?.parts?.[0]?.text;
    return NextResponse.json({ summary });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
     console.error(error)
    );
  }
};
