"use client";

import { useEffect, useState } from "react";

interface PastEntry {
  id: string;
  question: string;
  topic: string;
  docReference: string;
  userAnswer: string;
  verdict: "correct" | "incorrect";
  explanation: string;
  date: string;
}

export default function PastPage() {
  const [entries, setEntries] = useState<PastEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/past")
      .then((r) => r.json())
      .then((data) => {
        setEntries(data.entries || []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-zinc-400 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Past Questions</h1>

      {entries.length === 0 ? (
        <p className="text-zinc-500">No past questions yet. Complete a quiz to see your history here.</p>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="bg-zinc-900 border border-zinc-800 rounded-lg p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded ${
                      entry.verdict === "correct"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-amber-500/20 text-amber-400"
                    }`}
                  >
                    {entry.verdict === "correct" ? "Correct" : "Incorrect"}
                  </span>
                  <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded">
                    {entry.topic}
                  </span>
                </div>
                <span className="text-xs text-zinc-600">{entry.date}</span>
              </div>

              <p className="text-white text-sm font-medium mb-3">
                {entry.question}
              </p>

              <div className="bg-zinc-950 rounded-md p-3 mb-3 border border-zinc-800">
                <p className="text-xs text-zinc-500 mb-1">Your answer:</p>
                <p className="text-zinc-400 text-sm">{entry.userAnswer}</p>
              </div>

              <div
                className={`rounded-md p-3 border ${
                  entry.verdict === "correct"
                    ? "bg-emerald-500/5 border-emerald-500/20"
                    : "bg-amber-500/5 border-amber-500/20"
                }`}
              >
                <p className="text-xs text-zinc-500 mb-1">Explanation:</p>
                <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {entry.explanation}
                </p>
              </div>

              {entry.docReference && (
                <a
                  href={entry.docReference}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Reference
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
