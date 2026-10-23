'use client'

import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import { CustomCursor } from '@/components/custom-cursor'

gsap.registerPlugin(TextPlugin)

type Hex = {
  x: number
  y: number
  r: number
  pulse: number
  glow: number
}

type PhaseStatus = 'done' | 'active' | 'pending'

const PHASES: { n: string; label: string; state: string; status: PhaseStatus }[] = [
  { n: '01', label: 'Diseño', state: 'completado', status: 'done' },
  { n: '02', label: 'Desarrollo', state: 'en curso', status: 'active' },
  { n: '03', label: 'Publicación', state: 'pronto', status: 'pending' },
]

function traceHex(context: CanvasRenderingContext2D, x: number, y: number, radius: number) {
  context.beginPath()
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6
    if (i === 0) {
      context.moveTo(x + radius * Math.cos(angle), y + radius * Math.sin(angle))
    } else {
      context.lineTo(x + radius * Math.cos(angle), y + radius * Math.sin(angle))
    }
  }
  context.closePath()
}

function HexMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 2.5 20.5 7.25v9.5L12 21.5 3.5 16.75v-9.5L12 2.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  )
}

function StatusRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5 md:py-3.5">
      <span className="uc-type shrink-0 font-mono text-[11px] font-medium tracking-[0.1em] text-foreground/75 md:text-[13px]">
        {`> ${label}`}
      </span>
      <div className="text-right">{children}</div>
    </div>
  )
}

export function UnderConstruction() {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const year = new Date().getFullYear()

  // Entrada escalonada de la página
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const typed = gsap.utils.toArray<HTMLElement>('.uc-type', root)
    const scrambled = gsap.utils.toArray<HTMLElement>('.uc-scramble', root)
    const typedText = typed.map((el) => el.textContent ?? '')
    const scrambledText = scrambled.map((el) => el.textContent ?? '')
    const pool = 'abcdefghijklmnopqrstuvwxyz0123456789_'

    const scrambleValue = (original: string, progress: number) => {
      const revealed = Math.floor(progress * original.length)
      return original
        .split('')
        .map((char, index) => {
          if (char === ' ' || char === '/') return char
          if (index < revealed) return char
          return pool[Math.floor(Math.random() * pool.length)]
        })
        .join('')
    }

    // La tarjeta se oculta durante la entrada, así que preparamos el "boot" aquí.
    typed.forEach((el) => {
      el.textContent = ''
    })
    scrambled.forEach((el, index) => {
      el.textContent = scrambleValue(scrambledText[index], 0)
    })

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

      timeline
        .from('.uc-header', { y: -12, autoAlpha: 0, duration: 0.6 })
        .from('.uc-label', { y: 14, autoAlpha: 0, duration: 0.5 }, 0.08)
        .from('.uc-line', { yPercent: 110, duration: 0.85, stagger: 0.09 }, 0.14)
        .from('.uc-copy', { y: 16, autoAlpha: 0, duration: 0.6 }, 0.45)
        .from('.uc-card', { y: 20, autoAlpha: 0, duration: 0.65 }, 0.35)
        .from('.uc-phase', { y: 10, autoAlpha: 0, duration: 0.45, stagger: 0.06 }, 0.55)
        .from('.uc-footer', { autoAlpha: 0, duration: 0.45 }, 0.65)

      timeline.addLabel('boot', 0.75)

      typed.forEach((label, index) => {
        const labelText = typedText[index]
        const value = scrambled[index]
        const valueText = scrambledText[index]

        timeline.to(
          label,
          {
            text: { value: labelText },
            duration: Math.min(0.5, Math.max(0.16, labelText.length * 0.028)),
            ease: 'none',
          },
          index === 0 ? 'boot' : '>',
        )

        if (value) {
          const state = { progress: 0 }
          let lastFrame = 0

          timeline.to(
            state,
            {
              progress: 1,
              duration: Math.min(0.7, Math.max(0.4, valueText.length * 0.045)),
              ease: 'none',
              onUpdate: () => {
                const now = performance.now()
                if (state.progress < 1 && now - lastFrame < 45) return
                lastFrame = now
                value.textContent = scrambleValue(valueText, state.progress)
              },
              onComplete: () => {
                value.textContent = valueText
              },
            },
            '>',
          )
        }
      })

      timeline
        .fromTo(
          '.uc-scan',
          { top: '-2px', opacity: 0 },
          { top: '100%', opacity: 0.55, duration: 2.2, ease: 'none' },
          'boot',
        )
        .to('.uc-scan', { opacity: 0, duration: 0.25 }, 'boot+=1.95')
        .fromTo(
          '.uc-card-hex',
          { rotate: 0 },
          { rotate: 360, duration: 2.2, ease: 'power2.inOut' },
          'boot',
        )
    }, root)

    return () => {
      ctx.revert()
      typed.forEach((el, index) => {
        el.textContent = typedText[index]
      })
      scrambled.forEach((el, index) => {
        el.textContent = scrambledText[index]
      })
    }
  }, [])

  // Fondo de hexágonos reactivo al cursor
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let hexes: Hex[] = []
    let width = 0
    let height = 0
    let pointerX = -9999
    let pointerY = -9999
    let frame = 0

    const build = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      if (!width || !height) return

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      const radius = width < 768 ? 26 : 40
      const hexWidth = radius * Math.sqrt(3)
      const hexHeight = radius * 2
      const cols = Math.ceil(width / hexWidth) + 2
      const rows = Math.ceil(height / (hexHeight * 0.75)) + 2

      hexes = []
      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          hexes.push({
            x: col * hexWidth + (row % 2 ? hexWidth / 2 : 0),
            y: row * hexHeight * 0.75,
            r: radius,
            pulse: Math.random() * Math.PI * 2,
            glow: 0,
          })
        }
      }
    }

    const paint = (time: number) => {
      context.clearRect(0, 0, width, height)

      hexes.forEach((hex) => {
        const distance = Math.hypot(hex.x - pointerX, hex.y - pointerY)
        const target = distance < 180 ? 1 - distance / 180 : 0
        hex.glow += (target - hex.glow) * 0.07

        const pulse = 0.07 + Math.sin(time * 0.0008 + hex.pulse) * 0.03

        traceHex(context, hex.x, hex.y, hex.r)
        context.strokeStyle =
          hex.glow > 0.05
            ? `rgba(255,107,53,${pulse + hex.glow * 0.75})`
            : `rgba(0,240,255,${pulse})`
        context.lineWidth = 0.5 + hex.glow * 0.9
        context.stroke()

        if (hex.glow > 0.12) {
          context.fillStyle = `rgba(255,107,53,${hex.glow * 0.16})`
          context.fill()
        }
      })
    }

    const tick = (time: number) => {
      paint(time)
      frame = requestAnimationFrame(tick)
    }

    const handleMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointerX = event.clientX - rect.left
      pointerY = event.clientY - rect.top
    }

    build()
    if (reducedMotion) {
      paint(0)
    } else {
      frame = requestAnimationFrame(tick)
    }

    const observer = new ResizeObserver(() => {
      build()
      if (reducedMotion) paint(0)
    })
    observer.observe(canvas)
    window.addEventListener('mousemove', handleMove, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('mousemove', handleMove)
    }
  }, [])

  return (
    <div
      ref={rootRef}
      className="relative flex min-h-screen flex-col overflow-hidden bg-background text-foreground"
    >
      <CustomCursor />

      {/* Fondo: hexágonos + retícula + glow */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-[34rem] w-[34rem] rounded-full bg-primary/[0.07] blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-accent/[0.04] blur-[140px]"
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        className="pointer-events-none absolute -right-40 top-1/2 hidden h-[42rem] w-[42rem] -translate-y-1/2 rotate-12 text-foreground/[0.05] lg:block"
      >
        <polygon
          points="50,2 93,26 93,74 50,98 7,74 7,26"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
        />
      </svg>

      <header className="uc-header relative z-10 border-b border-white/10">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-2.5 md:px-10 md:py-4">
          <p className="font-mono text-[14px] font-bold tracking-[0.18em] text-foreground md:text-[15px]">
            {'HEXAGONO 8'}
            <span className="text-primary">.</span>
          </p>

          <div className="flex items-center gap-2 border border-white/[0.12] px-2.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-foreground/75 md:gap-2.5 md:px-3 md:text-[12px] md:tracking-[0.2em]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            <span className="md:hidden">En construcción</span>
            <span className="hidden md:inline">Sitio en construcción</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex flex-1 items-center px-5 py-4 md:px-10 md:py-8 lg:py-10">
        <div className="mx-auto grid w-full max-w-[1320px] grid-cols-1 items-center gap-5 md:grid-cols-2 md:gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 xl:grid-cols-2 xl:gap-10">
          <div>
            <p className="uc-label font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-primary md:text-[12px]">
              {'// 00 — Estado del sitio'}
            </p>

            <h1 className="mt-3 text-[clamp(1.75rem,7.4vw,2.25rem)] font-black leading-[1.0] tracking-[-0.045em] md:mt-5 md:text-[clamp(2rem,4.8vw,3.5rem)]">
              {[
                { text: 'ESTAMOS', accent: false },
                { text: 'CONSTRUYENDO', accent: true },
                { text: 'UNA VERSIÓN MEJOR.', accent: false },
              ].map((line) => (
                <span key={line.text} className="block overflow-hidden pb-[0.06em]">
                  <span className={`uc-line block ${line.accent ? 'text-primary' : 'text-foreground'}`}>
                    {line.text}
                  </span>
                </span>
              ))}
            </h1>

            <p className="uc-copy mt-3.5 max-w-[34rem] text-base leading-[1.7] text-foreground/75 md:mt-5 md:text-[17px]">
              Mismo equipo, mismo estándar. Estamos afinando los últimos detalles para abrir una
              versión más rápida y clara del sitio.
            </p>
          </div>

          <aside className="uc-card w-full" aria-label="Estado del sitio: en construcción. Fase: desarrollo. Acceso: próximamente.">
            <div className="relative overflow-hidden border border-white/[0.12] bg-[#141414]">
              <div
                aria-hidden="true"
                className="uc-scan pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-0 shadow-[0_0_12px_rgba(255,107,53,0.45)]"
              />
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 md:px-5 md:py-4">
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/75 md:text-[13px]">
                  Build_status
                </span>
                <HexMark className="uc-card-hex h-4 w-4 text-primary" />
              </div>

              <div className="divide-y divide-white/[0.07] px-4 md:px-5">
                <StatusRow label="estado">
                  <span className="flex items-center justify-end gap-2 font-mono text-[12px] font-medium tracking-[0.03em] text-foreground md:text-[14px]">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(0,240,255,0.55)]" />
                    </span>
                    <span className="uc-scramble">en_construccion</span>
                  </span>
                </StatusRow>

                <StatusRow label="fase">
                  <span className="uc-scramble font-mono text-[12px] tracking-[0.03em] text-foreground/90 md:text-[14px]">
                    02 / desarrollo
                  </span>
                </StatusRow>

                <StatusRow label="acceso">
                  <span className="uc-scramble font-mono text-[12px] tracking-[0.03em] text-foreground/85 md:text-[14px]">
                    proximamente
                  </span>
                </StatusRow>
              </div>

              <div className="hidden items-center justify-between border-t border-white/10 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/65 md:flex md:px-5 md:py-3 md:text-[12px]">
                <span>hexagono8</span>
                <span className="h-3 w-1.5 animate-pulse bg-primary" aria-hidden="true" />
              </div>
            </div>
          </aside>
        </div>
      </main>

      <section className="relative z-10 border-t border-white/10 px-5 md:px-10">
        <div className="mx-auto grid max-w-[1320px] grid-cols-3 gap-3 py-3 md:gap-8 md:py-5">
          {PHASES.map((phase) => (
            <div key={phase.n} className="uc-phase">
              <div className="flex flex-col gap-0.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-foreground/85 md:flex-row md:items-baseline md:gap-1.5 md:tracking-[0.16em]">
                <span>{phase.n}</span>
                <span className="hidden text-foreground/45 md:inline">/</span>
                <span>{phase.label}</span>
              </div>

              <div className="mt-1 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] md:tracking-[0.1em]">
                {phase.status === 'done' && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />}
                {phase.status === 'active' && (
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                  </span>
                )}
                {phase.status === 'pending' && (
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full border border-foreground/50" />
                )}
                <span
                  className={
                    phase.status === 'done'
                      ? 'text-foreground/80'
                      : phase.status === 'active'
                        ? 'text-primary'
                        : 'text-foreground/70'
                  }
                >
                  {phase.state}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="uc-footer relative z-10 border-t border-white/10 px-5 py-2.5 md:px-10 md:py-4">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-1.5 font-mono text-[11px] tracking-[0.1em] text-foreground/70 md:flex-row md:items-center md:justify-between md:text-[12px] md:tracking-[0.12em]">
          <p>{`© ${year} Hexagono 8 Studio`}</p>
          <p>Rengo — Rancagua · Santiago, CL</p>
        </div>
      </footer>
    </div>
  )
}
