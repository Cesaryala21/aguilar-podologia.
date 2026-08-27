"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Clock, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { useMouseGlow } from "@/hooks/use-mouse-glow";
import { services } from "@/lib/data";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function Servicios() {
  const handleGlow = useMouseGlow();

  return (
    <section id="servicios" className="relative bg-surface py-24 sm:py-32 overflow-hidden">
      {/* Subtle background ambient blur */}
      <div
        className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-secondary-fixed/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-1/4 h-96 w-96 rounded-full bg-primary-container/5 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Nuestros servicios"
            title="Tratamientos pensados para cada etapa del cuidado de tus pies"
            subtitle="Desde la prevención hasta la intervención especializada, cada servicio combina rigor clínico, instrumental esterilizado y un trato humano y cercano."
          />
          <div className="hidden md:flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-secondary bg-secondary-container/60 px-4 py-2 rounded-full border border-secondary/20 shrink-0">
            <Sparkles size={14} className="text-secondary" />
            <span>8 Tratamientos Especializados</span>
          </div>
        </div>

        {/* Bento Grid layout */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isFeatured = service.featured;

            if (isFeatured) {
              return (
                <motion.article
                  key={service.slug}
                  onPointerMove={handleGlow}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                  className={cn(
                    "mouse-glow group relative flex flex-col justify-between rounded-3xl p-8 sm:p-10",
                    "bg-gradient-to-br from-primary via-primary-container to-primary text-on-primary",
                    "shadow-[0_20px_50px_-20px_rgba(0,23,54,0.4)] border border-on-primary/15",
                    "sm:col-span-2 lg:col-span-2 transition-all duration-500 hover:shadow-[0_28px_60px_-20px_rgba(0,23,54,0.6)] hover:-translate-y-1.5",
                  )}
                >
                  <div className="relative flex flex-col gap-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary-fixed/20 text-secondary-fixed border border-secondary-fixed/30 shadow-inner">
                        <Icon size={28} strokeWidth={1.75} />
                      </div>
                      <div className="flex items-center gap-2">
                        {service.duration ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-on-primary/10 px-3 py-1 text-xs font-medium text-primary-fixed border border-on-primary/10">
                            <Clock size={12} />
                            {service.duration}
                          </span>
                        ) : null}
                        <span className="inline-flex items-center gap-1 rounded-full bg-secondary-fixed px-3 py-1 text-xs font-bold uppercase tracking-wider text-on-secondary-container">
                          ★ {service.tag || "Destacado"}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-display text-2xl sm:text-3xl leading-snug text-on-primary">
                        {service.title}
                      </h3>
                      <p className="max-w-2xl text-base leading-relaxed text-primary-fixed">
                        {service.description}
                      </p>
                    </div>

                    {/* Featured highlights bullet list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-primary-fixed border-t border-on-primary/10">
                      <div className="flex items-center gap-2">
                        <Check size={16} className="text-secondary-fixed shrink-0" />
                        <span>Evaluación integral dermatológica y ungueal</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check size={16} className="text-secondary-fixed shrink-0" />
                        <span>Desinfección profunda y corte anatómico</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check size={16} className="text-secondary-fixed shrink-0" />
                        <span>Detección temprana de micosis o durezas</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check size={16} className="text-secondary-fixed shrink-0" />
                        <span>Recomendaciones preventivas personalizadas</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-on-primary/10">
                    <a
                      href="#cta"
                      className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-on-secondary hover:bg-secondary-fixed hover:text-on-secondary-container transition-colors shadow-md"
                    >
                      <span>Reservar Podología Clínica</span>
                      <ArrowRight size={16} />
                    </a>
                    <span className="text-xs text-primary-fixed/75">
                      Ideal como primera consulta o control periódico
                    </span>
                  </div>
                </motion.article>
              );
            }

            return (
              <motion.article
                key={service.slug}
                onPointerMove={handleGlow}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: (index % 3) * 0.08 }}
                className={cn(
                  "mouse-glow group relative flex flex-col justify-between rounded-3xl p-7",
                  "glass-surface text-on-surface border border-white/60 bg-white/70 backdrop-blur-xl",
                  "transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-2 hover:shadow-[0_24px_50px_-16px_rgba(0,23,54,0.14)] hover:border-secondary/30",
                )}
              >
                <div className="relative flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary-container text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-all duration-300 shadow-sm group-hover:scale-105">
                      <Icon size={22} strokeWidth={1.75} />
                    </div>
                    {service.tag ? (
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-secondary bg-secondary-container/50 px-2.5 py-0.5 rounded-full border border-secondary/15">
                        {service.tag}
                      </span>
                    ) : null}
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display text-xl leading-snug text-on-surface group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-on-surface-variant">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-outline-variant/30 text-xs">
                  {service.duration ? (
                    <span className="inline-flex items-center gap-1 text-on-surface-variant/80">
                      <Clock size={13} className="text-secondary" />
                      {service.duration}
                    </span>
                  ) : (
                    <span />
                  )}
                  <a
                    href="#cta"
                    className="inline-flex items-center gap-1 font-semibold text-secondary group-hover:text-primary transition-colors"
                  >
                    <span>Consultar</span>
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

