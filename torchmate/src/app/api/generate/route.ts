import { NextResponse } from "next/server";
import { getQuestionQueue, pushQuestion } from "@/lib/storage";
import { chatCompletion } from "@/lib/openrouter";
import { getRandomTopicWithDoc } from "@/lib/pytorch-topics";

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

      const systemPrompt = `You are a PyTorch expert educator. Generate a single thought-provoking quiz question about PyTorch programming.

Topic area: ${topic.category} > ${topic.name}
Topic description: ${topic.description}
Official PyTorch documentation reference: ${topic.docUrl}

Rules:
- The question should test deep understanding, not just surface knowledge.
- It can be about system-level internals, programming patterns, best practices, common pitfalls, or performance considerations.
- Reference concepts from the official PyTorch documentation at the URL above.
- The question should be answerable in 2-5 sentences.
- Do NOT include the answer in your response.
- Do NOT include multiple choice options.
- Return ONLY the question text, nothing else. No preamble, no "Question:" prefix.`;

      const question = await chatCompletion([
        { role: "system", content: systemPrompt },
        { role: "user", content: "Generate a PyTorch quiz question." },
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
