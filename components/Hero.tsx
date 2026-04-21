'use client'

import React, { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import macbookMockup from '@/public/images/mockup_macbook_hexagono8.webp'


const drivenWords = ['VENTAS', 'CLIENTES', 'CONFIANZA', 'RESULTADOS', 'CRECIMIENTO']

export function Hero() {

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const drivenWordHeight = 'clamp(58px, 9vw, 84px)'

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
                const tg = d < 200 ? 1 - d / 200 : 0
                h.g += (tg - h.g) * 0.07
                const pulse = 0.022 + 0.014 * Math.sin(t * 0.0008 + h.ph)
                ctx.beginPath()
                for (let i = 0; i < 6; i++) {
                    const a = (Math.PI / 3) * i - Math.PI / 6
                    if (i === 0) ctx.moveTo(h.cx + h.r * Math.cos(a), h.cy + h.r * Math.sin(a))
                    else ctx.lineTo(h.cx + h.r * Math.cos(a), h.cy + h.r * Math.sin(a))
                }
                ctx.closePath()
                ctx.strokeStyle = h.g > 0.05 ? `rgba(255,107,53,${pulse + h.g * 0.9})` : `rgba(0,240,255,${pulse})`
                ctx.lineWidth = 0.5 + h.g * 0.8
                ctx.stroke()
                if (h.g > 0.12) {
                    ctx.fillStyle = `rgba(255,107,53,${h.g * 0.2})`
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

    useEffect(() => {
        const track = trackRef.current
        if (!track) return
        let mounted = true
        let activeTween: { kill: () => void } | null = null
        let wi = 0
        let wordH = 72
        const measureWordHeight = () => {
            const wordEl = track.querySelector('.dw-item') as HTMLElement | null
            if (!wordEl) return
            const nextHeight = Math.round(wordEl.getBoundingClientRect().height)
            if (nextHeight > 0) wordH = nextHeight
        }
        measureWordHeight()
        const load = import('gsap')

        const handleResize = () => {
            measureWordHeight()
            import('gsap').then(({ gsap }) => {
                gsap.set(track, { y: -wi * wordH })
            })
        }
        window.addEventListener('resize', handleResize)

        if ('fonts' in document) {
            ;(document as Document & { fonts: FontFaceSet }).fonts.ready.then(() => {
                if (!mounted) return
                handleResize()
            })
        }

        const interval = setInterval(() => {
            wi++
            measureWordHeight()
            load.then(({ gsap }) => {
                if (!mounted) return
                activeTween?.kill()
                activeTween = gsap.to(track, {
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
        return () => {
            mounted = false
            activeTween?.kill()
            clearInterval(interval)
            window.removeEventListener('resize', handleResize)
        }
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
        // ✅ FIX: isolation: 'isolate' reemplaza el stacking context roto.
        // El section NO tiene z-index numérico — eso evita que compita con el overlay del menú.
        // isolation: isolate crea su propio contexto solo para los hijos internos (canvas, stamp, etc.)
        // sin "escaparse" al contexto raíz donde vive el overlay del Navbar.
        <section
            id="hero"
            className="min-h-screen px-6 py-10 md:px-12 md:py-12 relative overflow-x-clip"
            style={{ isolation: 'isolate' }}
        >




            {/* Canvas — la opacity se aplica via globalAlpha en draw(), no como clase CSS */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ opacity: 0.35 }}
            />

            <div className="relative max-w-[1600px] min-h-screen mx-auto w-full flex flex-col">
                {/* Hero img */}
                <div
                    className="hero-stamp-wrap absolute rotate-12 pointer-events-none hidden lg:block"
                    style={{
                        width: 'clamp(16rem, 34vw, 40rem)',
                        height: 'clamp(16rem, 34vw, 40rem)',
                        right: 'clamp(-5rem, 5vw, 9rem)',
                        top: 'clamp(2rem, 7vw, 4.5rem)',
                    }}
                >
                    <Image
                        src={macbookMockup}
                        alt='Macbook Pro con web desarrollada por Hexagono 8 Studio'
                    />
                </div>

                {/* Anti-template stamp */}
                <div
                    className="hero-orbit-wrap absolute top-2/4 -translate-y-1/2 rotate-15 hidden lg:flex items-center justify-center"
                    style={{
                        width: 'clamp(10rem, 13vw, 12.5rem)',
                        height: 'clamp(10rem, 13vw, 12.5rem)',
                        right: 'clamp(1.5rem, 4vw, 5rem)',
                    }}
                >
                    <svg viewBox="0 0 160 160" fill="none" className="w-full h-full animate-[spin_20s_linear_infinite]">
                        <circle cx="80" cy="80" r="70" stroke="rgba(255,107,53,0.25)" strokeWidth="1" strokeDasharray="4 6" />
                        <path id="textPath" d="M80,80 m-60,0 a60,60 0 1,1 120,0 a60,60 0 1,1 -120,0" fill="none" />
                        <text fontFamily="JetBrains Mono" fontSize="10.5" fill="rgba(255,107,53,0.6)" letterSpacing="3">
                            <textPath href="#textPath">{'WEBS QUE CONVIERTEN  \u00B7 WEBS PERSUASIVAS \u00B7 ESCALABLES \u00B7  OPTIMIZADAS'}</textPath>
                        </text>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center font-mono text-[18px] font-bold text-primary text-center leading-[1.3] tracking-[0.05em]">
                        {'DISENO'}<br />{'ORIGINAL'}
                    </div>
                </div>

                <div className="relative z-10 lg:max-w-[48rem] lg:min-h-[calc(100vh-8rem)] lg:flex lg:flex-col lg:justify-center lg:py-[clamp(3rem,7vh,5.5rem)]">
                    {/* Driven words */}
                    <div className="hero-driven-wrap relative z-10 pt-[clamp(5rem,9.5vh,7.5rem)] md:pt-[clamp(5.6rem,10.5vh,8.5rem)] lg:pt-0 max-w-[min(100%,44rem)]">
                        <p className="font-mono text-[clamp(0.66rem,2.1vw,1rem)] tracking-[0.2em] md:tracking-[0.24em] text-foreground/25 uppercase mb-2.5 md:mb-3">tu web construida para generar</p>
                        <div className="overflow-hidden" style={{ height: drivenWordHeight }}>
                            <div ref={trackRef} className="flex flex-col">
                                {drivenWords.map((word, i) => (
                                    <div
                                        key={i}
                                        className={`dw-item whitespace-nowrap text-[clamp(2.05rem,10.8vw,6rem)] font-black tracking-[-0.045em] md:tracking-[-0.05em] leading-[1.08] flex items-center ${i % 2 !== 0 ? 'text-primary' : 'text-foreground'}`}
                                        style={{ height: drivenWordHeight }}
                                    >
                                        {word}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="hero-bottom-wrap relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-9 md:gap-12 w-full mt-[clamp(2rem,5vh,3.5rem)] md:mt-[clamp(2.5rem,5.5vh,4rem)] lg:mt-[clamp(1.5rem,3vh,2.5rem)] pt-[clamp(0.75rem,1.4vh,1.25rem)] lg:pt-0 pb-[clamp(1.2rem,3vh,2.5rem)] lg:pb-0">
                        <div className="max-w-[min(100%,34rem)] xl:max-w-[36rem] 2xl:max-w-[38rem]">
                        <p className="text-[14px] sm:text-[15px] md:text-base leading-[1.8] md:leading-[1.85] text-foreground/40 mb-7 md:mb-8">
                            <strong className="text-foreground font-bold text-[1.55rem] sm:text-[1.7rem] md:text-2xl">Tu negocio no es una plantilla.</strong><br />
                            Nosotros tampoco. Diseñamos y programamos tu web
                            desde cero  para que cada visita tenga una razón
                            concreta de quedarse y contactarte. trabajamos con  criterio, proceso claro y la convicción de que
                            <strong className='text-foreground ml-0.5'>  una web bien hecha cambia lo que tu cliente piensa
                                de tu negocio en los primeros 5 segundos.
                            </strong>

                        </p>
                        <div className="flex gap-4 flex-wrap items-center">
                            <a
                                href="#paquetes"
                                onClick={(e) => handleClick(e, '#paquetes')}
                                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-primary text-primary-foreground font-mono text-xs font-bold tracking-widest uppercase no-underline rounded-sm transition-all duration-200 hover:bg-[#ff8a5e] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(255,107,53,0.25)]"
                            >
                                Ver paquetes
                                <ArrowRight size={14} />
                            </a>
                            <a
                                href="#contacto"
                                onClick={(e) => handleClick(e, '#contacto')}
                                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-transparent text-foreground border border-(--hex-border) font-mono text-xs font-bold tracking-widest uppercase no-underline rounded-sm transition-all duration-200 hover:bg-foreground/4"
                            >
                                {'Hablemos \u2192'}
                            </a>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Tablet visual block: fills empty space below content */}
                <div className="hidden md:flex lg:hidden relative z-10 mt-6 justify-center">
                    <div className="relative w-[min(100%,40rem)] flex items-end justify-center">
                        <div className="w-[clamp(20rem,58vw,30rem)] rotate-6 pointer-events-none">
                            <Image
                                src={macbookMockup}
                                alt='Macbook Pro con web desarrollada por Hexagono 8 Studio'
                            />
                        </div>
                        <div className="absolute right-[clamp(0.25rem,2vw,1.5rem)] bottom-[clamp(1.25rem,5vw,3.25rem)] rotate-15 flex items-center justify-center w-[clamp(7.75rem,16vw,10.5rem)] h-[clamp(7.75rem,16vw,10.5rem)]">
                            <svg viewBox="0 0 160 160" fill="none" className="w-full h-full animate-[spin_20s_linear_infinite]">
                                <circle cx="80" cy="80" r="70" stroke="rgba(255,107,53,0.25)" strokeWidth="1" strokeDasharray="4 6" />
                                <path id="textPathTablet" d="M80,80 m-60,0 a60,60 0 1,1 120,0 a60,60 0 1,1 -120,0" fill="none" />
                                <text fontFamily="JetBrains Mono" fontSize="10.5" fill="rgba(255,107,53,0.6)" letterSpacing="3">
                                    <textPath href="#textPathTablet">{'WEBS QUE CONVIERTEN  · WEBS PERSUASIVAS · ESCALABLES ·  OPTIMIZADAS'}</textPath>
                                </text>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center font-mono text-[16px] font-bold text-primary text-center leading-[1.3] tracking-[0.05em]">
                                {'DISENO'}<br />{'ORIGINAL'}
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="hidden md:flex absolute z-20 pointer-events-none font-mono text-[12px] tracking-[0.3em] text-foreground/20 uppercase items-center gap-2.5"
                    style={{
                        writingMode: 'vertical-rl',
                        right: 'clamp(0.85rem, 2vw, 1.6rem)',
                        bottom: 'clamp(4.6rem, 13vh, 8rem)',
                    }}
                >
                    <span className="block w-0.5 h-24 bg-linear-to-b from-transparent to-primary" />
                    Scroll
                </div>
            </div>
        </section>
    )
}