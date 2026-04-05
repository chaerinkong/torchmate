import { getConfig } from "./storage";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function chatCompletion(messages: Message[]): Promise<string> {
  const config = getConfig();
  if (!config.apiKey) {
    throw new Error("OpenRouter API key not configured. Go to Settings to set it up.");
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "TorchMate",
    },
    body: JSON.stringify({
      model: config.model,
      messages,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter API error (${response.status}): ${error}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}
