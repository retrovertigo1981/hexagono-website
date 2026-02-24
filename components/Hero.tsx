'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const drivenWords = ['VENTAS', 'CLIENTES', 'CONFIANZA', 'RESULTADOS', 'CRECIMIENTO']

export function Hero() {

    /*  Logica para crear panel de hexagonos*/

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let hexes: { cx: number; cy: number; r: number; g: number; ph: number }[] = []
        let mhx = -9999, mhy = -9999
        let raf: number

        function resize() {
            if (!canvas) return
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
            build()
        }

        function build() {
            if (!canvas) return
            hexes = []
            const r = 42, w = r * Math.sqrt(3), h = r * 2
            const cols = Math.ceil(canvas.width / w) + 2
            const rows = Math.ceil(canvas.height / (h * 0.75)) + 2
            for (let row = -1; row < rows; row++)
                for (let col = -1; col < cols; col++)
                    hexes.push({ cx: col * w + (row % 2 ? w / 2 : 0), cy: row * h * 0.75, r, g: 0, ph: Math.random() * Math.PI * 2 })
        }

        const handleMouse = (e: MouseEvent) => {
            if (!canvas) return
            const rc = canvas.getBoundingClientRect()
            mhx = e.clientX - rc.left
            mhy = e.clientY - rc.top
        }
        document.addEventListener('mousemove', handleMouse)

        function draw(t: number) {
            if (!ctx || !canvas) return
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            hexes.forEach(h => {
                const d = Math.hypot(h.cx - mhx, h.cy - mhy)
                const tg = d < 160 ? 1 - d / 160 : 0
                h.g += (tg - h.g) * 0.07
                const pulse = 0.022 + 0.014 * Math.sin(t * 0.0008 + h.ph)
                ctx.beginPath()
                for (let i = 0; i < 6; i++) {
                    const a = (Math.PI / 3) * i - Math.PI / 6
                    if (i === 0) ctx.moveTo(h.cx + h.r * Math.cos(a), h.cy + h.r * Math.sin(a))
                    else ctx.lineTo(h.cx + h.r * Math.cos(a), h.cy + h.r * Math.sin(a))
                }
                ctx.closePath()
                ctx.strokeStyle = h.g > 0.05 ? `rgba(255,107,53,${pulse + h.g * 0.5})` : `rgba(0,240,255,${pulse})`
                ctx.lineWidth = 0.5 + h.g * 0.8
                ctx.stroke()
                if (h.g > 0.12) {
                    ctx.fillStyle = `rgba(255,107,53,${h.g * 0.07})`
                    ctx.fill()
                }
            })
            raf = requestAnimationFrame(draw)
        }

        resize()
        window.addEventListener('resize', resize)
        raf = requestAnimationFrame(draw)

        return () => {
            window.removeEventListener('resize', resize)
            document.removeEventListener('mousemove', handleMouse)
            cancelAnimationFrame(raf)
        }
    }, [])

    /* Rotador de Palabras */

    useEffect(() => {
        const track = trackRef.current
        if (!track) return
        let wi = 0
        const wordEl = track.querySelector('.dw-item') as HTMLElement
        if (!wordEl) return
        const wordH = wordEl.offsetHeight || 72

        const interval = setInterval(() => {
            wi++
            import('gsap').then(({ gsap }) => {
                gsap.to(track, {
                    y: -wi * wordH,
                    duration: 0.65,
                    ease: 'power3.inOut',
                    onComplete: () => {
                        if (wi >= 5) {
                            wi = 0
                            gsap.set(track, { y: 0 })
                        }
                    }

                })
            })
        }, 2200)
        return () => clearInterval(interval)
    }, [])

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) {
            import('gsap').then(({ gsap }) => {
                import('gsap/ScrollToPlugin').then(({ ScrollToPlugin }) => {
                    gsap.registerPlugin(ScrollToPlugin)
                    gsap.to(window, { scrollTo: { y: target, offsetY: 0 }, duration: 1.2, ease: 'power3.inOut' })
                })
            })
        }
    }

    return (
        <section id="hero" className="min-h-screen flex flex-col justify-end px-6 pb-16 md:px-12 md:pb-20 relative" style={{ zIndex: 1 }}>
            {/* Background image */}
            {/* <Image
                src="/images/hero-bg.jpg"
                alt=""
                fill
                priority
                className="object-cover opacity-20 pointer-events-none"
                sizes="100vw"
            /> */}

            {/* Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 opacity-35" />

            {/* Anti-template stamp */}
            <div className="hero-stamp-wrap absolute top-1/2 right-[60px] -translate-y-1/2 rotate-[15deg] z-0 w-40 h-40 hidden lg:flex items-center justify-center">
                <svg viewBox="0 0 160 160" fill="none" className="w-full h-full animate-[spin_20s_linear_infinite]">
                    <circle cx="80" cy="80" r="70" stroke="rgba(255,107,53,0.25)" strokeWidth="1" strokeDasharray="4 6" />
                    <path id="textPath" d="M80,80 m-60,0 a60,60 0 1,1 120,0 a60,60 0 1,1 -120,0" fill="none" />
                    <text fontFamily="JetBrains Mono" fontSize="10.5" fill="rgba(255,107,53,0.6)" letterSpacing="3">
                        <textPath href="#textPath">{'SIN PLANTILLAS \u00B7 SIN WIX \u00B7 SIN WORDPRESS \u00B7 SIN COPY-PASTE \u00B7'}</textPath>
                    </text>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-mono text-[11px] font-bold text-primary text-center leading-[1.3] tracking-[0.05em]">
                    {'DISENO'}<br />{'ORIGINAL'}
                </div>
            </div>

            {/* Driven words */}
            <div className="hero-driven-wrap absolute top-1/2 left-6 md:left-12 -translate-y-[60%] z-0">
                <p className="font-mono text-[10px] tracking-[0.3em] text-foreground/25 uppercase mb-3">Impulsado por</p>
                <div className="overflow-hidden" style={{ height: 'clamp(52px, 8vw, 80px)' }}>
                    <div ref={trackRef} className="flex flex-col">
                        {drivenWords.map((word, i) => (
                            <div
                                key={i}
                                className={`dw-item text-[clamp(2.8rem,6.5vw,6rem)] font-[900] tracking-[-0.05em] leading-[1.08] flex items-center ${i % 2 !== 0 ? 'text-primary' : 'text-foreground'}`}
                                style={{ height: 'clamp(52px, 8vw, 80px)' }}
                            >
                                {word}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="hero-bottom-wrap relative z-0 flex flex-col md:flex-row justify-between items-start md:items-end gap-7">
                <div className="max-w-[520px]">
                    <p className="text-[15px] md:text-base leading-[1.85] text-foreground/40 mb-8">
                        <strong className="text-foreground font-bold">Tu negocio no es una plantilla.</strong><br />
                        Nosotros tampoco. Cada proyecto que salimos a construir
                        nace desde cero &mdash; con estrategia, codigo original y diseno
                        que nunca has visto antes.
                    </p>
                    <div className="flex gap-4 flex-wrap">
                        <a
                            href="#paquetes"
                            onClick={(e) => handleClick(e, '#paquetes')}
                            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-primary text-primary-foreground font-mono text-xs font-bold tracking-[0.1em] uppercase no-underline rounded-sm transition-all duration-200 hover:bg-[#ff8a5e] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(255,107,53,0.25)]"
                        >
                            Ver paquetes
                            <ArrowRight size={14} />
                        </a>
                        <a
                            href="#contacto"
                            onClick={(e) => handleClick(e, '#contacto')}
                            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-transparent text-foreground border border-[var(--hex-border)] font-mono text-xs font-bold tracking-[0.1em] uppercase no-underline rounded-sm transition-all duration-200 hover:bg-foreground/[0.04]"
                        >
                            {'Hablemos \u2192'}
                        </a>
                    </div>
                </div>
                <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-6">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-foreground/20 uppercase">
                        {'Rancagua & Santiago, CL'}
                    </span>
                    <div className="font-mono text-[9px] tracking-[0.3em] text-foreground/20 uppercase md:writing-mode-vertical flex items-center gap-2.5" style={{ writingMode: 'vertical-rl' }}>
                        <span className="block w-px h-12 bg-gradient-to-b from-transparent to-primary" />
                        Scroll
                    </div>
                </div>
            </div>
        </section>
    )








}