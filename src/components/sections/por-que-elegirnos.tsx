"use client";

import { motion } from "framer-motion";
import { Award, GraduationCap, HeartHandshake, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { useCountUp } from "@/hooks/use-count-up";
import { stats } from "@/lib/data";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const STAT_ICONS = [Award, Users, HeartHandshake, GraduationCap];

function StatCard({
  value,
  suffix,
  label,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  index: number;
}) {
  const { ref, value: animatedValue } = useCountUp({ end: value });
  const Icon = STAT_ICONS[index % STAT_ICONS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: index * 0.1 }}
      className="group relative flex flex-col justify-between rounded-3xl bg-on-primary/5 p-6 sm:p-8 border border-on-primary/10 backdrop-blur-md transition-all duration-500 hover:bg-on-primary/10 hover:border-secondary-fixed/40 hover:-translate-y-1"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary-fixed/15 text-secondary-fixed border border-secondary-fixed/20 group-hover:scale-110 group-hover:bg-secondary-fixed group-hover:text-on-secondary-container transition-all duration-300">
          <Icon size={20} strokeWidth={2} />
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-secondary-fixed/80">
          Métrica Verificada
        </span>
      </div>

      <div ref={ref} className="mt-6 flex flex-col gap-1.5">
        <span className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-on-primary group-hover:text-secondary-fixed transition-colors">
          {animatedValue.toLocaleString("es-PE")}
          {suffix}
        </span>
        <span className="text-sm font-medium leading-snug text-primary-fixed/90">
          {label}
        </span>
      </div>
    </motion.div>
  );
}

export function PorQueElegirnos() {
  return (
    <section id="por-que-elegirnos" className="relative overflow-hidden bg-primary py-24 sm:py-32">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-secondary-fixed/15 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-secondary/15 blur-[120px]"
        aria-hidden="true"
      />

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <Container className="relative">
        <SectionHeading
          eyebrow="Por qué elegirnos"
          title="Resultados clínicos que se sostienen en el tiempo"
          subtitle="Detrás de cada cifra hay familias que recuperaron algo tan simple —y vital— como caminar con total libertad y sin dolor."
          tone="light"
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

