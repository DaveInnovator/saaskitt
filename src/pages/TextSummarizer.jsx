import TextSummarizer from "../components/Tools/TextSummarizer";
import { Link } from "react-router-dom";
export default function TextSummarizerPage() {
  return<> 
  <div className="min-h-screen bg-gray-950 text-white px-4 py-20">
    <div className="mb-6">
        <Link
          to="/tools"
          className="inline-block text-white-400 hover:text-blue-300 transition font-medium"
        >
          ← Go back to Tools
        </Link>
      </div>
  <TextSummarizer /></div></>
}