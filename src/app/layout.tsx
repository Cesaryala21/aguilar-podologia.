import type { Metadata, Viewport } from "next";
import { Anton, Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { siteConfig } from "@/lib/site";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://consultorioaguilar.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Consultorio Podológico Aguilar | Podología clínica de excelencia",
    template: "%s | Consultorio Podológico Aguilar",
  },
  description:
    "Consultorio Podológico Aguilar en Los Olivos, Lima: atención especializada en pie diabético, uñas encarnadas, hongos, callosidades y plantillas a medida. Tecnología, experiencia y cuidado humano.",
  keywords: [
    "podólogo",
    "podología",
    "pie diabético",
    "uñas encarnadas",
    "consultorio podológico",
    "podólogo Los Olivos",
    "podología Lima",
    "clínica podológica",
    "Aguilar",
  ],
  authors: [{ name: "Consultorio Podológico Aguilar" }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: siteUrl,
    siteName: "Consultorio Podológico Aguilar",
    title: "Consultorio Podológico Aguilar | Podología clínica de excelencia",
    description:
      "Atención podológica especializada con tecnología, experiencia y cuidado humano.",
    images: [{ url: "/images/logo-mark.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Consultorio Podológico Aguilar",
    description:
      "Atención podológica especializada con tecnología, experiencia y cuidado humano.",
    images: ["/images/logo-mark.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#001736",
  width: "device-width",
  initialScale: 1,
};

const medicalBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: siteConfig.name,
  image: `${siteUrl}/images/logo-mark.png`,
  url: siteUrl,
  telephone: siteConfig.phone.e164,
  priceRange: "$$",
  medicalSpecialty: "Podiatric",
  sameAs: [siteConfig.social.instagram],
  address: {
    "@type": "PostalAddress",
    streetAddress: `${siteConfig.address.street}, ${siteConfig.address.district}`,
    addressLocality: siteConfig.address.city,
    addressRegion: "Lima",
    addressCountry: "PE",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: siteConfig.hours.opens,
      closes: siteConfig.hours.closes,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${anton.variable} ${jakarta.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
           
          dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalBusinessJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-text">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
