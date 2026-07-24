// ============================================================
// SEO — schema.org structured data (JSON-LD).
// Invisible to visitors; read by search engines for rich results and
// Google Maps. Only fields we can state confidently are included.
// ============================================================

import { contact } from "@/lib/data";

export const SITE_URL = "https://www.hotellivinn.com";

/** schema.org Hotel / LodgingBusiness markup. */
export function hotelJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: "Hotel Liv-Inn",
    description:
      "Exclusive, comfortable lodging in the heart of Erode, Tamil Nadu. Central and convenient, moments from the bus stand, with clean rooms and warm 24-hour service.",
    url: SITE_URL,
    telephone: contact.mobile.display,
    email: contact.email,
    priceRange: "₹850–₹3,900",
    currenciesAccepted: "INR",
    petsAllowed: false,
    image: `${SITE_URL}/livinn-logo.png`,
    hasMap: contact.maps,
    address: {
      "@type": "PostalAddress",
      streetAddress: "125, VOC Park Approach Road, near Bus Stand",
      addressLocality: "Erode",
      addressRegion: "Tamil Nadu",
      postalCode: "638003",
      addressCountry: "IN",
    },
    amenityFeature: [
      "Free Wi-Fi",
      "Car parking",
      "24-hour front desk",
      "24-hour hot water",
      "Elevator / lift",
      "Room service",
    ].map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
    // NOTE: add geo coordinates + aggregateRating here once you have them
    // (they strengthen local ranking / rich results).
  };
}
