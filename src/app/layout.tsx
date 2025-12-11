import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { StoreProvider } from '@/stores/RootStore'
import AppBackground from '@/components/layout/AppBackground'
import './globals.css'

export const metadata: Metadata = {
  description: 'Sports betting and AI analysis application',
  title: 'KraftScore Insights',
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
      {/* força o tema dark dos tokens */}
      <html lang="pt-BR" className="dark">
        <body className="relative min-h-screen antialiased">
          {/* background animado */}
          <AppBackground />

          {/* app por cima do bg */}
          <div className="relative z-10">
            <StoreProvider>{children}</StoreProvider>
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
