// ─────────────────────────────────────────────────────────────────────────────
// HEXAGONO STUDIO — Fuente de datos de proyectos
// Agrega, edita o elimina proyectos desde este archivo.
// El slug debe ser único — se usa como ruta: /work/[slug]
// ─────────────────────────────────────────────────────────────────────────────

export type ProjectStatus = 'En producción' | 'En desarrollo' | 'Entregado'

export interface TechTag {
  name: string
  /** Color del dot indicador. Usa un hex o color CSS. */
  color: string
}

export interface ProjectImage {
  /** Ruta relativa desde /public, ej: '/images/projects/medicos-hero.jpg' */
  src: string
  alt: string
  /** Etiqueta que aparece al hover en la galería, ej: 'Hero section' */
  label: string
}

export interface Project {
  /** Identificador único — define la URL: /work/[slug] */
  slug: string

  // ── Card en WorkSection ─────────────────────────────
  /** Ej: 'E-commerce · Retail' */
  type: string
  /** Nombre corto visible en la card del carril */
  name: string
  /** Imagen de portada para la card del carril */
  image: string

  // ── Hero de la página de detalle ───────────────────
  /** Título completo del proyecto, puede ser diferente a name */
  title: string
  /** Parte del título que se renderiza en color amber */
  titleAccent: string
  /** Categorías del hero, ej: 'Corporativo · Salud · Landing' */
  category: string

  // ── Metadatos del sidebar ───────────────────────────
  client: string
  city: string
  /** Ej: 'Santiago, RM' | 'Rancagua, VI' | 'Providencia, RM' */
  location: string
  /** Ej: 'Landing page' | 'E-commerce' | 'Web corporativa' */
  projectType: string
  /** Ej: '3 semanas' | '5 días hábiles' */
  deliveryTime: string
  /** Ej: 'Esencia' | 'Estudio' | 'E-commerce' */
  package: string
  year: string
  status: ProjectStatus

  // ── Contenido editorial ─────────────────────────────
  /** Párrafos de descripción. Cada string = un <p> */
  description: string[]
  /** Bloque callout del problema del cliente */
  challenge: string
  /** Párrafos de la solución */
  solution: string[]
  /** Bloque callout del resultado */
  result: string

  // ── Imágenes ────────────────────────────────────────
  /** Imagen principal del mockup de browser */
  mainImage: ProjectImage
  /** Thumbnails del panel lateral (idealmente 3) */
  thumbnails: ProjectImage[]
  /** Galería inferior (idealmente 3) */
  gallery: ProjectImage[]

  // ── Stack ───────────────────────────────────────────
  tech: TechTag[]

  // ── Links ───────────────────────────────────────────
  /** URL del sitio en producción. null si no es público aún. */
  liveUrl: string | null
  /** URL del repo. null si es privado o no aplica. */
  repoUrl: string | null

  // ── Navegación prev/next ────────────────────────────
  /** slug del proyecto anterior (null si es el primero) */
  prevSlug: string | null
  /** slug del proyecto siguiente (null si es el último) */
  nextSlug: string | null
}

// ─────────────────────────────────────────────────────────────────────────────
// PROYECTOS
// ─────────────────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    slug: 'medicos-al-rescate',
    type: 'Corporativo · Salud',
    name: 'Médicos al Rescate',
    image: '/images/project-branding.jpg',

    title: 'Médicos al',
    titleAccent: 'Rescate',
    category: 'Corporativo · Salud · Landing',

    client: 'Médicos al Rescate SpA',
    city: 'Santiago',
    location: 'Santiago, RM',
    projectType: 'Landing page',
    deliveryTime: '3 semanas',
    package: 'Estudio',
    year: '2025',
    status: 'En producción',

    description: [
      'Médicos al Rescate es un servicio de atención médica a domicilio en Santiago. Llegaron con una web desactualizada que no reflejaba la seriedad del servicio ni generaba confianza suficiente para que un paciente agendara en línea.',
      'El desafío principal: en el sector salud, la confianza lo es todo. Un visitante que no entiende en segundos que está frente a profesionales reales, se va. La web anterior no lograba eso.',
    ],
    challenge:
      'Tráfico suficiente, conversión insuficiente. La gente llegaba a la web pero no agendaba — porque el diseño no transmitía credibilidad médica ni hacía obvio el siguiente paso.',
    solution: [
      'Construimos una landing page orientada a conversión: hero con propuesta de valor inmediata, sección de servicios con jerarquía clara, y un proceso de agendamiento que elimina la fricción.',
      'Usamos los colores de marca reales del cliente — naranja #ED7D31 y verde #316A36 — integrados en un sistema visual que comunica salud, urgencia y profesionalismo al mismo tiempo.',
      'Animaciones con GSAP y ScrollTrigger para que la información aparezca de forma progresiva, sin abrumar. El formulario de agendamiento queda visible en todo momento desde un CTA fijo.',
    ],
    result:
      'Web entregada en 3 semanas. Código 100% propiedad del cliente, hospedada en Vercel. Sin dependencias de plataformas de arriendo.',

    mainImage: {
      src: '/images/projects/medicos-main.jpg',
      alt: 'Médicos al Rescate — vista principal',
      label: 'Hero',
    },
    thumbnails: [
      { src: '/images/projects/medicos-thumb1.jpg', alt: 'Sección servicios', label: 'Servicios' },
      { src: '/images/projects/medicos-thumb2.jpg', alt: 'Formulario de contacto', label: 'Contacto' },
      { src: '/images/projects/medicos-thumb3.jpg', alt: 'Vista mobile', label: 'Mobile' },
    ],
    gallery: [
      { src: '/images/projects/medicos-gallery1.jpg', alt: 'Hero section', label: 'Hero section' },
      { src: '/images/projects/medicos-gallery2.jpg', alt: 'Sección servicios', label: 'Servicios' },
      { src: '/images/projects/medicos-gallery3.jpg', alt: 'Formulario', label: 'Formulario' },
    ],

    tech: [
      { name: 'Astro',         color: '#FF6B35' },
      { name: 'Tailwind',      color: '#38bdf8' },
      { name: 'GSAP',          color: '#88ce02' },
      { name: 'ScrollTrigger', color: '#88ce02' },
      { name: 'JavaScript',    color: '#f7df1e' },
      { name: 'Vercel',        color: '#ffffff' },
    ],

    liveUrl: 'https://medicosalrescate.cl',
    repoUrl: null,

    prevSlug: null,
    nextSlug: 'muebles-el-romero',
  },

  {
    slug: 'muebles-el-romero',
    type: 'E-commerce · Retail',
    name: 'Muebles El Romero',
    image: '/images/project-corporate.jpg',

    title: 'Muebles El',
    titleAccent: 'Romero',
    category: 'E-commerce · Retail · Región',

    client: 'Muebles El Romero',
    city: 'Rancagua',
    location: 'Rancagua, VI',
    projectType: 'E-commerce',
    deliveryTime: '6 semanas',
    package: 'E-commerce',
    year: '2025',
    status: 'En producción',

    description: [
      'Muebles El Romero es una mueblería familiar en Rancagua con más de 15 años de historia. Tenían ventas presenciales sólidas pero cero presencia digital — perdían clientes de la región que buscaban muebles online.',
      'El objetivo era claro: una tienda online que funcionara como su mejor vendedor, disponible las 24 horas, con catálogo completo y pago integrado.',
    ],
    challenge:
      'Hostinger como hosting con restricciones de CSP que bloqueaban Google Fonts. Catálogo grande con múltiples variantes de producto que necesitaban filtrarse rápido en mobile.',
    solution: [
      'Tienda completa con carrito, Webpay y MercadoPago integrados. Carousel de productos con shadcn/ui, autoplay optimizado y scroll behavior corregido para mobile.',
      'Fuentes self-hosted para resolver el bloqueo de CSP de Hostinger. SEO técnico desde el día 1 — estructura de URLs limpias y metadatos por producto.',
    ],
    result:
      'Tienda operativa con más de 80 productos cargados. Primera venta online en la primera semana de lanzamiento.',

    mainImage: {
      src: '/images/projects/romero-main.jpg',
      alt: 'Muebles El Romero — tienda online',
      label: 'Tienda',
    },
    thumbnails: [
      { src: '/images/projects/romero-thumb1.jpg', alt: 'Catálogo de productos', label: 'Catálogo' },
      { src: '/images/projects/romero-thumb2.jpg', alt: 'Detalle de producto', label: 'Producto' },
      { src: '/images/projects/romero-thumb3.jpg', alt: 'Carrito de compras', label: 'Carrito' },
    ],
    gallery: [
      { src: '/images/projects/romero-gallery1.jpg', alt: 'Página de inicio', label: 'Inicio' },
      { src: '/images/projects/romero-gallery2.jpg', alt: 'Catálogo', label: 'Catálogo' },
      { src: '/images/projects/romero-gallery3.jpg', alt: 'Mobile view', label: 'Mobile' },
    ],

    tech: [
      { name: 'Next.js',    color: '#ffffff' },
      { name: 'TypeScript', color: '#3178c6' },
      { name: 'Tailwind',   color: '#38bdf8' },
      { name: 'shadcn/ui',  color: '#ffffff' },
      { name: 'Webpay',     color: '#e31837' },
      { name: 'Hostinger',  color: '#FF6B35' },
    ],

    liveUrl: 'https://mueblesromero.cl',
    repoUrl: null,

    prevSlug: 'medicos-al-rescate',
    nextSlug: null,
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Retorna un proyecto por slug. Undefined si no existe. */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}

/** Retorna todos los slugs — útil para generateStaticParams en Next.js */
export function getAllProjectSlugs(): string[] {
  return projects.map(p => p.slug)
}

/** Retorna el nombre del proyecto prev/next para la navegación */
export function getAdjacentProjects(slug: string): {
  prev: Pick<Project, 'slug' | 'name'> | null
  next: Pick<Project, 'slug' | 'name'> | null
} {
  const current = getProjectBySlug(slug)
  if (!current) return { prev: null, next: null }

  const prev = current.prevSlug ? getProjectBySlug(current.prevSlug) ?? null : null
  const next = current.nextSlug ? getProjectBySlug(current.nextSlug) ?? null : null

  return {
    prev: prev ? { slug: prev.slug, name: prev.name } : null,
    next: next ? { slug: next.slug, name: next.name } : null,
  }
}