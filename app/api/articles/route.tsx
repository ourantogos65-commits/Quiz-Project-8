import { prisma } from "@/lib/prisma";

// GET request
export async function GET() {
  try {
    const articles = await prisma.articles.findMany({
      orderBy: { id: "desc" }, // latest articles first
    });
    return new Response(JSON.stringify(articles), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch articles" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// POST request
export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { title, content } = body;

    if (!title) {
      return new Response(JSON.stringify({ error: "Title is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const article = await prisma.articles.create({
      data: { title, content },
    });

    return new Response(JSON.stringify(article), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to create article" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
