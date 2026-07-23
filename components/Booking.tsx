"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { contact, roomOrder } from "@/lib/data";
import { useLang } from "./LanguageProvider";
import { Reveal } from "./Reveal";

export function Booking() {
  const { t } = useLang();
  const b = t.booking;
  const [roomIdx, setRoomIdx] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const today = new Date().toISOString().split("T")[0];
  const [checkin, setCheckin] = useState("");

  // prefill from Rooms CTA (event carries a room id)
  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      const idx = roomOrder.indexOf(id as (typeof roomOrder)[number]);
      if (idx >= 0) setRoomIdx(idx);
    };
    window.addEventListener("livinn:prefill-room", handler);
    return () => window.removeEventListener("livinn:prefill-room", handler);
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form?.checkValidity()) {
      form?.reportValidity();
      return;
    }

    // Build a WhatsApp message to the front desk (kept in English for staff).
    const fd = new FormData(form);
    const roomLabelsEn = ["Single", "Double", "Family (3 & 4 Bed)"];
    const lines = [
      "New booking request for Hotel Liv-Inn",
      "",
      `Name: ${fd.get("name")}`,
      `Phone: ${fd.get("phone")}`,
      `Check-in: ${fd.get("checkin")}`,
      `Check-out: ${fd.get("checkout")}`,
      `Room: ${roomLabelsEn[roomIdx] ?? roomLabelsEn[0]}`,
      `Guests: ${fd.get("guests")}`,
    ];
    const url = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
      lines.join("\n")
    )}`;
    window.open(url, "_blank", "noopener");

    setSubmitted(true);
  };

  return (
    <section className="book section" id="book">
      <div className="book__grid">
        <div className="book__form-wrap">
          <Reveal>
            <p className="eyebrow">{b.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="section__title">{b.title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="book__note">{b.note}</p>
          </Reveal>

          <form className="book__form" ref={formRef} onSubmit={onSubmit} noValidate>
            <Reveal className="field">
              <label htmlFor="name">{b.name}</label>
              <input id="name" name="name" type="text" placeholder={b.namePlaceholder} required disabled={submitted} />
            </Reveal>
            <Reveal className="field" delay={0.05}>
              <label htmlFor="phone">{b.phone}</label>
              <input id="phone" name="phone" type="tel" placeholder="+91" required disabled={submitted} />
            </Reveal>
            <Reveal className="field field--half" delay={0.1}>
              <label htmlFor="checkin">{b.checkin}</label>
              <input
                id="checkin"
                name="checkin"
                type="date"
                min={today}
                required
                disabled={submitted}
                value={checkin}
                onChange={(e) => setCheckin(e.target.value)}
              />
            </Reveal>
            <Reveal className="field field--half" delay={0.15}>
              <label htmlFor="checkout">{b.checkout}</label>
              <input
                id="checkout"
                name="checkout"
                type="date"
                min={checkin || today}
                required
                disabled={submitted}
              />
            </Reveal>
            <Reveal className="field field--half" delay={0.2}>
              <label htmlFor="room">{b.roomType}</label>
              <select
                id="room"
                name="room"
                value={roomIdx}
                onChange={(e) => setRoomIdx(Number(e.target.value))}
                disabled={submitted}
              >
                {b.roomOptions.map((r, i) => (
                  <option key={i} value={i}>
                    {r}
                  </option>
                ))}
              </select>
            </Reveal>
            <Reveal className="field field--half" delay={0.25}>
              <label htmlFor="guests">{b.guests}</label>
              <input id="guests" name="guests" type="number" min={1} max={12} defaultValue={2} disabled={submitted} />
            </Reveal>

            {!submitted ? (
              <button type="submit" className="btn btn--gold btn--block">
                {b.submit}
              </button>
            ) : (
              <p className="book__success">{b.success}</p>
            )}
          </form>
        </div>

        <aside className="book__contact" id="contact">
          <Reveal className="book__contact-inner" delay={0.1}>
            <h3 className="book__contact-title">{b.contact.name}</h3>
            <p className="book__addr">
              {b.contact.address.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
            <p className="book__loc">{b.contact.location}</p>

            <dl className="book__lines">
              <div>
                <dt>{b.contact.landline}</dt>
                <dd>
                  {contact.landline.map((l, i) => (
                    <span key={l.href}>
                      <a href={l.href}>{l.display}</a>
                      {i < contact.landline.length - 1 ? " · " : ""}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt>{b.contact.mobile}</dt>
                <dd>
                  <a href={contact.mobile.href}>{contact.mobile.display}</a>
                </dd>
              </div>
              <div>
                <dt>{b.contact.email}</dt>
                <dd>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </dd>
              </div>
            </dl>

            <a
              className="book__map-btn"
              target="_blank"
              rel="noopener"
              href={contact.maps}
            >
              {b.contact.mapBtn}
            </a>
          </Reveal>
        </aside>
      </div>
    </section>
  );
}
