"use client";

import { motion } from "framer-motion";
import { useLang } from "./LanguageProvider";

export function Marquee() {
  const { t } = useLang();
  const loop = [...t.marquee, ...t.marquee];
  return (
    <div className="marquee" aria-hidden>
      <motion.div
        className="marquee__track"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {loop.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", gap: "2.5rem", alignItems: "center" }}>
            {item}
            <span className="dot">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
