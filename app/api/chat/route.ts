// ============================================================
// POST /api/chat — server-side Gemini proxy for the Virtual Concierge.
// The API key never leaves the server. Handles rate limiting, input
// validation, and safe error responses (no internals leaked).
// ============================================================

import { NextResponse } from "next/server";
import { AI_CONFIG, LIMITS } from "@/lib/chatbot/config";
import { buildSystemPrompt } from "@/lib/chatbot/prompt";

export const runtime = "nodejs";

const SYSTEM_PROMPT = buildSystemPrompt();

// Best-effort in-memory rate limiter (per server instance).
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < LIMITS.rateWindowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // guard against unbounded growth
  return recent.length > LIMITS.rateMaxPerWindow;
}

type ClientMessage = { role: "user" | "assistant"; content: string };

function sanitize(messages: unknown): ClientMessage[] | null {
  if (!Array.isArray(messages) || messages.length === 0) return null;
  const cleaned: ClientMessage[] = [];
  for (const m of messages) {
    if (!m || typeof m !== "object") return null;
    const role = (m as ClientMessage).role;
    const content = (m as ClientMessage).content;
    if (role !== "user" && role !== "assistant") return null;
    if (typeof content !== "string") return null;
    const trimmed = content.trim();
    if (!trimmed) continue;
    if (trimmed.length > LIMITS.maxMessageChars) return null;
    cleaned.push({ role, content: trimmed });
  }
  if (cleaned.length === 0 || cleaned[cleaned.length - 1].role !== "user") return null;
  return cleaned.slice(-LIMITS.maxHistoryMessages);
}

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // Misconfiguration — don't leak details.
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const messages = sanitize((body as { messages?: unknown })?.messages);
  if (!messages) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const payload = {
    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
    generationConfig: {
      temperature: AI_CONFIG.generation.temperature,
      topP: AI_CONFIG.generation.topP,
      maxOutputTokens: AI_CONFIG.generation.maxOutputTokens,
    },
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);

  try {
    const res = await fetch(AI_CONFIG.endpoint(AI_CONFIG.model), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!res.ok) {
      // Log server-side only; return a generic error to the client.
      console.error("[chat] Gemini error", res.status, await res.text().catch(() => ""));
      return NextResponse.json({ error: "upstream" }, { status: 502 });
    }

    const data = await res.json();
    const reply: string =
      data?.candidates?.[0]?.content?.parts
        ?.map((p: { text?: string }) => p.text ?? "")
        .join("")
        .trim() ?? "";

    if (!reply) {
      // Safety block or empty completion — friendly fallback.
      return NextResponse.json({ error: "empty" }, { status: 502 });
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("[chat] request failed", err);
    return NextResponse.json({ error: "upstream" }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}
