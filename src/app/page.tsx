import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Servicios } from "@/components/sections/servicios";
import { Beneficios } from "@/components/sections/beneficios";
import { PorQueElegirnos } from "@/components/sections/por-que-elegirnos";
import { Especialistas } from "@/components/sections/especialistas";
import { Proceso } from "@/components/sections/proceso";
import { Galeria } from "@/components/sections/galeria";
import { Testimonios } from "@/components/sections/testimonios";
import { Faq } from "@/components/sections/faq";
import { Mapa } from "@/components/sections/mapa";
import { Cta } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Hero />
        <Servicios />
        <Beneficios />
        <PorQueElegirnos />
        <Especialistas />
        <Proceso />
        <Galeria />
        <Testimonios />
        <Faq />
        <Mapa />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
