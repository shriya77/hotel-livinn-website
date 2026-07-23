"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { heroImage } from "@/lib/data";
import { useLang } from "./LanguageProvider";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const line = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const fade = (delay: number) => ({
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const, delay },
  },
});

export function Hero() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const titleLines = t.hero.titleLines.map((text, i) => ({
    text,
    accent: i === t.hero.titleLines.length - 1,
  }));
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Only the background parallaxes — a single GPU-composited layer translating
  // on scroll. The content stays static so nothing repaints per frame (smooth).
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "7%"]);

  return (
    <section className="hero" id="top" ref={ref}>
      <motion.div className="hero__bg" style={{ y: bgY, scale: 1.12 }} aria-hidden>
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </motion.div>
      <div className="hero__veil" aria-hidden />

      <div className="hero__fg">
        <div className="hero__content">
          <motion.h1
            className="hero__title"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {titleLines.map((l, i) => (
              <motion.span
                key={i}
                variants={line}
                className={l.accent ? "hero__accent" : undefined}
              >
                {l.text}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="hero__lede"
            variants={fade(0.5)}
            initial="hidden"
            animate="show"
          >
            {t.hero.lede}
          </motion.p>

          <motion.div
            className="hero__actions"
            variants={fade(0.65)}
            initial="hidden"
            animate="show"
          >
            <motion.a
              href="#book"
              className="btn btn--gold"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {t.hero.reserve}
            </motion.a>
            <motion.a
              href="#rooms"
              className="btn btn--ghost"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {t.hero.explore}
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          className="hero__meta"
          variants={fade(0.85)}
          initial="hidden"
          animate="show"
        >
          {t.hero.meta.map((m) => (
            <div className="hero__meta-item" key={m.v}>
              <span className="hero__meta-k">{m.k}</span>
              <span className="hero__meta-v">{m.v}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <a href="#stay" className="hero__scroll" aria-label="Scroll down">
        <span />
      </a>
    </section>
  );
}
