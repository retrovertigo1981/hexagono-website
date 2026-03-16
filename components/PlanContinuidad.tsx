'use client'

import Link from 'next/link'

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEATURES: string[] = [
    'Actualizaciones de contenido cuando cambien tus precios, servicios o fotos',
    'Monitoreo básico — si algo se cae, te avisamos antes de que te enteres tú',
    'Hasta 2 horas de ajustes o mejoras mensuales',
    'Prioridad de respuesta frente a clientes nuevos',
    'Respaldo mensual de tu web — nunca pierdes lo construido',
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function FeatureItem({ text }: { text: string }) {
    return (
        <li className="flex gap-[10px] items-start text-[13px] leading-relaxed text-white/65">
            <span className="text-[#00F0FF] flex-shrink-0 mt-[2px]">→</span>
            {text}
        </li>
    )
}

function PlanCard() {
    return (
        <div className="relative border border-white/[0.07] rounded-md p-10 bg-[#141414]">

            {/* Badge OPTATIVO */}
            <div className="absolute -top-[12px] left-8 bg-[#FF6B35] text-[#0A0A0A] font-mono text-[9px] tracking-[.2em] uppercase px-[14px] py-1 rounded-sm font-bold">
                OPTATIVO
            </div>

            {/* Plan name */}
            <h3 className="text-[1.4rem] font-black tracking-[-0.03em] mb-[6px] text-white">
                Plan Continuidad
            </h3>
            <p className="font-mono text-[10px] text-white/30 tracking-[.1em] mb-7">
                Mes a mes · sin permanencia · cancelas cuando quieras
            </p>

            {/* Price */}
            <div className="text-[2rem] font-black tracking-[-0.04em] mb-1 text-white">
                $45.000
                <span className="text-[1rem] text-white/30 font-normal">/mes</span>
            </div>
            <p className="font-mono text-[11px] text-white/25 tracking-[.1em] mb-7">
                CLP · factura mensual
            </p>

            {/* Features */}
            <div className="border-t border-white/[0.07] pt-6">
                <ul className="flex flex-col gap-3">
                    {FEATURES.map((f, i) => (
                        <FeatureItem key={i} text={f} />
                    ))}
                </ul>
            </div>

            {/* Footer note */}
            <div className="mt-7 pt-5 border-t border-white/[0.07]">
                <p className="text-[12px] leading-[1.7] text-white/30">
                    Este plan no es para todos — y está bien. Está pensado para negocios que
                    crecen y necesitan que su web los acompañe.
                </p>
            </div>

            {/* CTA */}
            <Link
                href="#contacto"
                className="mt-7 inline-flex items-center gap-2 px-[22px] py-3 rounded text-[11px] tracking-widest uppercase font-mono font-bold bg-transparent text-[#00F0FF] border border-[rgba(0,240,255,0.25)] hover:bg-[rgba(0,240,255,0.08)] transition-colors duration-200"
            >
                Me interesa →
            </Link>
        </div>
    )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function PlanContinuidad() {
    return (
        <section
            id="mantenimiento"
            className="border-t border-white/[0.07] py-[100px] px-12 bg-[#0D0D0D] max-md:px-6 max-md:py-20"
        >
            <div className="max-w-[1300px] mx-auto">
                <div className="grid grid-cols-2 gap-20 items-start max-md:grid-cols-1 max-md:gap-12">

                    {/* ── Left: copy ── */}
                    <div>
                        <p className="font-mono text-[13px] tracking-[.25em] text-primary uppercase mb-4">
              // Opcional — Para cuando quieras seguir creciendo
                        </p>

                        <h2 className="text-[clamp(2rem,4vw,3rem)] font-black tracking-[-0.04em] leading-[1.1] mb-6">
                            Tu web entregada
                            <br />
                            es tuya.
                            <br />
                            <span className="text-[#00F0FF]">Punto.</span>
                        </h2>

                        <p className="text-[15px] leading-[1.9] text-white/55 mb-5">
                            No existe ninguna obligación de seguir trabajando con nosotros después
                            de la entrega. El código es tuyo, el dominio es tuyo, el hosting lo
                            eliges tú. Puedes llevar tu web a cualquier otro desarrollador mañana
                            si quieres — y te va a funcionar igual.
                        </p>

                        <p className="text-[15px] leading-[1.9] text-white/55">
                            Dicho eso: las webs se oxidan. Los precios cambian, los servicios
                            evolucionan, Google actualiza sus reglas. Si en algún momento quieres
                            que sigamos trabajando juntos para que tu web siga al día, tienes esa
                            opción. Sin contrato anual, sin permanencia mínima — cancelas cuando
                            quieras.
                        </p>
                    </div>

                    {/* ── Right: plan card ── */}
                    <PlanCard />

                </div>
            </div>
        </section>
    )
}