import './globals.css'
import { Playfair_Display, DM_Sans, Caveat } from 'next/font/google'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap'
})

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap'
})

const caveat = Caveat({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-accent',
  display: 'swap'
})

export const metadata = {
  title: "Baker's Square | Freshly Baked Happiness",
  description: "Indulge in heavenly delights at Baker's Square, Amritsar's premier bakery. Cakes, ice creams, and more.",
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${caveat.variable}`}>
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  )
}
