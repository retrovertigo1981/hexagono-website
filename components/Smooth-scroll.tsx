'use client'

import { useEffect, useRef } from 'react'
import type Lenis from 'lenis'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null)

    useEffect(() => {
        let lenisInstance: Lenis | null = null
        let tickerCallback: ((time: number) => void) | null = null
        let gsapInstance: { ticker: { add: (cb: (time: number) => void) => void; remove: (cb: (time: number) => void) => void; lagSmoothing: (threshold: number) => void } } | null = null
        let isMounted = true

        const init = async () => {
            const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
                import('lenis'),
                import('gsap'),
                import('gsap/ScrollTrigger'),
            ])
            if (!isMounted) return

            gsap.registerPlugin(ScrollTrigger)
            gsapInstance = gsap

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
                lenisInstance?.raf(time * 1000)
            }

            gsap.ticker.add(tickerCallback)
            gsap.ticker.lagSmoothing(0)
        }

        init()

        return () => {
            isMounted = false
            if (tickerCallback && gsapInstance) {
                gsapInstance.ticker.remove(tickerCallback)
            }
            lenisInstance?.destroy()
            lenisRef.current = null
        }
    }, [])

    return <>{children}</>
}