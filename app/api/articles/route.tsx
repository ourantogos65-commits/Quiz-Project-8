
import { query } from "@/lib/connectDB";
import { NextResponse } from "next/server";

// export const GET = async () => {
//   try {
//     const res = await query("SELECT * FROM articles");
//     return NextResponse.json(res.rows);
//   } catch (error) {
//     console.log(error, "errror");
//   }
// };
// export const POST = async (req: Request) => {
//   const body = await req.json();
//   const { title, content } = body;
//   try {
//     const res = await query(
//       "INSERT INTO articles(title , content)VALUES($1,$2) RETURNING *",
//       [title, content]
//     );
//     return NextResponse.json(res.rows[0]);
//   } catch (error) {
//     console.error(error, "error!!!");
//   }
// };

// export async function GET(){
//   try {
//     const articles=await prisma.article.findMany({
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