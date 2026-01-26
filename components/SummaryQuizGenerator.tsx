"use client";

import { useState } from "react";

type QuizItem = {
  question: string;
  options: string[];
  answer: number;
};

type Props = {
  quiz: QuizItem[];
};

export const SummaryQuizGenerator = ({ quiz }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleOptionClick = (optionIndex: number) => {
    setSelectedIndex(optionIndex);

    const correctIndex = quiz[currentIndex].answer - 1;

    if (optionIndex === correctIndex) {
      setScore((prev) => prev + 1);
    }

    if (currentIndex < quiz.length - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setSelectedIndex(null);
      }, 500);
    } else {
      setTimeout(() => {
        setShowResult(true);
      }, 500);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedIndex(null);
    setShowResult(false);
  };

  if (showResult) {
    const percentage = Math.round((score / quiz.length) * 100);

    return (
      <div className="p-8">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Дууслаа!</h2>

        <p className="text-gray-500 mb-4">Таны оноо</p>

        <p className="text-3xl font-bold text-blue-600">
          {score} / {quiz.length} ({percentage}%)
        </p>

        <button
          onClick={resetQuiz}
          className="mt-6 px-6 py-2 bg-gray-900 text-white rounded-full"
        >
          Дахин эхлэх
        </button>
      </div>
    );
  }

  const currentQuestion = quiz[currentIndex];
  const progressPercent = ((currentIndex + 1) / quiz.length) * 100;

  return (
    <div className=" mx-auto mt-10">
      <div className="w-full h-2 bg-gray-100">
        <div
          className="h-full bg-blue-500 transition-all"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="p-6">
        <h2 className="text-xl font-bold mb-6">{currentQuestion.question}</h2>

        <div className="flex flex-col gap-3">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              disabled={selectedIndex !== null}
              onClick={() => handleOptionClick(idx)}
              className="
                w-full p-4 rounded-xl border
                hover:bg-blue-50 hover:border-blue-400
                transition
              "
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
