import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { category } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("Missing GEMINI_API_KEY");
      return NextResponse.json(getFallbackQuestion());
    }

    const modelId = "gemini-2.5-flash-lite";

    // ✅ Correct Gemini REST endpoint
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`;

    const prompt = `
Generate ONE beginner multiple-choice question about ${category || "General Knowledge"}.

Return ONLY valid JSON in this exact format:
{
  "question": "string",
  "options": ["string", "string", "string", "string"],
  "correctAnswer": "string",
  "explanation": "string"
}
`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          response_mime_type: "application/json",
        },
      }),
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      console.error("Gemini API Error:", data);
      return NextResponse.json(getFallbackQuestion());
    }

    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      console.error("Empty Gemini response");
      return NextResponse.json(getFallbackQuestion());
    }

    return NextResponse.json(JSON.parse(rawText));

  } catch (err) {
    console.error("Internal Route Error:", err);
    return NextResponse.json(getFallbackQuestion());
  }
}

function getFallbackQuestion() {
  return {
    question: "What does CPU stand for?",
    options: [
      "Central Processing Unit",
      "Computer Personal Unit",
      "Central Program Utility",
      "Control Processing User"
    ],
    correctAnswer: "Central Processing Unit",
    explanation: "CPU stands for Central Processing Unit."
  };
}  route.js