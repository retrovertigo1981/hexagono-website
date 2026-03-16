'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const projects = [
    { type: 'E-commerce \u00B7 Retail', name: 'Comercio Nativo', image: '/images/project-ecommerce.jpg' },
    { type: 'SaaS \u00B7 B2B', name: 'Plataforma Grana', image: '/images/project-saas.jpg' },
    { type: 'Corporativo \u00B7 Region', name: 'Sistema Nodo', image: '/images/project-corporate.jpg' },
    { type: 'Branding \u00B7 Landing', name: 'Marca Hexagonal', image: '/images/project-branding.jpg' },
]

export function WorkSection() {
    const workRef = useRef<HTMLDivElement>(null)
    const stickyRef = useRef<HTMLDivElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const countRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const workSec = workRef.current
        const pt = trackRef.current
        if (!workSec || !pt) return

        let stInstance: any = null

        const setup = async () => {
            const { gsap } = await import('gsap')
            const { ScrollTrigger } = await import('gsap/ScrollTrigger')
            gsap.registerPlugin(ScrollTrigger)

            const getSW = () => pt.scrollWidth - window.innerWidth + 96
            workSec.style.height = getSW() + window.innerHeight + 'px'

            stInstance = ScrollTrigger.create({
                trigger: workSec,
                start: 'top top',
                end: () => `+=${getSW()}`,
                pin: '#ws',
                scrub: 1,
                onUpdate: (s: any) => {
                    gsap.set(pt, { x: -s.progress * getSW() })
                    const idx = Math.min(Math.floor(s.progress * 5) + 1, 5)
                    if (countRef.current) countRef.current.textContent = `0${idx} / 05`
                },
            })

            const handleResize = () => {
                workSec.style.height = getSW() + window.innerHeight + 'px'
                ScrollTrigger.refresh()
            }
            window.addEventListener('resize', handleResize)
            return () => {
                window.removeEventListener('resize', handleResize)
                stInstance?.kill()
            }
        }

        const cleanup = setup()
        return () => { cleanup.then(fn => fn?.()) }
    }, [])

    return (
        <div id="work" ref={workRef} className="relative">
            <div id="ws" ref={stickyRef} className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
                {/* Header */}
                <div className="absolute top-10 left-6 md:left-12 z-2">
                    <span className="font-mono text-[13px] tracking-[0.3em] text-primary uppercase">
                        {'// 01 \u2014 Especimenes de trabajo'}
                    </span>
                </div>

                {/* Track */}
                <div ref={trackRef} className="flex items-center gap-6 px-6 md:px-12 will-change-transform">
                    {/* Intro card */}
                    <div className="shrink-0 w-75 flex flex-col justify-center pr-8">
                        <p className="font-mono text-[12px] tracking-[0.3em] text-foreground/30 uppercase mb-3.5">Proyectos</p>
                        <h2 className="text-[clamp(2.8rem,6vw,5rem)] font-black tracking-[-0.05em] leading-none">
                            Nuestro<br /><span className="text-primary">Trabajo</span>
                        </h2>
                        <p className="mt-5 text-sm leading-[1.8] text-foreground/30">Cada proyecto tiene
                            un <br /> propósito de negocio
                            detrás <br /> del diseño.</p>
                    </div>

                    {/* Project cards */}
                    {projects.map((proj, i) => (
                        <div
                            key={i}
                            className="project-card shrink-0 w-90 h-125 relative overflow-hidden rounded-sm bg-card border border-(--hex-border) group"
                        >
                            <div className="absolute inset-0 transition-transform duration-600 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105">
                                <Image
                                    src={proj.image}
                                    alt={proj.name}
                                    fill
                                    className="object-cover"
                                    sizes="360px"
                                />
                            </div>
                            <div className="absolute top-6 right-6 w-9.5 h-9.5 border border-foreground/15 rounded-full flex items-center justify-center opacity-0 -translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:border-primary">
                                <ArrowRight size={13} className="text-primary" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-7 bg-linear-to-t from-[rgba(10,10,10,0.97)] to-transparent">
                                <p className="font-mono text-[9px] tracking-[0.2em] text-foreground/35 uppercase mb-1.5">{proj.type}</p>
                                <h3 className="text-[1.4rem] font-black tracking-[-0.03em] transition-colors duration-300 text-foreground group-hover:text-primary">{proj.name}</h3>
                            </div>
                        </div>
                    ))}

                    {/* CTA card */}
                    <div className="project-card shrink-0 w-90 h-125 relative overflow-hidden rounded-sm bg-primary/5 border border-primary/[0.14] flex items-center justify-center flex-col text-center p-10">
                        <span className="text-[3.5rem] opacity-[0.12] mb-5">{'\u2B21'}</span>
                        <p className="font-mono text-[10px] tracking-[0.25em] text-foreground/25 uppercase mb-3.5">{'Proximo especimen'}</p>
                        <h3 className="text-[1.6rem] font-black text-primary tracking-[-0.03em] mb-7">{'El tuyo?'}</h3>
                        <a
                            href="#contacto"
                            className="inline-flex items-center gap-2.5 px-5.5 py-3 bg-primary text-primary-foreground font-mono text-[11px] font-bold tracking-widest uppercase no-underline rounded-sm transition-all duration-200 hover:bg-[#ff8a5e] hover:-translate-y-0.5"
                        >
                            {'Hablemos \u2192'}
                        </a>
                    </div>
                </div>

                {/* Count */}
                <div ref={countRef} className="absolute bottom-10 left-6 md:left-12 font-mono text-[11px] tracking-[0.15em] text-foreground/20 z-2">
                    01 / 05
                </div>

                {/* Big text */}
                <div className="absolute right-6 md:right-12 bottom-10 text-[clamp(4rem,10vw,9rem)] font-black tracking-[-0.05em] leading-none text-foreground/4 pointer-events-none">
                    WORKS
                </div>
            </div>
        </div>
    )
}
