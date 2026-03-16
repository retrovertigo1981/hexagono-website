import { CustomCursor } from '@/components/custom-cursor'
import { GsapAnimations } from '@/components/gsap-animations'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Marquesina } from '@/components/Marquesina'
import { Manifiesto } from '@/components/Manifiesto'
import { WorkSection } from '@/components/Work-section'
import { Metodo } from '@/components/Metodo'
import { Paquetes } from '@/components/Paquete'
import { PlanContinuidad } from '@/components/PlanContinuidad'
import { Valor } from '@/components/Valor'
import { Skills } from '@/components/Skills'
import { Contacto } from '@/components/Contacto'
import { Footer } from '@/components/Footer'
import { SmoothScroll } from '@/components/Smooth-scroll'

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <GsapAnimations />
      <Navbar />
      <main>
        <Hero />
        <Marquesina />
        <Manifiesto />
        <WorkSection />
        <Metodo />
        <Paquetes />
        <PlanContinuidad />
        <Valor />
        <Skills />
        <Contacto />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
