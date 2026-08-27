"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, MessageCircle, Send, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/lib/data";
import { whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";

const appointmentSchema = z.object({
  name: z.string().min(2, "Ingresa tu nombre completo"),
  phone: z
    .string()
    .min(6, "Ingresa un número de teléfono válido")
    .regex(/^[\d\s+()-]+$/, "Ingresa solo números y símbolos telefónicos"),
  email: z.string().email("Ingresa un correo electrónico válido"),
  serviceSlug: z.string().min(1, "Selecciona un servicio"),
  message: z.string().optional(),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

const inputClassName =
  "h-12 w-full rounded-2xl border border-outline-variant/60 bg-surface-container-lowest/90 px-4 text-sm text-on-surface outline-none transition-all duration-200 placeholder:text-on-surface-variant/50 focus:border-secondary focus:ring-4 focus:ring-secondary/15";

export function Cta() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: { name: "", phone: "", email: "", serviceSlug: "podologia-clinica", message: "" },
  });

  const selectedService = useWatch({ control, name: "serviceSlug", defaultValue: "podologia-clinica" });

  const onSubmit = async (data: AppointmentFormValues) => {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok || !json.success) {
        setServerError(json.error ?? "No pudimos enviar tu solicitud. Intentá nuevamente.");
        return;
      }
      setIsSubmitted(true);
      reset();
    } catch {
      setServerError("Error de conexión. Revisá tu internet e intentá nuevamente.");
    }
  };

  return (
    <section id="cta" className="relative overflow-hidden bg-primary py-24 sm:py-32">
      {/* Ambient background glows */}
      <div
        className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-secondary-fixed/15 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-secondary/20 blur-[120px]"
        aria-hidden="true"
      />

      <Container className="relative grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center">
        {/* Left Informational & Trust Column */}
        <div className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="Reserva tu cita"
            title="Da el primer paso hacia unos pies sanos y sin dolor"
            subtitle="Completa el formulario en 1 minuto. Nuestro equipo se pondrá en contacto contigo para confirmar la fecha y hora más conveniente para tu consulta."
            tone="light"
          />

          <div className="flex flex-col gap-3.5 pt-2 text-sm text-primary-fixed">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary-fixed/15 text-secondary-fixed">
                <Clock size={18} />
              </div>
              <span>Respuesta y confirmación en menos de 2 horas (horario de atención)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary-fixed/15 text-secondary-fixed">
                <ShieldCheck size={18} />
              </div>
              <span>Evaluación personalizada con instrumental 100% esterilizado</span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4 rounded-2xl bg-on-primary/5 p-5 border border-on-primary/10 backdrop-blur-md">
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary-fixed">
                ¿Prefieres agendar por WhatsApp?
              </span>
              <span className="text-xs text-primary-fixed/80 mt-0.5">
                Atención directa con nuestro equipo de recepción
              </span>
            </div>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-secondary-fixed px-4 py-2 text-xs font-bold text-on-secondary-container hover:bg-white transition-colors shadow-sm"
            >
              <MessageCircle size={15} />
              <span>Chatear ahora</span>
            </a>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="glass-surface-strong rounded-3xl p-8 sm:p-10 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.5)] border border-white/60 bg-white/90 backdrop-blur-2xl">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-4 py-10 text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-secondary-container text-secondary shadow-inner">
                <CheckCircle2 size={36} strokeWidth={2.5} />
              </div>
              <h3 className="font-display text-2xl font-bold text-on-surface">¡Solicitud recibida!</h3>
              <p className="max-w-sm text-sm leading-relaxed text-on-surface-variant">
                Muchas gracias por escribirnos. Nuestro personal se comunicará contigo vía WhatsApp o llamada telefónica para confirmar los detalles de tu cita.
              </p>
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "primary", size: "sm" }), "bg-secondary text-on-secondary")}
                >
                  <MessageCircle size={16} />
                  <span>Enviar mensaje por WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
                >
                  Enviar otra solicitud
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                    Nombre completo <span className="text-secondary">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Ej. Juan Pérez"
                    autoComplete="name"
                    className={inputClassName}
                    aria-invalid={Boolean(errors.name)}
                    {...register("name")}
                  />
                  {errors.name ? (
                    <span className="text-xs text-error font-medium">{errors.name.message}</span>
                  ) : null}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                    Teléfono / WhatsApp <span className="text-secondary">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Ej. 999 222 550"
                    autoComplete="tel"
                    className={inputClassName}
                    aria-invalid={Boolean(errors.phone)}
                    {...register("phone")}
                  />
                  {errors.phone ? (
                    <span className="text-xs text-error font-medium">{errors.phone.message}</span>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                  Correo electrónico <span className="text-secondary">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="tu.correo@ejemplo.com"
                  autoComplete="email"
                  className={inputClassName}
                  aria-invalid={Boolean(errors.email)}
                  {...register("email")}
                />
                {errors.email ? (
                  <span className="text-xs text-error font-medium">{errors.email.message}</span>
                ) : null}
              </div>

              {/* Service selector chips */}
              <div className="flex flex-col gap-2">
                <label htmlFor="serviceSlug" className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                  Servicio de interés <span className="text-secondary">*</span>
                </label>
                
                {/* Quick Selection Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {services.slice(0, 5).map((service) => {
                    const isSelected = selectedService === service.slug;
                    return (
                      <button
                        key={service.slug}
                        type="button"
                        onClick={() => setValue("serviceSlug", service.slug, { shouldValidate: true })}
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 cursor-pointer",
                          isSelected
                            ? "bg-secondary text-on-secondary shadow-sm font-semibold"
                            : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high",
                        )}
                      >
                        {service.title}
                      </button>
                    );
                  })}
                </div>

                <select
                  id="serviceSlug"
                  className={cn(inputClassName, "mt-1")}
                  aria-invalid={Boolean(errors.serviceSlug)}
                  {...register("serviceSlug")}
                >
                  <option value="" disabled>
                    Selecciona o cambia el servicio
                  </option>
                  {services.map((service) => (
                    <option key={service.slug} value={service.slug}>
                      {service.title} {service.duration ? `(${service.duration})` : ""}
                    </option>
                  ))}
                </select>
                {errors.serviceSlug ? (
                  <span className="text-xs text-error font-medium">{errors.serviceSlug.message}</span>
                ) : null}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                  Mensaje o molestia principal (opcional)
                </label>
                <textarea
                  id="message"
                  rows={2}
                  placeholder="Cuéntanos brevemente qué molestia tienes o qué horario prefieres..."
                  className={cn(inputClassName, "h-auto resize-none py-3")}
                  {...register("message")}
                />
              </div>

              {serverError ? (
                <p role="alert" className="rounded-xl bg-error/10 border border-error/20 px-4 py-3 text-xs text-error font-medium">
                  {serverError}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  buttonVariants({ variant: "primary", size: "lg" }),
                  "mt-1 w-full bg-secondary text-on-secondary hover:bg-secondary-fixed hover:text-on-secondary-container shadow-[0_10px_30px_-5px_rgba(0,107,91,0.5)] font-semibold transition-all duration-300",
                )}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                    Enviando solicitud...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <span>Enviar solicitud de cita</span>
                    <Send size={16} />
                  </span>
                )}
              </button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}

