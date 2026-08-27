"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { siteConfig, telHref } from "@/lib/site";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#servicios", label: "Servicios" },
  { href: "#por-que-elegirnos", label: "Por qué elegirnos" },
  { href: "#especialistas", label: "Especialistas" },
  { href: "#proceso", label: "Proceso" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#faq", label: "Preguntas" },
  { href: "#mapa", label: "Ubicación" },
];

export function Navbar() {
  const isScrolled = useScrollPosition(60);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 sm:px-6">
      <div
        className={cn(
          "glass-surface-strong mt-3 sm:mt-4 flex w-full max-w-7xl items-center justify-between rounded-full px-4 sm:px-6 shadow-[0_12px_40px_-16px_rgba(0,23,54,0.35)] border border-white/40 transition-all duration-500 ease-[var(--ease-out-expo)]",
          isScrolled ? "mt-2 py-2 sm:py-2.5 bg-white/90 shadow-[0_16px_40px_-12px_rgba(0,23,54,0.4)]" : "py-3 sm:py-3.5 bg-white/80",
        )}
      >
        <Link
          href="#top"
          className="flex min-h-11 items-center gap-3 group"
          aria-label="Consultorio Podológico Aguilar — inicio"
        >
          <Image
            src="/images/logo-mark.png"
            alt="Consultorio Podológico Aguilar"
            width={284}
            height={113}
            priority
            className={cn(
              "aspect-[284/113] w-auto transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:opacity-90",
              isScrolled ? "h-8 sm:h-9" : "h-9 sm:h-10",
            )}
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navegación principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant transition-colors duration-200 hover:text-primary relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-secondary after:transition-all hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Button & Contact Link */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href={telHref}
            className="flex items-center gap-1.5 text-xs font-bold text-on-surface hover:text-primary transition-colors"
          >
            <Phone size={14} className="text-secondary" />
            <span>{siteConfig.phone.display}</span>
          </a>
          <a
            href="#cta"
            className={cn(
              buttonVariants({ variant: "primary", size: "sm" }),
              "bg-secondary text-on-secondary hover:bg-secondary-fixed hover:text-on-secondary-container shadow-sm font-semibold",
            )}
          >
            <span>Reservar cita</span>
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full text-on-surface hover:bg-surface-container transition-colors lg:hidden cursor-pointer"
          aria-expanded={isMenuOpen}
          aria-controls={menuId}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown Drawer */}
      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            id={menuId}
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass-surface-strong absolute top-20 w-[92%] max-w-lg rounded-3xl p-6 shadow-[0_24px_60px_-16px_rgba(0,23,54,0.4)] border border-white/60 bg-white/95 backdrop-blur-2xl lg:hidden"
          >
            <nav className="flex flex-col gap-1.5" aria-label="Navegación móvil">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-semibold text-on-surface transition-colors hover:bg-secondary-container hover:text-secondary flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowRight size={14} className="opacity-40" />
                </a>
              ))}
              
              <div className="mt-3 pt-3 border-t border-outline-variant/30 flex flex-col gap-3">
                <a
                  href={telHref}
                  className="flex items-center justify-center gap-2 py-2 text-xs font-bold text-on-surface"
                >
                  <Phone size={14} className="text-secondary" />
                  <span>Llamar al {siteConfig.phone.display}</span>
                </a>
                <a
                  href="#cta"
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(buttonVariants({ variant: "primary" }), "w-full bg-secondary text-on-secondary font-semibold")}
                >
                  Reservar cita médica
                </a>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

