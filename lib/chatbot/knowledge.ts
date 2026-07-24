// ============================================================
// LIV·INN — Virtual Concierge knowledge base
// The single source of truth the chatbot is allowed to use.
//
// HOW TO EDIT (for staff/devs):
//  - Room names / prices / tariff  -> edit lib/data.ts + lib/i18n.ts (reused
//    below, so there's no duplication or drift).
//  - Everything else about the hotel -> edit the `facts` object here.
//  - Anything not yet verified is marked UNVERIFIED so the bot won't guess.
//    Replace those strings with real info when you have it.
// ============================================================

import { rooms, contact } from "@/lib/data";
import { translations } from "@/lib/i18n";

const en = translations.en;

/** Marker for information the hotel hasn't verified yet. */
const UNVERIFIED = "UNVERIFIED — the concierge must not state this; direct guests to reception.";

export const facts = {
  identity: {
    name: "Hotel Liv-Inn",
    tagline: "Exclusive Lodging, Erode",
    description:
      "A comfortable, exclusive lodge in the heart of Erode, Tamil Nadu. Central and convenient — moments from the bus terminal, park and dining — with clean, well-kept rooms and warm, personal service.",
    website: "https://www.hotellivinn.com",
  },

  contact: {
    phoneLandline: "0424 222 4295 / 0424 222 5857",
    phoneMobile: contact.mobile.display,
    whatsapp: contact.mobile.display,
    email: contact.email,
    maps: contact.maps,
    reception: "24-hour front desk",
  },

  location: {
    address: "125, VOC Park Approach Road, near Bus Stand, Erode, Tamil Nadu 638003",
    summary:
      "In the heart of Erode city — 200 metres from the bus terminal and 2 km from the railway station.",
    distances: [
      "Erode Bus Stand / Terminal: ~200 m (about a 3-minute walk)",
      "Erode Junction Railway Station: ~2 km",
      "V.O.C Park: walking distance",
      "ATM: walking distance",
      "Airport: there is no airport in Erode. The nearest is Coimbatore International Airport, roughly 100 km away (about a 2-hour drive). Reception can help arrange a cab.",
    ],
    directions:
      "From the Erode bus stand it is a short 200 m walk. From the railway station it is about 2 km by auto/taxi. Ask reception if you need a pickup or exact directions.",
  },

  // Check-in / check-out
  stay: {
    checkIn: "Flexible, 24-hour front desk (please share your arrival time when booking).",
    checkOut: "24-hour basis from check-in.",
    earlyCheckIn: "Subject to availability — please request with reception in advance.",
    lateCheckOut: "Available on request, subject to availability (charges may apply).",
  },

  policies: {
    cancellation:
      "Reservations must be cancelled at least 24 hours before arrival to avoid a cancellation fee equal to one night's stay.",
    guarantee: "Bookings are guaranteed by full advance payment at the time of booking.",
    refund: UNVERIFIED,
    extraBed: "Extra bed or extra person: ₹400 in Non-A/C rooms, ₹500 in A/C rooms.",
    children:
      "Families are welcome. Youth / school teams are counted as adult occupants. Specific child-age policy: " +
      UNVERIFIED,
    pets: "Pets are not allowed.",
    gst: "All room rates are inclusive of GST.",
  },

  // Facilities the hotel itself offers (reused from the site's amenities list)
  hotelAmenities: en.amenities.groups[0].items.map((i) => i.label),
  wifi: "Free Wi-Fi is available throughout the property.",
  parking: "Car parking is available at the hotel.",
  accessibility: "Elevator / lift on site. Specific wheelchair accessibility: " + UNVERIFIED,
  providedOnRequest:
    "Soap, a towel, and a sealed water bottle are provided free on request at the front desk. The sealed water bottle is provided for A/C rooms only.",

  // Dining — the hotel does NOT have its own restaurant; good options are nearby.
  dining: {
    inHouseRestaurant: false,
    breakfast:
      "There is no in-house breakfast or restaurant, but the service staff can pick up food from nearby eateries and bring it to your room on request.",
    note:
      "The hotel does not have an in-house restaurant, but several well-liked places are within walking distance, and staff can fetch food to your room on request.",
    nearby: en.amenities.groups[2].items.map((i) =>
      i.note ? `${i.label} (${i.note})` : i.label
    ),
  },

  nearby: en.amenities.groups[1].items.map((i) =>
    i.note ? `${i.label} (${i.note})` : i.label
  ),

  // Events / banquet / conference — not confirmed yet
  events: {
    banquet: UNVERIFIED,
    conference: UNVERIFIED,
    weddings: UNVERIFIED,
  },

  transportation:
    "Autos and taxis are readily available from the nearby bus stand. Ask reception to arrange a cab if needed. Airport transfer availability: " +
    UNVERIFIED,
};

/**
 * Human-readable room summary, single-sourced from lib/data.ts (prices) and
 * lib/i18n.ts (English names/labels/descriptions) so it never drifts.
 * Per-room capacity is inferred from the room type; AC availability is exactly
 * what the tariff offers.
 */
const roomCapacity: Record<string, string> = {
  single: "Best for 1 guest (extra bed/person available).",
  double: "Comfortable for 2 guests (extra bed/person available).",
  family: "For families or groups — 3 and 4-bed options (up to ~4 guests, extra beds available).",
};

export function roomsSummary(): string {
  return rooms
    .map((room) => {
      const t = en.rooms.items[room.id];
      const rateList = room.rates
        .map((r) => `${en.rooms.rateLabels[r.key]} ${r.price}`)
        .join(", ");
      return `- ${t.name}: ${rateList}. ${roomCapacity[room.id] ?? ""} ${t.desc}`.trim();
    })
    .join("\n");
}

/**
 * Serialize the whole knowledge base into the context block the model receives.
 * Small enough to send in full; if the hotel's info grows a lot, this is the
 * single function to swap for a vector-DB retrieval step.
 */
export function knowledgeToContext(): string {
  const f = facts;
  return `HOTEL: ${f.identity.name} — ${f.identity.tagline}
About: ${f.identity.description}
Website: ${f.identity.website}

CONTACT
Landline: ${f.contact.phoneLandline}
Mobile / WhatsApp: ${f.contact.phoneMobile}
Email: ${f.contact.email}
Front desk: ${f.contact.reception}
Google Maps: ${f.contact.maps}

LOCATION
Address: ${f.location.address}
${f.location.summary}
Distances:
${f.location.distances.map((d) => "- " + d).join("\n")}
Directions: ${f.location.directions}

ROOMS & TARIFF (rates include GST)
${roomsSummary()}
Extra bed/person: ₹400 (Non-A/C), ₹500 (A/C).

CHECK-IN / CHECK-OUT
Check-in: ${f.stay.checkIn}
Check-out: ${f.stay.checkOut}
Early check-in: ${f.stay.earlyCheckIn}
Late check-out: ${f.stay.lateCheckOut}

POLICIES
Cancellation: ${f.policies.cancellation}
Guarantee: ${f.policies.guarantee}
Refund: ${f.policies.refund}
Extra bed: ${f.policies.extraBed}
Children: ${f.policies.children}
Pets: ${f.policies.pets}
GST: ${f.policies.gst}

HOTEL AMENITIES
${f.hotelAmenities.map((a) => "- " + a).join("\n")}
Wi-Fi: ${f.wifi}
Parking: ${f.parking}
Accessibility: ${f.accessibility}
On request at front desk: ${f.providedOnRequest}

DINING
${f.dining.note}
Breakfast: ${f.dining.breakfast}
Nearby places to eat:
${f.dining.nearby.map((d) => "- " + d).join("\n")}

NEARBY
${f.nearby.map((d) => "- " + d).join("\n")}

EVENTS
Banquet hall: ${f.events.banquet}
Conference facilities: ${f.events.conference}
Weddings: ${f.events.weddings}

TRANSPORT
${f.transportation}`;
}
