'use client'

import { useEffect } from 'react'

export function GsapAnimations() {
    useEffect(() => {
        const init = async () => {
            const { gsap } = await import('gsap')
            const { ScrollTrigger } = await import('gsap/ScrollTrigger')
            gsap.registerPlugin(ScrollTrigger)

            // Hero enter animations
            gsap.from('.hero-driven-wrap', { x: -50, opacity: 0, duration: 1, delay: 0.5, ease: 'power3.out' })
            gsap.from('.hero-bottom-wrap', { y: 40, opacity: 0, duration: 1.1, delay: 1, ease: 'power3.out' })
            gsap.from('.hero-stamp-wrap', { opacity: 0, scale: 0.8, duration: 1.2, delay: 1.3, ease: 'back.out(1.7)' })

            // Reveal animations
            const revealEls = document.querySelectorAll('.rv')
            revealEls.forEach((el, i) => {
                gsap.fromTo(
                    el,
                    { opacity: 0, y: 36 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 88%',
                            toggleActions: 'play none none none',
                        },
                        delay: (i % 3) * 0.08,
                    }
                )
            })

            // Step rows
            gsap.utils.toArray('.step-row').forEach((el: any, i: number) => {
                gsap.from(el, {
                    scrollTrigger: { trigger: el, start: 'top 85%' },
                    opacity: 0,
                    x: -30,
                    duration: 0.7,
                    delay: i * 0.1,
                    ease: 'power3.out',
                })
            })

            // Value and package cards
            gsap.utils.toArray('.value-card, .package-card').forEach((el: any, i: number) => {
                gsap.from(el, {
                    scrollTrigger: { trigger: el, start: 'top 88%' },
                    opacity: 0,
                    y: 40,
                    duration: 0.7,
                    delay: i * 0.1,
                    ease: 'power3.out',
                })
            })

            // Stat cards
            gsap.utils.toArray('.stat-card').forEach((el: any, i: number) => {
                gsap.from(el, {
                    scrollTrigger: { trigger: el, start: 'top 90%' },
                    opacity: 0,
                    x: 30,
                    duration: 0.6,
                    delay: i * 0.12,
                    ease: 'power3.out',
                })
            })
        }

        // Small delay to ensure DOM is ready
        const t = setTimeout(init, 100)
        return () => clearTimeout(t)
    }, [])

    return null
}
