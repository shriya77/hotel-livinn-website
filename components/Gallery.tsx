"use client";

import Image from "next/image";
import { gallery } from "@/lib/data";
import { useLang } from "./LanguageProvider";
import { Reveal } from "./Reveal";

export function Gallery() {
  const { t } = useLang();
  return (
    <section className="gallery section" id="gallery">
      <div className="section__head">
        <Reveal>
          <p className="eyebrow">{t.gallery.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="section__title">{t.gallery.title}</h2>
        </Reveal>
      </div>

      <div className="gallery__grid">
        {gallery.map((item, i) => (
          <Reveal
            as="figure"
            key={i}
            className={`gallery__item ${item.cls}`}
            delay={i * 0.06}
          >
            <Image
              src={item.src}
              alt={`${t.gallery.eyebrow} — ${i + 1}`}
              fill
              placeholder="blur"
              sizes="(max-width: 760px) 50vw, 25vw"
              style={{ objectFit: "cover" }}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
