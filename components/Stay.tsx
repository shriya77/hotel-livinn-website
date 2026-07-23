"use client";

import Image from "next/image";
import { stayImage } from "@/lib/data";
import { useLang } from "./LanguageProvider";
import { Reveal } from "./Reveal";

export function Stay() {
  const { t } = useLang();
  return (
    <section className="stay section" id="stay">
      <div className="stay__grid">
        <div className="stay__text">
          <Reveal>
            <p className="eyebrow">{t.stay.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="section__title">
              {t.stay.titlePre}
              <em>{t.stay.titleAccent}</em>
              {t.stay.titlePost}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="stay__body">{t.stay.body2}</p>
          </Reveal>
          <ul className="stay__points">
            {t.stay.points.map((p, i) => (
              <Reveal as="li" key={i} delay={0.2 + i * 0.06}>
                {p}
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="stay__media">
          <Reveal className="stay__media-frame">
            <Image
              src={stayImage}
              alt="A warmly lit suite lounge at Hotel Liv-Inn"
              fill
              placeholder="blur"
              sizes="(max-width: 980px) 100vw, 45vw"
              style={{ objectFit: "cover" }}
            />
          </Reveal>
          <Reveal className="stay__badge" delay={0.2}>
            <span className="stay__badge-num">Erode</span>
            <span className="stay__badge-txt">{t.stay.badgeSub}</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
