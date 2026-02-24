import type { Metadata, Viewport } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google"
import './globals.css'
import React from "react";

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'HEXAGONO - Desarrollo Web',
  description:
    "Agencia de desarrollo web, Diseño original, codigo robusto, estrategia de conversión, Rancagua, Rengo, Region de O'Higgins, Chile",
  // icons: {
  //   icon: [
  //     { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
  //     { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
  //     { url: '/icon.svg', type: 'image/svg+xml' },
  //   ],
  //   apple: '/apple-icon.png',
  // },
}


export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${manrope.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-card">
        {children}
      </body>
    </html>
  )
}

