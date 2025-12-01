"use client";
import { Article } from "@/components/Article";
import { useEffect } from "react";

export default function HomePage() {
  const getArticle = async () => {
    const res = await fetch("/api/articles");
    const result = await res.json();
    console.log(result, "data");
    // console.log(result, "name");
  };
  useEffect(() => {
    getArticle();
  }, []);
  const postArticles = async () => {
    const res = await fetch("/api/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: "bil", content: "billi" }),
    });

    const data = await res.json();
    console.log(data);
  };
  useEffect(() => {
    postArticles();
  }, []);
  return (
    <div className="mb-50 ">
      <Article />
    </div>
  );
}
