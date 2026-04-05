import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJSON<T>(filename: string, fallback: T): T {
  ensureDataDir();
  const filepath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filepath)) return fallback;
  return JSON.parse(fs.readFileSync(filepath, "utf-8"));
}

function writeJSON<T>(filename: string, data: T) {
  ensureDataDir();
  const filepath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
}

// --- Config ---

export interface Config {
  apiKey: string;
  model: string;
  fallbackModel: string;
}

const DEFAULT_CONFIG: Config = {
  apiKey: "",
  model: "qwen/qwen3-235b-a22b:free",
  fallbackModel: "nvidia/llama-3.1-nemotron-ultra-253b-v1:free",
};

export function getConfig(): Config {
  return readJSON("config.json", DEFAULT_CONFIG);
}

export function setConfig(config: Partial<Config>) {
  const current = getConfig();
  writeJSON("config.json", { ...current, ...config });
}

// --- Question Queue ---

export interface Question {
  id: string;
  question: string;
  topic: string;
  docReference: string;
  createdAt: string;
}

export function getQuestionQueue(): Question[] {
  return readJSON("question_queue.json", []);
}

export function setQuestionQueue(queue: Question[]) {
  writeJSON("question_queue.json", queue);
}

export function popQuestion(): Question | null {
  const queue = getQuestionQueue();
  if (queue.length === 0) return null;
  const [first, ...rest] = queue;
  setQuestionQueue(rest);
  return first;
}

export function pushQuestion(question: Question) {
  const queue = getQuestionQueue();
  queue.push(question);
  setQuestionQueue(queue);
}

// --- Past Entries ---

export interface PastEntry {
  id: string;
  question: string;
  topic: string;
  docReference: string;
  userAnswer: string;
  verdict: "correct" | "incorrect";
  explanation: string;
  date: string;
}

export function getPastEntries(): PastEntry[] {
  return readJSON("past_entries.json", []);
}

export function addPastEntry(entry: PastEntry) {
  const entries = getPastEntries();
  entries.unshift(entry);
  writeJSON("past_entries.json", entries);
}

// --- Streak Data ---

export function getStreakDates(): string[] {
  return readJSON("streak_dates.json", []);
}

export function addStreakDate(date: string) {
  const dates = getStreakDates();
  if (!dates.includes(date)) {
    dates.push(date);
    writeJSON("streak_dates.json", dates);
  }
}
