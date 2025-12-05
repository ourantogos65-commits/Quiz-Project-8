// type Props = {
//   quiz:any
//   selectedOption:any
//   setSelectedOption:any
// };
// export const SummaryQuizGenerator = ({ quiz, selectedOption, setSelectedOption }:Props) => {
//   return (
//     <div className="">
//       <p className="font-sembibold text-gray-400 mb-5">
//         Take a quick test about your knowledge from your content
//       </p>



//       {quiz.slice(0, 1).map((q:any, i:any) => (
//         <div key={i} className="mb-4 border ">
//           <div className="flex w-full justify-between ">
//             <h2 className="text-start font-semibold text-xl w-full mb-4">
//               {q.question}
//             </h2>
//             <p className="text-gray-500 flex ">
//               {q.answer} <span className="text-black">/5</span>
//             </p>
//           </div>

//           <div>
//             {q.options.map((option:any, idx: any) => {
//               const correctIndex = Number(q.answer);
//               const isSelected = selectedOption === idx;
//               const isCorrect = isSelected && idx === correctIndex;
//               const isWrong = isSelected && idx !== correctIndex;

//               return (
//                 <div
//                   key={idx}
//                   onClick={() => setSelectedOption(idx)}
//                   className={`mb-2 border flex items-center w-full justify-center  h-12 rounded-sm cursor-pointer duration-200
//       ${isCorrect ? "bg-green-400 " : ""}
//       ${isWrong ? "bg-red-400" : ""}
//       ${isSelected ? "hover:bg-blue-300" : ""}`}
//                 >
//                   <p  className="font-semibold ">{option}</p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };
// 
"use client"
import { useState } from "react";
type Props = {
  quiz: any;
};
export const SummaryQuizGenerator = ({ quiz }: Props) => {
  const [currentIndex,setCurrentIndex]=useState(0)

  
  return (
    <div className="">
      <p className="font-sembibold text-gray-400 mb-5">
        Take a quick test about your knowledge from your content
      </p>

      {quiz.slice(0, 1).map((q: any, i: any) => (
        <div key={i} className="mb-4 border ">
          <div className="flex w-full justify-between ">
            <h2 className="text-start font-semibold text-xl w-full mb-4">
              {q.question}
            </h2>
            <p className="text-gray-500 flex ">
              {q.answer} <span className="text-black">/5</span>
            </p>
          </div>

          <div>
            {q.options.map((option: any, idx: any) => {
              return (
                <div
                  key={idx}
                  className={`mb-2 border flex items-center w-full justify-center  h-12 rounded-sm cursor-pointer duration-200 hover:bg-blue-200`}
                >
                  <p className="font-semibold ">{option}</p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
