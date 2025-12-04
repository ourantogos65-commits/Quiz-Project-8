"use client";

import { Dashboard } from "@/components/Dashboard";
import { useEffect, useState } from "react";
type history = {
  title: string[];
  id: number;
};
export default function () {
    
  const getArticle = async () => {
    const res = await fetch("/api/genrate");
    const result = await res.json();
    console.log(result, "data");
  };
  useEffect(() => {
    getArticle();
  }, []);
//   const postArticles = async () => {
//     const res = await fetch("/api/genrate", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ title: "donna" }),
//     });

//     const data = await res.json();
//     console.log(data);
//   };
//   useEffect(() => {
//     postArticles();
//   }, []);
  return (
    <div className="mb-50 ">
      {/* <Dashboard />
      {history.map((re) => {
        return <p key={re.id}>{re.title}</p>;
      })}

      <input
        className="border mt-30"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={postArticles}>add</button> */}
    </div>
  );
}
