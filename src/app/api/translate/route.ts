import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export const maxDuration = 30; // seconds
export const maxTokens = 1000; // tokens

export async function POST(req: Request): Promise<Response> {
  const { text, targetLanguage } = await req.json();

  if (!text || !targetLanguage) {
    return new Response("Missing text or target language", { status: 400 });
  }

  const prompt = `Translate the following text to ${targetLanguage}:\n\n${text} Do not change the meaning of the text, just translate it.`;

  const { text: resultText } = await generateText({
    model: openai("o1-mini"),
    prompt,
    maxTokens,
    temperature: 0.5,
  });

  return Response.json({ result: resultText });
}
