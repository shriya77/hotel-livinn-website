"use client";

import { useEffect, useState } from "react";
import { nav } from "@/lib/data";
import { useLang } from "./LanguageProvider";
import { LangToggle } from "./LangToggle";

export function Nav() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="nav__inner">
        <a href="#top" className="brand" aria-label="Liv-Inn home">
          <span className="brand__mark">L·I</span>
          <span className="brand__name">
            <span className="brand__word">LIV·INN</span>
            <span className="brand__sub">{t.brandSub}</span>
          </span>
        </a>

        <nav className={`nav__links${open ? " open" : ""}`} aria-label="Primary">
          {nav.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {t.nav[item.key]}
            </a>
          ))}
          <a href="#book" className="nav__cta" onClick={() => setOpen(false)}>
            {t.nav.reserve}
          </a>
          <LangToggle className="nav__lang--mobile" />
        </nav>

        <div className="nav__actions">
          <LangToggle className="nav__lang--desktop" />
          <button
            className="nav__toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
