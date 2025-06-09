import { useState } from "react";

export default function TextSummarizer() {
  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setSummary("");

    try {
      const token = import.meta.env.VITE_HF_API_TOKEN;
      if (!token) throw new Error("API token missing. Check your .env file.");

      const response = await fetch(
        "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: input }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to summarize");
      }

      const data = await response.json();

      // Hugging Face returns array with generated_text
      const generated = data[0]?.summary_text || data[0]?.generated_text || "";
      setSummary(generated || "No summary returned");
    } catch (error) {
      setSummary(`⚠️ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-md shadow-lg text-white">
      <h2 className="text-2xl font-semibold mb-4">AI Text Summarizer</h2>

      <textarea
        className="w-full h-32 p-3 rounded-md bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        placeholder="Paste your text here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={handleSummarize}
        disabled={loading}
        className="mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-5 py-2 rounded-md font-semibold transition"
      >
        {loading ? "Summarizing..." : "Summarize"}
      </button>

      {summary && (
        <div className="mt-6 bg-gray-900 p-4 rounded-md border border-gray-700 whitespace-pre-wrap">
          {summary}
        </div>
      )}
    </div>
  );
}
