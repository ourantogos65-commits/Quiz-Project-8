"use client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";

export const Article = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const handleGenrate = async () => {
    if (!title || !content) return alert("please all fields");
    setLoading(true);
    try {
      const res = await fetch("api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      const article = await res.json();
      console.log(article, "Article");
       alert("Article generated successfully!");

     
       setTitle("");
       setContent("");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center py-10  w-[856px] bg-white p-5 border rounded-lg shadow-2xl">
      <div className="w-[800px] flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-semibold ">✨ Article Quiz Generator</h1>
          <p className="text-sm text-gray-400">
            Paste your article below to generate a summarize and quiz question.
            Your articles will saved in the sidebar for future reference.
          </p>
        </div>
        <div>
          <h1 className="font-medium text-gray-400">Article Title</h1>
          <Input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Enter a title for your article..."
          />
        </div>
        <div>
          <h1 className="font-medium text-gray-400">Article Content</h1>
          <Input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="h-[120px]"
            placeholder="Paste your article content here..."
          />
        </div>
        <div className="justify-end flex w-full ">
          <Button onClick={handleGenrate} className="w-[160px] ">
            {loading ? "Genreting..." : "Generate summary"}
          </Button>
        </div>
      </div>
    </div>
  );
};
