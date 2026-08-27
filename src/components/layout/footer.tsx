import { ArrowUp, Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { InstagramIcon } from "@/components/ui/icons";
import { siteConfig, telHref, whatsappHref } from "@/lib/site";

const NAV_LINKS = [
  { href: "#servicios", label: "Servicios Clínicos" },
  { href: "#por-que-elegirnos", label: "Por qué elegirnos" },
  { href: "#especialistas", label: "Cuerpo Médico" },
  { href: "#proceso", label: "Nuestro Proceso" },
  { href: "#testimonios", label: "Testimonios de Pacientes" },
  { href: "#faq", label: "Preguntas Frecuentes" },
  { href: "#cta", label: "Reservar Cita Médica" },
];

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="relative bg-primary text-on-primary border-t border-on-primary/10 overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute left-1/2 -bottom-24 -translate-x-1/2 h-64 w-[600px] rounded-full bg-secondary-fixed/10 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative grid gap-10 py-16 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
        {/* Brand & Socials */}
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <Image
            src="/images/logo-light.png"
            alt={siteConfig.name}
            width={284}
            height={113}
            className="aspect-[284/113] h-12 w-auto self-start drop-shadow-md"
          />
          <p className="max-w-xs text-xs sm:text-sm leading-relaxed text-primary-fixed">
            Atención podológica integral y especializada con tecnología de diagnóstico, bioseguridad rigurosa y calidez humana en Los Olivos, Lima.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Síguenos en Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-on-primary/10 text-on-primary transition-all hover:bg-secondary-fixed hover:text-on-secondary-container hover:scale-105"
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Escríbenos por WhatsApp"
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-on-primary/10 text-on-primary transition-all hover:bg-secondary-fixed hover:text-on-secondary-container hover:scale-105"
            >
              <MessageCircle size={18} />
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-4">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-secondary-fixed">
            Navegación
          </h3>
          <ul className="flex flex-col gap-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-xs sm:text-sm text-primary-fixed/90 transition-colors hover:text-secondary-fixed"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info */}
        <div className="flex min-w-0 flex-col gap-4">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-secondary-fixed">
            Contacto
          </h3>
          <ul className="flex min-w-0 flex-col gap-3 text-xs sm:text-sm text-primary-fixed/90">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-secondary-fixed" />
              <span className="min-w-0 break-words">{siteConfig.address.full}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="shrink-0 text-secondary-fixed" />
              <a href={telHref} className="inline-flex min-h-11 items-center break-words transition-colors hover:text-secondary-fixed">
                {siteConfig.phone.display}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MessageCircle size={16} className="shrink-0 text-secondary-fixed" />
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center transition-colors hover:text-secondary-fixed"
              >
                Atención vía WhatsApp
              </a>
            </li>
          </ul>
        </div>

        {/* Hours & Urgent care note */}
        <div className="flex flex-col gap-4">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-secondary-fixed">
            Horario de atención
          </h3>
          <ul className="flex flex-col gap-3 text-xs sm:text-sm text-primary-fixed/90">
            <li className="flex items-start gap-3">
              <Clock size={16} className="mt-0.5 shrink-0 text-secondary-fixed" />
              <div>
                <span className="font-semibold text-on-primary">Lunes a Sábado:</span>
                <p className="mt-0.5">{siteConfig.hours.display}</p>
              </div>
            </li>
            <li className="mt-2 rounded-2xl bg-on-primary/5 p-3.5 border border-on-primary/10 text-xs text-primary-fixed/80">
              <span className="font-semibold text-secondary-fixed block mb-1">
                Atención con cita previa:
              </span>
              Garantiza tu horario sin demoras de espera en sala.
            </li>
          </ul>
        </div>
      </Container>

      {/* Copyright Bar */}
      <div className="border-t border-on-primary/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-3 text-center text-xs text-primary-fixed/70 sm:flex-row sm:text-left">
          <p>© {CURRENT_YEAR} {siteConfig.name}. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <p>Los Olivos, Lima — Perú</p>
            <span className="text-on-primary/20">•</span>
            <a href="#top" className="inline-flex items-center gap-1 text-secondary-fixed hover:underline">
              <span>Subir</span>
              <ArrowUp size={12} />
            </a>
          </div>
        </Container>
      </div>
    </footer>
  );
}

