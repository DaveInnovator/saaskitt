import { useState } from "react";

export default function TextSummarizer() {
  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const summarizeWithHuggingFace = async (text) => {
    const HF_KEY = import.meta.env.VITE_HF_API_TOKEN;
    if (!HF_KEY) throw new Error("Missing Hugging Face API key");

    const response = await fetch("https://api-inference.huggingface.co/models/sshleifer/distilbart-cnn-12-6", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: text }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || "Summarization failed");
    }

    const data = await response.json();
    return data[0]?.summary_text || "No summary generated.";
  };

  const handleSummarize = async () => {
    if (!input.trim() || loading) return;

    setLoading(true);
    setSummary("");

    try {
      const result = await summarizeWithHuggingFace(input);
      setSummary(result);
    } catch (err) {
      console.warn("Summarization failed:", err);
      setSummary(`⚠️ ${err.message}`);
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
        className="mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-5 py-2 rounded-md font-semibold transition cursor-pointer"
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
