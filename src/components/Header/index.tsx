'use client'

import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import type { BaseTheme } from '@clerk/types'
import { LineChart, Sparkles } from 'lucide-react'

/**
 * Main app header with brand and Clerk user menu.
 */
const Header = () => (
  <header
    aria-label="Page Header"
    className="border-b border-zinc-800 bg-zinc-950/95"
  >
    <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
      {/* Logo / título centralizado */}
      <div className="flex-1 text-center">
        <div className="flex items-center justify-center gap-2">
          {/* Ícone temporário (substituir pela logo depois) */}
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/10 text-orange-400 ring-1 ring-orange-500/40">
            <Sparkles className="h-4 w-4" />
          </span>

          <h1 className="text-lg font-bold text-zinc-50 sm:text-xl">
            KraftScore Insights
          </h1>
        </div>

        <p className="mt-0.5 flex items-center justify-center gap-1 text-xs text-zinc-400 sm:text-sm">
          <LineChart className="h-3 w-3 text-orange-400 sm:h-4 sm:w-4" />
          <span>IA e estatísticas a favor das suas apostas.</span>
        </p>
      </div>

      {/* Área de autenticação (menu Clerk) */}
      <div className="mt-1 flex items-center gap-3 sm:mt-0">
        <SignedIn>
          <UserButton
            appearance={{
              baseTheme: 'dark' as unknown as BaseTheme,
              variables: {
                colorBackground: '#020617',
                colorText: '#f9fafb',
                colorPrimary: '#f97316',
                colorTextOnPrimaryBackground: '#020617',
              },
              elements: {
                userButtonAvatarBox:
                  'h-9 w-9 border border-orange-500/80 shadow-[0_0_12px_rgba(249,115,22,0.7)]',
                userButtonTrigger:
                  'rounded-full ring-offset-0 focus:outline-none focus:ring-2 focus:ring-orange-500/70',
                userButtonPopoverCard:
                  'border border-orange-500/40 bg-zinc-900/95 text-zinc-50 shadow-[0_0_30px_rgba(249,115,22,0.35)] backdrop-blur-sm',
                userButtonPopoverHeaderTitle:
                  'text-sm font-semibold text-zinc-50',
                userButtonPopoverHeaderSubtitle: 'text-xs text-zinc-400',
                userButtonPopoverActionButton:
                  'flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-zinc-100 hover:bg-zinc-800',
                userButtonPopoverActionButtonIcon: 'text-zinc-400',
                userButtonPopoverActionButtonText: 'text-xs text-zinc-100',
                userButtonPopoverFooter: 'hidden',
              },
            }}
          />
        </SignedIn>

        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </div>
    </div>
  </header>
)

export default Header
