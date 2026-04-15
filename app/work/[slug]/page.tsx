// app/work/[slug]/page.tsx
// Server Component — sin 'use client'

import { notFound } from 'next/navigation'
import { getProjectBySlug, getAllProjectSlugs } from '@/data/projects'
import ProjectDetail from '@/components/ProjectDetail'

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

    return <ProjectDetail project={project!} />
}