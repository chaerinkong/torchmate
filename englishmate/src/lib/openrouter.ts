import { getConfig } from "./storage";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

async function callModel(apiKey: string, model: string, messages: Message[]): Promise<Response> {
  return fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:3001",
      "X-Title": "EnglishMate",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7,
    }),
  });
}

export async function chatCompletion(messages: Message[]): Promise<string> {
  const config = getConfig();
  if (!config.apiKey) {
    throw new Error("OpenRouter API key not configured. Go to Settings to set it up.");
  }

  const primary = await callModel(config.apiKey, config.model, messages);
  if (primary.ok) {
    const data = await primary.json();
    return data.choices[0].message.content;
  }

  const shouldFallback = primary.status === 429 || primary.status >= 500;
  if (shouldFallback && config.fallbackModel) {
    console.log(`Primary model (${config.model}) returned ${primary.status}, falling back to ${config.fallbackModel}`);
    const fallback = await callModel(config.apiKey, config.fallbackModel, messages);
    if (fallback.ok) {
      const data = await fallback.json();
      return data.choices[0].message.content;
    }
    const fallbackError = await fallback.text();
    throw new Error(`Both models failed. Fallback (${config.fallbackModel}) error (${fallback.status}): ${fallbackError}`);
  }

  const error = await primary.text();
  throw new Error(`OpenRouter API error (${primary.status}): ${error}`);
}
