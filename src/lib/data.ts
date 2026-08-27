import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Droplets,
  Footprints,
  HeartPulse,
  Microscope,
  Scissors,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export interface Service {
  slug: string;
  icon: LucideIcon;
  title: string;
  description: string;
  featured?: boolean;
  tag?: string;
  duration?: string;
}

export const services: Service[] = [
  {
    slug: "podologia-clinica",
    icon: Footprints,
    title: "Podología Clínica",
    description:
      "Evaluación integral de la salud de tus pies para detectar a tiempo cualquier molestia y devolverte cada paso sin dolor.",
    featured: true,
    tag: "Servicio Principal",
    duration: "45 min",
  },
  {
    slug: "pie-diabetico",
    icon: HeartPulse,
    title: "Pie Diabético",
    description:
      "Cuidado preventivo y seguimiento especializado para pacientes con diabetes, reduciendo el riesgo de complicaciones serias.",
    tag: "Seguimiento Clínico",
    duration: "45-50 min",
  },
  {
    slug: "unas-encarnadas",
    icon: Scissors,
    title: "Uñas Encarnadas",
    description:
      "Tratamiento indoloro de onicocriptosis con técnicas modernas que evitan recaídas y te devuelven la comodidad al caminar.",
    tag: "Alivio Inmediato",
    duration: "30-40 min",
  },
  {
    slug: "hongos",
    icon: Microscope,
    title: "Hongos en las Uñas",
    description:
      "Diagnóstico preciso y protocolos efectivos contra la onicomicosis, con seguimiento hasta la recuperación completa.",
    tag: "Protocolo Antifúngico",
    duration: "30-40 min",
  },
  {
    slug: "callosidades",
    icon: Sparkles,
    title: "Callosidades y Durezas",
    description:
      "Eliminación profesional de callos y durezas que además identifica la causa mecánica para que no vuelvan a aparecer.",
    tag: "Cuidado Estético-Médico",
    duration: "40 min",
  },
  {
    slug: "plantillas",
    icon: Activity,
    title: "Plantillas a Medida",
    description:
      "Estudio biomecánico de la pisada y diseño de plantillas personalizadas para corregir apoyos y aliviar dolores articulares.",
    tag: "Estudio Digital",
    duration: "45 min",
  },
  {
    slug: "evaluacion",
    icon: ShieldCheck,
    title: "Evaluación Postural",
    description:
      "Análisis de la marcha y el apoyo plantar para entender cómo tus pies afectan rodillas, cadera y espalda.",
    tag: "Análisis de Marcha",
    duration: "40 min",
  },
  {
    slug: "prevencion",
    icon: Droplets,
    title: "Prevención e Higiene",
    description:
      "Programas de cuidado periódico pensados para mantener tus pies sanos durante todo el año, no solo cuando duelen.",
    tag: "Salud Periódica",
    duration: "35 min",
  },
];

export interface TeamMember {
  name: string;
  role: string;
  credential: string;
  bio: string;
  initials: string;
  image: string;
}

export const team: TeamMember[] = [
  {
    name: "Dra. Marisol Aguilar",
    role: "Podóloga Clínica Fundadora",
    credential: "Colegio de Podólogos del Perú N.° 0452",
    bio: "Con más de 14 años de trayectoria, lidera el consultorio con un enfoque centrado en el paciente diabético y la prevención a largo plazo.",
    initials: "MA",
    image: "/images/marisol-aguilar.jpg",
  },
  {
    name: "Dr. Renato Vidal",
    role: "Especialista en Biomecánica",
    credential: "Máster en Biomecánica del Pie, Universidad de Barcelona",
    bio: "Diseña planes de tratamiento personalizados combinando análisis de pisada, plantillas a medida y rehabilitación funcional.",
    initials: "RV",
    image: "/images/renato-vidal.jpg",
  },
  {
    name: "Lic. Camila Ortiz",
    role: "Podóloga Clínica",
    credential: "Certificación en Cirugía Ungueal Mínimamente Invasiva",
    bio: "Especialista en el tratamiento de uñas encarnadas y micosis, reconocida por su trato cálido con pacientes de todas las edades.",
    initials: "CO",
    image: "/images/camila-ortiz.jpg",
  },
];

export interface Testimonial {
  name: string;
  location: string;
  quote: string;
  rating: number;
  treatment?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Fernanda Rojas",
    location: "Los Olivos, Lima",
    quote:
      "Llegué con un dolor que llevaba meses postergando y en la primera consulta ya tenía un diagnóstico claro y un plan concreto. Hoy camino sin molestias.",
    rating: 5,
    treatment: "Podología Clínica Integral",
  },
  {
    name: "Jorge Huamán",
    location: "San Martín de Porres, Lima",
    quote:
      "Como paciente diabético, el seguimiento que me dan cada mes me da tranquilidad. Se nota que conocen bien los riesgos y los previenen a tiempo.",
    rating: 5,
    treatment: "Seguimiento Pie Diabético",
  },
  {
    name: "Lucía Del Castillo",
    location: "Comas, Lima",
    quote:
      "Las plantillas que me hicieron a medida cambiaron por completo mis entrenamientos. El estudio de pisada fue detallado y me explicaron cada paso.",
    rating: 5,
    treatment: "Estudio de Pisada y Plantillas",
  },
  {
    name: "Ricardo Salazar",
    location: "Independencia, Lima",
    quote:
      "Tenía una uña encarnada recurrente desde hace años. El tratamiento fue prácticamente indoloro y, por primera vez, no volvió a salir.",
    rating: 5,
    treatment: "Tratamiento de Uña Encarnada",
  },
  {
    name: "Patricia Nuñez",
    location: "Los Olivos, Lima",
    quote:
      "La atención es puntual, el consultorio impecable y el equipo realmente escucha antes de tratar. Se siente medicina hecha con cuidado.",
    rating: 5,
    treatment: "Evaluación y Cuidado Periódico",
  },
  {
    name: "Alonso Meza",
    location: "Puente Piedra, Lima",
    quote:
      "Traje a mi madre por un problema de hongos que arrastraba hace tiempo y el cambio en pocas semanas fue notorio. Muy agradecidos.",
    rating: 5,
    treatment: "Protocolo Antifúngico Ungueal",
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: "¿Cómo es la primera cita en el consultorio?",
    answer:
      "La primera cita incluye una evaluación clínica completa de tus pies, una conversación sobre tu historial de salud y molestias, y un diagnóstico inicial con recomendaciones concretas. Suele durar entre 40 y 50 minutos.",
  },
  {
    question: "Tengo diabetes, ¿con qué frecuencia debería visitar al podólogo?",
    answer:
      "Recomendamos un control cada 4 a 6 semanas para pacientes diabéticos, ya que permite detectar a tiempo cambios en la piel, circulación o sensibilidad y prevenir complicaciones antes de que se agraven.",
  },
  {
    question: "¿El tratamiento de uñas encarnadas es doloroso?",
    answer:
      "Utilizamos técnicas de anestesia local y procedimientos mínimamente invasivos, por lo que la mayoría de pacientes refiere molestia leve durante el tratamiento y alivio inmediato después.",
  },
  {
    question: "¿Atienden a niños?",
    answer:
      "Sí, atendemos a pacientes de todas las edades. En el caso de niños, adaptamos el enfoque y el tiempo de consulta para que la experiencia sea tranquila tanto para ellos como para sus padres.",
  },
  {
    question: "¿Trabajan con seguros o EPS?",
    answer:
      "Emitimos comprobantes y recibos por honorarios que puedes presentar para reembolso según tu póliza. Te recomendamos confirmar la cobertura específica con tu seguro antes de la cita.",
  },
  {
    question: "¿Cada cuánto tiempo debería hacerme un chequeo general si no tengo molestias?",
    answer:
      "Aun sin dolor, una revisión preventiva cada 6 meses ayuda a detectar callosidades, alteraciones de la pisada u hongos en etapas tempranas, cuando el tratamiento es más simple y rápido.",
  },
  {
    question: "¿Las plantillas a medida sirven para cualquier tipo de calzado?",
    answer:
      "Diseñamos las plantillas según el uso que les darás: deporte, trabajo o uso diario, y las adaptamos al tipo de calzado que más utilizas para asegurar una correcta funcionalidad.",
  },
  {
    question: "¿Qué debo llevar a mi primera consulta?",
    answer:
      "Basta con que traigas tu documento de identidad y, si los tienes, resultados de exámenes o estudios previos relacionados con tus pies. No necesitas preparación especial.",
  },
];

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  tag?: string;
  highlight?: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Evaluación",
    tag: "Paso 1",
    highlight: "Examen integral",
    description:
      "Escuchamos tu historia clínica, antecedentes de salud y realizamos un examen físico completo y dermatoscópico de tus pies.",
  },
  {
    number: "02",
    title: "Diagnóstico",
    tag: "Paso 2",
    highlight: "Causa raíz",
    description:
      "Identificamos la causa real de la molestia, no solo el síntoma superficial, apoyándonos en estudios de marcha cuando es necesario.",
  },
  {
    number: "03",
    title: "Tratamiento",
    tag: "Paso 3",
    highlight: "Técnica indolora",
    description:
      "Aplicamos el procedimiento clínico más adecuado con instrumental estéril y técnicas modernas que minimizan cualquier molestia.",
  },
  {
    number: "04",
    title: "Seguimiento",
    tag: "Paso 4",
    highlight: "Control preventivo",
    description:
      "Acompañamos tu recuperación con pautas de cuidado diario y citas de control para asegurar resultados permanentes y sin recaídas.",
  },
];

export interface GalleryItem {
  title: string;
  caption: string;
  gradient: string;
}

export const galleryItems: GalleryItem[] = [
  {
    title: "Sala de Recepción",
    caption: "Un espacio cálido pensado para que tu visita comience con tranquilidad.",
    gradient: "from-primary via-primary-light to-accent",
  },
  {
    title: "Consultorio 1",
    caption: "Equipamiento especializado en un ambiente diseñado para el confort del paciente.",
    gradient: "from-primary-dark via-primary to-primary-light",
  },
  {
    title: "Área de Diagnóstico",
    caption: "Tecnología para el análisis biomecánico y estudio de la pisada.",
    gradient: "from-accent-dark via-accent to-accent-light",
  },
  {
    title: "Sala de Tratamientos",
    caption: "Protocolos de higiene rigurosos en cada procedimiento clínico.",
    gradient: "from-primary via-accent-dark to-accent",
  },
  {
    title: "Consultorio 2",
    caption: "Un segundo espacio clínico para atención simultánea sin esperas prolongadas.",
    gradient: "from-primary-light via-primary to-primary-dark",
  },
];

export interface StatItem {
  label: string;
  value: number;
  suffix: string;
}

export const stats: StatItem[] = [
  { label: "Años de experiencia", value: 14, suffix: "+" },
  { label: "Pacientes atendidos", value: 8500, suffix: "+" },
  { label: "Índice de satisfacción", value: 98, suffix: "%" },
  { label: "Especialistas certificados", value: 3, suffix: "" },
];
