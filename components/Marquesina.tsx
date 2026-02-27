'use client'
import { useEffect, useRef } from "react"

const items = ['Diseno Original', '* E-commerce', 'Sin Plantillas', '* Codigo Propio',
    'Rancagua', '* Santiago', 'Rengo', '* Web Corporativa', 'UX Strategy',
    '* Diseno Original', 'E-commerce', '* Sin Plantillas',]


export function Marquesina() {
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = trackRef.current
        if (!el) return
        import('gsap').then(({ gsap }) => {
            gsap.to(el, { x: '-50%', duration: 28, ease: 'none', repeat: -1 })
        })
    }, [])

    return (
        <div className="border-t border-b border(--hex-border) py-4.5 overflow-hidden bg-card">
            <div ref={trackRef} className="flex whitespace-nowrap w-max">
                {
                    items.map((item, i) => (
                        <span
                            key={i}
                            className="font-mono text-[12px] tracking-[0.2em] text-foreground/[0.28] uppercase px-9 border-r border(--hex-border) shrink-0"
                        >
                            {
                                item.startsWith('*') ?
                                    (
                                        <>
                                            <span className="text-primary">{'\u2B21'}</span>{item.slice(1)}
                                        </>
                                    ) : item
                            }
                        </span>
                    ))
                }
            </div>
        </div>
    )




}