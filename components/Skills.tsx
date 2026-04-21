'use client'

import { useEffect, useRef } from 'react'

const row1 = ['Desarrollo Web', 'E-commerce', 'UI/UX Estrategico', 'Codigo Original', 'Next.js', 'Sin Plantillas']
const row2 = ['Rancagua', 'Santiago', 'Branding', 'Node.js', 'SEO Tecnico', 'Motion Design']

export function Skills() {
    const r1Ref = useRef<HTMLDivElement>(null)
    const r2Ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let mounted = true
        let t1: { kill: () => void } | null = null
        let t2: { kill: () => void } | null = null
        import('gsap').then(({ gsap }) => {
            if (!mounted) return
            if (r1Ref.current) t1 = gsap.to(r1Ref.current, { x: '-50%', duration: 24, ease: 'none', repeat: -1 })
            if (r2Ref.current) t2 = gsap.to(r2Ref.current, { x: '-50%', duration: 36, ease: 'none', repeat: -1 })
        })
        return () => {
            mounted = false
            t1?.kill()
            t2?.kill()
        }
    }, [])

    return (
        <div id="skills" className="py-[72px] border-t border-[var(--hex-border)] overflow-hidden">
            <span className="font-mono text-[10px] tracking-[0.3em] text-foreground/[0.18] uppercase px-6 md:px-12 block mb-9">
                {'// Especialidades'}
            </span>
            <div ref={r1Ref} className="flex whitespace-nowrap w-max mb-3">
                {[...row1, ...row1].map((s, i) => (
                    <span
                        key={i}
                        className={`text-[clamp(1.6rem,3vw,2.4rem)] font-[900] tracking-[-0.03em] px-9 border-r border-[var(--hex-border)] shrink-0 transition-colors duration-300 hover:text-primary ${i % 2 ? 'text-foreground/[0.13]' : 'text-foreground/[0.07]'}`}
                    >
                        {s}
                    </span>
                ))}
            </div>
            <div ref={r2Ref} className="flex whitespace-nowrap w-max">
                {[...row2, ...row2].map((s, i) => (
                    <span
                        key={i}
                        className={`text-[clamp(1.6rem,3vw,2.4rem)] font-[900] tracking-[-0.03em] px-9 border-r border-[var(--hex-border)] shrink-0 transition-colors duration-300 hover:text-primary ${i % 2 ? 'text-foreground/[0.13]' : 'text-foreground/[0.07]'}`}
                    >
                        {s}
                    </span>
                ))}
            </div>
        </div>
    )
}
