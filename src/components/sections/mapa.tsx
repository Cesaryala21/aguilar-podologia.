"use client";

import { Check, Clock, Copy, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { mapEmbedSrc, siteConfig, telHref, whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Mapa() {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.address.full);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    siteConfig.address.full,
  )}`;

  return (
    <section id="mapa" className="relative bg-surface py-24 sm:py-32 overflow-hidden">
      <Container>
        <div className="overflow-hidden rounded-3xl border border-outline-variant/30 shadow-[0_24px_60px_-20px_rgba(0,23,54,0.15)] lg:grid lg:grid-cols-2">
          {/* Left Clinical Location Card */}
          <div className="flex flex-col justify-between gap-8 bg-gradient-to-br from-primary via-primary-container to-primary p-8 sm:p-12 text-on-primary">
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-fixed/15 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-secondary-fixed border border-secondary-fixed/25">
                  <MapPin size={13} />
                  Ubicación y accesibilidad
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-secondary-fixed">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary-fixed animate-pulse" />
                  Atención activa
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl leading-[1.12] tracking-tight">
                Visítanos en Los Olivos
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-primary-fixed">
                Ubicados en la Urb. Pro, con fácil acceso desde la Panamericana Norte y transporte
                público fluido.
              </p>

              {/* Contact & Location List */}
              <ul className="flex min-w-0 flex-col gap-4 pt-2">
                <li className="flex items-start gap-3.5 rounded-2xl bg-on-primary/5 p-3.5 border border-on-primary/10">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary-fixed/15 text-secondary-fixed">
                    <MapPin size={18} />
                  </span>
                  <div className="flex flex-1 flex-col gap-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-secondary-fixed">
                      Dirección principal
                    </span>
                    <span className="text-xs sm:text-sm leading-relaxed text-primary-fixed break-words">
                      {siteConfig.address.full}
                    </span>
                    <div className="mt-1 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={handleCopyAddress}
                        className="inline-flex items-center gap-1 text-xs font-medium text-secondary-fixed hover:text-white transition-colors cursor-pointer"
                      >
                        {copied ? (
                          <>
                            <Check size={12} />
                            <span>¡Copiada en portapapeles!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={12} />
                            <span>Copiar dirección</span>
                          </>
                        )}
                      </button>
                      <span className="text-primary-fixed/40">•</span>
                      <a
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-secondary-fixed hover:text-white transition-colors"
                      >
                        <Navigation size={12} />
                        <span>Abrir en Google Maps</span>
                      </a>
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-3.5 rounded-2xl bg-on-primary/5 p-3.5 border border-on-primary/10">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary-fixed/15 text-secondary-fixed">
                    <Clock size={18} />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold uppercase tracking-wider text-secondary-fixed">
                      Horario continuado
                    </span>
                    <span className="text-xs sm:text-sm leading-relaxed text-primary-fixed">
                      Lunes a Sábado: {siteConfig.hours.display}
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3.5 rounded-2xl bg-on-primary/5 p-3.5 border border-on-primary/10">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary-fixed/15 text-secondary-fixed">
                    <Phone size={18} />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold uppercase tracking-wider text-secondary-fixed">
                      Teléfono directo
                    </span>
                    <a
                      href={telHref}
                      className="text-xs sm:text-sm font-semibold text-primary-fixed hover:text-on-primary transition-colors"
                    >
                      {siteConfig.phone.display}
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="#cta"
                className={cn(
                  buttonVariants({ variant: "primary", size: "md" }),
                  "w-full bg-secondary text-on-secondary hover:bg-secondary-fixed hover:text-on-secondary-container shadow-[0_12px_36px_-8px_rgba(0,107,91,0.5)] sm:w-fit font-semibold",
                )}
              >
                Reservar consulta
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "md" }),
                  "w-full sm:w-fit border-on-primary/30 text-on-primary hover:border-secondary-fixed hover:text-secondary-fixed",
                )}
              >
                <MessageCircle size={18} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Interactive Maps Frame */}
          <div className="relative min-h-[360px] lg:min-h-[500px] bg-surface-container">
            <iframe
              src={mapEmbedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Ubicación de ${siteConfig.name} en Los Olivos, Lima`}
              className="h-full min-h-[360px] w-full border-0 lg:min-h-[500px]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

