"use client";

import useEmblaCarousel from "embla-carousel-react";
import { CheckCircle2, ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Testimonios() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    queueMicrotask(handleSelect);
    emblaApi.on("select", handleSelect);
    emblaApi.on("reInit", handleSelect);
    return () => {
      emblaApi.off("select", handleSelect);
      emblaApi.off("reInit", handleSelect);
    };
  }, [emblaApi, handleSelect]);

  useEffect(() => {
    if (!emblaApi || isPaused) return;
    const interval = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 6500);
    return () => window.clearInterval(interval);
  }, [emblaApi, isPaused]);

  return (
    <section id="testimonios" className="relative overflow-hidden bg-primary py-24 sm:py-32">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -left-28 top-1/4 h-96 w-96 rounded-full bg-secondary-fixed/15 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-28 bottom-1/4 h-96 w-96 rounded-full bg-secondary/20 blur-[120px]"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="flex flex-col items-center text-center">
          <SectionHeading
            eyebrow="Testimonios reales"
            title="La confianza de quienes ya caminan sin dolor"
            subtitle="Opiniones sinceras de pacientes que confiaron en nuestro equipo y hoy disfrutan de una mejor calidad de vida."
            tone="light"
            align="center"
          />
        </div>

        {/* Carousel Viewport */}
        <div
          className="mt-14 overflow-hidden"
          ref={emblaRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex -ml-4">
            {testimonials.map((testimonial) => {
              return (
                <div
                  key={testimonial.name}
                  className="min-w-0 flex-[0_0_100%] pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                >
                  <div
                    className={cn(
                      "group relative flex h-full flex-col justify-between rounded-3xl p-8 transition-all duration-500",
                      "bg-on-primary/[0.06] border border-on-primary/15 backdrop-blur-xl",
                      "hover:bg-on-primary/[0.1] hover:border-secondary-fixed/50 hover:shadow-[0_20px_50px_-15px_rgba(0,23,54,0.6)] hover:-translate-y-1",
                    )}
                  >
                    <div className="flex flex-col gap-4">
                      {/* Top Bar: Quote + Treatment tag */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-fixed/15 text-secondary-fixed">
                          <Quote size={20} />
                        </div>
                        {testimonial.treatment ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-secondary-fixed/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-secondary-fixed border border-secondary-fixed/20">
                            {testimonial.treatment}
                          </span>
                        ) : null}
                      </div>

                      {/* Stars Rating */}
                      <div
                        className="flex items-center gap-1"
                        aria-label={`Calificación: ${testimonial.rating} de 5 estrellas`}
                      >
                        {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                          <Star
                            key={`${testimonial.name}-star-${starIndex}`}
                            size={16}
                            className="fill-secondary-fixed text-secondary-fixed"
                          />
                        ))}
                      </div>

                      {/* Quote Text */}
                      <p className="text-base italic leading-relaxed text-on-primary/95">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                    </div>

                    {/* Patient Author Info */}
                    <div className="mt-8 flex items-center justify-between border-t border-on-primary/10 pt-5">
                      <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-secondary-fixed text-sm font-bold text-on-secondary-container shadow-sm">
                          {testimonial.name
                            .split(" ")
                            .map((part) => part[0])
                            .slice(0, 2)
                            .join("")}
                        </span>
                        <div>
                          <p className="font-display text-sm font-semibold text-on-primary">
                            {testimonial.name}
                          </p>
                          <p className="text-xs text-primary-fixed/80">{testimonial.location}</p>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-secondary-fixed" title="Paciente con atención verificada">
                        <CheckCircle2 size={13} />
                        <span className="hidden xs:inline">Verificado</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Accessible Navigation Controls & Dynamic Pagination */}
        <div className="mt-10 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Testimonio anterior"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-on-primary/25 bg-on-primary/5 text-on-primary transition-all hover:bg-secondary-fixed hover:text-on-secondary-container hover:border-secondary-fixed active:scale-95"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2" role="tablist" aria-label="Selector de testimonios">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.name}
                type="button"
                role="tab"
                aria-selected={selectedIndex === index}
                aria-label={`Ir al testimonio de ${testimonial.name}`}
                onClick={() => emblaApi?.scrollTo(index)}
                className="flex h-11 w-7 items-center justify-center rounded-full"
              >
                <span
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    selectedIndex === index ? "w-7 bg-secondary-fixed shadow-[0_0_12px_rgba(124,248,221,0.6)]" : "w-2 bg-on-primary/30",
                  )}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Siguiente testimonio"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-on-primary/25 bg-on-primary/5 text-on-primary transition-all hover:bg-secondary-fixed hover:text-on-secondary-container hover:border-secondary-fixed active:scale-95"
          >
            <ChevronRight size={20} />
          </button>

          {/* Numeric Counter */}
          <span className="hidden sm:inline-block font-display text-xs font-semibold uppercase tracking-wider text-primary-fixed/80 ml-2">
            0{selectedIndex + 1} / 0{testimonials.length}
          </span>
        </div>
      </Container>
    </section>
  );
}

