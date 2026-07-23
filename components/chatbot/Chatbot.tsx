"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { contact } from "@/lib/data";
import { useLang } from "../LanguageProvider";
import { useChat } from "./useChat";

export function Chatbot() {
  const { t } = useLang();
  const c = t.chat;
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, status, send, retry } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const waHref = `https://wa.me/${contact.whatsapp}`;

  // Auto-scroll to the latest message / typing indicator.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
  }, [open]);

  const submit = () => {
    if (!input.trim() || status === "loading") return;
    send(input);
    setInput("");
  };

  const onKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <>
      {/* Floating launcher */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="launcher"
            className="cbot__launcher"
            aria-label={c.openAria}
            onClick={() => setOpen(true)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <ChatIcon />
            <span className="cbot__launcher-dot" aria-hidden />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="window"
            className="cbot__window"
            role="dialog"
            aria-label={c.concierge}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <header className="cbot__head">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/livinn-mark.png" alt="" className="cbot__head-logo" />
              <div className="cbot__head-titles">
                <span className="cbot__head-name">Hotel Liv-Inn</span>
                <span className="cbot__head-sub">
                  <span className="cbot__dot" aria-hidden /> {c.concierge} · {c.online}
                </span>
              </div>
              <button className="cbot__close" aria-label={c.closeAria} onClick={() => setOpen(false)}>
                <CloseIcon />
              </button>
            </header>

            {/* Messages */}
            <div className="cbot__body" ref={scrollRef}>
              <div className="cbot__msg cbot__msg--bot">{c.greeting}</div>

              {messages.length === 0 && (
                <div className="cbot__quick">
                  {c.quickActions.map((q) => (
                    <button
                      key={q.label}
                      className="cbot__chip"
                      onClick={() => send(q.prompt)}
                      disabled={status === "loading"}
                    >
                      <span aria-hidden>{q.emoji}</span> {q.label}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`cbot__msg cbot__msg--${m.role === "user" ? "user" : "bot"}`}
                >
                  {m.content}
                </div>
              ))}

              {status === "loading" && (
                <div className="cbot__msg cbot__msg--bot cbot__typing" aria-label="Typing">
                  <span /> <span /> <span />
                </div>
              )}

              {status === "error" && (
                <div className="cbot__error">
                  <p>{c.error}</p>
                  <button className="cbot__retry" onClick={retry}>
                    {c.retry}
                  </button>
                </div>
              )}
            </div>

            {/* Composer */}
            <div className="cbot__foot">
              <div className="cbot__escalate">
                <a href={contact.mobile.href}>{c.call}</a>
                <a href={waHref} target="_blank" rel="noopener">
                  {c.whatsapp}
                </a>
              </div>
              <div className="cbot__composer">
                <textarea
                  ref={inputRef}
                  className="cbot__input"
                  rows={1}
                  placeholder={c.placeholder}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKey}
                  aria-label={c.placeholder}
                />
                <button
                  className="cbot__send"
                  onClick={submit}
                  disabled={!input.trim() || status === "loading"}
                  aria-label={c.send}
                >
                  <SendIcon />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---- inline icons (no extra deps) ---- */
function ChatIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 11.5a8.5 8.5 0 0 1-12.2 7.66L3 21l1.9-5.6A8.5 8.5 0 1 1 21 11.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="8.5" cy="11.5" r="1" fill="currentColor" />
      <circle cx="12" cy="11.5" r="1" fill="currentColor" />
      <circle cx="15.5" cy="11.5" r="1" fill="currentColor" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 12l16-8-6 16-3.5-6.5L4 12Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
