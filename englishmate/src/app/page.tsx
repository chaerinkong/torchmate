import Quiz from "@/components/Quiz";
import StreakCalendar from "@/components/StreakCalendar";

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">English Quiz</h1>
      <Quiz />
      <StreakCalendar />
    </div>
  );
}
