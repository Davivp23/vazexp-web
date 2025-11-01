import type { Metadata } from 'next'
import { Playfair_Display, Outfit } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['600'],
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['300', '400', '500', '700'],
})

export const metadata: Metadata = {
  title: 'vazexp. - Diseño de Interiores',
  description: 'Convertimos ideas en experiencias físicas a través del diseño.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${playfair.variable} ${outfit.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}