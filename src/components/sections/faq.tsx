"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { useId, useState } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { faqs } from "@/lib/data";
import { whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

function FaqRow({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentId = useId();
  const buttonId = useId();

  return (
    <div
      className={cn(
        "glass-surface rounded-2xl border transition-all duration-300",
        isOpen
          ? "border-secondary/40 bg-white shadow-[0_12px_30px_-15px_rgba(0,107,91,0.15)]"
          : "border-white/70 bg-white/75 hover:bg-white hover:border-outline-variant/50",
      )}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
        >
          <span className="font-display text-base sm:text-lg font-semibold text-on-surface">
            {question}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
              isOpen ? "bg-secondary text-on-secondary shadow-sm" : "bg-surface-container text-on-surface",
            )}
          >
            <ChevronDown size={18} />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id={contentId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 pr-12 text-sm sm:text-base leading-relaxed text-on-surface-variant border-t border-outline-variant/15 pt-4">
              {answer}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-surface-container-low py-24 sm:py-32 overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-secondary-fixed/15 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative max-w-4xl">
        <SectionHeading
          eyebrow="Preguntas frecuentes"
          title="Resolvemos tus dudas antes de tu consulta"
          subtitle="Queremos que asistas con total tranquilidad. Aquí respondemos las inquietudes más comunes de nuestros pacientes."
          align="center"
        />

        <div className="mt-12 flex flex-col gap-3.5">
          {faqs.map((faq, index) => (
            <FaqRow
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex((current) => (current === index ? null : index))}
            />
          ))}
        </div>

        {/* WhatsApp Help Bridge Card */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-5 rounded-3xl bg-white p-6 sm:p-8 border border-outline-variant/40 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary-container text-secondary">
              <HelpCircle size={24} />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-on-surface">
                ¿Tienes una consulta diferente o un caso urgente?
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5">
                Escríbenos directamente y te orientaremos en minutos.
              </p>
            </div>
          </div>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-xs font-bold text-on-secondary hover:bg-secondary-fixed hover:text-on-secondary-container transition-colors shadow-sm shrink-0"
          >
            <MessageCircle size={16} />
            <span>Consultar por WhatsApp</span>
          </a>
        </div>
      </Container>
    </section>
  );
}

