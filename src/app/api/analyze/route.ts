import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, cancerType, role, supportType, message } = body;

    if (!name || !role || !supportType || !message) {
      return NextResponse.json(
        { error: "All required fields must be filled." },
        { status: 400 },
      );
    }

    const cancerInfo = cancerType
      ? `- Cancer Type: ${cancerType}`
      : "- Cancer Type: Not specified";

    const prompt = `
You are an AI assistant for Jarurat Care, a cancer care support NGO in India.

IMPORTANT RULES:
- All recommendations must be non-medical, non-diagnostic, and focused on support coordination, resources, or volunteer actions only.
- Never prescribe treatment, advise on side effects, or sound like a clinician.
- Always use words like "connect", "facilitate", "guide to resources", "coordinate".
- Keep all suggested actions operational and support-focused, not medical.
- Use "requester" instead of "patient" when giving recommendations.

A ${role} has submitted a support request. Analyze it and respond in ONLY valid JSON (no markdown, no backticks, no explanation).

Details:
- Name: ${name}
${cancerInfo}
- Role: ${role}
- Support Needed: ${supportType}
- Message: "${message}"

Respond with this exact JSON structure:
{
  "summary": "A clear 3-line summary of what the person needs and their situation.",
  "urgency": "Low or Medium or High",
  "urgencyReason": "One sentence explaining why this urgency level was assigned.",
  "suggestedNextSteps": "One actionable non-medical recommendation focused on volunteer coordination, resource sharing, or logistical support."
}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 400,
    });

    const content = completion.choices[0]?.message?.content?.trim();

    if (!content) {
      return NextResponse.json(
        { error: "No response from AI." },
        { status: 500 },
      );
    }

    const cleaned = content
      .replace(/```json\s*/gi, "")
      .replace(/```\s*/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    // Normalize key: accept both "recommendation" and "suggestedNextSteps"
    const normalized = {
      summary: parsed.summary,
      urgency: parsed.urgency,
      urgencyReason: parsed.urgencyReason,
      suggestedNextSteps:
        parsed.suggestedNextSteps || parsed.recommendation || "",
    };

    return NextResponse.json(
      { success: true, data: normalized, source: "ai" },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("API Error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
