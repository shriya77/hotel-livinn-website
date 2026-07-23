// ============================================================
// Chatbot / AI configuration — centralized so the model or provider
// can be swapped without touching the rest of the chatbot.
// ============================================================

export const AI_CONFIG = {
  provider: "gemini" as const,
  // Google's current stable Flash model. NOTE: the pinned "gemini-2.5-flash"
  // returns 404 for newly-created API keys ("no longer available to new users"),
  // so we use the auto-updating stable alias. Pin a specific version here later
  // if you prefer — it's the only line that needs to change.
  model: "gemini-flash-latest",
  endpoint: (model: string) =>
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
  generation: {
    temperature: 0.4, // accuracy-leaning for customer service
    topP: 0.9,
    // Headroom for the model's internal reasoning + a concise reply. The system
    // prompt keeps answers short; this cap just prevents runaway responses.
    maxOutputTokens: 1024,
  },
} as const;

// Basic abuse protection (per-IP, in-memory — best-effort on serverless).
export const LIMITS = {
  maxMessageChars: 1500, // reject very long single messages
  maxHistoryMessages: 16, // only send recent turns to the model
  rateWindowMs: 60_000,
  rateMaxPerWindow: 20, // requests per IP per minute
};
