import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/providers/theme-providers'
import { StoreProvider } from '@/stores/RootStore'
import './globals.css'
import AppBackground from '@/components/layout/AppBackground'

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
      <html lang="pt-BR" suppressHydrationWarning>
        <body className="relative min-h-screen antialiased">
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
