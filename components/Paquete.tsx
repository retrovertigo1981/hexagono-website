'use client'

import Link from 'next/link'

// ─── Types ───────────────────────────────────────────────────────────────────

interface Feature {
    text: string
    bold?: string       // texto en negrita al inicio del feature
    boldEnd?: string    // texto en negrita al final (ej: "El código es 100% tuyo.")
}

interface Package {
    id: 'esencia' | 'estudio' | 'ecom'
    tag: string
    name: string
    pitch: string
    priceFrom: string
    priceTo: string
    priceLabel: string
    features: Feature[]
    time: string
    ideal: string
    featured?: boolean
    featuredLabel?: string
    ctaVariant: 'cyan' | 'amber' | 'ghost'
}

// ─── Data ────────────────────────────────────────────────────────────────────

const PACKAGES: Package[] = [
    {
        id: 'esencia',
        tag: 'Paquete 01',
        name: 'Esencia',
        pitch: '"Tu primera web que genera confianza — para que cuando alguien te busque en Google, no cierre la pestaña antes de llamarte."',
        priceFrom: '$220.000',
        priceTo: '$280.000',
        priceLabel: 'CLP · precio fijo · sin sorpresas',
        features: [
            { text: ' quién eres, qué ofreces y cómo contactarte', bold: 'Una página que le explica a tu cliente', boldEnd: '— sin confusión' },
            { text: 'Diseño creado específicamente para tu negocio, no sacado de una librería genérica' },
            { text: 'Tu cliente puede encontrarte y contactarte fácilmente desde el celular' },
            { text: 'Botón de WhatsApp o formulario de contacto integrado y funcionando' },
            { text: 'Carga rápido — una web lenta pierde clientes antes de que lean la primera línea' },
            { text: ' Sin mensualidades, sin plataformas que te cobren por existir', bold: 'El código es 100% tuyo.' },
        ],
        time: '5 a 7 días hábiles',
        ideal: 'Para emprendedores y negocios en Rancagua y Machalí que están dando el paso de solo WhatsApp a tener presencia web profesional.',
        ctaVariant: 'cyan',
    },
    {
        id: 'estudio',
        tag: 'Paquete 02',
        name: 'Estudio',
        pitch: '"Una web completa que presenta tu empresa en serio — y que trabaja para conseguirte clientes mientras tú atiendes tu negocio."',
        priceFrom: '$550.000',
        priceTo: '$750.000',
        priceLabel: 'CLP · precio fijo · sin mensualidades',
        features: [
            { text: ' inicio, servicios, sobre ti, contacto', bold: 'Web completa de 5 a 8 secciones:', boldEnd: 'y lo que tu negocio necesite' },
            { text: 'Arrancamos con una semana de conversación — entendemos tu negocio antes de diseñar una sola pantalla' },
            { text: 'El visitante sabe en segundos por qué elegirte a ti y no a tu competencia' },
            { text: 'Se ve y se mueve como una web de empresa grande — sin el presupuesto de empresa grande' },
            { text: 'Google te puede encontrar: estructura técnica optimizada desde el principio' },
            { text: 'Rápida, segura, funciona perfecto en celular, tablet y escritorio' },
            { text: ' Sin WordPress que se rompe, sin Wix que te cobra todos los meses', bold: 'Código propio, tuyo para siempre.' },
        ],
        time: '3 a 4 semanas',
        ideal: 'Para empresas y pymes de la región que quieren una presencia web que refleje el nivel real de su negocio — y dejar de perder clientes por tener una web que no convence.',
        featured: true,
        featuredLabel: 'Más solicitado',
        ctaVariant: 'amber',
    },
    {
        id: 'ecom',
        tag: 'Paquete 03',
        name: 'E-commerce',
        pitch: '"Tu tienda online que vende las 24 horas — sin depender de que alguien te escriba por Instagram."',
        priceFrom: '$950.000',
        priceTo: '$1.600.000',
        priceLabel: 'CLP · inversión única · sin arriendo eterno',
        features: [
            { text: ' ver, elegir y pagar sin salir del sitio', bold: 'Tienda completa donde tus clientes pueden' },
            { text: 'Pagos con Webpay, MercadoPago y transferencia — los métodos que usan tus clientes en Chile' },
            { text: 'Tu cliente puede buscar, filtrar y encontrar lo que necesita sin frustrarse' },
            { text: 'Google te muestra cuando alguien busca lo que tú vendes — estructura de SEO desde el día 1' },
            { text: 'Carga rápido en celular: la mayoría de las compras online en Chile se hacen desde el teléfono' },
            { text: 'Tú administras tus productos, precios y stock sin necesitar ayuda técnica' },
            { text: ' Construida para aguantar el tráfico cuando más importa', bold: 'No se cae en CyberDay.' },
            { text: 'Pagas una vez y la tienda es tuya — sin comisiones de plataforma, sin cuotas mensuales' },
        ],
        time: '5 a 8 semanas',
        ideal: 'Para comercios de la región que quieren vender en internet sin depender de redes sociales ni pagar mensualidades eternas a plataformas que no les pertenecen.',
        ctaVariant: 'ghost',
    },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function IconEsencia() {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path d="M24 4L42 14.5V33.5L24 44L6 33.5V14.5L24 4Z" stroke="#00F0FF" strokeWidth="1" fill="none" opacity=".5" />
            <circle cx="24" cy="24" r="5" stroke="#00F0FF" strokeWidth="1" opacity=".8" />
        </svg>
    )
}

function IconEstudio() {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path d="M24 4L42 14.5V33.5L24 44L6 33.5V14.5L24 4Z" stroke="#FF6B35" strokeWidth="1" fill="rgba(255,107,53,.06)" opacity=".8" />
            <path d="M24 14L33 19.5V30.5L24 36L15 30.5V19.5L24 14Z" stroke="#FF6B35" strokeWidth=".6" fill="none" opacity=".4" />
        </svg>
    )
}

function IconEcom() {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <defs>
                <linearGradient id="pg" x1="6" y1="10" x2="42" y2="38" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF6B35" />
                    <stop offset="1" stopColor="#00F0FF" />
                </linearGradient>
            </defs>
            <rect x="6" y="10" width="36" height="28" rx="3" stroke="url(#pg)" strokeWidth="1" fill="none" opacity=".7" />
            <path d="M6 18h36" stroke="url(#pg)" strokeWidth=".6" opacity=".4" />
            <rect x="12" y="24" width="10" height="8" rx="1" fill="url(#pg)" opacity=".2" />
            <rect x="26" y="24" width="10" height="8" rx="1" fill="url(#pg)" opacity=".2" />
        </svg>
    )
}

const ICONS: Record<Package['id'], React.FC> = {
    esencia: IconEsencia,
    estudio: IconEstudio,
    ecom: IconEcom,
}

// Renderiza un feature con fragmentos en negrita
function FeatureItem({ feature }: { feature: Feature }) {
    if (feature.bold) {
        return (
            <li className="flex gap-3 items-start text-[13.5px] leading-relaxed text-white/50">
                <span className="font-mono text-[11px] text-[#FF6B35] shrink-0 mt-0.75">—</span>
                <span>
                    <strong className="text-white font-semibold">{feature.bold}</strong>
                    {feature.text}
                    {feature.boldEnd && (
                        <> <strong className="text-white font-semibold">{feature.boldEnd}</strong></>
                    )}
                </span>
            </li>
        )
    }
    return (
        <li className="flex gap-3 items-start text-[13.5px] leading-relaxed text-white/50">
            <span className="font-mono text-[11px] text-[#FF6B35] shrink-0 mt-0.75">—</span>
            <span>{feature.text}</span>
        </li>
    )
}

// Estilos de CTA por variante
const CTA_STYLES: Record<Package['ctaVariant'], string> = {
    cyan: [
        'inline-flex items-center gap-2 px-5 py-3 rounded text-[11px] tracking-widest uppercase font-mono font-bold',
        'transition-all duration-200',
        'bg-[rgba(0,240,255,0.15)] text-[#00F0FF] border border-[rgba(0,240,255,0.25)]',
        'hover:bg-[rgba(0,240,255,0.25)]',
    ].join(' '),
    amber: [
        'inline-flex items-center gap-2 px-5 py-3 rounded text-[11px] tracking-widest uppercase font-mono font-bold',
        'transition-all duration-200',
        'bg-[#FF6B35] text-[#0A0A0A]',
        'hover:bg-[#ff825a]',
    ].join(' '),
    ghost: [
        'inline-flex items-center gap-2 px-5 py-3 rounded text-[11px] tracking-widest uppercase font-mono font-bold',
        'transition-all duration-200',
        'bg-transparent text-white/80 border border-[rgba(255,107,53,0.3)]',
        'hover:border-[rgba(255,107,53,0.6)] hover:text-white',
    ].join(' '),
}

// Estilos del nombre por paquete
const NAME_STYLES: Record<Package['id'], string> = {
    esencia: 'text-[#00F0FF]',
    estudio: 'text-[#FF6B35]',
    ecom: 'bg-gradient-to-r from-[#FF6B35] to-[#00F0FF] bg-clip-text text-transparent',
}

// Accent line top del card
const ACCENT_STYLES: Record<Package['id'], string> = {
    esencia: 'bg-[#00F0FF]',
    estudio: 'bg-[#FF6B35]',
    ecom: 'bg-gradient-to-r from-[#FF6B35] to-[#00F0FF]',
}

function PackageCard({ pkg }: { pkg: Package }) {
    const Icon = ICONS[pkg.id]

    return (
        <div className="relative bg-[#0A0A0A] flex flex-col overflow-hidden transition-colors duration-300 hover:bg-[#0e0e0e] group px-11 py-[52px] max-md:px-8 max-md:py-10">

            {/* Accent top line — scale on hover */}
            <span
                className={[
                    'absolute top-0 left-0 right-0 h-[2px]',
                    'scale-x-0 origin-left transition-transform duration-500',
                    'group-hover:scale-x-100',
                    ACCENT_STYLES[pkg.id],
                ].join(' ')}
            />

            {/* Featured badge */}
            {pkg.featured && (
                <span className="absolute top-5 right-5 font-mono text-[9px] tracking-[.2em] uppercase px-3 py-[5px] rounded-full bg-[#FF6B35] text-[#0A0A0A] font-bold">
                    {pkg.featuredLabel}
                </span>
            )}

            {/* Icon */}
            <div className="w-12 h-12 mb-7">
                <Icon />
            </div>

            {/* Tag + Name */}
            <span className="font-mono text-[9px] tracking-[.25em] text-white/30 uppercase mb-2.5">
                {pkg.tag}
            </span>
            <h3 className={`text-[2rem] font-black tracking-[-0.04em] mb-2 leading-none ${NAME_STYLES[pkg.id]}`}>
                {pkg.name}
            </h3>

            {/* Pitch */}
            <p className="text-[13px] leading-[1.7] text-white/40 mb-7 italic">
                {pkg.pitch}
            </p>

            {/* Divider */}
            <div className="h-px bg-white/[0.07] mb-7" />

            {/* Price */}
            <div className="text-[1.5rem] font-black tracking-[-0.03em] mb-1 text-white">
                {pkg.priceFrom}{' '}
                <span className="text-[.9rem] text-white/30">–</span>{' '}
                {pkg.priceTo}
            </div>
            <div className="font-mono text-[11px] text-white/35 mb-6">
                {pkg.priceLabel}
            </div>

            {/* Features */}
            <ul className="flex flex-col gap-3 flex-1 mb-9">
                {pkg.features.map((f, i) => (
                    <FeatureItem key={i} feature={f} />
                ))}
            </ul>

            {/* Time */}
            <div className="font-mono text-[10px] tracking-[.15em] text-white/25 uppercase mb-6 flex items-center gap-2 before:content-[''] before:w-5 before:h-px before:bg-white/15">
                ⏱ {pkg.time}
            </div>

            {/* Ideal */}
            <div className="text-[12px] leading-[1.7] text-white/30 px-[18px] py-[14px] bg-white/[0.03] rounded border-l-2 border-[rgba(255,107,53,0.3)] mb-7 italic">
                {pkg.ideal}
            </div>

            {/* CTA */}
            <Link href="#contacto" className={CTA_STYLES[pkg.ctaVariant]}>
                Quiero este paquete →
            </Link>
        </div>
    )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function Paquetes() {
    return (
        <section
            id="paquetes"
            className="bg-[#141414] border-t border-white/[0.07] py-[140px] px-12 max-md:px-6 max-md:py-20"
        >
            <div className="max-w-[1300px] mx-auto">

                {/* ── Ancla de valor ── */}
                <div className="mb-[60px] px-10 py-8 border-l-2 border-[#FF6B35] bg-[rgba(255,107,53,0.04)]">
                    <p className="font-mono text-[9px] tracking-[.25em] text-[#FF6B35] uppercase mb-3">
                        Una cosa antes de ver los precios
                    </p>
                    <p className="text-[16px] leading-[1.8] text-white/70 max-w-[1200px]">
                        Una web mal hecha no es gratis. Te cuesta cada cliente que llega, no entiende
                        lo que ofreces en los primeros segundos y se va. Ese costo es invisible pero
                        real. Lo que ves abajo no es un gasto — es lo que cuesta dejarlo de perder.
                    </p>
                </div>

                {/* ── Header ── */}
                <div className="mb-[72px]">
                    <div className="flex justify-between items-end flex-wrap gap-6 mb-4">
                        <div>
                            <p className="font-mono text-[13px] tracking-[.3em] text-primary uppercase">
                // 03 — Paquetes y precios
                            </p>
                            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-black tracking-[-0.05em] leading-none mt-1">
                                Precio fijo.{' '}
                                <br />
                                <span className="text-[#FF6B35]">Sin letra chica.</span>
                            </h2>
                        </div>
                    </div>
                    <p className="text-[15px] leading-[1.8] text-white/[0.38] max-w-[560px]">
                        Tres puntos de entrada según lo que necesitas ahora. Sabes exactamente qué
                        recibes, cuánto demora y cuánto cuesta — antes de comprometer un peso. Y si
                        después quieres que sigamos trabajando juntos, tienes esa opción también.
                    </p>
                </div>

                {/* ── Cards grid ── */}
                <div className="grid grid-cols-3 gap-[2px] bg-white/[0.07] border border-white/[0.07] rounded-md overflow-hidden max-[960px]:grid-cols-1">
                    {PACKAGES.map((pkg) => (
                        <PackageCard key={pkg.id} pkg={pkg} />
                    ))}
                </div>

                {/* ── Nota transparencia ── */}
                <div className="mt-6 px-9 py-7 border border-white/[0.07] rounded flex items-center gap-6 flex-wrap bg-[rgba(0,240,255,0.02)]">
                    <span className="font-mono text-[10px] tracking-[.2em] text-[#00F0FF] uppercase flex-shrink-0">
                        Transparencia
                    </span>
                    <p className="text-[14px] leading-[1.7] text-white/40 flex-1 min-w-[200px]">
                        ¿No sabes qué paquete necesitas?{' '}
                        <strong className="text-white">Conversemos primero.</strong>{' '}
                        Te ayudamos a identificar qué tiene más sentido para tu negocio hoy — sin
                        compromiso y sin presionarte a elegir el más caro.
                    </p>
                    <Link
                        href="#contacto"
                        className="flex-shrink-0 inline-flex items-center gap-2 px-[22px] py-3 rounded text-[11px] tracking-widest uppercase font-mono font-bold bg-[#FF6B35] text-[#0A0A0A] hover:bg-[#ff825a] transition-colors duration-200"
                    >
                        Hablemos →
                    </Link>
                </div>

            </div>
        </section>
    )
}


// 'use client'

// import { ArrowRight } from 'lucide-react'

// const packages = [
//     {
//         id: 'esencia',
//         num: '01',
//         name: 'Esencia',
//         pitch: '"De solo WhatsApp a tu primera web profesional \u2014 sin parecer generico."',
//         priceRange: '$220.000 \u2013 $280.000',
//         priceNote: 'CLP \u00B7 precio fijo \u00B7 sin sorpresas',
//         features: [
//             { bold: 'Landing page de alto impacto,', text: ' diseno 100% original \u2014 nunca una plantilla' },
//             { bold: '', text: 'Una sola seccion de conversion, construida con estrategia' },
//             { bold: '', text: 'Responsive perfecto en movil, tablet y escritorio' },
//             { bold: '', text: 'Formulario de contacto o WhatsApp integrado' },
//             { bold: '', text: 'SEO basico + velocidad de carga optimizada' },
//             { bold: '', text: 'Codigo tuyo al 100%, hosting libre' },
//         ],
//         time: '5 a 7 dias habiles',
//         ideal: 'Ideal para emprendedores en Rancagua y Machali que necesitan validacion profesional inmediata.',
//         accentColor: 'cyan',
//         featured: false,
//     },
//     {
//         id: 'estudio',
//         num: '02',
//         name: 'Estudio',
//         pitch: '"Donde aplicamos el manifiesto completo: codigo, diseno y estrategia que trabaja sola."',
//         priceRange: '$550.000 \u2013 $750.000',
//         priceNote: 'CLP \u00B7 precio fijo \u00B7 sin mensualidades',
//         features: [
//             { bold: 'Web corporativa de 5 a 8 secciones', text: ' con arquitectura de informacion a medida' },
//             { bold: '"Semana 0" de estrategia', text: ' \u2014 investigamos, prototipamos, definimos antes de disenar' },
//             { bold: '', text: 'Sistema de diseno propio: tipografia, colores, componentes unicos' },
//             { bold: '', text: 'Motion design y animaciones con GSAP/CSS' },
//             { bold: '', text: 'Blog o CMS simple si necesitas publicar contenido' },
//             { bold: '', text: 'SEO tecnico avanzado + analytics configurado' },
//             { bold: '', text: 'Responsive impecable + optimizacion de velocidad' },
//             { bold: '', text: 'Codigo limpio y documentado \u2014 100% tuyo' },
//         ],
//         time: '3 a 4 semanas',
//         ideal: 'Para empresas y pymes que quieren alejarse para siempre de las soluciones de arrastrar y soltar.',
//         accentColor: 'amber',
//         featured: true,
//     },
//     {
//         id: 'ecom',
//         num: '03',
//         name: 'E-commerce',
//         pitch: '"Para que el comercio regional compita de tu a tu con las grandes cadenas nacionales."',
//         priceRange: '$950.000 \u2013 $1.600.000',
//         priceNote: 'CLP \u00B7 inversion unica \u00B7 sin arriendo eterno',
//         features: [
//             { bold: 'Tienda online completa', text: ' con UX de nivel internacional' },
//             { bold: '', text: 'Integracion de pagos: Webpay, MercadoPago, transferencia' },
//             { bold: '', text: 'Catalogo de productos con filtros, variantes y stock' },
//             { bold: 'SEO avanzado', text: ' \u2014 estructura tecnica pensada para Google desde el dia 1' },
//             { bold: '', text: 'Velocidad ultra-optimizada para mobile (Core Web Vitals)' },
//             { bold: '', text: 'Panel de administracion simple \u2014 tu controlas tu tienda' },
//             { bold: '', text: 'Escalabilidad garantizada: no se cae en CyberDay, Navidad ni Hot Sale' },
//             { bold: '', text: 'Codigo tuyo, hospedaje libre, sin dependencias de plataforma' },
//         ],
//         time: '5 a 8 semanas',
//         ideal: 'Comercios locales de la region que quieren una inversion real \u2014 no un gasto mensual disfrazado de plataforma.',
//         accentColor: 'gradient',
//         featured: false,
//     },
// ]

// function PackageIcon({ type }: { type: string }) {
//     if (type === 'cyan') {
//         return (
//             <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
//                 <path d="M24 4L42 14.5V33.5L24 44L6 33.5V14.5L24 4Z" stroke="#00F0FF" strokeWidth="1" fill="none" opacity=".5" />
//                 <circle cx="24" cy="24" r="5" stroke="#00F0FF" strokeWidth="1" opacity=".8" />
//             </svg>
//         )
//     }
//     if (type === 'amber') {
//         return (
//             <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
//                 <path d="M24 4L42 14.5V33.5L24 44L6 33.5V14.5L24 4Z" stroke="#FF6B35" strokeWidth="1" fill="rgba(255,107,53,.06)" opacity=".8" />
//                 <path d="M24 14L33 19.5V30.5L24 36L15 30.5V19.5L24 14Z" stroke="#FF6B35" strokeWidth=".6" fill="none" opacity=".4" />
//             </svg>
//         )
//     }
//     return (
//         <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
//             <rect x="6" y="10" width="36" height="28" rx="3" stroke="url(#pg)" strokeWidth="1" fill="none" opacity=".7" />
//             <path d="M6 18h36" stroke="url(#pg)" strokeWidth=".6" opacity=".4" />
//             <rect x="12" y="24" width="10" height="8" rx="1" fill="url(#pg)" opacity=".2" />
//             <rect x="26" y="24" width="10" height="8" rx="1" fill="url(#pg)" opacity=".2" />
//             <defs>
//                 <linearGradient id="pg" x1="6" y1="10" x2="42" y2="38" gradientUnits="userSpaceOnUse">
//                     <stop stopColor="#FF6B35" /><stop offset="1" stopColor="#00F0FF" />
//                 </linearGradient>
//             </defs>
//         </svg>
//     )
// }

// export function Paquetes() {
//     return (
//         <section id="paquetes" className="bg-card border-t border-[var(--hex-border)] py-20 md:py-[140px] px-6 md:px-12">
//             <div className="max-w-[1300px] mx-auto">
//                 {/* Header */}
//                 <div className="rv mb-[72px]">
//                     <div className="flex justify-between items-end flex-wrap gap-6 mb-4">
//                         <div>
//                             <p className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase">{'// 03 \u2014 Lo que construimos'}</p>
//                             <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-[900] tracking-[-0.05em] leading-none mt-2">
//                                 Elige tu<br /><span className="text-primary">punto de partida</span>
//                             </h2>
//                         </div>
//                     </div>
//                     <p className="text-[15px] leading-[1.8] text-foreground/[0.38] max-w-[560px]">
//                         Tres paquetes disenados para negocios reales de la region. Sin mensualidades eternas, sin dependencias. Precio fijo, entrega clara, codigo tuyo.
//                     </p>
//                 </div>

//                 {/* Grid */}
//                 <div className="rv grid grid-cols-1 lg:grid-cols-3 gap-px bg-[var(--hex-border)] border border-[var(--hex-border)] rounded-md overflow-hidden">
//                     {packages.map(pkg => {
//                         const nameColor =
//                             pkg.accentColor === 'cyan' ? 'text-accent' :
//                                 pkg.accentColor === 'amber' ? 'text-primary' : ''
//                         const nameStyle = pkg.accentColor === 'gradient'
//                             ? { background: 'linear-gradient(90deg, var(--hex-amber), var(--hex-cyan))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }
//                             : {}
//                         const lineColor =
//                             pkg.accentColor === 'cyan' ? 'bg-accent' :
//                                 pkg.accentColor === 'amber' ? 'bg-primary' :
//                                     'bg-gradient-to-r from-primary to-accent'

//                         return (
//                             <div key={pkg.id} className="package-card bg-background p-10 md:p-[52px_44px] relative overflow-hidden flex flex-col transition-colors duration-300 hover:bg-[#0e0e0e] group">
//                                 {/* Top accent line */}
//                                 <div className={`absolute top-0 left-0 right-0 h-0.5 ${lineColor} scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100`} />

//                                 {/* Featured badge */}
//                                 {pkg.featured && (
//                                     <div className="absolute top-5 right-5 font-mono text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full bg-primary text-primary-foreground font-bold">
//                                         Mas popular
//                                     </div>
//                                 )}

//                                 <div className="w-12 h-12 mb-7">
//                                     <PackageIcon type={pkg.accentColor} />
//                                 </div>

//                                 <span className="font-mono text-[9px] tracking-[0.25em] text-foreground/30 uppercase mb-2.5">
//                                     Paquete {pkg.num}
//                                 </span>
//                                 <h3 className={`text-[2rem] font-[900] tracking-[-0.04em] mb-2 leading-none ${nameColor}`} style={nameStyle}>
//                                     {pkg.name}
//                                 </h3>
//                                 <p className="text-[13px] leading-[1.7] text-foreground/40 mb-7 italic">{pkg.pitch}</p>
//                                 <div className="h-px bg-[var(--hex-border)] mb-7" />

//                                 <div className="text-[1.5rem] font-[900] tracking-[-0.03em] mb-1 text-foreground">{pkg.priceRange}</div>
//                                 <div className="font-mono text-[11px] text-foreground/35 mb-6">{pkg.priceNote}</div>

//                                 <ul className="list-none flex flex-col gap-3 flex-1 mb-9">
//                                     {pkg.features.map((f, i) => (
//                                         <li key={i} className="flex gap-3 items-start text-[13.5px] leading-[1.6] text-foreground/50">
//                                             <span className="text-primary font-mono text-[11px] shrink-0 mt-0.5">{'\u2014'}</span>
//                                             <span>
//                                                 {f.bold && <strong className="text-foreground font-semibold">{f.bold}</strong>}
//                                                 {f.text}
//                                             </span>
//                                         </li>
//                                     ))}
//                                 </ul>

//                                 <div className="font-mono text-[10px] tracking-[0.15em] text-foreground/25 uppercase mb-6 flex items-center gap-2">
//                                     <span className="w-5 h-px bg-foreground/15" />
//                                     {pkg.time}
//                                 </div>

//                                 <div className="text-xs leading-[1.7] text-foreground/30 p-3.5 bg-foreground/[0.03] rounded-sm border-l-2 border-primary/30 mb-7 italic">
//                                     {pkg.ideal}
//                                 </div>

//                                 <a
//                                     href="#contacto"
//                                     className={`inline-flex items-center gap-2.5 px-5.5 py-3 font-mono text-[11px] font-bold tracking-[0.1em] uppercase no-underline rounded-sm transition-all duration-200 hover:-translate-y-0.5 self-start ${pkg.accentColor === 'cyan'
//                                         ? 'bg-accent/15 text-accent border border-accent/25 hover:bg-accent/25'
//                                         : pkg.accentColor === 'amber'
//                                             ? 'bg-primary text-primary-foreground hover:bg-[#ff8a5e] hover:shadow-[0_12px_32px_rgba(255,107,53,0.25)]'
//                                             : 'bg-transparent text-foreground border border-primary/30 hover:bg-foreground/[0.04]'
//                                         }`}
//                                 >
//                                     {'Quiero este paquete \u2192'}
//                                 </a>
//                             </div>
//                         )
//                     })}
//                 </div>

//                 {/* Guarantee note */}
//                 <div className="rv mt-6 p-7 md:px-9 border border-[var(--hex-border)] rounded-sm flex items-center gap-6 flex-wrap bg-accent/[0.02]">
//                     <span className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase shrink-0">Garantia</span>
//                     <p className="text-sm leading-[1.7] text-foreground/40 flex-1 min-w-[200px]">
//                         Todos los paquetes incluyen <strong className="text-foreground">diseno 100% original</strong>. Si alguna vez encontramos que ya usamos algo similar en otro proyecto, lo rehacemos sin costo extra. Sin excepciones.
//                     </p>
//                     <a
//                         href="#contacto"
//                         className="inline-flex items-center gap-2.5 px-5.5 py-3 bg-primary text-primary-foreground font-mono text-[11px] font-bold tracking-[0.1em] uppercase no-underline rounded-sm transition-all duration-200 hover:bg-[#ff8a5e] hover:-translate-y-0.5 shrink-0"
//                     >
//                         {'Empezar \u2192'}
//                     </a>
//                 </div>
//             </div>
//         </section>
//     )
// }
