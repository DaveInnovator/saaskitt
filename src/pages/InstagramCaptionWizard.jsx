import { Link } from "react-router-dom";
import InstagramCaptionWizard from "../components/Tools/InstagramCaptionWizard";

export default function InstagramCaptionWizardPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-20">
      <div className="mb-6">
        <Link
          to="/tools"
          className="inline-block text-white-400 hover:text-blue-300 transition font-medium"
        >
          ← Go back to Tools
        </Link>
      </div>

      <InstagramCaptionWizard />
    </div>
  );
}
