'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Project, ProjectImage } from '@/data/projects'

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Project['status'] }) {
    return (
        <span className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[.2em] uppercase px-[14px] py-[6px] border border-[rgba(0,240,255,.25)] rounded-full text-[#00F0FF]">
            <span className="w-[6px] h-[6px] rounded-full bg-[#00F0FF] animate-pulse" />
            {status}
        </span>
    )
}

function SectionTag({ children }: { children: React.ReactNode }) {
    return (
        <p className="flex items-center gap-[10px] font-mono text-[9px] tracking-[.3em] text-[#FF6B35] uppercase mb-5
      before:content-[''] before:w-5 before:h-px before:bg-[#FF6B35] before:opacity-50">
            {children}
        </p>
    )
}

function Callout({
    label,
    text,
    variant = 'amber',
}: {
    label: string
    text: string
    variant?: 'amber' | 'cyan'
}) {
    const borderColor = variant === 'cyan' ? 'border-[#00F0FF]' : 'border-[#FF6B35]'
    const bgColor = variant === 'cyan' ? 'bg-[rgba(0,240,255,.03)]' : 'bg-[rgba(255,107,53,.04)]'
    const labelColor = variant === 'cyan' ? 'text-[#00F0FF]' : 'text-[#FF6B35]'

    return (
        <div className={`border-l-2 ${borderColor} ${bgColor} px-7 py-6 mb-12`}>
            <p className={`font-mono text-[8px] tracking-[.3em] uppercase mb-[10px] ${labelColor}`}>
                {label}
            </p>
            <p className="text-[15px] leading-[1.8] text-white/60">{text}</p>
        </div>
    )
}

function TechTag({ name, color }: { name: string; color: string }) {
    return (
        <span className="inline-flex items-center gap-[7px] font-mono text-[10px] tracking-[.1em] px-[14px] py-[7px] rounded-[3px] border border-white/[0.07] text-white/50 transition-colors duration-200 hover:border-[rgba(0,240,255,.3)] hover:text-[#00F0FF]">
            <span className="w-[5px] h-[5px] rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
            {name}
        </span>
    )
}

function Thumbnail({ img, index }: { img: ProjectImage; index: number }) {
    return (
        <div className="flex-1 border-b border-white/[0.07] last:border-b-0 bg-[#111] relative overflow-hidden min-h-[170px] transition-colors duration-300 hover:bg-[#161616] group cursor-none">
            <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                sizes="420px"
            />
            <span className="absolute bottom-[14px] left-[14px] font-mono text-[8px] tracking-[.2em] text-white/60 uppercase z-10
        translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {img.label}
            </span>
            <span className="absolute top-3 right-3 font-mono text-[9px] tracking-[.15em] text-white/10">
                0{index + 1}
            </span>
        </div>
    )
}

function GalleryItem({ img }: { img: ProjectImage }) {
    return (
        <div className="relative aspect-[16/10] bg-[#111] overflow-hidden cursor-none group">
            <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,.8)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="absolute bottom-4 left-4 font-mono text-[9px] tracking-[.2em] text-white/70 uppercase
        translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {img.label}
            </span>
        </div>
    )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

interface ProjectDetailProps {
    project: Project
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const sidebarRef = useRef<HTMLElement>(null)

    // ── GSAP animations ───────────────────────────────────────────────────────
    useEffect(() => {
        let ctx: any

        const init = async () => {
            const { gsap } = await import('gsap')
            const { ScrollTrigger } = await import('gsap/ScrollTrigger')
            gsap.registerPlugin(ScrollTrigger)

            ctx = gsap.context(() => {

                // Hero entrance
                const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
                tl.fromTo('.pd-hero-tag', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: .8, delay: .3 })
                    .fromTo('.pd-hero-title', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1 }, '-=.4')
                    .fromTo('.pd-hero-meta', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: .8 }, '-=.6')

                // Scroll reveals
                gsap.utils.toArray<HTMLElement>('.pd-rv').forEach((el, i) => {
                    gsap.fromTo(el,
                        { y: 40, opacity: 0 },
                        {
                            y: 0, opacity: 1,
                            duration: .75,
                            ease: 'power3.out',
                            delay: (i % 4) * 0.07,
                            scrollTrigger: {
                                trigger: el,
                                start: 'top 88%',
                                toggleActions: 'play none none none',
                            },
                        }
                    )
                })

                // Tech tags stagger
                ScrollTrigger.create({
                    trigger: '.pd-tech-grid',
                    start: 'top 85%',
                    onEnter: () => {
                        gsap.fromTo('.pd-tech-tag',
                            { y: 16, opacity: 0 },
                            { y: 0, opacity: 1, stagger: .06, duration: .5, ease: 'power3.out' }
                        )
                    },
                })

                // Sidebar parallax (desktop only)
                if (window.innerWidth > 960 && sidebarRef.current && contentRef.current) {
                    ScrollTrigger.create({
                        trigger: contentRef.current,
                        start: 'top top',
                        end: 'bottom bottom',
                        onUpdate: (self) => {
                            gsap.set(sidebarRef.current, { y: self.progress * -60 })
                        },
                    })
                }

                // Nav hide/show on scroll
                let lastY = 0
                ScrollTrigger.create({
                    start: 0, end: 99999,
                    onUpdate: (self) => {
                        const y = self.scroll()
                        if (y > lastY && y > 80) gsap.to('.pd-nav-back', { opacity: 0, duration: .3 })
                        else gsap.to('.pd-nav-back', { opacity: 1, duration: .3 })
                        lastY = y
                    },
                })

            })
        }

        init()
        return () => ctx?.revert()
    }, [])

    // ── Hex canvas ────────────────────────────────────────────────────────────
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')!
        let animId: number
        let hexes: { x: number; y: number; r: number; pulse: number; speed: number }[] = []

        function hexPath(x: number, y: number, r: number) {
            ctx.beginPath()
            for (let i = 0; i < 6; i++) {
                const a = (Math.PI / 180) * (60 * i - 30)
                i === 0
                    ? ctx.moveTo(x + r * Math.cos(a), y + r * Math.sin(a))
                    : ctx.lineTo(x + r * Math.cos(a), y + r * Math.sin(a))
            }
            ctx.closePath()
        }

        function buildHexes(W: number, H: number) {
            hexes = []
            const r = 36, rw = r * Math.sqrt(3), rh = r * 1.5
            for (let row = -1; row < H / rh + 2; row++) {
                for (let col = -1; col < W / rw + 2; col++) {
                    hexes.push({
                        x: col * rw + (row % 2 === 0 ? 0 : rw / 2),
                        y: row * rh,
                        r,
                        pulse: Math.random() * Math.PI * 2,
                        speed: 0.003 + Math.random() * 0.004,
                    })
                }
            }
        }

        function resize() {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
            buildHexes(canvas.width, canvas.height)
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            hexes.forEach(h => {
                h.pulse += h.speed
                const alpha = 0.025 + Math.sin(h.pulse) * 0.02
                hexPath(h.x, h.y, h.r - 2)
                ctx.strokeStyle = `rgba(255,107,53,${alpha})`
                ctx.lineWidth = 0.5
                ctx.stroke()
            })
            animId = requestAnimationFrame(draw)
        }

        resize()
        draw()
        window.addEventListener('resize', resize)
        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('resize', resize)
        }
    }, [])

    // ─────────────────────────────────────────────────────────────────────────
    // Render
    // ─────────────────────────────────────────────────────────────────────────

    return (
        <div className="bg-[#0A0A0A] text-[#F5F5F5] font-sans overflow-x-hidden">

            {/* ── HERO ──────────────────────────────────────────────────────────── */}
            <section className="relative min-h-screen flex flex-col justify-end px-12 pb-20 pt-[120px] overflow-hidden max-md:px-6 max-md:pb-16">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full opacity-[.18]"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(10,10,10,.6)] via-[rgba(10,10,10,.3)] to-[rgba(255,107,53,.04)]" />
                {/* Scanlines */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.08) 2px,rgba(0,0,0,.08) 4px)',
                    }}
                />

                <div className="relative z-10 max-w-[1300px] mx-auto w-full">
                    <p className="pd-hero-tag flex items-center gap-3 font-mono text-[9px] tracking-[.3em] text-[#FF6B35] uppercase mb-6
            before:content-[''] before:w-8 before:h-px before:bg-[#FF6B35] before:opacity-50">
                        {project.category}
                    </p>

                    <h1 className="pd-hero-title text-[clamp(3.5rem,8vw,7.5rem)] font-black tracking-[-0.05em] leading-[.95] mb-8">
                        {project.title}
                        <br />
                        <em className="not-italic text-[#FF6B35]">{project.titleAccent}</em>
                    </h1>

                    <div className="pd-hero-meta flex items-center gap-8 flex-wrap border-t border-white/[0.07] pt-8">
                        {/* Meta items */}
                        {[
                            { label: 'Empresa', value: project.client },
                            { label: 'Ciudad', value: project.city },
                            { label: 'Categoría', value: project.projectType },
                            { label: 'Año', value: project.year },
                        ].map(({ label, value }) => (
                            <div key={label} className="flex flex-col gap-[6px]">
                                <span className="font-mono text-[8px] tracking-[.3em] text-white/25 uppercase">{label}</span>
                                <span className="font-mono text-[12px] tracking-[.08em] text-white font-bold">{value}</span>
                            </div>
                        ))}
                        {/* Separators — hidden on mobile */}
                        <div className="hidden md:block w-px h-9 bg-white/[0.07]" />
                        <StatusBadge status={project.status} />
                    </div>
                </div>
            </section>

            {/* ── IMAGEN PRINCIPAL ──────────────────────────────────────────────── */}
            <div className="bg-[#141414] border-t border-b border-white/[0.07]">
                <div className="max-w-[1300px] mx-auto grid grid-cols-[1fr_420px] max-[900px]:grid-cols-1 min-h-[520px]">

                    {/* Main mockup */}
                    <div className="pd-rv relative overflow-hidden border-r border-white/[0.07] max-[900px]:border-r-0 max-[900px]:border-b bg-[#0d0d0d] min-h-[520px]">
                        {/* Grid overlay */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                backgroundImage: 'linear-gradient(rgba(0,240,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,240,255,.03) 1px,transparent 1px)',
                                backgroundSize: '48px 48px',
                            }}
                        />
                        <Image
                            src={project.mainImage.src}
                            alt={project.mainImage.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 900px) 100vw, calc(100vw - 420px)"
                            priority
                        />
                        <span className="absolute bottom-4 left-12 font-mono text-[10px] tracking-[.2em] text-white/20 z-10">
                            01 / {project.thumbnails.length + 1}
                        </span>
                    </div>

                    {/* Thumbnails */}
                    <div className="flex flex-col">
                        {project.thumbnails.map((img, i) => (
                            <Thumbnail key={i} img={img} index={i} />
                        ))}
                    </div>
                </div>
            </div>

            {/* ── BODY ──────────────────────────────────────────────────────────── */}
            <div
                ref={contentRef}
                className="max-w-[1300px] mx-auto px-12 py-[100px] grid grid-cols-[1fr_380px] gap-20 items-start max-[960px]:grid-cols-1 max-[960px]:gap-16 max-md:px-6 max-md:py-20"
            >

                {/* ─ Left column ─ */}
                <div>
                    {/* Description */}
                    <div className="pd-rv mb-12">
                        <SectionTag>El proyecto</SectionTag>
                        <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-black tracking-[-0.04em] leading-[1.05] mb-6">
                            {project.name}
                        </h2>
                        <div className="text-[16px] leading-[1.9] text-white/55 space-y-4">
                            {project.description.map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}
                        </div>
                    </div>

                    <Callout label="El problema real" text={project.challenge} variant="amber" />

                    {/* Solution */}
                    <div className="pd-rv mb-12">
                        <SectionTag>La solución</SectionTag>
                        <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-black tracking-[-0.04em] leading-[1.05] mb-6">
                            Diseño con propósito de negocio
                        </h2>
                        <div className="text-[16px] leading-[1.9] text-white/55 space-y-4">
                            {project.solution.map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}
                        </div>
                    </div>

                    <Callout label="Resultado" text={project.result} variant="cyan" />
                </div>

                {/* ─ Right column (sidebar) ─ */}
                <aside ref={sidebarRef} className="flex flex-col gap-[2px] max-[960px]:static sticky top-24">

                    {/* Info del proyecto */}
                    <div className="pd-rv bg-[#141414] border border-white/[0.07] px-8 py-7 rounded-t-md">
                        <p className="font-mono text-[9px] tracking-[.3em] text-white/30 uppercase mb-5">// Info del proyecto</p>
                        {[
                            { key: 'Cliente', val: project.client },
                            { key: 'Ciudad', val: project.location },
                            { key: 'Sector', val: project.type },
                            { key: 'Tipo', val: project.projectType },
                            { key: 'Entrega', val: project.deliveryTime },
                            { key: 'Paquete', val: project.package },
                        ].map(({ key, val }, i, arr) => (
                            <div
                                key={key}
                                className={`flex justify-between items-center py-[10px] text-[13px] ${i < arr.length - 1 ? 'border-b border-white/[0.07]' : ''}`}
                            >
                                <span className="text-white/30 text-[12px]">{key}</span>
                                <span className="text-white font-bold font-mono text-[11px] tracking-[.05em]">{val}</span>
                            </div>
                        ))}
                    </div>

                    {/* Stack tecnológico */}
                    <div className="pd-rv bg-[#141414] border border-white/[0.07] px-8 py-7">
                        <p className="font-mono text-[9px] tracking-[.3em] text-white/30 uppercase mb-5">// Stack tecnológico</p>
                        <div className="pd-tech-grid flex flex-wrap gap-2">
                            {project.tech.map(t => (
                                <span key={t.name} className="pd-tech-tag">
                                    <TechTag name={t.name} color={t.color} />
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div className="pd-rv bg-[#141414] border border-white/[0.07] px-8 py-7">
                        <p className="font-mono text-[9px] tracking-[.3em] text-white/30 uppercase mb-5">// Acceso</p>
                        <div className="flex flex-col gap-[10px]">
                            {project.liveUrl ? (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between px-[18px] py-[14px] rounded-[3px] bg-[#FF6B35] text-[#0A0A0A] font-mono text-[11px] tracking-[.1em] uppercase font-bold transition-all duration-200 hover:bg-[#ff825a] hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(255,107,53,.25)]"
                                >
                                    Ver en producción
                                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                                        <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                </a>
                            ) : (
                                <span className="flex items-center justify-between px-[18px] py-[14px] rounded-[3px] bg-white/[0.03] text-white/25 font-mono text-[11px] tracking-[.1em] uppercase border border-white/[0.07] cursor-not-allowed">
                                    URL privada
                                </span>
                            )}

                            {project.repoUrl && (
                                <a
                                    href={project.repoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between px-[18px] py-[14px] rounded-[3px] bg-transparent text-white/40 font-mono text-[11px] tracking-[.1em] uppercase border border-white/[0.07] transition-all duration-200 hover:border-white/20 hover:text-white"
                                >
                                    Repositorio
                                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                                        <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="pd-rv bg-[rgba(255,107,53,.05)] border border-[rgba(255,107,53,.15)] px-8 py-7 rounded-b-md">
                        <p className="font-mono text-[9px] tracking-[.25em] text-[#FF6B35] uppercase mb-3">
                            ¿Te interesa algo similar?
                        </p>
                        <p className="text-[13px] leading-[1.7] text-white/45 mb-5">
                            Conversemos sobre tu negocio — sin presión y sin compromiso.
                        </p>
                        <Link
                            href="/#contacto"
                            className="flex items-center justify-center gap-2 px-[18px] py-[14px] rounded-[3px] bg-[#FF6B35] text-[#0A0A0A] font-mono text-[11px] tracking-[.1em] uppercase font-bold transition-all duration-200 hover:bg-[#ff825a] hover:-translate-y-[2px]"
                        >
                            Hablemos →
                        </Link>
                    </div>

                </aside>
            </div>

            {/* ── GALERÍA ───────────────────────────────────────────────────────── */}
            {project.gallery.length > 0 && (
                <section className="border-t border-white/[0.07] bg-[#141414] px-12 py-20 max-md:px-6">
                    <div className="max-w-[1300px] mx-auto">

                        <div className="pd-rv flex items-center justify-between mb-10 flex-wrap gap-4">
                            <div>
                                <p className="font-mono text-[9px] tracking-[.3em] text-white/25 uppercase mb-2">
                  // Capturas del proyecto
                                </p>
                                <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-black tracking-[-0.04em]">
                                    Más vistas
                                </h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-[2px] bg-white/[0.07] border border-white/[0.07] rounded overflow-hidden max-md:grid-cols-1">
                            {project.gallery.map((img, i) => (
                                <div key={i} className="pd-rv">
                                    <GalleryItem img={img} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── NAVEGACIÓN PREV / NEXT ─────────────────────────────────────────── */}
            <nav className="border-t border-white/[0.07] bg-[#0A0A0A] px-12 max-md:px-6">
                <div className="max-w-[1300px] mx-auto grid grid-cols-[1fr_auto_1fr]">

                    {/* Prev */}
                    {project.prevSlug ? (
                        <Link
                            href={`/work/${project.prevSlug}`}
                            className="pd-rv flex flex-col justify-center py-10 group transition-colors duration-200 hover:bg-white/[.02]"
                        >
                            <span className="font-mono text-[8px] tracking-[.3em] text-white/20 uppercase mb-2">
                                ← Anterior
                            </span>
                            <span className="text-[clamp(1.1rem,2vw,1.5rem)] font-black tracking-[-0.03em] text-white transition-colors duration-200 group-hover:text-[#FF6B35]">
                                {projects.find(p => p.slug === project.prevSlug)?.name ?? ''}
                            </span>
                        </Link>
                    ) : (
                        <div />
                    )}

                    {/* Sep */}
                    <div className="flex items-center justify-center px-10 py-10 opacity-[.15] text-[1.5rem] text-[#FF6B35]">
                        ⬡
                    </div>

                    {/* Next */}
                    {project.nextSlug ? (
                        <Link
                            href={`/work/${project.nextSlug}`}
                            className="pd-rv flex flex-col justify-center items-end py-10 text-right pl-8 group transition-colors duration-200 hover:bg-white/[.02]"
                        >
                            <span className="font-mono text-[8px] tracking-[.3em] text-white/20 uppercase mb-2">
                                Siguiente →
                            </span>
                            <span className="text-[clamp(1.1rem,2vw,1.5rem)] font-black tracking-[-0.03em] text-white transition-colors duration-200 group-hover:text-[#FF6B35]">
                                {projects.find(p => p.slug === project.nextSlug)?.name ?? ''}
                            </span>
                        </Link>
                    ) : (
                        <div />
                    )}

                </div>
            </nav>

        </div>
    )
}

// Necesario para la navegación prev/next en el componente
import { projects } from '@/data/projects'