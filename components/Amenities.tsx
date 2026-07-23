"use client";

import { useLang } from "./LanguageProvider";
import { Reveal } from "./Reveal";

export function Amenities() {
  const { t } = useLang();
  return (
    <section className="amen section" id="amenities">
      <div className="section__head">
        <Reveal>
          <p className="eyebrow">{t.amenities.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="section__title">{t.amenities.title}</h2>
        </Reveal>
      </div>

      <div className="amen__grid">
        {t.amenities.groups.map((group, gi) => (
          <Reveal className="amen__col" key={gi} delay={gi * 0.08}>
            <h3 className="amen__col-title">{group.title}</h3>
            <ul className="amen__list">
              {group.items.map((item, ii) => (
                <li key={ii}>
                  <span>{item.label}</span>
                  {item.note && <em>{item.note}</em>}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
