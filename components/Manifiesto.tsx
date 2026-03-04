'use client'

import { Check } from 'lucide-react'


const checks = [
    { bold: 'Sin Elementor, sin Wix, sin plantillas.', text: ' Codigo limpio que te pertenece al 100%.' },
    { bold: 'Diseno que no has visto antes.', text: ' Ni tu ni tu competencia.' },
    { bold: 'Estrategia de conversion integrada.', text: ' No decoramos, construimos activos que venden.' },
    { bold: 'Tu negocio, tu codigo.', text: ' Te entregamos todo \u2014 sin dependencias eternas.' },
]

const stats = [
    { num: '0', title: 'Plantillas usadas', desc: 'Cada proyecto se construye desde una hoja en blanco.' },
    { num: '3\u00D7', title: 'Mas conversion promedio', desc: 'versus webs construidas con page builders.' },
    { num: '100%', title: 'Tuyo para siempre', desc: 'El codigo es tu propiedad real, no un arriendo disfrazado.' },
]

export function Manifiesto() {
    return (
        <section id="manifiesto" className="py-20 md:py-[140px] px-6 md:px-12 max-w-[1300px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                {/* Left */}
                <div className="rv">
                    <span className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase block mb-6">
                        {'// 00 \u2014 Por que existimos'}
                    </span>
                    <h2 className="text-[clamp(2.8rem,5vw,4.5rem)] font-[900] tracking-[-0.05em] leading-[1.02] mb-8 text-balance">
                        {'Aqui no existe'}<br />
                        {'el '}
                        <s className="text-foreground/20" style={{ textDecorationColor: 'var(--hex-amber)' }}>{'drag\u00A0&\u00A0drop'}</s>
                        {'.'}<br />
                        {'Solo '}
                        <span className="text-primary">{'codigo real.'}</span>
                    </h2>
                    <p className="text-base leading-[1.9] text-foreground/[0.45] mb-9">
                        El 90% de las webs en Chile son clones de plantillas que se repiten hasta el infinito.
                        Nosotros trabajamos al reves: primero entendemos tu negocio, despues inventamos como mostrarlo.
                        Cada linea de codigo, cada decision de diseno, cada flujo de usuario se construye especificamente para ti.
                    </p>
                    <div className="flex flex-col gap-4">
                        {checks.map((c, i) => (
                            <div key={i} className="flex gap-4 items-start">
                                <div className="w-5 h-5 rounded-full bg-primary/[0.12] border border-primary/30 flex items-center justify-center shrink-0 mt-0.5">
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
                            className="stat-card bg-card border border-[var(--hex-border)] rounded-sm px-9 py-10 relative overflow-hidden transition-colors duration-300 hover:bg-secondary group"
                        >
                            <div className="absolute top-0 left-0 w-[3px] h-0 bg-primary transition-[height] duration-400 group-hover:h-full" />
                            <div className="text-[3.5rem] font-[900] tracking-[-0.05em] text-primary leading-none mb-2">{s.num}</div>
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
