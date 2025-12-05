import { Button } from "./ui/button";

type Props = {
  title:string
  summary:any
  setSummary:any
  QuizGenerate:any
  loading:any
};
export const SummarizeContent = ({ title, summary, setSummary ,QuizGenerate,loading}:Props) => {
  return (
    <div className="p-4">
      <h2 className="font-semibold text-gray-700 mb-2">
        📖 Summarized content
      </h2>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-800">{summary}</p>

      <div className="flex gap-2 mt-4">
        <Button className="cursor-grabbing" onClick={() => setSummary("")}>
          Generate Again
        </Button>
        <Button
          onClick={QuizGenerate}
          className="bg-blue-600 text-white cursor-grabbing"
        >
          {loading ? "Generating..." : "Create Quiz from Summary"}
        </Button>
      </div>
    </div>
  );
};