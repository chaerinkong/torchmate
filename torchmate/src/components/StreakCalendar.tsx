"use client";

import { useEffect, useState } from "react";

export default function StreakCalendar() {
  const [streakDates, setStreakDates] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/streak")
      .then((r) => r.json())
      .then((data) => setStreakDates(data.dates || []));
  }, []);

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0=Sun

  const monthName = now.toLocaleString("default", { month: "long", year: "numeric" });

  const days: (number | null)[] = [];
  // Pad leading blanks
  for (let i = 0; i < firstDayOfWeek; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="mt-10">
      <h2 className="text-lg font-semibold text-white mb-4">Streak - {monthName}</h2>
      <div className="grid grid-cols-7 gap-1.5">
        {dayLabels.map((d) => (
          <div key={d} className="text-center text-xs text-zinc-500 pb-1">
            {d}
          </div>
        ))}
        {days.map((day, i) => {
          if (day === null) {
            return <div key={`blank-${i}`} />;
          }
          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const isFilled = streakDates.includes(dateStr);
          const isToday = day === now.getDate();

          return (
            <div
              key={dateStr}
              className={`aspect-square rounded-md flex items-center justify-center text-xs font-medium transition-colors ${
                isFilled
                  ? "bg-sky-400/80 text-white"
                  : "bg-zinc-800/50 text-zinc-500"
              } ${isToday ? "ring-2 ring-sky-400/50" : ""}`}
              title={dateStr}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
