import React, { useState } from 'react';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker?worker';
import mammoth from 'mammoth';

// Fix the worker issue for Vite
GlobalWorkerOptions.workerPort = new pdfjsWorker();

const HUGGING_FACE_API_URL = import.meta.env.VITE_HF2_API_TOKEN;

export default function StudyPromptAssistant() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const extractTextFromFile = async (file) => {
    setError('');
    const fileType = file.name.split('.').pop().toLowerCase();

    try {
      if (fileType === 'pdf') {
        const reader = new FileReader();
        reader.onload = async () => {
          const typedArray = new Uint8Array(reader.result);
          const pdf = await getDocument({ data: typedArray }).promise;

          let fullText = '';
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const pageText = content.items.map(item => item.str).join(' ');
            fullText += pageText + '\n';
          }

          setText(fullText);
        };
        reader.readAsArrayBuffer(file);
      } else if (fileType === 'docx') {
        const reader = new FileReader();
        reader.onload = async () => {
          const result = await mammoth.extractRawText({ arrayBuffer: reader.result });
          setText(result.value);
        };
        reader.readAsArrayBuffer(file);
      } else if (fileType === 'txt') {
        const reader = new FileReader();
        reader.onload = () => {
          setText(reader.result);
        };
        reader.readAsText(file);
      } else {
        setError('Unsupported file type. Please upload .pdf, .docx, or .txt files.');
      }
    } catch (err) {
      setError('Error extracting text: ' + err.message);
    }
  };

  const summarizeText = async () => {
  setLoading(true);
  setSummary('');
  try {
    const response = await fetch("https://api-inference.huggingface.co/models/facebook/bart-large-cnn", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HUGGING_FACE_API_URL}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: text.slice(0, 1000) }),
    });

    const data = await response.json();

    // Check if it's an error or if the structure is correct
    if (Array.isArray(data) && data[0]?.summary_text) {
      setSummary(data[0].summary_text);
    } else if (data.error) {
      console.error('HF API Error:', data.error);
      setSummary("Error from Hugging Face: " + data.error);
    } else {
      console.warn('Unexpected HF API response:', data);
      setSummary("Could not generate summary. Unexpected response.");
    }
  } catch (error) {
    console.error('Summarization failed:', error);
    setSummary("Error summarizing the text.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="bg-zinc-900 text-white p-6 rounded-2xl shadow-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📘 Study Prompt Assistant</h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or upload text here..."
        className="w-full bg-zinc-800 p-4 rounded-lg h-48 mb-4 resize-none"
      />

      <div className="flex items-center gap-4 mb-4">
        <label className="bg-zinc-800 hover:bg-zinc-700 cursor-pointer px-4 py-2 rounded-lg text-sm">
          📎 Upload File
          <input
            type="file"
            accept=".pdf,.docx,.txt"
            className="hidden"
            onChange={(e) => e.target.files[0] && extractTextFromFile(e.target.files[0])}
          />
        </label>

        <button
          onClick={summarizeText}
          className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-lg text-white text-sm"
          disabled={!text}
        >
          ✨ Summarize
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-gray-400">⏳ Generating summary...</p>
      ) : (
        summary && (
          <div className="bg-zinc-800 p-4 rounded-lg mt-4">
            <h3 className="font-semibold mb-2">📝 Summary:</h3>
            <p className="text-sm">{summary}</p>
          </div>
        )
      )}

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
