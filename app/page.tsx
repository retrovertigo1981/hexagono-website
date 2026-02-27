import { CustomCursor } from '@/components/custom-cursor'
import { GsapAnimations } from '@/components/gsap-animations'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Marquesina } from '@/components/Marquesina'

export default function Home() {
  return (
    <>
      <CustomCursor />
      <GsapAnimations />
      <Navbar />
      <main>
        <Hero />
        <Marquesina />
      </main>

    </>

  )

}
