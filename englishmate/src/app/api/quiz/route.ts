import { NextRequest, NextResponse } from "next/server";
import {
  getQuestionQueue,
  popQuestion,
  addPastEntry,
  addStreakDate,
  type Question,
} from "@/lib/storage";
import { chatCompletion } from "@/lib/openrouter";

export async function GET() {
  try {
    const queue = getQuestionQueue();
    if (queue.length === 0) {
      return NextResponse.json({ question: null, queueSize: 0 });
    }
    return NextResponse.json({ question: queue[0], queueSize: queue.length });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { answer } = await request.json();
    if (!answer || typeof answer !== "string" || !answer.trim()) {
      return NextResponse.json({ error: "Answer is required" }, { status: 400 });
    }

    const question: Question | null = popQuestion();
    if (!question) {
      return NextResponse.json({ error: "No question available" }, { status: 400 });
    }

    const systemPrompt = `You are an English language expert educator helping a non-native speaker learn expressions, idioms, and vocabulary.

Topic: ${question.topic}
Reference: ${question.docReference}

Instructions:
1. Evaluate whether the student's answer captures the correct meaning (it doesn't need to be word-perfect — accept reasonable paraphrases).
2. Start your response with exactly one of: "CORRECT" or "INCORRECT" on the first line.
3. Then provide an enlightening explanation:
   - Give the precise meaning of the expression or word.
   - Provide 1-2 natural example sentences showing how it's used in real conversation or writing.
   - If there's an interesting origin story or etymology, briefly mention it.
   - Mention any related expressions or common variations.
   - If incorrect: be encouraging — explain the correct meaning clearly so they'll remember it next time.
4. Keep the explanation informative but concise (4-7 sentences).`;

    const response = await chatCompletion([
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `Question: ${question.question}\n\nStudent's Answer: ${answer}`,
      },
    ]);

    const firstLine = response.split("\n")[0].trim().toUpperCase();
    const isCorrect = firstLine.startsWith("CORRECT");
    const explanation = response.replace(/^(CORRECT|INCORRECT)\s*/i, "").trim();

    const today = new Date().toISOString().split("T")[0];

    const entry = {
      id: `e_${Date.now()}`,
      question: question.question,
      topic: question.topic,
      docReference: question.docReference,
      userAnswer: answer,
      verdict: (isCorrect ? "correct" : "incorrect") as "correct" | "incorrect",
      explanation,
      date: today,
    };

    addPastEntry(entry);
    addStreakDate(today);

    return NextResponse.json({
      verdict: entry.verdict,
      explanation: entry.explanation,
      entry,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
