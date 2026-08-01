// app/work/[slug]/page.tsx
// Server Component — sin 'use client'

import { notFound } from 'next/navigation'
import { getProjectBySlug, getAllProjectSlugs } from '@/data/projects'
import ProjectDetail from '@/components/ProjectDetail'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { SmoothScroll } from '@/components/Smooth-scroll'
import { CustomCursor } from '@/components/custom-cursor'
import { GsapAnimations } from '@/components/gsap-animations'

// ── Static generation ──────────────────────────────────────────────────────

export async function generateStaticParams() {
    return getAllProjectSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const project = getProjectBySlug(slug)
    if (!project) return {}

    return {
        title: `${project.name} — Proyecto · HEXAGONO STUDIO`,
        description: project.description[0],
    }
}

// ── Page ───────────────────────────────────────────────────────────────────

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const project = getProjectBySlug(slug)

    if (!project) notFound()

    return (
        <>
            <SmoothScroll>
                <CustomCursor />
                <GsapAnimations />
                <Navbar />
                <main>
                    <ProjectDetail project={project!} />
                </main>
                <Footer />
            </SmoothScroll>
        </>

    )
}