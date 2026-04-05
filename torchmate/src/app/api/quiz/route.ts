import { NextRequest, NextResponse } from "next/server";
import {
  getQuestionQueue,
  popQuestion,
  addPastEntry,
  addStreakDate,
  type Question,
} from "@/lib/storage";
import { chatCompletion } from "@/lib/openrouter";

// GET: Fetch the current question (peek at front of queue)
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

// POST: Submit an answer for the current question
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

    const systemPrompt = `You are a PyTorch expert educator reviewing a student's answer to a quiz question.

Topic: ${question.topic}
Official documentation reference: ${question.docReference}

Instructions:
1. Evaluate whether the student's answer is correct or incorrect.
2. Start your response with exactly one of: "CORRECT" or "INCORRECT" on the first line.
3. Then provide a detailed explanation:
   - If correct: acknowledge what they got right and add complementary information that deepens understanding. Reference the official PyTorch documentation where relevant.
   - If incorrect: explain what the correct answer is with sufficient detail. Reference the official PyTorch documentation. Be encouraging but thorough.
4. Reference the documentation URL (${question.docReference}) in your explanation when relevant.
5. Keep the explanation concise but educational (3-6 sentences).`;

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
