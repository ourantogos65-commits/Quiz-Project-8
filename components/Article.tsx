"use client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";

export const Article = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // POST /api/articles  ->article title content ugj yvuulna
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
          <Button className="w-[160px] ">Generate summary</Button>
        </div>
      </div>
    </div>
  );
};
