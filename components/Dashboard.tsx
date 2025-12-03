"use client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { Textarea } from "./ui/textarea";

interface QuizItem {
  question: string;
  options: string[];
  answer: string;
}

export const Dashboard = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [quiz, setQuiz] = useState<QuizItem[]>([]);

  const SummaryGenerate = async () => {
    if (!title || !content) return alert("Please fill all fields");
    setLoading(true);

    try {
      const res = await fetch("/api/genrate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      const data = await res.json();
      console.log("summary data", data);

      setSummary(data.summary || "");
      setQuiz([]);
    } catch (error) {
      console.error(error);
      alert("Failed to generate summary");
    } finally {
      setLoading(false);
    }
  };

  const QuizGenerate = async () => {
    if (!summary) return alert("No summary available");
    setLoading(true);

    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summary }),
      });

      const data = await res.json();
      console.log("quiz data", data);

      setQuiz(Array.isArray(data.quiz) ? data.quiz : []);
    } catch (error) {
      console.error(error);
      alert("Failed to generate quiz");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center py-10 w-[856px] bg-white p-5 border rounded-lg shadow-2xl">
      <div className="w-[800px] flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">✨ Article Quiz Generator</h1>

        {!summary && quiz.length === 0 && (
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
              <Button onClick={SummaryGenerate} className="w-[160px]">
                {loading ? "Generating..." : "Generate Summary"}
              </Button>
            </div>
          </div>
        )}

        {summary && quiz.length === 0 && (
          <div className="p-4">
            <h2 className="font-semibold text-gray-700 mb-2">
              📖 Summarized content
            </h2>
            <h3 className="text-2xl font-bold mb-2">{title}</h3>
            <p className="text-gray-800">{summary}</p>

            <div className="flex gap-2 mt-4">
              <Button onClick={() => setSummary("")}>Generate Again</Button>
              <Button onClick={QuizGenerate} className="bg-blue-600 text-white">
                {loading ? "Generating..." : "Create Quiz from Summary"}
              </Button>
            </div>
          </div>
        )}

        {quiz.length > 0 && (
          <div>
            <p className="font-sembibold text-gray-400">
              Take a quick test about your knowledge from your content
            </p>

            {quiz.slice(0, 1).map((q, i) => (
              <div key={i} className="mb-4 border">
                <h3 className="font-semibold">{q.question}</h3>
                <p className="list-disc pl-5 mt-1">
                  {q.options.map((re, idx) => (
                    <div className="border " key={idx}>
                      <Button> {re}</Button>
                    </div>
                  ))}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
