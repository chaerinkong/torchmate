"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("qwen/qwen3.6-plus:free");
  const [fallbackModel, setFallbackModel] = useState("nvidia/nemotron-3-super-120b-a12b:free");
  const [hasApiKey, setHasApiKey] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/config")
      .then((r) => r.json())
      .then((data) => {
        setModel(data.model || "qwen/qwen3.6-plus:free");
        setFallbackModel(data.fallbackModel || "nvidia/nemotron-3-super-120b-a12b:free");
        setHasApiKey(data.hasApiKey || false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    const body: Record<string, string> = { model, fallbackModel };
    if (apiKey) body.apiKey = apiKey;

    await fetch("/api/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setSaving(false);
    setSaved(true);
    if (apiKey) {
      setHasApiKey(true);
      setApiKey("");
    }
    setTimeout(() => setSaved(false), 2000);
  };

  const popularModels = [
    "qwen/qwen3.6-plus:free",
    "nvidia/nemotron-3-super-120b-a12b:free",
    "deepseek/deepseek-chat-v3-0324:free",
    "meta-llama/llama-4-maverick:free",
    "google/gemini-2.5-flash-preview",
    "anthropic/claude-sonnet-4",
    "openai/gpt-4o-mini",
  ];

  const modelSelector = (
    label: string,
    value: string,
    setValue: (v: string) => void
  ) => (
    <div className="mb-5">
      <label className="block text-sm font-medium text-zinc-300 mb-2">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full bg-zinc-950 border border-zinc-700 rounded-md px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 text-sm mb-2"
      />
      <div className="flex flex-wrap gap-1.5">
        {popularModels.map((m) => (
          <button
            key={m}
            onClick={() => setValue(m)}
            className={`text-xs px-2 py-1 rounded transition-colors ${
              value === m
                ? "bg-emerald-600 text-white"
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
            }`}
          >
            {m.split("/")[1]}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 max-w-lg">
        <div className="mb-5">
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            OpenRouter API Key
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder={hasApiKey ? "Key is set (enter new to update)" : "sk-or-v1-..."}
            className="w-full bg-zinc-950 border border-zinc-700 rounded-md px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 text-sm"
          />
          {hasApiKey && !apiKey && (
            <p className="text-xs text-emerald-400 mt-1">API key is configured</p>
          )}
          <p className="text-xs text-zinc-600 mt-1">
            Get your API key at{" "}
            <a
              href="https://openrouter.ai/keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300"
            >
              openrouter.ai/keys
            </a>
          </p>
        </div>

        {modelSelector("Primary Model", model, setModel)}
        {modelSelector("Fallback Model", fallbackModel, setFallbackModel)}

        <p className="text-xs text-zinc-500 mb-4">
          If the primary model is rate-limited (429) or has a server error, the fallback model is used automatically.
        </p>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-700 text-white rounded-md text-sm font-medium transition-colors"
        >
          {saving ? "Saving..." : saved ? "Saved!" : "Save"}
        </button>

        <p className="text-xs text-zinc-600 mt-3">
          Browse models at{" "}
          <a
            href="https://openrouter.ai/models"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300"
          >
            openrouter.ai/models
          </a>
        </p>
      </div>
    </div>
  );
}
