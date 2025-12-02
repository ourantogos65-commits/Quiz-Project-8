"use client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
export const Dashboard = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!title || !content) return alert("Please fill all fields");
    setLoading(true);

    try {
      const res = await fetch("/api/genrate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      const data = await res.json();
      console.log(data, "my data");

      setSummary(data.summary);
    } catch (error) {
      console.error(error);
      alert("Failed to generate summary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center py-10 w-[856px] bg-white p-5 border rounded-lg shadow-2xl">
      <div className="w-[800px] flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">✨ Article Quiz Generator</h1>

        {summary === null && (
          <div>
            <p className="text-sm text-gray-400">
              Paste your article below to generate a summary using Google AI.
            </p>

            <div>
              <h1 className="font-medium text-gray-400">Article Title</h1>
              <Textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a title for your article..."
              />
            </div>

            <div>
              <h1 className="font-medium text-gray-400">Article Content</h1>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="h-[120px]"
                placeholder="Paste your article content here..."
              />
            </div>

            <div className="flex justify-end w-full">
              <Button onClick={handleGenerate} className="w-[160px]">
                {loading ? "Generating..." : "Generate Summary"}
              </Button>
            </div>
          </div>
        )}

        {summary !== null && (
          <div className="p-4  ">
            <h2 className="font-semibold text-gray-700 mb-2">
              📖 Summarized content
            </h2>

            <p className="text-gray-800 whitespace-pre-line">{summary}</p>

            <div className="flex gap-2 mt-4">
              <Button onClick={() => setSummary(null)}>Generate Again</Button>
              <Button className="bg-blue-600 text-white">
                Create Quiz from Summary
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
