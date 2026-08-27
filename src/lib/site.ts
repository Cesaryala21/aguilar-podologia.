/** Single source of truth for the clinic's real contact details. */

export const siteConfig = {
  name: "Consultorio Podológico Aguilar",
  shortName: "Aguilar",
  tagline: "Precisión en cada paso.",
  url: "https://consultorioaguilar.com",

  address: {
    street: "Calle 7, Mz. T5, Lte. 27 (Calle Dignidad)",
    district: "Urb. Pro, Los Olivos",
    city: "Lima",
    country: "Perú",
    /** Single-line form for compact UI slots. */
    full: "Calle 7, Mz. T5, Lte. 27 (Calle Dignidad), Urb. Pro, Los Olivos, Lima",
  },

  phone: {
    /** As the clinic publishes it. */
    display: "999 222 550",
    /** E.164 for tel: links. */
    e164: "+51999222550",
    /** wa.me expects the number without the leading +. */
    whatsapp: "51999222550",
  },

  hours: {
    display: "9:30 a.m. – 8:30 p.m.",
    opens: "09:30",
    closes: "20:30",
  },

  social: {
    instagram: "https://www.instagram.com/centro_podologicoaguilar/",
  },
} as const;

export const telHref = `tel:${siteConfig.phone.e164}`;

export const whatsappHref = `https://wa.me/${siteConfig.phone.whatsapp}?text=${encodeURIComponent(
  "Hola, quisiera agendar una cita en el Consultorio Podológico Aguilar.",
)}`;

/** Keyless Google Maps embed centred on the clinic's address. */
export const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  "Calle Dignidad, Urbanización Pro, Los Olivos, Lima, Perú",
)}&output=embed`;
