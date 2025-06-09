import React, { useState } from "react";

export default function ResumeOptimizer() {
  const [resumeText, setResumeText] = useState("");
  const [optimizedResume, setOptimizedResume] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleOptimize() {
    setLoading(true);
    setError(null);
    setOptimizedResume("");

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`, 
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
              role: "user",
              content: `You are an expert career advisor and resume editor. Improve the following resume text by making it more professional, concise, and action-oriented:\n${resumeText}`,
            },
          ],
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error?.message || "OpenAI API error");
      }

      const data = await response.json();
      setOptimizedResume(data.choices[0].message.content);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-md shadow-lg text-white" style={{ maxWidth: 700, margin: "auto", padding: 20 }}>
      <h1>Resume Optimizer</h1>

      <textarea className="w-full h-32 p-3 rounded-md bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"

        rows={12}
        style={{ width: "100%", fontSize: 16, padding: 10 }}
        placeholder="Paste your resume text here..."
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
      />

      <button className="mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-5 py-2 rounded-md font-semibold transition"
        onClick={handleOptimize}
        disabled={loading || !resumeText.trim()}
        style={{ marginTop: 15, padding: "10px 20px", fontSize: 16 }}
      >
        {loading ? "Optimizing..." : "Optimize Resume"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {optimizedResume && (
        <div className="mt-6 bg-gray-900 p-4 rounded-md border border-gray-700 whitespace-pre-wrap"
        //   style={{
        //     marginTop: 20,
        //     padding: 15,
        //     backgroundColor: "#f0f0f0",
        //     whiteSpace: "pre-wrap",
        //     borderRadius: 5,
        //   }}
        >
          <h2>Optimized Resume</h2>
          <p>{optimizedResume}</p>
        </div>
      )}
    </div>
  );
}
