import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/providers/theme-providers'
import { StoreProvider } from '@/stores/RootStore'
import './globals.css'
import AppBackground from '@/components/layout/AppBackground'
import { satoshi, spaceGrotesk } from '@/styles/fonts'

export const metadata: Metadata = {
  metadataBase: new URL('https://kraftscore.com.br'),
  description: 'Sports betting and AI analysis application',
  title: 'KraftScore Insights',

  openGraph: {
    title: 'KraftScore Insights',
    description: 'Sports betting and AI analysis application',
    url: 'https://kraftscore.com.br',
    siteName: 'KraftScore Insights',
    images: [
      {
        url: '/public/images/ksInsights-bg.png',
        width: 1200,
        height: 630,
        alt: 'KraftScore Insights',
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'KraftScore Insights',
    description: 'Sports betting and AI analysis application',
    images: ['/public/images/ksInsights-bg.png'],
  },
}

/**
 * Root layout component of the application.
 *
 * @param props - The component props.
 * @param props.children - The children to be rendered.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="pt-BR" suppressHydrationWarning>
        <body
          className={`${satoshi.variable} ${spaceGrotesk.variable} relative min-h-screen antialiased`}
        >
          <AppBackground />
          <ThemeProvider>
            <div className="relative z-10">
              <StoreProvider>{children}</StoreProvider>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
