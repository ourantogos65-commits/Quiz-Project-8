import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"

type Props = {
  title:any
  setTitle:any
  content:any
  setContent:any
  SummaryGenerate:any
  loading:any
};
export const SummaryForm=({title,setTitle,content,setContent ,SummaryGenerate,loading}:Props)=>{
    return(
        <div className="flex flex-col gap-4">
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
        
                    <div className="flex justify-end w-full mt-3">
                      <Button
                        onClick={SummaryGenerate}
                        className="w-[160px] cursor-grabbing"
                      >
                        {loading ? "Generating..." : "Generate Summary"}
                      </Button>
                    </div>
                  </div>
    )
}