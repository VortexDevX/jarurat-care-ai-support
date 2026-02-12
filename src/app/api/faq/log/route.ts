import { NextRequest, NextResponse } from "next/server";

// In-memory log for demo — in production use a database
const queryLogs: {
  query: string;
  matched: boolean;
  matchedFaqId: number | null;
  type: "unanswered" | "report";
  timestamp: string;
}[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, matched, matchedFaqId, type } = body;

    queryLogs.push({
      query: query || "",
      matched: matched ?? false,
      matchedFaqId: matchedFaqId || null,
      type: type || "unanswered",
      timestamp: new Date().toISOString(),
    });

    console.log(
      `[FAQ Log] ${type}: "${query}" | Matched: ${matched} | FAQ#${matchedFaqId}`,
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false }, { status: 200 });
  }
}

export async function GET() {
  return NextResponse.json({ logs: queryLogs }, { status: 200 });
}
