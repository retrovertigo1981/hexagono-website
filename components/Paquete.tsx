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

// ─── Data (ACTUALIZADO) ──────────────────────────────────────────────────────
const PACKAGES: Package[] = [
    {
        id: 'esencia',
        tag: 'Para empezar',
        name: 'Presencia Digital',
        pitch: '"Valida tu negocio en línea. Genera confianza inmediata y convierte la primera visita en un contacto real."',
        priceFrom: '$220.000',
        priceTo: '$280.000',
        priceLabel: 'CLP · precio fijo · sin sorpresas',
        features: [
            { bold: 'Una página que le explica a tu cliente', text: ' quién eres, qué ofreces y cómo contactarte', boldEnd: '— sin confusión' },
            { text: 'Diseño original creado específicamente para tu modelo de negocio, no sacado de una librería genérica' },
            { text: 'Optimizada para móvil: donde hoy ocurren más del 80% de las búsquedas y decisiones de compra' },
            { text: 'Botón de WhatsApp o formulario de contacto integrado y funcionando desde el día 1' },
            { text: 'Carga rápida y estructura técnica optimizada para que Google te indexe correctamente' },
            { bold: 'El código es 100% tuyo.', text: ' Pagas una sola vez. Sin mensualidades, sin dependencias externas.' },
        ],
        time: '5 a 7 días hábiles',
        ideal: 'Emprendedores y profesionales que dan el salto de depender solo de redes sociales a tener un activo web propio, rápido y profesional.',
        ctaVariant: 'cyan',
    },
    {
        id: 'estudio',
        tag: 'Para crecer',
        name: 'Autoridad Comercial',
        pitch: '"Una plataforma que presenta tu empresa en serio, automatiza el contacto y trabaja para ti mientras gestionas tu negocio."',
        priceFrom: '$550.000',
        priceTo: '$750.000',
        priceLabel: 'CLP · precio fijo · sin mensualidades',
        features: [
            { bold: 'Web completa de 5 a 8 secciones:', text: ' inicio, servicios, sobre nosotros, contacto', boldEnd: 'y lo que tu flujo necesite' },
            { text: 'Arrancamos con una semana de estrategia — entendemos tu negocio antes de diseñar una sola pantalla' },
            { text: 'El visitante entiende en segundos por qué elegirte a ti y no a tu competencia' },
            { text: 'Rendimiento y velocidad de nivel corporativo — sin el costo ni la burocracia de una agencia grande' },
            { text: 'Estructura SEO semántico y datos estructurados para que los motores de búsqueda (y la IA) te recomienden' },
            { text: 'Segura, escalable y con experiencia de usuario impecable en cualquier dispositivo' },
            { bold: 'Código propio, tuyo para siempre.', text: ' Sin WordPress que se actualiza y rompe, sin Wix que te ata a su ecosistema.' },
        ],
        time: '3 a 4 semanas',
        ideal: 'Empresas y profesionales que necesitan una presencia que refleje su nivel real de servicio — y dejar de perder oportunidades por una web que no convence.',
        featured: true,
        featuredLabel: 'Más solicitado',
        ctaVariant: 'amber',
    },
    {
        id: 'ecom',
        tag: 'Para vender',
        name: 'Ventas Autónomas',
        pitch: '"Tu sucursal digital abierta 24/7. Vende con pagos chilenos integrados y sin depender de que alguien te escriba por Instagram."',
        priceFrom: '$950.000',
        priceTo: '$1.600.000',
        priceLabel: 'CLP · inversión única · sin arriendo eterno',
        features: [
            { bold: 'Tienda completa donde tus clientes pueden', text: ' ver, elegir y pagar sin salir del sitio' },
            { text: 'Pagos con Webpay, MercadoPago y transferencia — los métodos que usan tus clientes en Chile' },
            { text: 'Catálogo inteligente con búsqueda, filtros y categorías que reducen la fricción y aumentan el ticket promedio' },
            { text: 'SEO técnico y estructura optimizada para que aparezcas cuando buscan lo que tú vendes' },
            { text: 'Velocidad extrema en móvil: la mayoría de compras online en Chile nacen en el teléfono' },
            { text: 'Tú administras productos, precios y stock sin depender de un desarrollador para cambios básicos' },
            { bold: 'Estabilidad garantizada.', text: ' Construida para aguantar tráfico real sin caerse en campañas o fechas altas.' },
            { text: 'Pagas una vez y la tienda es tuya — sin comisiones de plataforma, sin cuotas mensuales' },
        ],
        time: '5 a 8 semanas',
        ideal: 'Comercios y marcas que quieren vender en internet con control total, sin depender de algoritmos ni pagar comisiones por venta.',
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
                        real. Lo que ves abajo no es un gasto — es lo que cuesta dejar de perderlo.
                    </p>
                </div>
                {/* ── Header ── */}
                <div className="mb-[72px]">
                    <div className="flex justify-between items-end flex-wrap gap-6 mb-4">
                        <div>
                            <p className="font-mono text-[13px] tracking-[.3em] text-primary uppercase">
                                {'// 03 — Paquetes y precios'}
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