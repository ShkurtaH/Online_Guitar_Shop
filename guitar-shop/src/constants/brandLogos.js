// maps Brand.name -> your local SVG
import ibanez from "../assets/Ibanez.png"
import martinco from "../assets/Martin&Co.png"
import fender from "../assets/Fender.png"
import gibson from "../assets/Gibson.png"
import taylor from "../assets/Taylor.png"
import gretsch from "../assets/Gretsch.png"
import takamine from "../assets/Takamine.png"
import seagull from "../assets/Seagull.png"

// Robust key: strip spaces, punctuation, case
const key = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "");

export const FEATURED_KEYS = [
  "ibanez",
  "martinco",
  "fender",
  "gibson",
  "taylor",
  "gretsch",
  "takamine",
  "seagull",
];

const LOGOS = new Map([
  ["ibanez", ibanez],
  ["martinco", martinco], 
  ["fender", fender],
  ["gibson", gibson],
  ["taylor", taylor],
  ["gretsch", gretsch],
  ["takamine", takamine],
  ["seagull", seagull],
]);

export const getBrandLogo = (brandName) => LOGOS.get(key(brandName));
