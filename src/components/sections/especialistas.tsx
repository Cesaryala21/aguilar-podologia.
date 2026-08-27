"use client";

import { ArrowLeft, ArrowRight, Award, Sparkles } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

interface DoctorFigurine {
  id: string;
  name: string;
  role: string;
  credential: string;
  bio: string;
  src: string;
  bg: string;
  panel: string;
  accent: string;
  experience: string;
  badge: string;
}

const DOCTORS: DoctorFigurine[] = [
  {
    id: "marisol",
    name: "Dra. Marisol Aguilar",
    role: "Directora Médica & Podología Integral",
    credential: "Colegio de Podólogos del Perú N.° 0452",
    bio: "Lidera la clínica con enfoque integral en pie diabético, onicocriptosis y protocolos indoloros de alta precisión.",
    src: "/images/avatar-marisol.webp",
    bg: "#001736",
    panel: "#002b5b",
    accent: "#7cf8dd",
    experience: "14+ AÑOS EXP.",
    badge: "Directora Médica",
  },
  {
    id: "renato",
    name: "Dr. Renato Vidal",
    role: "Especialista en Biomecánica & Pisada",
    credential: "Máster en Biomecánica · U. Barcelona",
    bio: "Análisis computarizado de la marcha, baropodometría digital y diseño de plantillas ortésicas personalizadas.",
    src: "/images/avatar-renato.webp",
    bg: "#00362f",
    panel: "#005a4e",
    accent: "#7cf8dd",
    experience: "10+ AÑOS EXP.",
    badge: "Biomecánica 3D",
  },
  {
    id: "camila",
    name: "Lic. Camila Ortiz",
    role: "Cirugía Ungueal & Podología Clínica",
    credential: "Cirugía Mínimamente Invasiva",
    bio: "Tratamiento indoloro de uña encarnada, corrección estética de onicomicosis y recuperación inmediata sin reposo.",
    src: "/images/avatar-camila.webp",
    bg: "#092e3a",
    panel: "#0e5264",
    accent: "#5ddbc1",
    experience: "8+ AÑOS EXP.",
    badge: "Cirugía Ungueal",
  },
  {
    id: "carlos",
    name: "Lic. Carlos Mendoza",
    role: "Podología Deportiva & Prevención",
    credential: "Especialista en Alto Rendimiento",
    bio: "Prevención de lesiones en deportistas, cuidado de fascia plantar, alivio de espolón y descarga articular.",
    src: "/images/avatar-carlos.webp",
    bg: "#0c2340",
    panel: "#164073",
    accent: "#7cf8dd",
    experience: "9+ AÑOS EXP.",
    badge: "Podología Deportiva",
  },
];

export function Especialistas() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 3D Mouse Parallax States for the Center Figurine
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  // Preload all 4 figurine images on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      DOCTORS.forEach((doc) => {
        const img = new window.Image();
        img.src = doc.src;
      });
    }

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const navigate = useCallback(
    (direction: "next" | "prev" | number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      if (typeof direction === "number") {
        setActiveIndex(direction);
      } else {
        setActiveIndex((prev) => (direction === "next" ? (prev + 1) % 4 : (prev + 3) % 4));
      }
      setTilt({ x: 0, y: 0 });
      // Ultra-snappy 220ms transition lock for maximum dynamism
      setTimeout(() => setIsAnimating(false), 220);
    },
    [isAnimating],
  );

  // Mouse Move 3D Tilt calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    // Deeper tilt angles for pronounced 3D depth
    setTilt({ x: -(y * 16), y: x * 22 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Touch Swipe Handlers for mobile dynamism
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) navigate("next");
      else navigate("prev");
    }
    touchStartX.current = null;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") navigate("next");
      if (e.key === "ArrowLeft") navigate("prev");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  const currentDoctor = DOCTORS[activeIndex];

  return (
    <section
      id="especialistas"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full overflow-hidden transition-colors duration-500 ease-out select-none min-h-dvh"
      style={{
        backgroundColor: currentDoctor.bg,
        perspective: "1200px",
        fontFamily: "var(--font-sans), sans-serif",
      }}
    >
      {/* 1. Subtle Organic Noise Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-50 opacity-25 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }}
        aria-hidden="true"
      />

      {/* 2. 3D Volumetric Stage Lighting in Background */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[550px] sm:h-[750px] sm:w-[750px] rounded-full blur-[140px] opacity-35 transition-all duration-500"
        style={{ backgroundColor: currentDoctor.accent }}
        aria-hidden="true"
      />

      <div className="relative h-dvh min-h-[560px] sm:min-h-[640px] w-full overflow-hidden">
        {/* 3. Giant Ghost Backdrop Typography — sized to always stay within the
            viewport width so the word never gets clipped mid-letter */}
        <div
          className="pointer-events-none absolute inset-x-0 top-[16%] sm:top-[14%] z-[2] flex items-center justify-center select-none px-4"
          aria-hidden="true"
        >
          <span
            className="text-center font-black uppercase text-white/[0.08] tracking-tight transition-all duration-500 whitespace-nowrap"
            style={{
              fontFamily: "var(--font-anton), var(--font-display), sans-serif",
              fontSize: "clamp(34px, 10.5vw, 190px)",
              lineHeight: 0.85,
              letterSpacing: "-0.03em",
            }}
          >
            ESPECIALISTAS
          </span>
        </div>

        {/* 4. Top Navigation Bar & Interactive Doctor Switcher Tabs — offset to
            clear the fixed floating navbar (matches hero's pt-28/pt-36 clearance) */}
        <div className="absolute top-24 sm:top-28 left-4 right-4 sm:left-10 sm:right-10 z-[60] flex flex-wrap items-center justify-between gap-3">
          {/* Main Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-white/90 backdrop-blur-md shadow-lg">
            <Sparkles size={14} style={{ color: currentDoctor.accent }} />
            <span>Cuerpo Médico 3D · Aguilar</span>
          </div>

          {/* Interactive Fast Tabs */}
          <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 p-1 backdrop-blur-md shadow-lg">
            {DOCTORS.map((doc, idx) => (
              <button
                key={doc.id}
                type="button"
                onClick={() => navigate(idx)}
                className={`relative px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-200 cursor-pointer ${
                  activeIndex === idx
                    ? "text-on-surface shadow-md"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
                style={{
                  backgroundColor: activeIndex === idx ? currentDoctor.accent : "transparent",
                }}
              >
                {doc.badge}
              </button>
            ))}
          </div>
        </div>

        {/* 5. 3D Glowing Stage Floor Ring (Under Central Figurine) */}
        <div
          className="pointer-events-none absolute left-1/2 bottom-[4%] sm:bottom-[3%] -translate-x-1/2 z-[8] transition-all duration-500"
          style={{
            transform: `translateX(-50%) rotateX(65deg) scale(${isMobile ? 0.9 : 1.3})`,
          }}
          aria-hidden="true"
        >
          <div
            className="h-72 w-72 rounded-full border-2 border-white/40 shadow-[0_0_80px_rgba(124,248,221,0.6)] animate-pulse"
            style={{
              background: `radial-gradient(circle, ${currentDoctor.accent}55 0%, transparent 70%)`,
              animationDuration: "3s",
            }}
          />
        </div>

        {/* 6. Dynamic 3D Figurine Characters Carousel */}
        <div className="absolute inset-0 z-[10] overflow-hidden">
          {DOCTORS.map((doc, index) => {
            const isCenter = index === activeIndex;
            const isLeft = index === (activeIndex + 3) % 4;
            const isRight = index === (activeIndex + 1) % 4;
            const isBack = index === (activeIndex + 2) % 4;

            let left = "50%";
            let height = isMobile ? "64%" : "90%";
            let bottom = isMobile ? "18%" : "2%";
            let scale = isMobile ? 1.18 : 1.5;
            let blur = "0px";
            let opacity = 1;
            let zIndex = 20;

            if (isLeft) {
              left = isMobile ? "10%" : "15%";
              height = isMobile ? "18%" : "24%";
              bottom = isMobile ? "40%" : "45%";
              scale = 1;
              blur = "3px";
              opacity = 0.8;
              zIndex = 10;
            } else if (isRight) {
              left = isMobile ? "90%" : "85%";
              height = isMobile ? "18%" : "24%";
              bottom = isMobile ? "40%" : "45%";
              scale = 1;
              blur = "3px";
              opacity = 0.8;
              zIndex = 10;
            } else if (isBack) {
              left = "50%";
              height = isMobile ? "14%" : "24%";
              bottom = isMobile ? "38%" : "18%";
              scale = 0.85;
              blur = "6px";
              opacity = 0.45;
              zIndex = 5;
            }

            return (
              <div
                key={doc.id}
                onClick={() => {
                  if (isLeft) navigate("prev");
                  if (isRight) navigate("next");
                }}
                className={`absolute will-change-transform transition-all duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isCenter ? "cursor-grab active:cursor-grabbing" : "cursor-pointer hover:opacity-100 hover:scale-105"
                }`}
                style={{
                  left,
                  bottom,
                  height,
                  zIndex,
                  opacity,
                  filter: `blur(${blur})`,
                  transform: isCenter
                    ? `translateX(-50%) scale(${scale}) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(40px)`
                    : `translateX(-50%) scale(${scale})`,
                  transformStyle: "preserve-3d",
                  aspectRatio: "0.68 / 1",
                }}
              >
                {/* 3D Character Transparent Render — bottom mask dissolves the figurine's
                    plinth/logo plate into the stage-light glow instead of showing a hard base */}
                <div
                  className="relative h-full w-full"
                  style={{
                    maskImage: "linear-gradient(to bottom, black 0%, black 82%, transparent 97%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 82%, transparent 97%)",
                  }}
                >
                  <Image
                    src={doc.src}
                    alt={doc.name}
                    fill
                    sizes="(min-width: 768px) 600px, 350px"
                    priority={isCenter}
                    draggable={false}
                    className="object-contain object-bottom drop-shadow-[0_24px_48px_rgba(0,0,0,0.7)] select-none pointer-events-none"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* 7. Bottom-Left Details Card & Snappy Arrow Controls */}
        <div className="absolute bottom-6 left-4 sm:bottom-10 sm:left-12 z-[60] max-w-[280px] sm:max-w-xs lg:max-w-md">
          {/* Active Doctor Micro Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-on-surface shadow-md"
              style={{ backgroundColor: currentDoctor.accent }}
            >
              <Award size={13} />
              {currentDoctor.experience}
            </span>
            <span className="text-[11px] font-bold text-white/80 tracking-wide uppercase">
              {currentDoctor.credential}
            </span>
          </div>

          <h3
            className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight drop-shadow-lg transition-all duration-300"
            style={{ fontFamily: "var(--font-anton), var(--font-display), sans-serif" }}
          >
            {currentDoctor.name}
          </h3>

          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-secondary-fixed mt-1">
            {currentDoctor.role}
          </p>

          <p className="hidden sm:block text-xs sm:text-sm text-white/85 leading-relaxed mt-2.5 line-clamp-2">
            {currentDoctor.bio}
          </p>

          {/* Snappy Navigation Buttons */}
          <div className="flex items-center gap-3 mt-4 sm:mt-5">
            <button
              type="button"
              onClick={() => navigate("prev")}
              disabled={isAnimating}
              aria-label="Ver especialista anterior"
              className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border-2 border-white/50 bg-white/10 text-white backdrop-blur-md transition-all duration-150 hover:scale-110 hover:bg-white/25 hover:border-white disabled:opacity-50 cursor-pointer shadow-xl active:scale-90"
            >
              <ArrowLeft size={24} strokeWidth={2.5} />
            </button>
            <button
              type="button"
              onClick={() => navigate("next")}
              disabled={isAnimating}
              aria-label="Ver siguiente especialista"
              className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border-2 border-white/50 bg-white/10 text-white backdrop-blur-md transition-all duration-150 hover:scale-110 hover:bg-white/25 hover:border-white disabled:opacity-50 cursor-pointer shadow-xl active:scale-90"
            >
              <ArrowRight size={24} strokeWidth={2.5} />
            </button>
            <div className="flex flex-col pl-2">
              <span className="text-xs font-bold text-white uppercase tracking-widest">
                Girar 3D
              </span>
              <span className="text-[10px] font-medium text-white/60">
                Toca flechas o avatares
              </span>
            </div>
          </div>
        </div>

        {/* 8. Bottom-Right Action CTA Button — label collapses to an icon-only
            button on mobile so it never fights the details card for width */}
        <div className="absolute bottom-6 right-4 sm:bottom-10 sm:right-12 z-[60]">
          <a
            href="#cta"
            className="group flex items-center gap-3 text-white transition-all duration-200"
          >
            <span
              className="hidden sm:inline uppercase tracking-tight transition-transform duration-200 group-hover:-translate-x-1"
              style={{
                fontFamily: "var(--font-anton), var(--font-display), sans-serif",
                fontSize: "clamp(22px, 4vw, 46px)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              AGENDAR CITA
            </span>
            <span className="sr-only sm:hidden">Agendar cita</span>
            <div
              className="flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full text-on-surface shadow-2xl transition-all duration-200 group-hover:scale-115 group-hover:translate-x-1"
              style={{ backgroundColor: currentDoctor.accent }}
            >
              <ArrowRight size={24} strokeWidth={2.5} />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}



