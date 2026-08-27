"use client";

import { motion } from "framer-motion";
import { Award, CalendarCheck, CheckCircle2, ShieldCheck, Sparkles, Stethoscope, UserCheck } from "lucide-react";
import { Container } from "@/components/ui/container";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const benefits = [
  {
    number: "01",
    icon: Stethoscope,
    title: "Diagnóstico especializado",
    badge: "Evaluación clínica",
    description: "Examen podológico integral para resolver la causa raíz, no solo los síntomas.",
  },
  {
    number: "02",
    icon: ShieldCheck,
    title: "Bioseguridad hospitalaria",
    badge: "Esterilización 100%",
    description: "Instrumental quirúrgico esterilizado en autoclave clase B y protocolos asépticos.",
  },
  {
    number: "03",
    icon: UserCheck,
    title: "Atención personalizada",
    badge: "Plan a tu medida",
    description: "Tratamientos a medida según tu actividad, tipo de pisada y condiciones clínicas.",
  },
  {
    number: "04",
    icon: CalendarCheck,
    title: "Seguimiento y prevención",
    badge: "Alivio duradero",
    description: "Controles periódicos para garantizar que camines sin dolor todo el año.",
  },
];

export function Beneficios() {
  return (
    <section className="relative bg-surface-container-low py-24 sm:py-32 overflow-hidden">
      {/* Background glow effects */}
      <div
        className="pointer-events-none absolute -left-20 top-1/3 h-80 w-80 rounded-full bg-secondary-fixed/15 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          {/* Main Clinical Pillar Showcase Card */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
            className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-container to-primary p-8 sm:p-12 shadow-[0_24px_60px_-20px_rgba(0,23,54,0.4)] border border-on-primary/15 min-h-[460px]"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.6), transparent 45%), radial-gradient(circle at 80% 80%, rgba(124,248,221,0.4), transparent 45%)",
              }}
              aria-hidden="true"
            />

            <div className="relative flex flex-col gap-5">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary-fixed/15 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-secondary-fixed border border-secondary-fixed/25 backdrop-blur-sm">
                <Sparkles size={13} />
                Por qué confiar en nosotros
              </span>

              <h2 className="font-display text-3xl sm:text-4xl leading-[1.12] tracking-tight text-on-primary">
                Un enfoque clínico que respeta tu tiempo y tu tranquilidad
              </h2>

              <p className="text-base leading-relaxed text-primary-fixed">
                Combinamos tecnología de diagnóstico, protocolos de desinfección estricta y trato
                empático para devolverte el bienestar al caminar.
              </p>

              {/* Guarantees list */}
              <div className="mt-2 flex flex-col gap-2.5 text-sm text-primary-fixed border-t border-on-primary/10 pt-4">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-secondary-fixed shrink-0" />
                  <span>Sin dolor en tratamientos de uñas y callosidades</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-secondary-fixed shrink-0" />
                  <span>Atención especializada a pacientes diabéticos y tercera edad</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-secondary-fixed shrink-0" />
                  <span>Ambientes privados, higiénicos y climatizados</span>
                </div>
              </div>
            </div>

            {/* Bottom floating badge */}
            <div className="relative mt-8 pt-6 border-t border-on-primary/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary-fixed text-on-secondary-container font-display text-xl font-bold shadow-md">
                  14+
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-on-primary">Años de Trayectoria</span>
                  <span className="text-xs text-primary-fixed/80">Atendiendo a familias de Lima Norte</span>
                </div>
              </div>
              <Award size={24} className="text-secondary-fixed opacity-70 hidden sm:block" />
            </div>
          </motion.div>

          {/* 4 Benefit Cards */}
          <div className="grid gap-5 sm:grid-cols-2">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: index * 0.08 }}
                  className="glass-surface group relative flex flex-col justify-between rounded-3xl p-7 border border-white/70 bg-white/80 backdrop-blur-xl shadow-[0_10px_30px_-15px_rgba(0,23,54,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(0,23,54,0.12)] hover:border-secondary/30"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary-container text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-all duration-300 shadow-sm">
                        <Icon size={22} strokeWidth={1.75} />
                      </div>
                      <span className="font-display text-xs font-bold text-outline/50 group-hover:text-secondary transition-colors">
                        {benefit.number}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-secondary">
                        {benefit.badge}
                      </span>
                      <h3 className="font-display text-lg text-on-surface mt-1 group-hover:text-primary transition-colors">
                        {benefit.title}
                      </h3>
                    </div>

                    <p className="text-sm leading-relaxed text-on-surface-variant">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

