import ResumeOptimizer from "../components/Tools/ResumeOptimizer";
import { Link } from "react-router-dom";
export default function ResumeOptimizerPage() {
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
  <ResumeOptimizer />
</div>
</>
}
