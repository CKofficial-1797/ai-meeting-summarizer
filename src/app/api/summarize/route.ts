import { NextRequest, NextResponse } from "next/server";
import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";

export async function POST(req: NextRequest) {
  try {
    const { transcript, prompt } = await req.json();

    if (!transcript || !prompt) {
      return NextResponse.json({ error: "Transcript or prompt missing" }, { status: 400 });
    }

    // Call Groq API using latest SDK
    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"), // Use a currently supported model
      prompt: `You are a meeting summarizer.\n\n${prompt}\n\nTranscript:\n${transcript}`,
      temperature: 0.7,
      maxOutputTokens: 500,
    });

    return NextResponse.json({ summary: text });
  } catch (err: any) {
    console.error("Summarize API error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
