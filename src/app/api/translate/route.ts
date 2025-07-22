// import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { NextResponse } from "next/server";
import { generateText } from "ai";
import { z } from "zod";

const schema = z.object({
  sourceLanguage: z.string(),
  translation: z.string(),
});

export const maxDuration = 30; // seconds
export const maxTokens = 256; // tokens

export async function POST(req: Request): Promise<Response> {
  const { text, targetLanguage } = await req.json();

  if (!text || !targetLanguage) {
    return new Response("Missing text or target language", { status: 400 });
  }

  const prompt = `
Detect the language of the following text and translate it to ${targetLanguage}.
Respond in JSON format: {"sourceLanguage": "<detected language name>", "translation": "<translated text>"}

Text:
${text}
`;

  const { text: llmResponse } = await generateText({
    // model: google("models/gemini-2.0-flash-exp"),
    model: openai("gpt-4.1-mini-2025-04-14"),
    prompt,
  });

  let result;

  try {
    const jsonMatch = llmResponse.match(/{[\s\S]*}/);
    if (!jsonMatch) throw new Error("No JSON found in LLM response");

    result = schema.parse(JSON.parse(jsonMatch[0]));
  } catch (e) {
    return new Response(`LLM response parse error - ${e}`, { status: 500 });
  }

  return NextResponse.json(result);
}
