'use client'

import { useEffect, useRef } from 'react'
import type Lenis from 'lenis'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null)

    useEffect(() => {
        let lenisInstance: Lenis
        let tickerCallback: (time: number) => void

        const init = async () => {
            const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
                import('lenis'),
                import('gsap'),
                import('gsap/ScrollTrigger'),
            ])

            gsap.registerPlugin(ScrollTrigger)

            lenisInstance = new Lenis({
                duration: 1.2,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                touchMultiplier: 2,
                infinite: false,
            })

            lenisRef.current = lenisInstance

            // Sync Lenis with ScrollTrigger
            lenisInstance.on('scroll', ScrollTrigger.update)

            // Guardar referencia al callback para poder removerlo en el cleanup
            tickerCallback = (time: number) => {
                lenisInstance.raf(time * 1000)
            }

            gsap.ticker.add(tickerCallback)
            gsap.ticker.lagSmoothing(0)
        }

        init()

        return () => {
            if (tickerCallback) {
                // Necesitamos importar gsap de forma síncrona para el cleanup
                import('gsap').then(({ gsap }) => {
                    gsap.ticker.remove(tickerCallback)
                })
            }
            lenisInstance?.destroy()
            lenisRef.current = null
        }
    }, [])

    return <>{children}</>
}