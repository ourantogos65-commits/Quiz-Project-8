"use client";

import { useState } from "react";

import { SummarizeContent } from "./SummarizeContent";

import { SummaryQuizGenerator } from "./SummaryQuizGenerator";
import { SummaryForm } from "./SummaryForm";

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
  const [selectedOption, setSelectedOption] = useState(null);

  const postArticles = async () => {
    const res = await fetch("/api/articles", {
      method: "POST",

      body: JSON.stringify({ title }),
    });

    const data = await res.json();
    console.log(data, "post article ");
  };

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
      console.log(data, "quiz data");
      setQuiz(data.quiz);
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
          <SummaryForm
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
            loading={loading}
            SummaryGenerate={SummaryGenerate}
          />
        )}

        {summary && quiz.length === 0 && (
          <SummarizeContent
            summary={summary}
            title={title}
            setSummary={setSummary}
            QuizGenerate={QuizGenerate}
            loading={loading}
          />
        )}
        {quiz.length > 0 && (
          <SummaryQuizGenerator
            quiz={quiz}
           
          />
        )}
      </div>
    </div>
  );
};
