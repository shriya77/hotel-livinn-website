// ============================================================
// LIV·INN — translations (en · ta · hi)
// Tamil & Hindi are written naturally, not literally. Poetic lines
// (e.g. the hero) are re-composed to what reads well in each language.
// ============================================================

import type { NavKey, RateKey, RoomId } from "./data";

export type Lang = "en" | "ta" | "hi";

export const LANGS: { code: Lang; short: string; label: string }[] = [
  { code: "en", short: "EN", label: "English" },
  { code: "ta", short: "த", label: "தமிழ்" },
  { code: "hi", short: "हि", label: "हिन्दी" },
];

type RoomText = { name: string; tag: string; desc: string };

export type Dict = {
  nav: Record<NavKey, string> & { reserve: string };
  brandSub: string;
  hero: {
    eyebrow: string;
    titleLines: [string, string, string]; // last line is the accent
    lede: string;
    reserve: string;
    explore: string;
    meta: { k: string; v: string }[];
  };
  marquee: string[];
  stay: {
    eyebrow: string;
    titlePre: string;
    titleAccent: string;
    titlePost: string;
    body1: string;
    body2: string;
    points: string[];
    badgeSub: string;
  };
  rooms: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Record<RoomId, RoomText>;
    rateLabels: Record<RateKey, string>;
    reserve: string;
    alsoIncluded: string;
    services: string[];
  };
  amenities: {
    eyebrow: string;
    title: string;
    groups: { title: string; items: { label: string; note?: string }[] }[];
  };
  gallery: { eyebrow: string; title: string };
  policies: {
    eyebrow: string;
    title: string;
    items: { num: string; title: string; points?: string[]; body?: string }[];
  };
  booking: {
    eyebrow: string;
    title: string;
    note: string;
    name: string;
    namePlaceholder: string;
    phone: string;
    checkin: string;
    checkout: string;
    roomType: string;
    guests: string;
    roomOptions: string[];
    submit: string;
    success: string;
    contact: {
      name: string;
      address: string[];
      location: string;
      landline: string;
      mobile: string;
      email: string;
      mapBtn: string;
    };
  };
  footer: { tag: string; copy: string };
};

// ---------------------------------------------------------------
// ENGLISH (source of truth)
// ---------------------------------------------------------------
const en: Dict = {
  nav: {
    stay: "Stay",
    rooms: "Rooms",
    amenities: "Amenities",
    gallery: "Gallery",
    policies: "Policies",
    contact: "Contact",
    reserve: "Reserve",
  },
  brandSub: "Exclusive Lodging",
  hero: {
    eyebrow: "Erode · Est. Exclusive Lodging",
    titleLines: ["Rest in", "the heart of", "Erode."],
    lede: "We are located in the heart of Erode city, 200 meters from Bus terminal and 2 km from Railway station.",
    reserve: "Reserve a room",
    explore: "Explore rooms",
    meta: [
      { k: "200m", v: "from Bus Terminal" },
      { k: "24hr", v: "Front Desk & Check-in" },
      { k: "₹750", v: "Rooms from" },
    ],
  },
  marquee: [
    "Free Wi-Fi",
    "24hr Hot Water",
    "Car Parking",
    "Elevator",
    "Room Service",
    "Fire Safety Certified",
  ],
  stay: {
    eyebrow: "The Liv-Inn Idea",
    titlePre: "Exclusive lodging, ",
    titleAccent: "honestly",
    titlePost: " priced.",
    body1:
      "In the heart of Erode, 200 metres from the bus terminal and two kilometres from the railway, Liv-Inn is where the traveller lays down their bags and finds calm. Single rooms for the solo wanderer, family suites for the many. Daily cleaning, endless hot water, and a front desk that never sleeps.",
    body2:
      "We believe a good stay is felt, not advertised. So we keep it simple: clean rooms, warm service, and a location that puts the whole city at your feet.",
    points: [
      "Daily cleaning included in every package",
      "Free Wi-Fi throughout the property",
      "Late check-out available on request",
      "Youth & school teams warmly welcomed",
    ],
    badgeSub: "638003 · Veerabadhra Street",
  },
  rooms: {
    eyebrow: "Rooms & Tariff",
    title: "Choose your quiet corner.",
    intro:
      "Every rate includes GST. Extra bed or person: ₹400 (Non-A/C) · ₹500 (A/C).",
    items: {
      single: {
        name: "Single Rooms",
        tag: "Single",
        desc: "For the solo traveller who wants nothing more than rest.",
      },
      double: {
        name: "Double Rooms",
        tag: "Most Booked",
        desc: "Room to breathe, for couples and the well-travelled pair.",
      },
      family: {
        name: "Three & Four Bed",
        tag: "Family",
        desc: "For families, teams, and the joyful chaos of many.",
      },
    },
    rateLabels: {
      nonAc: "Non A/C",
      ac: "A/C",
      acDeluxe: "A/C Deluxe",
      threeBedNonAc: "Three Bed · Non A/C",
      fourBedNonAc: "Four Bed · Non A/C",
      fourBedAc: "Four Bed · A/C",
      fourBedAcDeluxe: "Four Bed · A/C Deluxe",
    },
    reserve: "Reserve →",
    alsoIncluded: "Also included",
    services: ["Daily Cleaning", "Free Wi-Fi", "Room Service"],
  },
  amenities: {
    eyebrow: "Amenities",
    title: "Everything within reach.",
    groups: [
      {
        title: "In the Hotel",
        items: [
          { label: "LED TV in all A/C rooms" },
          { label: "Car parking" },
          { label: "Free Wi-Fi" },
          { label: "24-hour hot water supply" },
          { label: "Baggage storage" },
          { label: "Wake-up service" },
          { label: "24-hour front desk" },
          { label: "Free newspapers in lobby" },
          { label: "Elevator / Lift" },
          { label: "Fire safety certified" },
          { label: "Mail & postage services" },
        ],
      },
      {
        title: "Around You",
        items: [
          { label: "V.O.C Park", note: "walkable" },
          { label: "Bus Stand", note: "walkable" },
          { label: "ATM", note: "walkable" },
          { label: "Railway Station", note: "2 km" },
          { label: "Ayurvedic Body Massage", note: "walkable" },
          { label: "Naturals Beauty Parlour", note: "1.5 km" },
        ],
      },
      {
        title: "To Dine",
        items: [
          { label: "Hotel Kuppanna", note: "walkable" },
          { label: "Hotel Arupadaiyappa", note: "walkable" },
          { label: "Hotel Ammu Mess", note: "walkable" },
          { label: "Domino's", note: "near by" },
          { label: "Adiyar Anandha Bhavan", note: "walkable" },
        ],
      },
    ],
  },
  gallery: { eyebrow: "Gallery", title: "A look inside." },
  policies: {
    eyebrow: "Good to Know",
    title: "Policies, plainly stated.",
    items: [
      {
        num: "01",
        title: "General",
        points: [
          "24-hour check-in / check-out",
          "Extra person / extra bed charges apply",
          "Late check-out available",
          "Youth & school teams counted as adult occupants",
        ],
      },
      {
        num: "02",
        title: "Cancellation",
        body: "All reservations must be cancelled 24 hours before arrival to avoid a cancellation fee equal to one night's accommodation.",
      },
      {
        num: "03",
        title: "Guarantee",
        body: "Reservations must be guaranteed by full advance payment at the time of booking.",
      },
    ],
  },
  booking: {
    eyebrow: "Reserve",
    title: "Begin your stay.",
    note: "Share your dates and we'll confirm on WhatsApp. No payment taken online.",
    name: "Full name",
    namePlaceholder: "Your name",
    phone: "Phone",
    checkin: "Check-in",
    checkout: "Check-out",
    roomType: "Room type",
    guests: "Guests",
    roomOptions: ["Single", "Double", "Family (3 & 4 Bed)"],
    submit: "Reserve on WhatsApp",
    success:
      "Opening WhatsApp with your booking details. Send the message and our front desk will confirm.",
    contact: {
      name: "Hotel Liv-Inn Lodge",
      address: [
        "125, Veerabadhra Street,",
        "V.O.C Park Approach Road,",
        "Erode – 638003",
      ],
      location:
        "In the heart of Erode, 200 m from the bus terminal and 2 km from the railway station.",
      landline: "Landline",
      mobile: "Mobile",
      email: "Email",
      mapBtn: "Open in Maps ↗",
    },
  },
  footer: {
    tag: "Exclusive Lodging · Erode",
    copy: "© {year} Hotel Liv-Inn. All rights reserved.",
  },
};

// ---------------------------------------------------------------
// TAMIL
// ---------------------------------------------------------------
const ta: Dict = {
  nav: {
    stay: "தங்குமிடம்",
    rooms: "அறைகள்",
    amenities: "வசதிகள்",
    gallery: "படங்கள்",
    policies: "விதிமுறைகள்",
    contact: "தொடர்பு",
    reserve: "முன்பதிவு",
  },
  brandSub: "சிறப்பு தங்குமிடம்",
  hero: {
    eyebrow: "ஈரோடு · சிறப்பு தங்குமிடம்",
    titleLines: ["ஈரோட்டின்", "இதயத்தில்", "ஓய்வெடுங்கள்."],
    lede: "ஈரோடு நகரின் மையத்தில், பேருந்து நிலையத்திலிருந்து 200 மீட்டர் தொலைவிலும், ரயில் நிலையத்திலிருந்து 2 கி.மீ தொலைவிலும் நாங்கள் அமைந்துள்ளோம்.",
    reserve: "அறையை முன்பதிவு செய்யுங்கள்",
    explore: "அறைகளைப் பாருங்கள்",
    meta: [
      { k: "200மீ", v: "பேருந்து நிலையம்" },
      { k: "24மணி", v: "வரவேற்பு & செக்-இன்" },
      { k: "₹750", v: "அறைகள் தொடக்கம்" },
    ],
  },
  marquee: [
    "இலவச வைஃபை",
    "24மணி சூடான நீர்",
    "கார் பார்க்கிங்",
    "லிப்ட்",
    "அறை சேவை",
    "தீ பாதுகாப்பு சான்று",
  ],
  stay: {
    eyebrow: "லிவ்-இன் தத்துவம்",
    titlePre: "சிறப்பான தங்குமிடம், ",
    titleAccent: "நேர்மையான",
    titlePost: " விலையில்.",
    body1:
      "ஈரோட்டின் இதயத்தில், பேருந்து நிலையத்திலிருந்து 200 மீட்டர், ரயில் நிலையத்திலிருந்து இரண்டு கிலோமீட்டர் தொலைவில் அமைந்துள்ள லிவ்-இன், பயணி தன் பயணப் பையை இறக்கி நிம்மதி காணும் இடம். தனியாக வருபவர்களுக்கு ஒற்றை அறைகள், குடும்பங்களுக்கு விசாலமான அறைகள். தினசரி சுத்தம், எப்போதும் சூடான நீர், தூங்காத வரவேற்பு பணியகம்.",
    body2:
      "நல்ல தங்குமிடம் விளம்பரத்தால் அல்ல, அனுபவத்தால் உணரப்படுவது என்று நம்புகிறோம். எனவே எளிமையாகவே வைத்திருக்கிறோம்: சுத்தமான அறைகள், அன்பான சேவை, நகரம் முழுவதையும் உங்கள் காலடியில் கொண்டுவரும் இடம்.",
    points: [
      "ஒவ்வொரு தொகுப்பிலும் தினசரி சுத்தம்",
      "வளாகம் முழுவதும் இலவச வைஃபை",
      "கோரிக்கையின் பேரில் தாமதமான செக்-அவுட்",
      "இளைஞர் & பள்ளி குழுக்கள் அன்புடன் வரவேற்பு",
    ],
    badgeSub: "638003 · வீரபத்ர தெரு",
  },
  rooms: {
    eyebrow: "அறைகள் & கட்டணம்",
    title: "உங்கள் அமைதியான மூலையைத் தேர்ந்தெடுங்கள்.",
    intro:
      "அனைத்து கட்டணங்களும் GST உட்பட. கூடுதல் படுக்கை அல்லது நபர்: ₹400 (ஏசி இல்லாதது) · ₹500 (ஏசி).",
    items: {
      single: {
        name: "ஒற்றை அறைகள்",
        tag: "ஒற்றை",
        desc: "ஓய்வைத் தவிர வேறெதுவும் தேவையில்லாத தனிப் பயணிக்கு.",
      },
      double: {
        name: "இரட்டை அறைகள்",
        tag: "அதிகம் விரும்பப்படுவது",
        desc: "நிம்மதியாக மூச்சுவிட இடம், தம்பதிகளுக்கும் பயண ஜோடிகளுக்கும்.",
      },
      family: {
        name: "மூன்று & நான்கு படுக்கை",
        tag: "குடும்பம்",
        desc: "குடும்பங்கள், குழுக்கள், பலரின் மகிழ்ச்சியான கூட்டத்திற்கு.",
      },
    },
    rateLabels: {
      nonAc: "ஏசி இல்லாதது",
      ac: "ஏசி",
      acDeluxe: "ஏசி டீலக்ஸ்",
      threeBedNonAc: "மூன்று படுக்கை · ஏசி இல்லாதது",
      fourBedNonAc: "நான்கு படுக்கை · ஏசி இல்லாதது",
      fourBedAc: "நான்கு படுக்கை · ஏசி",
      fourBedAcDeluxe: "நான்கு படுக்கை · ஏசி டீலக்ஸ்",
    },
    reserve: "முன்பதிவு →",
    alsoIncluded: "மேலும் அடங்கும்",
    services: ["தினசரி சுத்தம்", "இலவச வைஃபை", "அறை சேவை"],
  },
  amenities: {
    eyebrow: "வசதிகள்",
    title: "அனைத்தும் கை எட்டும் தூரத்தில்.",
    groups: [
      {
        title: "ஹோட்டலில்",
        items: [
          { label: "அனைத்து ஏசி அறைகளிலும் எல்.இ.டி டிவி" },
          { label: "கார் பார்க்கிங்" },
          { label: "இலவச வைஃபை" },
          { label: "24 மணிநேர சூடான நீர்" },
          { label: "பொருள் பாதுகாப்பு சேமிப்பு" },
          { label: "எழுப்பும் சேவை" },
          { label: "24 மணிநேர வரவேற்பு" },
          { label: "லாபியில் இலவச செய்தித்தாள்கள்" },
          { label: "லிப்ட்" },
          { label: "தீ பாதுகாப்பு சான்று" },
          { label: "அஞ்சல் & தபால் சேவைகள்" },
        ],
      },
      {
        title: "அருகில்",
        items: [
          { label: "வி.ஓ.சி பூங்கா", note: "நடந்து செல்லலாம்" },
          { label: "பேருந்து நிலையம்", note: "நடந்து செல்லலாம்" },
          { label: "ஏடிஎம்", note: "நடந்து செல்லலாம்" },
          { label: "ரயில் நிலையம்", note: "2 கி.மீ" },
          { label: "ஆயுர்வேத உடல் மசாஜ்", note: "நடந்து செல்லலாம்" },
          { label: "நேச்சுரல்ஸ் அழகு நிலையம்", note: "1.5 கி.மீ" },
        ],
      },
      {
        title: "உணவருந்த",
        items: [
          { label: "ஹோட்டல் குப்பண்ணா", note: "நடந்து செல்லலாம்" },
          { label: "ஹோட்டல் அறுபடையப்பா", note: "நடந்து செல்லலாம்" },
          { label: "ஹோட்டல் அம்மு மெஸ்", note: "நடந்து செல்லலாம்" },
          { label: "டொமினோஸ்", note: "அருகில்" },
          { label: "அடையார் ஆனந்த பவன்", note: "நடந்து செல்லலாம்" },
        ],
      },
    ],
  },
  gallery: { eyebrow: "படங்கள்", title: "உள்ளே ஒரு பார்வை." },
  policies: {
    eyebrow: "தெரிந்துகொள்ள",
    title: "விதிமுறைகள், தெளிவாக.",
    items: [
      {
        num: "01",
        title: "பொது",
        points: [
          "24 மணிநேர செக்-இன் / செக்-அவுட்",
          "கூடுதல் நபர் / படுக்கைக்கு கட்டணம் பொருந்தும்",
          "தாமதமான செக்-அவுட் வசதி உண்டு",
          "இளைஞர் & பள்ளி குழுக்கள் பெரியவர்களாகக் கணக்கிடப்படும்",
        ],
      },
      {
        num: "02",
        title: "ரத்து",
        body: "வருகைக்கு 24 மணிநேரத்திற்கு முன் ரத்து செய்யாவிட்டால், ஒரு இரவு தங்குமிடத்திற்கு சமமான ரத்து கட்டணம் விதிக்கப்படும்.",
      },
      {
        num: "03",
        title: "உத்தரவாதம்",
        body: "முன்பதிவின் போது முழு முன்பணம் செலுத்தி முன்பதிவை உறுதிப்படுத்த வேண்டும்.",
      },
    ],
  },
  booking: {
    eyebrow: "முன்பதிவு",
    title: "உங்கள் தங்குதலைத் தொடங்குங்கள்.",
    note: "உங்கள் தேதிகளைப் பகிருங்கள், வாட்ஸ்அப் மூலம் உறுதிசெய்வோம். ஆன்லைனில் பணம் வசூலிக்கப்படாது.",
    name: "முழு பெயர்",
    namePlaceholder: "உங்கள் பெயர்",
    phone: "தொலைபேசி",
    checkin: "செக்-இன்",
    checkout: "செக்-அவுட்",
    roomType: "அறை வகை",
    guests: "விருந்தினர்கள்",
    roomOptions: ["ஒற்றை", "இரட்டை", "குடும்பம் (3 & 4 படுக்கை)"],
    submit: "வாட்ஸ்அப்பில் முன்பதிவு செய்யுங்கள்",
    success:
      "உங்கள் முன்பதிவு விவரங்களுடன் வாட்ஸ்அப் திறக்கிறது. செய்தியை அனுப்புங்கள், எங்கள் வரவேற்பு பணியகம் உறுதிப்படுத்தும்.",
    contact: {
      name: "ஹோட்டல் லிவ்-இன் லாட்ஜ்",
      address: [
        "125, வீரபத்ர தெரு,",
        "வி.ஓ.சி பூங்கா அணுகு சாலை,",
        "ஈரோடு – 638003",
      ],
      location:
        "ஈரோட்டின் இதயத்தில், பேருந்து நிலையத்திலிருந்து 200 மீ, ரயில் நிலையத்திலிருந்து 2 கி.மீ தொலைவில்.",
      landline: "தொலைபேசி",
      mobile: "கைபேசி",
      email: "மின்னஞ்சல்",
      mapBtn: "வரைபடத்தில் திறக்கவும் ↗",
    },
  },
  footer: {
    tag: "சிறப்பு தங்குமிடம் · ஈரோடு",
    copy: "© {year} ஹோட்டல் லிவ்-இன். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
  },
};

// ---------------------------------------------------------------
// HINDI
// ---------------------------------------------------------------
const hi: Dict = {
  nav: {
    stay: "आवास",
    rooms: "कमरे",
    amenities: "सुविधाएं",
    gallery: "गैलरी",
    policies: "नीतियां",
    contact: "संपर्क",
    reserve: "आरक्षण",
  },
  brandSub: "विशिष्ट आवास",
  hero: {
    eyebrow: "ईरोड · विशिष्ट आवास",
    titleLines: ["ईरोड के", "दिल में", "आराम पाइए।"],
    lede: "हम ईरोड शहर के केंद्र में स्थित हैं, बस टर्मिनल से 200 मीटर और रेलवे स्टेशन से 2 किमी दूर।",
    reserve: "कमरा आरक्षित करें",
    explore: "कमरे देखें",
    meta: [
      { k: "200मी", v: "बस टर्मिनल से" },
      { k: "24घंटे", v: "रिसेप्शन और चेक-इन" },
      { k: "₹750", v: "कमरे इतने से" },
    ],
  },
  marquee: [
    "मुफ्त वाई-फाई",
    "24 घंटे गरम पानी",
    "कार पार्किंग",
    "लिफ्ट",
    "रूम सर्विस",
    "अग्नि सुरक्षा प्रमाणित",
  ],
  stay: {
    eyebrow: "लिव-इन का विचार",
    titlePre: "विशिष्ट आवास, ",
    titleAccent: "ईमानदार",
    titlePost: " दाम पर।",
    body1:
      "ईरोड के दिल में, बस टर्मिनल से 200 मीटर और रेलवे से दो किलोमीटर दूर स्थित लिव-इन वह जगह है जहाँ यात्री अपना सामान रखकर सुकून पाता है। अकेले घूमने वालों के लिए सिंगल कमरे, परिवारों के लिए बड़े कमरे। रोज़ाना सफ़ाई, चौबीसों घंटे गरम पानी, और एक रिसेप्शन जो कभी नहीं सोता।",
    body2:
      "हमारा मानना है कि अच्छा ठहराव महसूस किया जाता है, बताया नहीं जाता। इसलिए हम इसे सरल रखते हैं: साफ़ कमरे, गर्मजोशी भरी सेवा, और एक ऐसी जगह जो पूरा शहर आपके क़दमों में रख दे।",
    points: [
      "हर पैकेज में रोज़ाना सफ़ाई शामिल",
      "पूरे परिसर में मुफ्त वाई-फाई",
      "अनुरोध पर लेट चेक-आउट उपलब्ध",
      "युवा और स्कूल टीमों का सहर्ष स्वागत",
    ],
    badgeSub: "638003 · वीरभद्र स्ट्रीट",
  },
  rooms: {
    eyebrow: "कमरे और दरें",
    title: "अपना शांत कोना चुनें।",
    intro:
      "सभी दरें GST सहित। अतिरिक्त बिस्तर या व्यक्ति: ₹400 (नॉन-ए/सी) · ₹500 (ए/सी)।",
    items: {
      single: {
        name: "सिंगल कमरे",
        tag: "सिंगल",
        desc: "उस अकेले यात्री के लिए जिसे बस आराम चाहिए।",
      },
      double: {
        name: "डबल कमरे",
        tag: "सबसे लोकप्रिय",
        desc: "साँस लेने की जगह, जोड़ों और घुमक्कड़ युगल के लिए।",
      },
      family: {
        name: "तीन और चार बेड",
        tag: "परिवार",
        desc: "परिवारों, टीमों और कई लोगों की खुशनुमा रौनक के लिए।",
      },
    },
    rateLabels: {
      nonAc: "नॉन ए/सी",
      ac: "ए/सी",
      acDeluxe: "ए/सी डीलक्स",
      threeBedNonAc: "तीन बेड · नॉन ए/सी",
      fourBedNonAc: "चार बेड · नॉन ए/सी",
      fourBedAc: "चार बेड · ए/सी",
      fourBedAcDeluxe: "चार बेड · ए/सी डीलक्स",
    },
    reserve: "आरक्षण →",
    alsoIncluded: "साथ में शामिल",
    services: ["रोज़ाना सफ़ाई", "मुफ्त वाई-फाई", "रूम सर्विस"],
  },
  amenities: {
    eyebrow: "सुविधाएं",
    title: "सब कुछ आपकी पहुँच में।",
    groups: [
      {
        title: "होटल में",
        items: [
          { label: "सभी ए/सी कमरों में एलईडी टीवी" },
          { label: "कार पार्किंग" },
          { label: "मुफ्त वाई-फाई" },
          { label: "24 घंटे गरम पानी" },
          { label: "सामान रखने की सुविधा" },
          { label: "वेक-अप सेवा" },
          { label: "24 घंटे रिसेप्शन" },
          { label: "लॉबी में मुफ्त अख़बार" },
          { label: "लिफ्ट" },
          { label: "अग्नि सुरक्षा प्रमाणित" },
          { label: "डाक एवं पोस्ट सेवाएं" },
        ],
      },
      {
        title: "आस-पास",
        items: [
          { label: "वी.ओ.सी पार्क", note: "पैदल दूरी" },
          { label: "बस स्टैंड", note: "पैदल दूरी" },
          { label: "एटीएम", note: "पैदल दूरी" },
          { label: "रेलवे स्टेशन", note: "2 किमी" },
          { label: "आयुर्वेदिक बॉडी मसाज", note: "पैदल दूरी" },
          { label: "नेचुरल्स ब्यूटी पार्लर", note: "1.5 किमी" },
        ],
      },
      {
        title: "खाने के लिए",
        items: [
          { label: "होटल कुप्पण्णा", note: "पैदल दूरी" },
          { label: "होटल अरुपडैयप्पा", note: "पैदल दूरी" },
          { label: "होटल अम्मु मेस", note: "पैदल दूरी" },
          { label: "डोमिनोज़", note: "पास ही" },
          { label: "अडयार आनंद भवन", note: "पैदल दूरी" },
        ],
      },
    ],
  },
  gallery: { eyebrow: "गैलरी", title: "एक झलक अंदर की।" },
  policies: {
    eyebrow: "जानने योग्य",
    title: "नीतियां, साफ़ शब्दों में।",
    items: [
      {
        num: "01",
        title: "सामान्य",
        points: [
          "24 घंटे चेक-इन / चेक-आउट",
          "अतिरिक्त व्यक्ति / बिस्तर शुल्क लागू",
          "लेट चेक-आउट उपलब्ध",
          "युवा और स्कूल टीमें वयस्क के रूप में गिनी जाएंगी",
        ],
      },
      {
        num: "02",
        title: "रद्दीकरण",
        body: "आगमन से 24 घंटे पहले आरक्षण रद्द करना ज़रूरी है, वरना एक रात के ठहराव के बराबर रद्दीकरण शुल्क लगेगा।",
      },
      {
        num: "03",
        title: "गारंटी",
        body: "आरक्षण के समय पूरा अग्रिम भुगतान करके आरक्षण सुनिश्चित करना होगा।",
      },
    ],
  },
  booking: {
    eyebrow: "आरक्षण",
    title: "अपना ठहराव शुरू करें।",
    note: "अपनी तारीखें बताएं, हम व्हाट्सएप पर पुष्टि करेंगे। ऑनलाइन कोई भुगतान नहीं लिया जाता।",
    name: "पूरा नाम",
    namePlaceholder: "आपका नाम",
    phone: "फ़ोन",
    checkin: "चेक-इन",
    checkout: "चेक-आउट",
    roomType: "कमरे का प्रकार",
    guests: "मेहमान",
    roomOptions: ["सिंगल", "डबल", "परिवार (3 और 4 बेड)"],
    submit: "व्हाट्सएप पर आरक्षण करें",
    success:
      "आपके बुकिंग विवरण के साथ व्हाट्सएप खुल रहा है। संदेश भेजें और हमारा रिसेप्शन पुष्टि करेगा।",
    contact: {
      name: "होटल लिव-इन लॉज",
      address: [
        "125, वीरभद्र स्ट्रीट,",
        "वी.ओ.सी पार्क अप्रोच रोड,",
        "ईरोड – 638003",
      ],
      location:
        "ईरोड के दिल में, बस टर्मिनल से 200 मीटर और रेलवे स्टेशन से 2 किमी दूर।",
      landline: "लैंडलाइन",
      mobile: "मोबाइल",
      email: "ईमेल",
      mapBtn: "मैप में खोलें ↗",
    },
  },
  footer: {
    tag: "विशिष्ट आवास · ईरोड",
    copy: "© {year} होटल लिव-इन। सर्वाधिकार सुरक्षित।",
  },
};

export const translations: Record<Lang, Dict> = { en, ta, hi };
