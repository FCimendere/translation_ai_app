import { google } from "@ai-sdk/google";
import { generateText } from "ai";

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
    model: google("models/gemini-2.0-flash-exp"),
    prompt,
    maxTokens,
    temperature: 0.5,
  });
  let result;
  try {
    // Find the first { and last } to extract JSON substring
    const jsonMatch = llmResponse.match(/{[\s\S]*}/);
    if (!jsonMatch) throw new Error("No JSON found in LLM response");
    result = JSON.parse(jsonMatch[0]);
  } catch (e) {
    return new Response("LLM response parse error", { status: 500 });
  }
  console.log("LLM Response:", llmResponse);

  return Response.json(result);
}
