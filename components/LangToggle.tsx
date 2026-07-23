"use client";

import { motion } from "framer-motion";
import { LANGS } from "@/lib/i18n";
import { useLang } from "./LanguageProvider";

export function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();

  return (
    <div className={`langtoggle ${className}`} role="group" aria-label="Language">
      {LANGS.map((l) => {
        const active = l.code === lang;
        return (
          <button
            key={l.code}
            type="button"
            className={`langtoggle__btn${active ? " is-active" : ""}`}
            aria-pressed={active}
            aria-label={l.label}
            title={l.label}
            onClick={() => setLang(l.code)}
          >
            {active && (
              <motion.span
                layoutId="langpill"
                className="langtoggle__pill"
                transition={{ type: "spring", stiffness: 400, damping: 34 }}
              />
            )}
            <span className="langtoggle__label">{l.short}</span>
          </button>
        );
      })}
    </div>
  );
}
