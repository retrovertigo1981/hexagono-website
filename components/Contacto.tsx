'use client'

import { useState } from 'react'

const info = [
    'hola@hexagono.cl',
    'Rancagua \u00B7 Santiago, Chile',
    'Respuesta en < 24 horas habiles',
]

export function Contacto() {
    const [formData, setFormData] = useState({ name: '', email: '', paquete: '', mensaje: '' })

    return (
        <section id="contacto" className="py-20 md:py-[140px] px-6 md:px-12 bg-[var(--hex-pearl)] text-[var(--hex-black)]">
            <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-[100px] items-start">
                {/* Left */}
                <div className="rv">
                    <span className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase block mb-5">{'// 05 \u2014 El Primer Paso'}</span>
                    <h2 className="text-[clamp(2.8rem,5.5vw,4.5rem)] font-[900] tracking-[-0.05em] leading-none text-[var(--hex-black)] mb-6">
                        Empezar<br />proyecto
                    </h2>
                    <p className="text-[15px] leading-[1.9] text-[rgba(10,10,10,0.5)] mb-10">
                        Sin formularios eternos, sin contratos innecesarios. Solo una conversacion honesta sobre si somos el equipo que necesitas &mdash; y que paquete se ajusta mejor.
                    </p>
                    <div className="flex flex-col gap-4">
                        {info.map((text, i) => (
                            <div key={i} className="flex items-center gap-3.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                <span className="font-mono text-[11px] tracking-[0.1em] text-[rgba(10,10,10,0.45)]">{text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right - Form */}
                <form className="rv flex flex-col gap-4.5" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="font-mono text-[9px] tracking-[0.25em] uppercase text-[rgba(10,10,10,0.4)] block mb-1.75">
                                Nombre / Empresa
                            </label>
                            <input
                                type="text"
                                placeholder="Maria Pérez - Tienda Machali"
                                value={formData.name}
                                onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                                className="w-full bg-[#ffffff] border border-[rgba(10,10,10,0.12)] rounded-sm px-[18px] py-[15px] font-sans text-sm text-[var(--hex-black)] outline-none transition-all duration-200 focus:border-primary focus:shadow-[0_0_0_3px_rgba(255,107,53,0.1)]"
                            />
                        </div>
                        <div>
                            <label className="font-mono text-[9px] tracking-[0.25em] uppercase text-[rgba(10,10,10,0.4)] block mb-[7px]">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="hola@tuempresa.cl"
                                value={formData.email}
                                onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                                className="w-full bg-[#ffffff] border border-[rgba(10,10,10,0.12)] rounded-sm px-[18px] py-[15px] font-sans text-sm text-[var(--hex-black)] outline-none transition-all duration-200 focus:border-primary focus:shadow-[0_0_0_3px_rgba(255,107,53,0.1)]"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="font-mono text-[9px] tracking-[0.25em] uppercase text-[rgba(10,10,10,0.4)] block mb-[7px]">
                            Paquete de interes
                        </label>
                        <select
                            value={formData.paquete}
                            onChange={e => setFormData(p => ({ ...p, paquete: e.target.value }))}
                            className="w-full bg-[#ffffff] border border-[rgba(10,10,10,0.12)] rounded-sm px-[18px] py-[15px] font-sans text-sm text-[var(--hex-black)] outline-none transition-all duration-200 focus:border-primary focus:shadow-[0_0_0_3px_rgba(255,107,53,0.1)] appearance-none"
                        >
                            <option value="" disabled>Selecciona un paquete</option>
                            <option>{'Paquete Esencia \u2014 $220.000 a $280.000'}</option>
                            <option>{'Paquete Estudio \u2014 $550.000 a $750.000'}</option>
                            <option>{'Paquete E-commerce \u2014 $950.000 a $1.600.000'}</option>
                            <option>{'Plan Continuidad (mantenimiento) \u2014 $45000/mes'}</option>
                            <option>{'Aun no lo se / quiero asesoria'}</option>
                        </select>
                    </div>
                    <div>
                        <label className="font-mono text-[9px] tracking-[0.25em] uppercase text-[rgba(10,10,10,0.4)] block mb-[7px]">
                            {'En que andas?'}
                        </label>
                        <textarea
                            placeholder="Cuentanos el contexto, urgencia y cualquier detalle que ayude. Sin filtros."
                            value={formData.mensaje}
                            onChange={e => setFormData(p => ({ ...p, mensaje: e.target.value }))}
                            className="w-full bg-[#ffffff] border border-[rgba(10,10,10,0.12)] rounded-sm px-[18px] py-[15px] font-sans text-sm text-[var(--hex-black)] outline-none transition-all duration-200 focus:border-primary focus:shadow-[0_0_0_3px_rgba(255,107,53,0.1)] resize-y min-h-[120px]"
                        />
                    </div>
                    <button
                        type="submit"
                        className="self-start px-9 py-[17px] bg-[var(--hex-black)] text-[var(--hex-white)] font-mono text-[11px] font-bold tracking-[0.12em] uppercase border-none rounded-sm transition-all duration-200 hover:bg-primary hover:-translate-y-0.5"
                    >
                        {'Empezar proyecto \u2192'}
                    </button>
                </form>
            </div>
        </section>
    )
}
