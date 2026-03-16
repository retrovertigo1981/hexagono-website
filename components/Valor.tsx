'use client'

const values = [
    {
        num: '01',
        tag: 'Tu Web, tu código',
        title: 'Pagas una vez. Es tuya para siempre.',
        desc: 'Nada de plataformas que te cobran mensualmente para seguir existiendo. El código queda en tus manos — puedes moverlo, modificarlo o cambiarte de proveedor cuando quieras.',
        quote: '"No es un arriendo. Es una inversión que se queda contigo."',
    },
    {
        num: '02',
        tag: 'Diseño con propósito',
        title: 'Tu cliente decide quedarse en los primeros 5 segundos.',
        desc: 'Diseñamos para que la primera impresión genere confianza — no para que el sitio gane un premio de diseño que nadie ve. Cada decisión visual tiene una razón de negocio detrás.',
        quote: '"Bonito que no vende no sirve de nada."',
    },
    {
        num: '03',
        tag: 'Sin sorpresas',
        title: 'Sabes exactamente qué recibes antes de pagar.',
        desc: 'Precio fijo, alcance claro, plazo definido. Antes de empezar tienes en papel qué incluye el proyecto, cuánto demora y cuánto cuesta. Sin letra chica, sin costos ocultos al final.',
        quote: '"Transparencia total desde el primer mensaje."',
    },
]

const nosomos = [
    'Necesitas algo listo mañana. Trabajar bien toma el tiempo que toma — no cortamos esquinas.',
    'Buscas el precio más bajo posible. No competimos en precio, competimos en lo que entregas a tu cliente.',
    'Quieres pagar $49.990 por una web. Eso existe — pero no es lo que hacemos ni lo que te vamos a ofrecer.',
]

export function Valor() {
    return (
        <section id="valor" className="py-20 md:py-35 px-6 md:px-12 bg-card border-t border-b border-(--hex-border)">
            <div className="max-w-325 mx-auto">
                {/* Header */}
                <div className="rv flex justify-between items-end mb-18 flex-wrap gap-8">
                    <div>
                        <p className="font-mono text-[13px] tracking-[0.3em] text-accent uppercase mb-4">{'// 04 \u2014 Lo que nos diferencia'}</p>
                        <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-black tracking-[-0.05em] leading-none">
                            {'Lo que obtienes'}<br />{'trabajando con nosotros'}
                        </h2>
                    </div>
                    <p className="text-sm leading-[1.8] text-foreground/35 max-w-[320px] md:text-right">
                        Tres compromisos concretos. No promesas de agencia &mdash; resultados medibles desde el primer mes.
                    </p>
                </div>

                {/* Value grid */}
                <div className="rv grid grid-cols-1 lg:grid-cols-3 gap-px bg-[var(--hex-border)] border border-[var(--hex-border)] rounded-sm overflow-hidden mb-0.5">
                    {values.map(v => (
                        <div
                            key={v.num}
                            className="value-card bg-background p-10 md:p-[52px_44px] relative overflow-hidden transition-colors duration-300 hover:bg-[#0d0d0d]"
                            data-n={v.num}
                        >
                            <div className="absolute -bottom-5 right-5 text-[110px] font-black text-foreground/3 tracking-[-0.05em] leading-none pointer-events-none">
                                {v.num}
                            </div>
                            <span className="font-mono text-[9px] tracking-[0.25em] text-primary uppercase block mb-4">{v.tag}</span>
                            <h3 className="text-[1.7rem] font-[900] tracking-[-0.04em] mb-4">{v.title}</h3>
                            <p className="text-sm leading-[1.8] text-foreground/[0.38]">{v.desc}</p>
                            <p className="text-[12.5px] italic text-primary mt-4 pt-4 border-t border-primary/20">{v.quote}</p>
                        </div>
                    ))}
                </div>

                {/* No somos */}
                <div className="rv bg-primary/[0.04] border border-primary/[0.12] rounded-sm p-10 md:p-14 mt-12">
                    <div className="flex justify-between items-center mb-10 flex-wrap gap-4">
                        <h3 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-[900] tracking-[-0.04em]">
                            {'No somos para ti '}
                            <span className="text-primary">{'si...'}</span>
                        </h3>
                        <span className="font-mono text-[9px] tracking-[0.2em] text-foreground/20 uppercase border border-[var(--hex-border)] px-3 py-1.5 rounded-full">
                            Filtro de clientes
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8">
                        {nosomos.map((text, i) => (
                            <div key={i}>
                                <span className="font-mono text-base text-primary block mb-2.5">{'\u2717'}</span>
                                <p className="text-sm leading-[1.7] text-foreground/[0.45]">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
