'use client'

import { Check } from 'lucide-react'


const checks = [
    { bold: 'Tu cliente decide en los primeros 5 segundos. ', text: ' Diseñamos para que esos 5 segundos hablen bien de ti.' },
    { bold: 'Pagas una vez, el código es tuyo para siempre.', text: ' Sin plataformas que te cobren mensualmente por seguir existiendo.' },
    { bold: 'Diseño pensado para tu negocio específico.', text: ' No para un negocio genérico que podría ser cualquiera.' },
    { bold: 'Precio fijo, plazo claro, sin sorpresas.', text: ' Sabes qué recibes antes de pagar un peso.' },
]

const stats = [
    { num: '1\u00D7', title: 'Pagas una sola vez', desc: 'Sin mensualidades, sin renovaciones, sin plataformas que te cobran por seguir existiendo.' },
    { num: '5"', title: 'La primera impresión lo decide todo', desc: 'Diseñamos para que tu cliente entienda en 5 segundos por qué elegirte a ti.' },
    { num: '100%', title: 'El código es tuyo para siempre', desc: 'No un arriendo disfrazado. No un login que pierdes si dejas de pagar.' },
]

export function Manifiesto() {
    return (
        <section id="manifiesto" className="py-20 md:py-35 px-6 md:px-12 max-w-325 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                {/* Left */}
                <div className="rv">
                    <span className="font-mono text-[13px] tracking-[0.3em] text-accent uppercase block mb-6">
                        {'// 00 \u2014 El Problema que Resolvemos'}
                    </span>
                    <h2 className="text-[clamp(2.8rem,5vw,4.5rem)] font-black tracking-[-0.05em] leading-[1.02] mb-8 text-balance">
                        {'Tienes un buen negocio,'}
                        {/* {'Negocio,'} */}
                        <br />
                        {'pero tu web '}
                        <span className="text-primary">{'no lo refleja.'}</span>
                    </h2>
                    <p className="text-base leading-[1.9] text-foreground/45 mb-9">
                        La mayoría de negocios en la región no tienen una web, o tienen una web que existe pero no trabaja. Carga lento, se ve igual que la competencia, nadie la encuentra en Google y el cliente que llega no entiende en 5 segundos qué haces ni por qué elegirte. Eso tiene un costo real — cada visita que se va sin contactarte es un cliente que fue a otra parte.
                    </p>
                    <div className="flex flex-col gap-4">
                        {checks.map((c, i) => (
                            <div key={i} className="flex gap-4 items-start">
                                <div className="w-5 h-5 rounded-full bg-primary12 border border-primary/30 flex items-center justify-center shrink-0 mt-0.5">
                                    <Check size={10} className="text-primary" />
                                </div>
                                <p className="text-[15px] leading-[1.7] text-foreground/60">
                                    <strong className="text-foreground font-bold">{c.bold}</strong>
                                    {c.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right */}
                <div className="rv flex flex-col gap-0.5">
                    {stats.map((s, i) => (
                        <div
                            key={i}
                            className="stat-card bg-card border border-(--hex-border) rounded-sm px-9 py-10 relative overflow-hidden transition-colors duration-300 hover:bg-secondary group"
                        >
                            <div className="absolute top-0 left-0 w-0.75 h-0 bg-primary transition-[height] duration-400 group-hover:h-full" />
                            <div className="text-[3.5rem] font-black tracking-[-0.05em] text-primary leading-none mb-2">{s.num}</div>
                            <div className="text-sm text-foreground/40 leading-[1.6]">
                                <strong className="text-foreground font-semibold block text-[15px] mb-1">{s.title}</strong>
                                {s.desc}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
