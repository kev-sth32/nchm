/** Centralized institutional contact, map, and WhatsApp configuration for NcHM Birgunj. */
export const SITE_CONFIG = {
  whatsappNumber: "9779829232426",
  phoneDisplay: "+977 9829232426",
  phoneHref: "tel:+9779829232426",
  email: "contact@nchmbirgunj.edu.np",
  emailHref: "mailto:contact@nchmbirgunj.edu.np",
  address: "Murli Bagaicha-12, Birgunj (Near Birgunj Public College BIM Building)",
  shortAddress: "Murli Bagaicha-12, Birgunj, Nepal",
  googleMapsUrl: "https://maps.app.goo.gl/smSzjGYD5JwTKDfm8",
} as const;

/** Builds a pre-filled WhatsApp click-to-chat URL using the institutional admissions number. */
export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

