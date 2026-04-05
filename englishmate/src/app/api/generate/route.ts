import { NextResponse } from "next/server";
import { getQuestionQueue, pushQuestion } from "@/lib/storage";
import { chatCompletion } from "@/lib/openrouter";
import { getRandomTopicWithDoc } from "@/lib/english-topics";

const MAX_QUEUE_SIZE = 3;

export async function POST() {
  try {
    const queue = getQuestionQueue();
    if (queue.length >= MAX_QUEUE_SIZE) {
      return NextResponse.json({ message: "Queue is full", queueSize: queue.length });
    }

    const toGenerate = MAX_QUEUE_SIZE - queue.length;
    const generated: typeof queue = [];

    for (let i = 0; i < toGenerate; i++) {
      const topic = getRandomTopicWithDoc();

      const systemPrompt = `You are an English language expert educator helping a non-native speaker broaden their vocabulary, expressions, and idioms.

Topic area: ${topic.category} > ${topic.name}
Example expressions in this area: ${topic.description}
Reference: ${topic.docUrl}

Rules:
- Pick ONE specific expression, idiom, phrase, or vocabulary word from the topic area (preferably from the examples, but you may pick other well-known ones in the same category).
- Ask a short, direct question about it. Good formats:
  - "What does the expression '___' mean?"
  - "What does it mean when someone says '___'?"
  - "In what situation would you use the phrase '___'?"
  - "What is the difference between '___' and '___'?"
  - "What word means ___ (definition)?"
- Keep the question SHORT — one or two sentences max.
- Pick expressions that are genuinely useful in real conversations, movies, books, or professional settings.
- Do NOT include the answer in your response.
- Do NOT include multiple choice options.
- Return ONLY the question text, nothing else. No preamble, no "Question:" prefix.`;

      const question = await chatCompletion([
        { role: "system", content: systemPrompt },
        { role: "user", content: "Generate an English quiz question." },
      ]);

      const q = {
        id: `q_${Date.now()}_${i}`,
        question: question.trim(),
        topic: `${topic.category} > ${topic.name}`,
        docReference: topic.docUrl,
        createdAt: new Date().toISOString(),
      };

      pushQuestion(q);
      generated.push(q);
    }

    return NextResponse.json({ message: `Generated ${generated.length} questions`, queueSize: getQuestionQueue().length });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
