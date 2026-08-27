"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Footprints, ShieldCheck, Sparkles, Stethoscope } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { processSteps } from "@/lib/data";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const STEP_ICONS = [Stethoscope, Footprints, ShieldCheck, CheckCircle2];

export function Proceso() {
  return (
    <section id="proceso" className="relative overflow-hidden bg-primary py-24 sm:py-32">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -left-28 bottom-0 h-96 w-96 rounded-full bg-secondary-fixed/15 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-28 top-0 h-96 w-96 rounded-full bg-secondary/15 blur-[120px]"
        aria-hidden="true"
      />

      <Container className="relative">
        <SectionHeading
          eyebrow="Nuestro proceso"
          title="Un camino claro, desde la primera consulta hasta tu recuperación"
          subtitle="Sabrás exactamente qué esperar en cada etapa, con explicaciones claras, sin dolor y con seguimiento constante."
          align="center"
          tone="light"
        />

        {/* Steps Grid with Integrated Connectors */}
        <div className="relative mt-16">
          {/* Desktop continuous horizontal connector line behind circles */}
          <div
            className="pointer-events-none absolute left-[12%] right-[12%] top-8 hidden h-[2px] bg-gradient-to-r from-secondary-fixed/20 via-secondary-fixed/50 to-secondary-fixed/20 lg:block"
            aria-hidden="true"
          />

          <ol className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {processSteps.map((step, index) => {
              const StepIcon = STEP_ICONS[index % STEP_ICONS.length];

              return (
                <motion.li
                  key={step.number}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: index * 0.1 }}
                  className="group relative flex flex-col justify-between rounded-3xl bg-on-primary/[0.06] p-7 border border-on-primary/10 backdrop-blur-xl transition-all duration-500 hover:bg-on-primary/[0.1] hover:border-secondary-fixed/40 hover:-translate-y-1"
                >
                  <div className="flex flex-col gap-4">
                    {/* Step Icon and Number Badge */}
                    <div className="flex items-center justify-between">
                      <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-secondary-fixed font-display text-lg font-bold text-on-secondary-container shadow-[0_8px_20px_-4px_rgba(124,248,221,0.5)] group-hover:scale-105 transition-transform duration-300">
                        {step.number}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-secondary-fixed bg-secondary-fixed/15 px-3 py-1 rounded-full border border-secondary-fixed/25">
                        <Sparkles size={12} />
                        <span>{step.highlight}</span>
                      </div>
                    </div>

                    <div className="mt-2 space-y-1.5">
                      <span className="text-xs font-semibold uppercase tracking-wider text-secondary-fixed/80">
                        {step.tag}
                      </span>
                      <h3 className="font-display text-xl text-on-primary group-hover:text-secondary-fixed transition-colors">
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-sm leading-relaxed text-on-primary-container">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-on-primary/10 text-xs text-primary-fixed/75">
                    <span className="flex items-center gap-1.5">
                      <StepIcon size={14} className="text-secondary-fixed" />
                      <span>Atención especializada</span>
                    </span>
                    {index < 3 ? (
                      <ArrowRight size={14} className="text-secondary-fixed opacity-60 hidden lg:block" />
                    ) : null}
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}

