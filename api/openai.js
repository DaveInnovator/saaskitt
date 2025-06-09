import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt, type } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "No prompt provided" });
  }

  let fullPrompt = prompt;

  if (type === "summarize") {
    fullPrompt = `Summarize this clearly and concisely:\n\n${prompt}`;
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4o",
      messages: [{ role: "user", content: fullPrompt }],
      max_tokens: 300,
    });

    const result = completion.data.choices[0].message.content.trim();
    res.status(200).json({ result });
  } catch (error) {
    console.error("OpenAI API error:", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
}
