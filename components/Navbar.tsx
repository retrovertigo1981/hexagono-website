'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin);

const itemsMenu = [
    { label: 'Manifiesto', num: '01', href: '#manifiesto' },
    { label: 'Proyectos', num: '02', href: '#work' },
    { label: 'Paquetes', num: '03', href: '#paquetes' },
    { label: 'Nosotros', num: '04', href: '#valor' },
    { label: 'Empezar Proyecto', num: '05', href: '#contacto' },
]

/* ── SVG illustrations (one per menu item) ── */

function MenuSvg1() {
    return (
        <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
            <path d="M55 8L98 32V78L55 102L12 78V32L55 8Z" stroke="#FF6B35" strokeWidth=".8" opacity=".7" />
            <path d="M55 26L80 40V68L55 82L30 68V40L55 26Z" stroke="#00F0FF" strokeWidth=".8" opacity=".4" />
            <text x="55" y="60" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="#FF6B35" opacity=".8" letterSpacing="2">HEX</text>
        </svg>
    )
}
function MenuSvg2() {
    return (
        <svg width="110" height="80" viewBox="0 0 110 80" fill="none">
            <rect x="8" y="8" width="94" height="64" stroke="#FF6B35" strokeWidth=".6" />
            <rect x="18" y="18" width="32" height="38" stroke="#FF6B35" strokeWidth=".5" opacity=".4" />
            <rect x="60" y="18" width="32" height="17" stroke="#FF6B35" strokeWidth=".5" opacity=".4" />
            <rect x="60" y="42" width="32" height="14" stroke="#FF6B35" strokeWidth=".5" opacity=".4" />
        </svg>
    )
}
function MenuSvg3() {
    return (
        <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
            <rect x="10" y="10" width="38" height="38" rx="3" stroke="#FF6B35" strokeWidth=".6" opacity=".5" />
            <rect x="62" y="10" width="38" height="38" rx="3" stroke="#FF6B35" strokeWidth=".6" opacity=".5" />
            <rect x="10" y="62" width="38" height="38" rx="3" stroke="#FF6B35" strokeWidth=".6" opacity=".5" />
            <rect x="62" y="62" width="38" height="38" rx="3" stroke="#FF6B35" strokeWidth=".6" opacity=".3" />
            <line x1="48" y1="29" x2="62" y2="29" stroke="#FF6B35" strokeWidth=".5" opacity=".4" />
            <line x1="29" y1="48" x2="29" y2="62" stroke="#FF6B35" strokeWidth=".5" opacity=".4" />
            <line x1="81" y1="48" x2="81" y2="62" stroke="#FF6B35" strokeWidth=".5" opacity=".4" />
            <line x1="48" y1="81" x2="62" y2="81" stroke="#FF6B35" strokeWidth=".5" opacity=".4" />
        </svg>
    )
}
function MenuSvg4() {
    return (
        <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
            <polygon points="55,8 100,32 100,78 55,102 10,78 10,32" stroke="#FF6B35" strokeWidth=".7" fill="rgba(255,107,53,.04)" />
        </svg>
    )
}
function MenuSvg5() {
    return (
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <path d="M8 28h40M32 14l14 14-14 14" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
        </svg>
    )
}

const menuSvgs = [MenuSvg1, MenuSvg2, MenuSvg3, MenuSvg4, MenuSvg5]
const menuBgs = [
    'linear-gradient(135deg,#0A0A0A,#1a1a1a)',
    'linear-gradient(135deg,#111,#0A0A0A)',
    'linear-gradient(135deg,#0a0800,#0A0A0A)',
    'linear-gradient(135deg,#0A0A0A,#111)',
    'linear-gradient(135deg,#FF6B35,#cc4a1a)',
]

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeImg, setActiveImg] = useState(0);
    const [mounted, setMounted] = useState(false);
    const linksRef = useRef<HTMLAnchorElement[]>([]);
    const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
    const prevImgRef = useRef(0);

    // Montar el portal solo en el cliente para evitar hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 80)
        window.addEventListener('scroll', handler, { passive: true });
        return () => window.removeEventListener('scroll', handler);
    }, []);

    const toggleMenu = useCallback(() => {
        setMenuOpen(prev => !prev)
    }, [])

    const closeMenu = useCallback(() => {
        setMenuOpen(false)
    }, [])

    useEffect(() => {
        if (menuOpen) {
            setActiveImg(0)
            prevImgRef.current = 0
            gsap.fromTo(
                linksRef.current,
                { y: '110%', opacity: 0 },
                { y: '0%', opacity: 1, stagger: 0.07, duration: 0.7, ease: 'power3.out', delay: 0.1 }
            )
        } else {
            prevImgRef.current = -1;
        }
    }, [menuOpen])

    useEffect(() => {
        if (!menuOpen) return;
        const prev = prevImgRef.current;
        if (prev === activeImg) return;

        const prevEl = imgRefs.current[prev];
        const nextEl = imgRefs.current[activeImg];

        if (prevEl) {
            gsap.to(prevEl, { opacity: 0, scale: 0.92, duration: 0.4, ease: 'power2.inOut' });
        }
        if (nextEl) {
            gsap.to(nextEl, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.inOut' });
        }

        prevImgRef.current = activeImg;
    }, [activeImg, menuOpen]);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault()
        closeMenu()
        const target = document.querySelector(href)
        if (target) {
            gsap.to(window, { scrollTo: { y: target, offsetY: 0 }, duration: 1.2, ease: 'power3.inOut' })
        }
    }

    const overlay = (
        <div
            className={`fixed inset-0 bg-background flex transition-opacity z-500 duration-500 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}

        >
            {/* Lado Izquierdo - menu links */}
            <div className="flex-1 flex flex-col justify-center px-8 py-20 lg:px-18">
                <p className="font-mono text-[10px] tracking-[0.25em] text-foreground/20 mb-10">{'( MENU )'}</p>
                <ul className="list-none space-y-1.5">
                    {itemsMenu.map((item, i) => (
                        <li key={item.href} className="overflow-hidden">
                            <a
                                ref={el => { if (el) linksRef.current[i] = el }}
                                href={item.href}
                                onClick={(e) => handleNavClick(e, item.href)}
                                onMouseEnter={() => setActiveImg(i)}
                                className="inline-flex items-center gap-4 text-[clamp(2.2rem,4.5vw,4rem)] font-extrabold tracking-[-0.04em] text-foreground/30 no-underline leading-[1.1] transition-colors duration-300 hover:text-foreground group"
                            >
                                <span className="text-transparent transition-colors duration-300 group-hover:text-primary inline-block w-18 shrink-0">{item.num}.</span>
                                <div className='ml-6'>{item.label}</div>
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="mt-14 flex gap-6">
                    {['Instagram', 'LinkedIn', 'GitHub'].map(s => (
                        <a key={s} href="#" className="font-mono text-[10px] tracking-[0.2em] text-foreground/25 no-underline uppercase transition-colors duration-200 hover:text-primary">
                            {s}
                        </a>
                    ))}
                </div>
            </div>

            {/* Right side - SVG illustrations que hacen crossfade en hover */}
            <div className="w-1/3 relative overflow-hidden border-l border-(--hex-border) hidden lg:block">
                {menuSvgs.map((SvgComp, i) => (
                    <div
                        key={i}
                        ref={el => { imgRefs.current[i] = el }}
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                            background: menuBgs[i],
                            opacity: i === 0 ? 1 : 0,
                            scale: i === 0 ? '1' : '0.92',
                        }}
                    >
                        <SvgComp />
                    </div>
                ))}
            </div>
        </div>
    )

    return (
        <>
            {/* NAV */}
            <nav
                className={`fixed top-0 left-0 right-0 flex justify-between items-center px-6 py-7 md:px-12 transition-all duration-300 ${scrolled ? 'bg-[rgba(10,10,10,0.9)] backdrop-blur-[20px] border-b border-(--hex-border)' : ''}`}
                style={{ zIndex: 10000 }}
            >
                <a href="/" className='font-mono text-[15px] font-bold tracking-[0.15rem] text-foreground no-underline'>
                    {'HEXAGONO'}
                    <span className='text-primary' style={{ fontSize: 'normal' }}>.</span>
                </a>
                <div className='flex items-center gap-8'>
                    <span className='font-mono text-[10px] tracking-[0.25em] text-foreground/30 uppercase hidden md:inline'>
                        Santiago &middot; Rancagua &middot; Rengo
                    </span>
                    <button onClick={toggleMenu} className="font-mono text-[11px] font-bold tracking-[0.25em] uppercase text-foreground bg-transparent border-none flex items-center gap-3 cursor-pointer">
                        <div className='flex flex-col gap-1.25 cursor-pointer'>
                            <span
                                className="block w-5.5 h-px bg-foreground transition-transform duration-300 origin-center"
                                style={menuOpen ? { transform: 'rotate(45deg) translate(4px,4px)' } : {}}
                            />
                            <span
                                className="block w-5.5 h-px bg-foreground transition-opacity duration-300"
                                style={menuOpen ? { opacity: 0 } : {}}
                            />
                            <span
                                className="block w-5.5 h-px bg-foreground transition-transform duration-300 origin-center"
                                style={menuOpen ? { transform: 'rotate(-45deg) translate(4px,-4px)' } : {}}
                            />
                        </div>
                        {'MENU'}
                    </button>
                </div>
            </nav>

            {/* OVERLAY via Portal — se monta en document.body escapando cualquier stacking context */}
            {mounted && createPortal(overlay, document.body)}
        </>
    )
}

// 'use client'

// import { useEffect, useState, useRef, useCallback } from 'react'
// import gsap from 'gsap'
// import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

// gsap.registerPlugin(ScrollToPlugin);

// const itemsMenu = [
//     { label: 'Manifiesto', num: '01', href: '#manifiesto' },
//     { label: 'Proyectos', num: '02', href: '#work' },
//     { label: 'Paquetes', num: '03', href: '#paquetes' },
//     { label: 'Nosotros', num: '04', href: '#valor' },
//     { label: 'Empezar Proyecto', num: '05', href: '#contacto' },
// ]

// function MenuSvg1() {
//     return (
//         <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
//             <path d="M55 8L98 32V78L55 102L12 78V32L55 8Z" stroke="#FF6B35" strokeWidth=".8" opacity=".7" />
//             <path d="M55 26L80 40V68L55 82L30 68V40L55 26Z" stroke="#00F0FF" strokeWidth=".8" opacity=".4" />
//             <text x="55" y="60" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="#FF6B35" opacity=".8" letterSpacing="2">HEX</text>
//         </svg>
//     )
// }
// function MenuSvg2() {
//     return (
//         <svg width="110" height="80" viewBox="0 0 110 80" fill="none">
//             <rect x="8" y="8" width="94" height="64" stroke="#FF6B35" strokeWidth=".6" />
//             <rect x="18" y="18" width="32" height="38" stroke="#FF6B35" strokeWidth=".5" opacity=".4" />
//             <rect x="60" y="18" width="32" height="17" stroke="#FF6B35" strokeWidth=".5" opacity=".4" />
//             <rect x="60" y="42" width="32" height="14" stroke="#FF6B35" strokeWidth=".5" opacity=".4" />
//         </svg>
//     )
// }
// function MenuSvg3() {
//     return (
//         <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
//             <rect x="10" y="10" width="38" height="38" rx="3" stroke="#FF6B35" strokeWidth=".6" opacity=".5" />
//             <rect x="62" y="10" width="38" height="38" rx="3" stroke="#FF6B35" strokeWidth=".6" opacity=".5" />
//             <rect x="10" y="62" width="38" height="38" rx="3" stroke="#FF6B35" strokeWidth=".6" opacity=".5" />
//             <rect x="62" y="62" width="38" height="38" rx="3" stroke="#FF6B35" strokeWidth=".6" opacity=".3" />
//             <line x1="48" y1="29" x2="62" y2="29" stroke="#FF6B35" strokeWidth=".5" opacity=".4" />
//             <line x1="29" y1="48" x2="29" y2="62" stroke="#FF6B35" strokeWidth=".5" opacity=".4" />
//             <line x1="81" y1="48" x2="81" y2="62" stroke="#FF6B35" strokeWidth=".5" opacity=".4" />
//             <line x1="48" y1="81" x2="62" y2="81" stroke="#FF6B35" strokeWidth=".5" opacity=".4" />
//         </svg>
//     )
// }
// function MenuSvg4() {
//     return (
//         <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
//             <polygon points="55,8 100,32 100,78 55,102 10,78 10,32" stroke="#FF6B35" strokeWidth=".7" fill="rgba(255,107,53,.04)" />
//         </svg>
//     )
// }
// function MenuSvg5() {
//     return (
//         <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
//             <path d="M8 28h40M32 14l14 14-14 14" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
//         </svg>
//     )
// }

// const menuSvgs = [MenuSvg1, MenuSvg2, MenuSvg3, MenuSvg4, MenuSvg5]
// const menuBgs = [
//     'linear-gradient(135deg,#0A0A0A,#1a1a1a)',
//     'linear-gradient(135deg,#111,#0A0A0A)',
//     'linear-gradient(135deg,#0a0800,#0A0A0A)',
//     'linear-gradient(135deg,#0A0A0A,#111)',
//     'linear-gradient(135deg,#FF6B35,#cc4a1a)',
// ]

// export function Navbar() {
//     const [scrolled, setScrolled] = useState(false);
//     const [menuOpen, setMenuOpen] = useState(false);
//     const [activeImg, setActiveImg] = useState(0);
//     const linksRef = useRef<HTMLAnchorElement[]>([]);
//     const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
//     const prevImgRef = useRef(0);

//     useEffect(() => {
//         const handler = () => setScrolled(window.scrollY > 80)
//         window.addEventListener('scroll', handler, { passive: true });
//         return () => window.removeEventListener('scroll', handler);
//     }, []);

//     const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), [])
//     const closeMenu = useCallback(() => setMenuOpen(false), [])

//     useEffect(() => {
//         if (menuOpen) {
//             setActiveImg(0)
//             prevImgRef.current = 0
//             gsap.fromTo(
//                 linksRef.current,
//                 { y: '110%', opacity: 0 },
//                 { y: '0%', opacity: 1, stagger: 0.07, duration: 0.7, ease: 'power3.out', delay: 0.1 }
//             )
//         } else {
//             prevImgRef.current = -1;
//         }
//     }, [menuOpen])

//     useEffect(() => {
//         if (!menuOpen) return;
//         const prev = prevImgRef.current;
//         if (prev === activeImg) return;

//         const prevEl = imgRefs.current[prev];
//         const nextEl = imgRefs.current[activeImg];

//         if (prevEl) gsap.to(prevEl, { opacity: 0, scale: 0.92, duration: 0.4, ease: 'power2.inOut' });
//         if (nextEl) gsap.to(nextEl, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.inOut' });

//         prevImgRef.current = activeImg;
//     }, [activeImg, menuOpen]);

//     const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
//         e.preventDefault()
//         closeMenu()
//         const target = document.querySelector(href)
//         if (target) {
//             gsap.to(window, { scrollTo: { y: target, offsetY: 0 }, duration: 1.2, ease: 'power3.inOut' })
//         }
//     }

//     return (
//         <>
//             {/* OVERLAY — fixed, sin portal, renderizado antes que la nav
//                 para que la nav quede naturalmente encima en el DOM */}
//             <div
//                 className={`fixed inset-0 bg-background flex transition-opacity duration-500 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
//                 style={{ zIndex: 9998 }}
//             >
//                 <div className="flex-1 flex flex-col justify-center px-8 py-20 lg:px-18">
//                     <p className="font-mono text-[10px] tracking-[0.25em] text-foreground/20 mb-10">{'( MENU )'}</p>
//                     <ul className="list-none space-y-1.5">
//                         {itemsMenu.map((item, i) => (
//                             <li key={item.href} className="overflow-hidden">
//                                 <a
//                                     ref={el => { if (el) linksRef.current[i] = el }}
//                                     href={item.href}
//                                     onClick={(e) => handleNavClick(e, item.href)}
//                                     onMouseEnter={() => setActiveImg(i)}
//                                     className="inline-flex items-center gap-4 text-[clamp(2.2rem,4.5vw,4rem)] font-extrabold tracking-[-0.04em] text-foreground/30 no-underline leading-[1.1] transition-colors duration-300 hover:text-foreground group"
//                                 >
//                                     <span className="text-transparent transition-colors duration-300 group-hover:text-primary inline-block w-18 shrink-0">{item.num}.</span>
//                                     <div className='ml-6'>{item.label}</div>
//                                 </a>
//                             </li>
//                         ))}
//                     </ul>
//                     <div className="mt-14 flex gap-6">
//                         {['Instagram', 'LinkedIn', 'GitHub'].map(s => (
//                             <a key={s} href="#" className="font-mono text-[10px] tracking-[0.2em] text-foreground/25 no-underline uppercase transition-colors duration-200 hover:text-primary">
//                                 {s}
//                             </a>
//                         ))}
//                     </div>
//                 </div>

//                 <div className="w-1/3 relative overflow-hidden border-l border-(--hex-border) hidden lg:block">
//                     {menuSvgs.map((SvgComp, i) => (
//                         <div
//                             key={i}
//                             ref={el => { imgRefs.current[i] = el }}
//                             className="absolute inset-0 flex items-center justify-center"
//                             style={{
//                                 background: menuBgs[i],
//                                 opacity: i === 0 ? 1 : 0,
//                                 scale: i === 0 ? '1' : '0.92',
//                             }}
//                         >
//                             <SvgComp />
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* NAV — después en el DOM = encima naturalmente, + z-index por si acaso */}
//             <nav
//                 className={`fixed top-0 left-0 right-0 flex justify-between items-center px-6 py-7 md:px-12 transition-all duration-300 ${scrolled ? 'bg-[rgba(10,10,10,0.9)] backdrop-blur-[20px] border-b border-(--hex-border)' : ''}`}
//                 style={{ zIndex: 9999 }}
//             >
//                 <a href="/" className='font-mono text-[15px] font-bold tracking-[0.15rem] text-foreground no-underline'>
//                     {'HEXAGONO'}
//                     <span className='text-primary'>.</span>
//                 </a>
//                 <div className='flex items-center gap-8'>
//                     <span className='font-mono text-[10px] tracking-[0.25em] text-foreground/30 uppercase hidden md:inline'>
//                         Santiago &middot; Rancagua &middot; Rengo
//                     </span>
//                     <button
//                         onClick={toggleMenu}
//                         className="font-mono text-[11px] font-bold tracking-[0.25em] uppercase text-foreground bg-transparent border-none flex items-center gap-3 cursor-pointer"
//                     >
//                         <div className='flex flex-col gap-1.25'>
//                             <span
//                                 className="block w-5.5 h-px bg-foreground transition-transform duration-300 origin-center"
//                                 style={menuOpen ? { transform: 'rotate(45deg) translate(4px,4px)' } : {}}
//                             />
//                             <span
//                                 className="block w-5.5 h-px bg-foreground transition-opacity duration-300"
//                                 style={menuOpen ? { opacity: 0 } : {}}
//                             />
//                             <span
//                                 className="block w-5.5 h-px bg-foreground transition-transform duration-300 origin-center"
//                                 style={menuOpen ? { transform: 'rotate(-45deg) translate(4px,-4px)' } : {}}
//                             />
//                         </div>
//                         {'MENU'}
//                     </button>
//                 </div>
//             </nav>
//         </>
//     )
// }