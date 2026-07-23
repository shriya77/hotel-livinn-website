// ============================================================
// LIV·INN — structural data (non-translatable)
// Images, prices, phone/email/links. All display TEXT lives in
// lib/i18n.ts and is keyed to the ids/keys defined here.
// ============================================================

import type { StaticImageData } from "next/image";

import front from "./photos/front.webp";
import couch from "./photos/couch.webp";
import couch2 from "./photos/couch2.webp";
import reception from "./photos/reception.webp";
import room1 from "./photos/room1.webp";
import room2 from "./photos/room2.webp";
import room3 from "./photos/room3.webp";
import room4 from "./photos/room4.webp";
import room5 from "./photos/room5.webp";
import view from "./photos/view.webp";

export const heroImage = front;
export const stayImage = couch;

export type RateKey =
  | "nonAc"
  | "ac"
  | "acDeluxe"
  | "threeBedNonAc"
  | "fourBedNonAc"
  | "fourBedAc"
  | "fourBedAcDeluxe";

export type RoomId = "single" | "double" | "family";

export type Room = {
  id: RoomId;
  featured?: boolean;
  image: StaticImageData;
  rates: { key: RateKey; price: string }[];
};

export const rooms: Room[] = [
  {
    id: "single",
    image: room5,
    rates: [
      { key: "nonAc", price: "₹750" },
      { key: "ac", price: "₹1,250" },
      { key: "acDeluxe", price: "₹1,350" },
    ],
  },
  {
    id: "double",
    featured: true,
    image: room3,
    rates: [
      { key: "nonAc", price: "₹1,350" },
      { key: "ac", price: "₹1,700" },
      { key: "acDeluxe", price: "₹1,900" },
    ],
  },
  {
    id: "family",
    image: room4,
    rates: [
      { key: "threeBedNonAc", price: "₹1,750" },
      { key: "fourBedNonAc", price: "₹2,500" },
      { key: "fourBedAc", price: "₹3,200" },
      { key: "fourBedAcDeluxe", price: "₹3,500" },
    ],
  },
];

// Order used to map a room card back to a booking-form option index.
export const roomOrder: RoomId[] = ["single", "double", "family"];

export type GalleryItem = { src: StaticImageData; cls: "" | "tall" | "wide" };

export const gallery: GalleryItem[] = [
  { src: room2, cls: "tall" },
  { src: reception, cls: "" },
  { src: room1, cls: "" },
  { src: view, cls: "wide" },
  { src: couch, cls: "tall" },
  { src: room3, cls: "" },
  { src: front, cls: "wide" },
  { src: room4, cls: "" },
  { src: room5, cls: "tall" },
  { src: couch2, cls: "" },
];

export type NavKey =
  | "stay"
  | "rooms"
  | "amenities"
  | "gallery"
  | "policies"
  | "contact";

export const nav: { href: string; key: NavKey }[] = [
  { href: "#stay", key: "stay" },
  { href: "#rooms", key: "rooms" },
  { href: "#amenities", key: "amenities" },
  { href: "#gallery", key: "gallery" },
  { href: "#policies", key: "policies" },
  { href: "#contact", key: "contact" },
];

// Non-translatable contact details.
export const contact = {
  landline: [
    { display: "0424 – 222 4295", href: "tel:04242224295" },
    { display: "222 5857", href: "tel:04242225857" },
  ],
  mobile: { display: "+91 88259 35992", href: "tel:+918825935992" },
  email: "hotellivinn@gmail.com",
  maps: "https://maps.app.goo.gl/X6nrpemZQDyMtFrw7",
};
