

// import { Prisma } from "@/lib/generated/prisma/client";
// import { NextResponse } from "next/server";



// export async function GET(){
//   try {
//     const articles=await Prisma.article.findMany({
//        orderBy:{
//       createdAt:"desc"//shineer nemegdesnees haruulah 
//     }
//     })
//    return NextResponse.json(articles,{status:200})
//   } catch (error) {
//     return NextResponse.json({error:"failed to fetch"},{status:500})
//   }
// }
// export async function POST (req:Request){
// const {title,content}=await req.json()

// try {
//   const article = await prisma.article.create ({
//     data:{title,content}
//   })
//   return NextResponse.json(article)
// } catch (error) {
//   return NextResponse.json( error)
// }
// }


import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
export async function GET() {
  try {
    const res=await prisma.articles.findMany()
    return NextResponse.json(res,{ status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "failed to fetch" }, { status: 500 });
  }
}
const ai = new GoogleGenAI({});

export const POST = async (req: Request) => {
  try {
    const { title, content } = await req.json();

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate 5 multiple choice questions based on this article: ${content}. Return the response in this exact JSON format:
      [
        {
          "question": "Question text here",
          "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
          "answer": "0"
        }
      ]
      Make sure the response is valid JSON and the answer is the index (0-3) of the correct option.`,
    });

    console.log(" content:", content);
    console.log("result:", result);
    const summary = result?.candidates?.[0]?.content?.parts?.[0]?.text;
    return NextResponse.json({ summary });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate summary" },
      { status: 500 }
    );
  }
};

// export async function POST(req: Request) {
//   const { title, content } = await req.json();

//   try {
//     const article = await prisma.article.create({
//       data: { title, content },
//     });
//     return NextResponse.json(article, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: "failed to create" }, { status: 500 });
//   }
// }
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



