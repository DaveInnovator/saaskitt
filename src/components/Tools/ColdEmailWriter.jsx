import { useState } from "react";

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const HUGGINGFACE_API_URL =  "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1";

export default function ColdEmailWriter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOpenAI = async () => {
    const res = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI2_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a professional cold email writer. Craft concise and persuasive cold emails for outreach and lead generation.",
          },
          { role: "user", content: input },
        ],
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      const message = err?.error?.message || "OpenAI error";
      throw new Error(message);
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content || "No response from OpenAI.";
  };

  const fetchHuggingFace = async () => {
    const res = await fetch(HUGGINGFACE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_HF2_API_TOKEN}`,
      },
      body: JSON.stringify({
        inputs: `Write a professional cold email for outreach based on: ${input}`,
        options: { wait_for_model: true },
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      const message = err?.error || "Hugging Face error";
      throw new Error(message);
    }

    const data = await res.json();
    return data[0]?.generated_text || "No response from Hugging Face.";
  };

  const handleGenerate = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setError("");
    setOutput("");

    try {
      const result = await fetchOpenAI();
      setOutput(result);
    } catch (err) {
      console.warn("OpenAI failed, falling back to Hugging Face:", err.message);
      try {
        const fallback = await fetchHuggingFace();
        setOutput(fallback);
      } catch (hfErr) {
        console.error("Both APIs failed:", hfErr.message);
        setError("Both OpenAI and Hugging Face calls failed. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-900 p-6 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold text-white mb-4">Cold Email Writer</h1>

      <textarea
        className="w-full p-4 rounded bg-gray-800 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4 cursor-pointer"
        rows="6"
        placeholder="Describe your product/service and target audience..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        className={`px-6 py-2 rounded text-white transition-all duration-200 ${
          loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Generating..." : "Generate Email"}
      </button>

      {error && (
        <p className="mt-4 text-red-400 bg-gray-800 p-3 rounded">{error}</p>
      )}

      {output && (
        <div className="mt-6 bg-gray-800 p-4 rounded text-white whitespace-pre-wrap">
          {output}
        </div>
      )}
    </div>
  );
}
