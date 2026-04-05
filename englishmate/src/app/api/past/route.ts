import { NextResponse } from "next/server";
import { getPastEntries } from "@/lib/storage";

export async function GET() {
  const entries = getPastEntries();
  return NextResponse.json({ entries });
}
