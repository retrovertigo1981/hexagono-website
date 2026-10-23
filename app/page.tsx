import type { Metadata } from 'next'
import { HomePage } from '@/components/HomePage'
import { UnderConstruction } from '@/components/UnderConstruction'

/**
 * Por defecto `/` muestra la página de construcción, en local y en producción.
 * Para ver el sitio completo: SITE_MODE=live
 */
const showFullSite = process.env.SITE_MODE === 'live'

export const metadata: Metadata = showFullSite
  ? {}
  : {
      title: 'HEXAGONO 8 — Sitio en construcción',
      description:
        'Estamos afinando los últimos detalles de la próxima versión del sitio de Hexagono 8.',
      robots: { index: false, follow: false },
    }

export default function Home() {
  return showFullSite ? <HomePage /> : <UnderConstruction />
}
