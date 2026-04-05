"use client";

import { useEffect, useState, useCallback } from "react";

interface Question {
  id: string;
  question: string;
  topic: string;
  docReference: string;
}

interface VerdictData {
  verdict: "correct" | "incorrect";
  explanation: string;
}

export default function Quiz() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [queueSize, setQueueSize] = useState(0);
  const [answer, setAnswer] = useState("");
  const [verdict, setVerdict] = useState<VerdictData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  const fetchQuestion = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/quiz");
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setQuestion(data.question);
        setQueueSize(data.queueSize);
      }
    } catch {
      setError("Failed to fetch question");
    }
    setLoading(false);
  }, []);

  const generateQuestions = useCallback(async () => {
    setGenerating(true);
    try {
      const res = await fetch("/api/generate", { method: "POST" });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        return;
      }
      await fetchQuestion();
    } catch {
      setError("Failed to generate questions");
    }
    setGenerating(false);
  }, [fetchQuestion]);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

  // Auto-generate if queue is empty
  useEffect(() => {
    if (!loading && !question && !generating && !error) {
      generateQuestions();
    }
  }, [loading, question, generating, error, generateQuestions]);

  const handleSubmit = async () => {
    if (!answer.trim() || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer: answer.trim() }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setVerdict({ verdict: data.verdict, explanation: data.explanation });
        // Trigger background refill of the queue
        fetch("/api/generate", { method: "POST" });
      }
    } catch {
      setError("Failed to submit answer");
    }
    setSubmitting(false);
  };

  const handleNext = async () => {
    setVerdict(null);
    setAnswer("");
    await fetchQuestion();
    if (!question) {
      await generateQuestions();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-zinc-400 animate-pulse">Loading question...</div>
      </div>
    );
  }

  if (generating) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-zinc-400 animate-pulse">
          Generating PyTorch questions... This may take a moment.
        </div>
      </div>
    );
  }

  if (error && !question) {
    return (
      <div className="py-10">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 text-sm">
          {error}
        </div>
        <button
          onClick={generateQuestions}
          className="mt-4 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-md text-sm transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      {question && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded">
              {question.topic}
            </span>
            <a
              href={question.docReference}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-sky-400 hover:text-sky-300 transition-colors"
            >
              Docs
            </a>
          </div>

          <p className="text-white text-lg leading-relaxed mb-6">
            {question.question}
          </p>

          {!verdict ? (
            <div>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here..."
                rows={5}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-4 text-white placeholder-zinc-600 focus:outline-none focus:border-sky-500 resize-y text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                    handleSubmit();
                  }
                }}
              />
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-zinc-600">Cmd+Enter to submit</span>
                <button
                  onClick={handleSubmit}
                  disabled={!answer.trim() || submitting}
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-500 disabled:bg-zinc-700 disabled:text-zinc-500 text-white rounded-md text-sm font-medium transition-colors"
                >
                  {submitting ? "Evaluating..." : "Submit"}
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div
                className={`rounded-lg p-5 mb-4 border ${
                  verdict.verdict === "correct"
                    ? "bg-emerald-500/10 border-emerald-500/30"
                    : "bg-amber-500/10 border-amber-500/30"
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`text-sm font-semibold ${
                      verdict.verdict === "correct"
                        ? "text-emerald-400"
                        : "text-amber-400"
                    }`}
                  >
                    {verdict.verdict === "correct" ? "Correct!" : "Not quite right"}
                  </span>
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {verdict.explanation}
                </p>
              </div>

              <div className="bg-zinc-900 rounded-lg p-4 mb-4 border border-zinc-800">
                <p className="text-xs text-zinc-500 mb-1">Your answer:</p>
                <p className="text-zinc-400 text-sm">{answer}</p>
              </div>

              <button
                onClick={handleNext}
                className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-md text-sm font-medium transition-colors"
              >
                Next Question
              </button>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="mt-4 bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
