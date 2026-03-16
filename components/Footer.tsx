export function Footer() {

    const fecha = new Date()
    const currentYear = fecha.getFullYear()

    return (
        <footer className="bg-background border-t border-(--hex-border) px-6 py-10 md:px-12">
            <div className="max-w-325 mx-auto flex justify-between items-center flex-wrap gap-5">
                <div className="font-mono text-[13px] font-bold tracking-[0.2em] text-foreground">
                    {'HEXAGONO 8'}<span className="text-primary" style={{ fontStyle: 'normal' }}>.</span>
                </div>
                <p className="font-mono text-[10px] tracking-[0.12em] text-foreground/30">
                    {`©${currentYear} HEXAGONO 8 STUDIO || Rengo \u2014 Rancagua \u00B7 Santiago, CL`}
                </p>
                <div className="flex gap-5 flex-wrap">
                    {['Instagram', 'LinkedIn', 'GitHub'].map(s => (
                        <a key={s} href="#" className="font-mono text-[10px] tracking-[0.2em] text-foreground/30 no-underline uppercase transition-colors duration-200 hover:text-primary">
                            {s}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    )
}
