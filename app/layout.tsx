import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Monolog',
  description: 'A journaling space for your thoughts, reflections, and emotional growth.',
  
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
