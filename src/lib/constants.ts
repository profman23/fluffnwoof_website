export const WHATSAPP_NUMBER = "966554145481";
export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const getWhatsAppLink = (message: string) =>
  `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/fluff.n.woof",
  twitter: "https://twitter.com/fluffnwoof",
  tiktok: "https://tiktok.com/@fluffnwoof",
  snapchat: "https://snapchat.com/add/fluffnwoof",
};

export const NAV_SECTIONS = [
  "home",
  "services",
  "about",
  "testimonials",
  "contact",
] as const;

export const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.0!2d46.5637068!3d24.8259773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2ee75bfd6ccc73%3A0x7e080049e95ad6f!2sFluff%20N'%20Woof%20Specialist%20Veterinary!5e0!3m2!1sen!2ssa!4v1700000000000!5m2!1sen!2ssa";

export const GOOGLE_MAPS_LINK = "https://maps.app.goo.gl/Xvc8TM3kw57n8eV57";
