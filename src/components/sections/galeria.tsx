"use client";

import useEmblaCarousel from "embla-carousel-react";
import { Building2, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { type GalleryItem, galleryItems } from "@/lib/data";

const GALLERY_TAGS = [
  "Recepción & Espera",
  "Consultorio 1 · Podología",
  "Área Biomecánica Digital",
  "Esterilización Quirúrgica",
  "Consultorio 2 · Atención",
];

function GradientTile({ item, index }: { item: GalleryItem; index: number }) {
  const tag = GALLERY_TAGS[index % GALLERY_TAGS.length];

  return (
    <div className="group relative flex h-full min-h-[340px] flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-container to-secondary p-8 transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-20px_rgba(0,23,54,0.4)] border border-on-primary/10">
      <div
        className="absolute inset-0 opacity-25 mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.6), transparent 45%), radial-gradient(circle at 80% 70%, rgba(124,248,221,0.4), transparent 40%)",
        }}
        aria-hidden="true"
      />

      <div className="relative flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-on-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-fixed backdrop-blur-md border border-on-primary/20">
          <Sparkles size={12} />
          {tag}
        </span>
        <Building2 size={20} className="text-secondary-fixed/70" />
      </div>

      <div className="relative flex flex-col gap-2 text-on-primary">
        <h3 className="font-display text-2xl font-bold tracking-tight text-on-primary group-hover:text-secondary-fixed transition-colors">
          {item.title}
        </h3>
        <p className="text-sm leading-relaxed text-primary-fixed">{item.caption}</p>
      </div>
    </div>
  );
}

export function Galeria() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    queueMicrotask(updateScrollState);
    emblaApi.on("select", updateScrollState);
    emblaApi.on("reInit", updateScrollState);
    return () => {
      emblaApi.off("select", updateScrollState);
      emblaApi.off("reInit", updateScrollState);
    };
  }, [emblaApi, updateScrollState]);

  return (
    <section className="relative bg-surface py-24 sm:py-32 overflow-hidden">
      <Container className="relative">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Instalaciones clínicas"
            title="Un espacio diseñado para tu máxima tranquilidad"
            subtitle="Ambientes higiénicos, equipamiento de vanguardia y protocolos de esterilización en cada área de atención."
          />
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canScrollPrev}
              aria-label="Ver imagen anterior"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-outline-variant/60 bg-white/80 text-on-surface shadow-sm transition-all hover:bg-secondary-container hover:text-secondary disabled:opacity-30 disabled:pointer-events-none active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canScrollNext}
              aria-label="Ver siguiente imagen"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-outline-variant/60 bg-white/80 text-on-surface shadow-sm transition-all hover:bg-secondary-container hover:text-secondary disabled:opacity-30 disabled:pointer-events-none active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="mt-12 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {galleryItems.map((item, index) => (
              <div
                key={item.title}
                className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_46%] lg:flex-[0_0_32%]"
              >
                <GradientTile item={item} index={index} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

