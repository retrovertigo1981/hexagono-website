'use client'
import { useEffect, useState, useRef, useCallback } from 'react'
import gsap from 'gsap'

export function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)
    const [isTouch, setIsTouch] = useState(false)
    const hoveringRef = useRef(false)

    const setHover = useCallback((val: boolean) => {
        hoveringRef.current = val
        if (dotRef.current) {
            gsap.to(dotRef.current, {
                width: val ? 16 : 8,
                height: val ? 16 : 8,
                backgroundColor: val ? 'var(--hex-cyan)' : 'var(--hex-amber)',
                duration: 0.3,
                ease: 'power2.out'
            })
        }

        if (ringRef.current) {
            gsap.to(ringRef.current, {
                width: val ? 72 : 40,
                height: val ? 72 : 40,
                borderColor: val ? 'var(--hex-cyan)' : 'rgba(255,107,53,0.35)',
                duration: 0.4,
                ease: 'power2.out'

            })
        }
    }, [])

    useEffect(() => {
        if (typeof window === 'undefined') return
        if (window.matchMedia('pointer: coarse').matches) {
            setIsTouch(true)
            return
        }

        // GSAP quickTo para el anillo: ofrece un seguimiento fluido e independiente de la velocidad de cuadros
        const ringX = gsap.quickTo(ringRef.current, 'x', { duration: 0.55, ease: 'power3.out' })
        const ringY = gsap.quickTo(ringRef.current, 'y', { duration: 0.55, ease: 'power3.out' })

        const handleMove = (e: MouseEvent) => {

            // El punto sigue el cursor de forma instantánea via transform (sin transiciones CSS)
            gsap.set(dotRef.current, { x: e.clientX, y: e.clientY })

            // El anillo sigue al punto con un suave ease via quickTo
            ringX(e.clientX)
            ringY(e.clientY)
        }

        document.addEventListener('mousemove', handleMove, { passive: true })

        // Delegar la detección al pasar el mouse para que los elementos agregados dinámicamente queden cubiertos

        const handleOverAll = (e: MouseEvent) => {
            const target = e.target as HTMLElement | null
            if (!target) return
            const isInteractive = target.closest(
                'a,button,.project-card,.step-row,.value-card,.package-card,.stat-card'
            )
            const next = !!isInteractive
            if (next !== hoveringRef.current) setHover(next)
        }

        document.addEventListener('mouseover', handleOverAll, { passive: true })

        return () => {
            document.removeEventListener('mousemove', handleMove)
            document.removeEventListener('mouseover', handleOverAll)
        }
    }, [setHover])

    if (isTouch) return null

    return (
        <>
            <div
                ref={dotRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
                style={{
                    width: 8,
                    height: 8,
                    background: 'var(--hex-amber)',
                    transform: 'translate(-50%, -50%)',
                    willChange: 'transform',
                }}
            />
            <div
                ref={ringRef}
                className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
                style={{
                    width: 40,
                    height: 40,
                    border: '1px solid rgba(255,107,53,0.35)',
                    transform: 'translate(-50%, -50%)',
                    willChange: 'transform',
                }}
            />
            <style jsx global>{`
        * { cursor: none !important; }
        @media (pointer: coarse) { * { cursor: auto !important; } }
      `}</style>
        </>
    )
}