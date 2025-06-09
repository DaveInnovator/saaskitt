import React, { useState } from "react";

export default function InstagramCaptionWizard() {
  const [type, setType] = useState("motivational");
  const [brand, setBrand] = useState("");
  const [extra, setExtra] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emojis, setEmojis] = useState(true);
  const [hashtags, setHashtags] = useState(true);

  const handleGenerate = async () => {
    setLoading(true);
    setResult("");
    setError("");

    const prompt = `
Generate a ${type} Instagram caption for a post by "${brand}".
${emojis ? "Include relevant emojis." : "Do not use emojis."}
${hashtags ? "Add 2-3 smart hashtags at the end." : "Don't include hashtags."}
Extra context: ${extra}
Make it catchy and attention-grabbing for IG.`.trim();

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are a creative social media expert." },
            { role: "user", content: prompt },
          ],
          max_tokens: 200,
          temperature: 0.9,
        }),
      });

      const data = await res.json();
      const caption = data.choices?.[0]?.message?.content || "Failed to generate.";
      setResult(caption.trim());
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-md shadow-lg text-white">
      <h1 className="text-center text-4xl font-bold mb-10 text-[#fff]">
        Instagram Caption Wizard
      </h1>

      <div className="space-y-6">
        <select
          className="w-full p-4 rounded-lg bg-gray-900  text-[#ddd] placeholder-[#fff] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="motivational">Motivational</option>
          <option value="funny">Funny</option>
          <option value="product promotion">Product Promo</option>
          <option value="aesthetic">Aesthetic</option>
          <option value="storytelling">Storytelling</option>
        </select>

        <input
          type="text"
          placeholder="Brand or Page Name"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full p-4 rounded-lg bg-gray-900  text-[#ddd] placeholder-[#fff] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        />

        <textarea
          placeholder="Optional: extra info about post (product, idea, vibe)"
          value={extra}
          onChange={(e) => setExtra(e.target.value)}
          className="w-full p-4 rounded-lg bg-gray-900  text-[#ddd] placeholder-[#fff] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
        ></textarea>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={emojis}
              onChange={() => setEmojis(!emojis)}
              className="accent-[blue-500]"
            />
            Emojis
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={hashtags}
              onChange={() => setHashtags(!hashtags)}
              className="accent-[blue-500]"
            />
            Hashtags
          </label>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !brand.trim()}
          className={`mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-5 py-2 rounded-md font-semibold transition text-white ${
            loading || !brand.trim()
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#61dafb] hover:bg-[#21a1f1]"
          } text-[#1e1e2f] transition`}
        >
          {loading ? "Generating..." : "Generate Caption"}
        </button>
      </div>

      {error && <p className="mt-6 text-center text-red-500">{error}</p>}

      {result && (
        <div className="mt-10 p-6 bg-[#29294a] rounded-xl text-[#cbd5e1] whitespace-pre-wrap text-lg leading-relaxed shadow-md">
          {result}
        </div>
      )}
    </div>
  );
}
