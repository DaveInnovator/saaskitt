import React, { useState } from "react";

export default function CoverLetterGenerator() {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [yourName, setYourName] = useState("");
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generateCoverLetter() {
    setLoading(true);
    setError("");
    setResult("");

    try {
      const prompt = `
Write a professional cover letter for the job title "${jobTitle}" at the company "${company}".
The applicant's name is "${yourName}".
Additional details or skills to include: "${input}".
Make it concise, engaging, and tailored to the job.`;

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini", // or "gpt-4o", or "gpt-4o-mini" depending on your access
          messages: [
            { role: "system", content: "You are a helpful assistant that writes cover letters." },
            { role: "user", content: prompt },
          ],
          max_tokens: 600,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      const coverLetter = data.choices[0].message.content.trim();
      setResult(coverLetter);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-md shadow-lg text-white">
      <h1 className="text-center text-4xl font-bold mb-10 text-[#fff]">
        AI Cover Letter Generator
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          generateCoverLetter();
        }}
        className="space-y-6"
      >
        <input
          type="text"
          className="w-full p-4 rounded-lg bg-gray-900  text-[#ddd] placeholder-[#fff] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          required
        />

        <input
          type="text"
          className="w-full p-4 rounded-lg bg-gray-900  text-[#ddd] placeholder-[#fff] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />

        <input
          type="text"
          className="w-full p-4 rounded-lg bg-gray-900 text-[#ddd] placeholder-[#fff] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Your Name"
          value={yourName}
          onChange={(e) => setYourName(e.target.value)}
          required
        />

        <textarea
          className="w-full h-32 p-3 rounded-md bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Additional details or skills you'd like to mention..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>

        <button
          type="submit"
          disabled={loading || !jobTitle.trim() || !company.trim() || !yourName.trim()}
          className={`mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-5 py-2 rounded-md font-semibold transition text-white
            ${
              loading || !jobTitle.trim() || !company.trim() || !yourName.trim()
                ? "bg-gray-600 cursor-not-allowed shadow-none"
                : "bg-[#61dafb] hover:bg-[#21a1f1] shadow-md"
            }
            text-[#1e1e2f] transition`}
        >
          {loading ? "Generating..." : "Generate Cover Letter"}
        </button>
      </form>

      {error && (
        <p className="mt-6 text-center text-red-500 font-semibold">{error}</p>
      )}

      {result && (
        <div className="mt-10 p-6 bg-[#29294a] rounded-xl text-[#cbd5e1] whitespace-pre-wrap text-lg leading-relaxed shadow-md">
          {result}
        </div>
      )}
    </div>
  );
}
