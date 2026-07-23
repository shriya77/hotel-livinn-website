"use client";

import { motion } from "framer-motion";
import { useLang } from "./LanguageProvider";
import { Reveal } from "./Reveal";

export function Policies() {
  const { t } = useLang();
  return (
    <section className="policies section" id="policies">
      <div className="section__head">
        <Reveal>
          <p className="eyebrow">{t.policies.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="section__title">{t.policies.title}</h2>
        </Reveal>
      </div>

      <div className="policies__grid">
        {t.policies.items.map((p, i) => (
          <Reveal as="article" key={p.num} delay={i * 0.08}>
            <motion.div
              className="policy"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="policy__num">{p.num}</span>
              <h3 className="policy__title">{p.title}</h3>
              {p.points && (
                <ul>
                  {p.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              )}
              {p.body && <p>{p.body}</p>}
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
