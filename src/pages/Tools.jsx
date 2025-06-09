import { Link } from "react-router-dom";

const tools = [
  {
    name: "Resume Optimizer",
    slug: "resume-optimizer",
    description: "Level up your resume with AI-enhanced feedback in seconds.",
  },
  {
    name: "AI Cover Letter Generator",
    slug: "cover-letter-gen",
    description: "Auto-write fire cover letters based on your resume + job post.",
  },
  {
    name: "Instagram Caption Wizard",
    slug: "ig-caption",
    description: "Drop banger captions powered by viral AI patterns.",
  },
  {
    name: "Cold Email Writer",
    slug: "cold-email-writer",
    description: "Punchy, converting emails for freelancing, outreach, and sales.",
  },
  {
    name: "AI Text Summarizer",
    slug: "text-summarizer",
    description: "Paste text, get concise AI-powered summaries instantly.",
  },
  {
    name: "Student Prompt Assistant",
    slug: "student-assistant",
    description: "	Summarizes past questions mainly for nigerian students.",
  },
];

function Tools() {
  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <h2 className="text-4xl font-bold text-center mb-8">🔥 AI Tools in Your Bundle</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            to={`/tools/${tool.slug}`}
            className="bg-gray-800 rounded-xl p-5 hover:bg-gray-700 transition duration-200"
          >
            <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
            <p className="text-gray-400 text-sm">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Tools;
