import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const articles = await prisma.articles.findMany({});
    return Response.json(articles, { status: 200 });
  } catch (error) {
    return Response.json({ error: "failed to fetch" }, { status: 500 });
  }
}

// import { query } from "@/lib/connectDB";
// import { NextResponse } from "next/server";

// export const GET = async () => {
//   try {
//     const res = await query("SELECT * FROM articles");
//     return NextResponse.json(res.rows);
//   } catch (error) {
//     console.log(error, "errror");
//   }
// };

export const POST = async (req: Request) => {
  const body = await req.json();
  const { title } = body;
  try {
    const res = await prisma.articles.create({
     data:{
      title:title
     } 
    });

    return Response.json(res);
  } catch (error) {
    console.error(error, "error!!!");
  }
};
