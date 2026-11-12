// All business facts below are SAMPLE data authored for the demo.
// Replace rates, names, weights, prices, address and phone with the jeweller's real records.

export type Karat = "22K" | "18K";

export const GOLD_RATES: Record<Karat, number> = {
  "22K": 11240, // ₹ per gram, sample
  "18K": 9196,
};
export const RATE_DATE = "12 Nov 2026";
export const GST_RATE = 0.03;

export const SHOP = {
  name: "Swarnika",
  line: "Hand-set kundan & polki · Jaipur",
  address: ["142 Johari Bazaar", "Near Hawa Mahal Road", "Jaipur, Rajasthan 302003"],
  phone: "+91 90000 00000",
  phoneHref: "tel:+919000000000",
  whatsapp: "919000000000",
  email: "sitting@swarnika.example",
  hours: "Tue–Sun · 11:00–20:00 · Closed Mondays",
  map: { lat: 26.9205, lon: 75.8266 },
};

export type Stone = { name: string; value: number };

export type Product = {
  slug: string;
  name: string;
  hindi?: string;
  category: Category;
  collection: CollectionId;
  occasions: Occasion[];
  karat: Karat;
  grossWeight: number; // grams
  netGold: number; // grams
  stones: Stone[];
  makingPct: number;
  image: string;
  alt: string;
  description: string;
  karigar: string;
  hours: number;
  huid: string;
};

export type Category = "Necklaces" | "Earrings" | "Bangles & Kadas" | "Head ornaments" | "Hand ornaments" | "For the groom";
export type Occasion = "Bridal" | "Festive" | "Gifting";
export type CollectionId = "rajwada" | "kovil" | "johari" | "dulha";

export const CATEGORIES: Category[] = ["Necklaces", "Earrings", "Bangles & Kadas", "Head ornaments", "Hand ornaments", "For the groom"];
export const OCCASIONS: Occasion[] = ["Bridal", "Festive", "Gifting"];

export const COLLECTIONS: {
  id: CollectionId;
  name: string;
  line: string;
  image: string;
  alt: string;
  still: string;
}[] = [
  {
    id: "rajwada",
    name: "Rajwada Bridal",
    line: "Uncut polki and kundan in the court manner, for the wedding day itself.",
    image: "/images/coll-rajwada.webp",
    alt: "A woman in an ivory blouse wearing a gold hansli collar set with uncut polki and a pearl fringe",
    still: "/images/hansli.webp",
  },
  {
    id: "kovil",
    name: "Kovil",
    line: "Temple gold from the southern tradition, coin, deity and ruby.",
    image: "/images/coll-kovil.webp",
    alt: "A bride in a maroon Kanjivaram sari wearing layered temple gold necklaces and a Lakshmi coin mala",
    still: "/images/lakshmi-necklace.webp",
  },
  {
    id: "johari",
    name: "Johari Classics",
    line: "Jhumkas, kadas and tikkas made to be worn long after the wedding.",
    image: "/images/coll-johari.webp",
    alt: "A woman in profile wearing a large gold chandbali earring with tiers of pearls",
    still: "/images/gold-jhumka.webp",
  },
  {
    id: "dulha",
    name: "Dulha",
    line: "Sarpech and kalgi for the groom's safa.",
    image: "/images/coll-dulha.webp",
    alt: "A groom in an ivory sherwani and gold safa with a jewelled sarpech and an emerald and pearl mala",
    still: "/images/sarpech.webp",
  },
];

export const PRODUCTS: Product[] = [
  {
    slug: "rajkumari-hansli",
    name: "Rajkumari Hansli",
    hindi: "राजकुमारी हंसली",
    category: "Necklaces",
    collection: "rajwada",
    occasions: ["Bridal"],
    karat: "22K",
    grossWeight: 96.4,
    netGold: 62.4,
    stones: [
      { name: "Uncut polki, 8.5 ct", value: 255000 },
      { name: "Basra-style pearls", value: 18000 },
    ],
    makingPct: 16,
    image: "/images/hansli.webp",
    alt: "Rigid gold hansli collar set with uncut polki and a fringe of pearls, on ivory linen",
    description:
      "A rigid collar that sits at the base of the throat, its front set with uncut polki in foil-backed kundan and finished with a fringe of pearls. The reverse is enamelled in meena, as Jaipur pieces have been for three centuries.",
    karigar: "Ustad Iqbal Hussain",
    hours: 310,
    huid: "SW7K2Q",
  },
  {
    slug: "gulnar-ruby-haar",
    name: "Gulnar Ruby Haar",
    category: "Necklaces",
    collection: "rajwada",
    occasions: ["Bridal", "Festive"],
    karat: "22K",
    grossWeight: 71.2,
    netGold: 48.2,
    stones: [
      { name: "Rubies and emeralds", value: 96000 },
      { name: "Pearls", value: 14000 },
    ],
    makingPct: 14,
    image: "/images/arya-necklace.webp",
    alt: "Gold necklace of linked ruby-set plaques with pearl and emerald drops",
    description:
      "Linked plaques of ruby and clear stone, each hung with a seed-pearl and emerald drop. Light enough to wear through the pheras, rich enough for the reception.",
    karigar: "Rehana Bano",
    hours: 220,
    huid: "SW3M8D",
  },
  {
    slug: "lakshmi-kasu-mala",
    name: "Lakshmi Kasu Mala",
    hindi: "कासु माला",
    category: "Necklaces",
    collection: "kovil",
    occasions: ["Bridal", "Festive"],
    karat: "22K",
    grossWeight: 54.0,
    netGold: 54.0,
    stones: [],
    makingPct: 12,
    image: "/images/lakshmi-necklace.webp",
    alt: "Gold necklace of coins embossed with the goddess Lakshmi",
    description:
      "Coins struck with Lakshmi, strung edge to edge. Plain 22K gold, no stones, the most honest value in the room and the piece daughters most often inherit.",
    karigar: "S. Murugan",
    hours: 96,
    huid: "SW9L1K",
  },
  {
    slug: "kovil-pathakam",
    name: "Kovil Pathakam",
    category: "Necklaces",
    collection: "kovil",
    occasions: ["Bridal"],
    karat: "22K",
    grossWeight: 58.6,
    netGold: 41.5,
    stones: [
      { name: "Rubies", value: 64000 },
      { name: "Diamonds, 1.1 ct", value: 46000 },
    ],
    makingPct: 15,
    image: "/images/temple-pectoral.webp",
    alt: "Two-part gold temple pendant with a shrine motif, set with rubies and diamonds",
    description:
      "A two-part temple pendant modelled on a shrine gateway, set with rubies and small diamonds. Worn on a kasu mala or its own chain.",
    karigar: "S. Murugan",
    hours: 180,
    huid: "SW4T6P",
  },
  {
    slug: "moti-chandbali",
    name: "Moti Chandbali",
    hindi: "मोती चांदबाली",
    category: "Earrings",
    collection: "rajwada",
    occasions: ["Bridal", "Festive"],
    karat: "22K",
    grossWeight: 26.1,
    netGold: 18.6,
    stones: [
      { name: "Uncut polki, 1.6 ct", value: 48000 },
      { name: "Pearls", value: 22000 },
    ],
    makingPct: 18,
    image: "/images/pearl-earrings.webp",
    alt: "Pair of long gold earrings with pearl clusters and clear stones",
    description:
      "Long earrings built from tiers of seed pearls under a polki crown, heavy enough to carry a bridal look and balanced to sit straight.",
    karigar: "Rehana Bano",
    hours: 120,
    huid: "SW2C5E",
  },
  {
    slug: "dogri-jhumka",
    name: "Dogri Jhumka",
    category: "Earrings",
    collection: "johari",
    occasions: ["Festive", "Gifting"],
    karat: "22K",
    grossWeight: 14.2,
    netGold: 14.2,
    stones: [],
    makingPct: 14,
    image: "/images/dogri-jhumka.webp",
    alt: "Gold jhumka earrings in the Dogra style",
    description:
      "The bell-shaped jhumka of the Jammu hills, with granulation and a fringe of tiny gold drops. Plain gold, made for every festival after the wedding.",
    karigar: "Mohan Lal Soni",
    hours: 48,
    huid: "SW8J3D",
  },
  {
    slug: "kangri-jhumka",
    name: "Kangri Jhumka",
    category: "Earrings",
    collection: "johari",
    occasions: ["Festive", "Gifting"],
    karat: "22K",
    grossWeight: 21.8,
    netGold: 21.8,
    stones: [],
    makingPct: 14,
    image: "/images/gold-jhumka.webp",
    alt: "Large gold jhumka earrings with granulated domes",
    description:
      "A fuller jhumka with a granulated dome and wire-work stud, the everyday heirloom every family keeps one pair of.",
    karigar: "Mohan Lal Soni",
    hours: 60,
    huid: "SW6K9G",
  },
  {
    slug: "sheesh-mahal-kada",
    name: "Sheesh Mahal Kada",
    category: "Bangles & Kadas",
    collection: "rajwada",
    occasions: ["Bridal"],
    karat: "22K",
    grossWeight: 68.0,
    netGold: 46.0,
    stones: [
      { name: "Uncut polki, 6.2 ct", value: 185000 },
      { name: "Rubies and emeralds", value: 42000 },
    ],
    makingPct: 18,
    image: "/images/kundan-cuff.webp",
    alt: "Wide gold cuff set with diamonds, rubies and emeralds in kundan",
    description:
      "A wide hinged kada set edge to edge with polki and coloured stones. The name comes from the mirror palace at Amer, which it catches light like.",
    karigar: "Ustad Iqbal Hussain",
    hours: 260,
    huid: "SW1S4M",
  },
  {
    slug: "gajmukh-kada",
    name: "Gajmukh Kada",
    hindi: "गजमुख कड़ा",
    category: "Bangles & Kadas",
    collection: "rajwada",
    occasions: ["Bridal", "Festive"],
    karat: "22K",
    grossWeight: 52.5,
    netGold: 38.5,
    stones: [{ name: "Diamonds, 3.4 ct", value: 140000 }],
    makingPct: 18,
    image: "/images/elephant-kara.webp",
    alt: "Gold bangle with enamelled elephant-head terminals set with diamonds",
    description:
      "Two elephant heads meet at the clasp, enamelled in pink and green and set with diamonds. Elephants for auspicious beginnings.",
    karigar: "Rehana Bano",
    hours: 190,
    huid: "SW5G2K",
  },
  {
    slug: "gaja-bangles",
    name: "Gaja Bangles, pair",
    category: "Bangles & Kadas",
    collection: "kovil",
    occasions: ["Festive", "Gifting"],
    karat: "22K",
    grossWeight: 64.0,
    netGold: 64.0,
    stones: [],
    makingPct: 12,
    image: "/images/elephant-bangles.webp",
    alt: "Pair of gold bangles with elephant-head ends",
    description: "A pair of solid bangles with chased elephant-head ends, plain gold that only grows in value.",
    karigar: "S. Murugan",
    hours: 80,
    huid: "SW7B1G",
  },
  {
    slug: "makara-kada",
    name: "Makara Kada",
    category: "Bangles & Kadas",
    collection: "kovil",
    occasions: ["Festive"],
    karat: "22K",
    grossWeight: 33.0,
    netGold: 33.0,
    stones: [],
    makingPct: 13,
    image: "/images/makara-bangle.webp",
    alt: "Gold bangle ending in two makara heads",
    description: "Twin makara, the river creature of temple gateways, meet at the opening of this kada.",
    karigar: "S. Murugan",
    hours: 64,
    huid: "SW3K7M",
  },
  {
    slug: "hathphool",
    name: "Hathphool",
    hindi: "हाथफूल",
    category: "Hand ornaments",
    collection: "rajwada",
    occasions: ["Bridal"],
    karat: "22K",
    grossWeight: 31.0,
    netGold: 22.0,
    stones: [
      { name: "White sapphires", value: 35000 },
      { name: "Rubies", value: 18000 },
    ],
    makingPct: 17,
    image: "/images/hathphul.webp",
    alt: "Gold hand ornament linking a bracelet to rings with jewelled chains",
    description:
      "A flower for the back of the hand, chained to five rings and a bracelet. Worn once, photographed forever.",
    karigar: "Rehana Bano",
    hours: 140,
    huid: "SW9H4F",
  },
  {
    slug: "noor-maang-tikka",
    name: "Noor Maang Tikka",
    category: "Head ornaments",
    collection: "johari",
    occasions: ["Bridal", "Festive"],
    karat: "22K",
    grossWeight: 12.4,
    netGold: 9.8,
    stones: [
      { name: "Uncut polki, 1.2 ct", value: 38000 },
      { name: "Emerald beads", value: 9000 },
    ],
    makingPct: 18,
    image: "/images/maang-tikka.webp",
    alt: "Gold maang tikka set with a large uncut diamond and green bead drops",
    description: "A single uncut diamond in a teardrop of gold, fringed with emerald beads. Light on the parting, bright in every photograph.",
    karigar: "Ustad Iqbal Hussain",
    hours: 70,
    huid: "SW2N8T",
  },
  {
    slug: "surya-rakhdi",
    name: "Surya Rakhdi",
    category: "Head ornaments",
    collection: "kovil",
    occasions: ["Bridal"],
    karat: "22K",
    grossWeight: 22.0,
    netGold: 16.0,
    stones: [{ name: "Rubies and emeralds", value: 62000 }],
    makingPct: 16,
    image: "/images/ruby-rosette.webp",
    alt: "Round gold hair ornament radiating rings of rubies",
    description: "A sun of concentric rubies for the back of the braid or the parting. Its pair, the moon, is made to order.",
    karigar: "S. Murugan",
    hours: 110,
    huid: "SW6R3S",
  },
  {
    slug: "jhoomar-passa",
    name: "Jhoomar Passa",
    category: "Head ornaments",
    collection: "rajwada",
    occasions: ["Bridal"],
    karat: "22K",
    grossWeight: 26.0,
    netGold: 19.0,
    stones: [{ name: "Rubies and emeralds", value: 54000 }],
    makingPct: 17,
    image: "/images/maang-tikka-antique.webp",
    alt: "Fan-shaped gold head ornament with ruby and emerald drops",
    description: "The fan-shaped passa worn at the side of the head, hung with tiers of drops that move as she does.",
    karigar: "Rehana Bano",
    hours: 150,
    huid: "SW4P9J",
  },
  {
    slug: "dulha-sarpech",
    name: "Dulha Sarpech",
    hindi: "सरपेच",
    category: "For the groom",
    collection: "dulha",
    occasions: ["Bridal"],
    karat: "22K",
    grossWeight: 40.0,
    netGold: 28.0,
    stones: [
      { name: "Diamonds, 4.8 ct", value: 210000 },
      { name: "Rubies and emerald drops", value: 65000 },
    ],
    makingPct: 18,
    image: "/images/sarpech.webp",
    alt: "Jewelled gold turban ornament with a curving plume and emerald drops",
    description: "The plume for the groom's safa, its spine set with diamonds and finished with carved emerald drops.",
    karigar: "Ustad Iqbal Hussain",
    hours: 240,
    huid: "SW8D5S",
  },
];

export const KARIGARS = [
  {
    name: "Ustad Iqbal Hussain",
    craft: "Kundan setting",
    years: 38,
    note: "Pushes pure gold foil around each uncut stone by hand. Sets the polki on every Rajwada piece.",
  },
  {
    name: "Rehana Bano",
    craft: "Meenakari",
    years: 22,
    note: "Fires the enamel reverse of each piece in up to seven layers, from the hardest colour to the softest.",
  },
  {
    name: "S. Murugan",
    craft: "Temple goldsmithing",
    years: 30,
    note: "Trained in Nagercoil. Chases and embosses the Kovil collection's deities and coins.",
  },
  {
    name: "Mohan Lal Soni",
    craft: "Ghaat and granulation",
    years: 27,
    note: "Builds the gold frame (ghaat) every piece starts from, and the granulation on our jhumkas.",
  },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

export const FAQ = [
  { q: "How do I verify the hallmark?", a: "Every gold piece carries a six-character HUID. Enter it in the government's BIS Care app to see its purity, the hallmarking centre and our jeweller registration." },
  { q: "Do you exchange old gold?", a: "Yes. Bring old jewellery to your sitting; we test it on an XRF machine in front of you and credit its full value at the day's rate against new pieces." },
  { q: "What is your buyback policy?", a: "Swarnika pieces are bought back at full gold value at the day's rate. Stones are bought back at their billed value less 10%." },
  { q: "Can you make a piece to order?", a: "Most of our work is made to order. Allow 3–6 weeks for gold, 8–12 for a full bridal set. A 20% advance fixes the gold rate on the day you order." },
  { q: "Do you ship outside Jaipur?", a: "Yes, fully insured, across India. For international clients we arrange hand delivery or a sitting during your visit." },
];
