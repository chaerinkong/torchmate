import { NextResponse } from "next/server";
import { getStreakDates } from "@/lib/storage";

export async function GET() {
  const dates = getStreakDates();
  return NextResponse.json({ dates });
}
