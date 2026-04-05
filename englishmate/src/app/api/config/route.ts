import { NextRequest, NextResponse } from "next/server";
import { getConfig, setConfig } from "@/lib/storage";

export async function GET() {
  const config = getConfig();
  return NextResponse.json({
    ...config,
    apiKey: config.apiKey ? `${config.apiKey.slice(0, 8)}...${config.apiKey.slice(-4)}` : "",
    hasApiKey: !!config.apiKey,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const updates: Record<string, string> = {};

    if (body.apiKey !== undefined) updates.apiKey = body.apiKey;
    if (body.model !== undefined) updates.model = body.model;
    if (body.fallbackModel !== undefined) updates.fallbackModel = body.fallbackModel;

    setConfig(updates);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
