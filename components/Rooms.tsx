"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { rooms } from "@/lib/data";
import { useLang } from "./LanguageProvider";
import { Reveal } from "./Reveal";

export function Rooms() {
  const { t } = useLang();

  const prefill = (id: string) => {
    window.dispatchEvent(
      new CustomEvent("livinn:prefill-room", { detail: id })
    );
  };

  return (
    <section className="rooms section" id="rooms">
      <div className="section__head">
        <Reveal>
          <p className="eyebrow">{t.rooms.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="section__title">{t.rooms.title}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="section__intro">{t.rooms.intro}</p>
        </Reveal>
      </div>

      <div className="rooms__grid">
        {rooms.map((room, i) => {
          const text = t.rooms.items[room.id];
          return (
            <Reveal as="article" key={room.id} delay={i * 0.08}>
              <motion.div
                className={`room${room.featured ? " room--feature" : ""}`}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="room__img">
                  <Image
                    src={room.image}
                    alt={text.name}
                    fill
                    placeholder="blur"
                    sizes="(max-width: 760px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                  <span className={`room__tag${room.featured ? " room__tag--gold" : ""}`}>
                    {text.tag}
                  </span>
                </div>
                <div className="room__body">
                  <h3 className="room__name">{text.name}</h3>
                  <p className="room__desc">{text.desc}</p>
                  <ul className="room__rates">
                    {room.rates.map((r) => (
                      <li key={r.key}>
                        <span>{t.rooms.rateLabels[r.key]}</span>
                        <b>{r.price}</b>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#book"
                    className="room__cta"
                    onClick={() => prefill(room.id)}
                  >
                    {t.rooms.reserve}
                  </a>
                </div>
              </motion.div>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="rooms__services" delay={0.1}>
        <span>{t.rooms.alsoIncluded}</span>
        <div className="rooms__services-list">
          {t.rooms.services.map((s, i) => (
            <span key={i}>{s}</span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
