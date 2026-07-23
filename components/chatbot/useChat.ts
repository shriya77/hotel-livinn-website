"use client";

import { useCallback, useRef, useState } from "react";

export type ChatMessage = { id: string; role: "user" | "assistant"; content: string };
export type ChatStatus = "idle" | "loading" | "error";

let counter = 0;
const nextId = () => `m${Date.now()}_${counter++}`;

/**
 * Chat state + API integration. UI-agnostic so the presentation can change
 * without touching the transport, and the transport can change (provider swap)
 * without touching the UI.
 */
export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<ChatStatus>("idle");
  const inFlight = useRef(false);

  const run = useCallback(async (history: ChatMessage[]) => {
    if (inFlight.current) return;
    inFlight.current = true;
    setStatus("loading");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map(({ role, content }) => ({ role, content })),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as { reply?: string };
      if (!data.reply) throw new Error("empty");
      setMessages((m) => [...m, { id: nextId(), role: "assistant", content: data.reply! }]);
      setStatus("idle");
    } catch {
      setStatus("error");
    } finally {
      inFlight.current = false;
    }
  }, []);

  const send = useCallback(
    (text: string) => {
      const content = text.trim();
      if (!content || inFlight.current) return;
      const userMsg: ChatMessage = { id: nextId(), role: "user", content };
      const history = [...messages, userMsg];
      setMessages(history);
      void run(history);
    },
    [messages, run]
  );

  // Re-send the current conversation (which ends on the failed user turn).
  const retry = useCallback(() => {
    if (status !== "error" || messages.length === 0) return;
    void run(messages);
  }, [status, messages, run]);

  return { messages, status, send, retry };
}
