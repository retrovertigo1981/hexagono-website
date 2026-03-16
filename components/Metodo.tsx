'use client'

const steps = [
    {
        num: '01',
        title: 'Entendemos tu negocio',
        desc: 'Conversamos contigo, entendemos quiénes son tus clientes y que los hace decidir. Eso determina que poner primero, qué destacar y qué camino debe recorrer el vistitante para convertirse en contacto.',
        tags: ['Entrevista Incial', 'Objetivos Claros', 'Arquitectura']
    },
    {
        num: '02',
        title: 'Diseñamos para tu cliente',
        desc: 'Creamos una web que se sienta tuya  \u2014 no una plantilla con tu logo encima. El diseño trabaja en silencio: le dice a tu cliente que eres profesional, que eres confiable, que merece la pena llamarte.',
        tags: ['Diseño Original', 'Mobile First', 'Identidad Visual', 'Branding']
    },

    {
        num: '03',
        title: 'Construimos y te lo entregamos',
        desc: 'Código limpio, rápido y tuyo al 100%. Sin plataformas de arriendo, sin Wix, sin Wordpress que se rompe solo. La web queda en tus manos para siempre \u2014 y no desaparecemos al entregar. Si algo falla en los primeros 30 dias, lo resolvemos sin discutir.',
        tags: ['Código Propio', 'Entrega Total', '30 dias de respaldo'],
    },
]

export function Metodo() {
    return (
        <section id="metodo" className="py-20 md:py-35 px-6 md:px-12 max-w-325 mx-auto">
            <div className="rv grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-end mb-20">
                <div>
                    <p className="font-mono text-[13px] tracking-[0.3em] text-accent uppercase mb-4">{'// 02 \u2014 Cómo trabajamos'}</p>
                    <h2 className="text-[clamp(2.8rem,5vw,4.2rem)] font-black tracking-[-0.05em] leading-none">
                        {'Tres Pasos.'}<br /><span className="text-primary">{'Cero sorpresas.'}</span>
                    </h2>
                </div>
                <p className="text-base leading-[1.9] text-foreground/40 lg:self-end">
                    Antes de tocar una sola línea de código, nos aseguramos de entender qué necesita tu cliente para contactarte. Eso es lo que guía cada decisión de diseño y tecnología.
                </p>
            </div>
            <div className="border-t border-(--hex-border)">
                {steps.map((step, i) => (
                    <div
                        key={i}
                        className="step-row grid grid-cols-[52px_1fr] lg:grid-cols-[80px_1fr_260px] gap-0 border-b border-(--hex-border) py-9 items-start relative overflow-hidden transition-[padding] duration-300 hover:pl-3 group"
                    >
                        <div className="absolute left-0 top-0 bottom-0 w-0 bg-primary/4 transition-[width] duration-400 group-hover:w-full" />
                        <span className="font-mono text-[10px] tracking-[0.2em] text-foreground/18 pt-1.5 relative z-1">
                            {step.num} {'——'}
                        </span>
                        <div className="relative z-1">
                            <h3 className="text-[clamp(1.7rem,3vw,2.6rem)] font-black tracking-[-0.04em] mb-3 transition-colors duration-300 group-hover:text-primary">
                                {step.title}
                            </h3>
                            <p className="text-sm leading-[1.8] text-foreground/38 max-w-115">{step.desc}</p>
                        </div>
                        <div className="hidden lg:flex flex-wrap gap-2 self-center justify-end relative z-1 mr-5">
                            {step.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="font-mono text-[9px] tracking-widest px-3 py-1.5 border border-(--hex-border) rounded-full text-foreground/30 uppercase transition-all duration-200 group-hover:border-primary/30 group-hover:text-primary"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

        </section>
    )
}