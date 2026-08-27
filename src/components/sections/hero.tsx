"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, Award, CheckCircle2, HeartPulse, ShieldCheck, Star } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll-driven forward zoom simulating drone entering the clinic
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, shouldReduceMotion ? 1 : 1.15]);
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const heroContentY = useTransform(scrollYProgress, [0, 0.75], [0, -40]);

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: EASE_OUT_EXPO },
    },
  };

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative flex min-h-[95vh] lg:min-h-screen items-center overflow-hidden bg-primary"
    >
      {/* Background Drone Video — Rock-Solid & Luminous */}
      <motion.div
        style={{ scale: videoScale }}
        className="absolute inset-0 h-full w-full pointer-events-none will-change-transform"
      >
        <video
          className="h-full w-full object-cover brightness-[1.02] contrast-[1.03]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/video/hero-clinic.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Gentle Contrast Scrim (Left-weighted so drone entrance on the right is completely clear) */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-primary/40 sm:bg-gradient-to-r sm:from-primary/90 sm:via-primary/50 sm:to-transparent"
        aria-hidden="true"
      />

      <Container className="relative z-10 pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Left Content Column — No blocking box, clean readable typography */}
          <motion.div
            style={{ opacity: heroContentOpacity, y: heroContentY }}
            variants={container}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-center text-center sm:items-start sm:text-left gap-5 sm:gap-6"
          >
            {/* Logo Brand Lockup */}
            <motion.div variants={item}>
              <Image
                src="/images/logo-light.png"
                alt="Consultorio Podológico Aguilar"
                width={284}
                height={113}
                priority
                className="aspect-[284/113] h-12 sm:h-14 w-auto drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
              />
            </motion.div>

            {/* Location & Status Eyebrow Badge */}
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 rounded-full bg-black/40 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-secondary-fixed backdrop-blur-md border border-white/20 shadow-lg"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-fixed opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary-fixed" />
              </span>
              <span>Podología Clínica en Los Olivos, Lima</span>
            </motion.div>

            {/* Main Display Headline */}
            <motion.h1
              variants={item}
              className="font-display text-4xl leading-[1.08] tracking-tight text-white drop-shadow-[0_3px_18px_rgba(0,0,0,0.9)] sm:text-5xl lg:text-6xl font-bold"
            >
              Cada paso, en las{" "}
              <span className="bg-gradient-to-r from-secondary-fixed via-secondary-fixed-dim to-white bg-clip-text text-transparent">
                mejores manos
              </span>
            </motion.h1>

            {/* Subtitle Value Proposition */}
            <motion.p
              variants={item}
              className="max-w-xl text-base leading-relaxed text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] sm:text-lg font-medium"
            >
              Diagnóstico preciso, tratamientos especializados y seguimiento cercano para que
              recuperes el confort de caminar sin dolor, hoy y en cada etapa de tu vida.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center gap-3.5 pt-2"
            >
              <a
                href="#cta"
                className={cn(
                  buttonVariants({ variant: "primary", size: "lg" }),
                  "group bg-secondary text-on-secondary hover:bg-secondary-fixed hover:text-on-secondary-container shadow-[0_12px_36px_-8px_rgba(0,107,91,0.7)] font-semibold transition-all duration-300",
                )}
              >
                <span>Agendar una cita</span>
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <a
                href="#servicios"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-white/40 bg-black/30 text-white hover:border-secondary-fixed hover:text-secondary-fixed hover:bg-black/50 backdrop-blur-md transition-all duration-300",
                )}
              >
                Conocer tratamientos
              </a>
            </motion.div>

            {/* Clinical Assurance Micro-Badges */}
            <motion.div
              variants={item}
              className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 pt-4 text-xs font-semibold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] border-t border-white/20 w-full"
            >
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <CheckCircle2 size={16} className="text-secondary-fixed shrink-0" />
                <span>Procedimientos indoloros</span>
              </div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <ShieldCheck size={16} className="text-secondary-fixed shrink-0" />
                <span>100% esterilizado</span>
              </div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <Award size={16} className="text-secondary-fixed shrink-0" />
                <span>14+ años experiencia</span>
              </div>
            </motion.div>

            {/* Social Proof Mini Bar */}
            <motion.div
              variants={item}
              className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1"
            >
              <div className="flex -space-x-2 overflow-hidden">
                {["FR", "JH", "LD", "RS"].map((initial, i) => (
                  <div
                    key={i}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-surface-container-high border-2 border-primary text-[10px] font-bold text-primary shadow-md"
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                <div className="flex gap-0.5 text-secondary-fixed">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="fill-secondary-fixed text-secondary-fixed" />
                  ))}
                </div>
                <span className="font-bold text-white">4.9 / 5</span>
                <span className="text-white/90">• +8,500 pacientes satisfechos</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column — Elegant Floating Accreditation Badges */}
          <div className="lg:col-span-5 hidden lg:flex flex-col gap-4 items-end justify-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-72 rounded-3xl border border-white/20 bg-black/40 p-4 shadow-2xl backdrop-blur-md flex items-center gap-3.5"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-secondary text-on-secondary shadow-md">
                <ShieldCheck size={22} strokeWidth={2} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-secondary-fixed">
                  Certificación Oficial
                </span>
                <span className="font-display text-xs font-semibold text-white">
                  Colegio de Podólogos del Perú
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="w-72 rounded-3xl border border-white/20 bg-black/40 p-4 shadow-2xl backdrop-blur-md flex items-center gap-3.5"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-secondary-fixed/25 text-secondary-fixed shadow-md">
                <HeartPulse size={22} strokeWidth={2} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-secondary-fixed">
                  Pie Diabético
                </span>
                <span className="font-display text-xs font-semibold text-white">
                  Protocolos Preventivos
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>

      {/* Interactive Scroll Down Indicator */}
      <a
        href="#servicios"
        aria-label="Ir a servicios"
        className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 group cursor-pointer transition-opacity duration-300 hover:opacity-100 opacity-90 drop-shadow-lg"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-secondary-fixed transition-colors">
          Explorar
        </span>
        <div className="scroll-indicator-line" aria-hidden="true" />
      </a>
    </section>
  );
}




