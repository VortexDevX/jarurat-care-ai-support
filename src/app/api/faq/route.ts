import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { faqData } from "@/data/faqData";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const SAFE_FALLBACK =
  "I can help with general information about Jarurat Care's support services. For medical questions or personalised help, please submit a support request so our volunteer team can assist you.";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question } = body;

    if (!question || !question.trim()) {
      return NextResponse.json(
        { error: "Please enter a question." },
        { status: 400 },
      );
    }

    const faqContext = faqData
      .map((faq) => {
        const bullets = faq.bullets
          ? "\n" + faq.bullets.map((b) => `• ${b}`).join("\n")
          : "";
        return `[FAQ #${faq.id}] Q: ${faq.question}\nA: ${faq.answer}${bullets}`;
      })
      .join("\n\n");

    const prompt = `
You are an assistant that rephrases predefined FAQ answers for a healthcare NGO.
You must answer ONLY using the provided FAQ content.
If the question is medical, diagnostic, or outside scope, politely refuse and suggest submitting a support request.
Do not add new information. Do not provide medical advice.
All recommendations must be non-medical, non-diagnostic, and focused on support coordination only.

Here are the FAQs you can use:

${faqContext}

---

User question: "${question}"

Instructions:
1. Find the most relevant FAQ(s) that match the user's question.
2. Rephrase the answer in a friendly, clear tone using 2-4 short sentences.
3. If the question matches multiple FAQs, combine relevant parts.
4. If NO FAQ matches or the question is medical/diagnostic, respond with EXACTLY:
   "${SAFE_FALLBACK}"
5. Respond in ONLY valid JSON (no markdown, no backticks):
{
  "answer": "Your rephrased answer here.",
  "matchedFaqId": <number or null if no match>,
  "matched": <true or false>
}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      max_tokens: 300,
    });

    const content = completion.choices[0]?.message?.content?.trim();

    if (!content) {
      return NextResponse.json(
        { answer: SAFE_FALLBACK, matchedFaqId: null, matched: false },
        { status: 200 },
      );
    }

    const cleaned = content
      .replace(/```json\s*/gi, "")
      .replace(/```\s*/g, "")
      .trim();

    try {
      const parsed = JSON.parse(cleaned);
      return NextResponse.json(
        {
          answer: parsed.answer || SAFE_FALLBACK,
          matchedFaqId: parsed.matchedFaqId || null,
          matched: parsed.matched ?? false,
        },
        { status: 200 },
      );
    } catch {
      // If JSON parse fails, return raw content as answer
      return NextResponse.json(
        { answer: cleaned, matchedFaqId: null, matched: false },
        { status: 200 },
      );
    }
  } catch (error: unknown) {
    console.error("FAQ API Error:", error);
    return NextResponse.json(
      { answer: SAFE_FALLBACK, matchedFaqId: null, matched: false },
      { status: 200 },
    );
  }
}
