"use client";

import { useState, useEffect } from "react";
import { SummarizeContent } from "./SummarizeContent";
import { SummaryQuizGenerator } from "./SummaryQuizGenerator";
import { SummaryForm } from "./SummaryForm";
import { AppSidebar } from "./AppSidebar";
import { ArticleType } from "@/lib/type";

interface QuizItem {
  question: string;
  options: string[];
  answer: string;
}

export const Dashboard = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [quiz, setQuiz] = useState<QuizItem[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<ArticleType | null>(
    null
  );

  const SummaryGenerate = async () => {
    if (!title || !content) return alert("Please fill all fields");
    setLoading(true);

    try {
      const res = await fetch("/api/genrate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      const data = await res.json();

      setSummary(data.summary);
      setQuiz([]);

      await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content: data.summary }),
      });
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
      setQuiz(data.quiz);
    } catch (error) {
      console.error(error);
      alert("Failed to generate quiz");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex mr-10 mt-30">
      <AppSidebar onSelect={setSelectedArticle} />

      <main className="flex-1 flex justify-center py-10">
        <div className="w-[900px] flex flex-col gap-4 bg-white p-5 border rounded-lg shadow-2xl">
          <h1 className="text-2xl font-semibold">✨ Article Quiz Generator</h1>

          {selectedArticle ? (
            <div className="mx-auto w-full ">
              <h2 className="text-xl font-bold mb-2">
                {selectedArticle.title}
              </h2>
              <p>{selectedArticle.content}</p>
              <button
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                onClick={() => setSelectedArticle(null)}
              >
                Back
              </button>
            </div>
          ) : !summary && quiz.length === 0 ? (
            <SummaryForm
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
              loading={loading}
              SummaryGenerate={SummaryGenerate}
            />
          ) : summary && quiz.length === 0 ? (
            <SummarizeContent
              title={title}
              summary={summary}
              setSummary={setSummary}
              QuizGenerate={QuizGenerate}
              loading={loading}
            />
          ) : (
            <SummaryQuizGenerator quiz={quiz} />
          )}
        </div>
      </main>
    </div>
  );
};
