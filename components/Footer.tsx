"use client";

import { nav } from "@/lib/data";
import { useLang } from "./LanguageProvider";

export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/livinn-mark.png" alt="Hotel Liv-Inn" className="footer__mark" />
          <span className="footer__logo">LIV·INN</span>
          <span className="footer__tag">{t.footer.tag}</span>
        </div>
        <nav className="footer__nav" aria-label="Footer">
          {nav
            .filter((n) => n.key !== "contact")
            .map((n) => (
              <a key={n.href} href={n.href}>
                {t.nav[n.key]}
              </a>
            ))}
          <a href="#book">{t.nav.reserve}</a>
        </nav>
        <p className="footer__copy">{t.footer.copy.replace("{year}", String(year))}</p>
      </div>
    </footer>
  );
}
