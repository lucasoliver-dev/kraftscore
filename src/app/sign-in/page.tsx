'use client'

import { SignIn } from '@clerk/nextjs'
import type { BaseTheme } from '@clerk/types'
import { Activity, BarChart3, Shield, Sparkles } from 'lucide-react'

const SignInPage = () => (
  <main className="flex min-h-screen items-center justify-center px-4 py-10">
    <div className="grid w-full max-w-5xl gap-6 rounded-3xl border border-zinc-800 bg-zinc-950/80 p-5 shadow-[0_0_80px_rgba(251,146,60,0.35)] backdrop-blur-xl lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:p-7">
      {/* Brand / hero panel */}
      <section className="flex flex-col justify-between gap-6 border-b border-zinc-800/60 pb-4 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
        <div className="space-y-6">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-orange-400/80">
              Bem-vindo de volta
            </p>

            <h1 className="mt-2 text-3xl font-semibold text-zinc-50 sm:text-4xl">
              <span className="mr-1 rounded-full bg-gradient-to-r from-orange-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">
                KraftScore
              </span>
              <span className="text-zinc-200">Insights</span>
            </h1>

            <p className="mt-2 max-w-md text-sm text-zinc-400">
              Use análises profundas, feitas com dados estratégicos e
              processadas por supercomputadores, para fortalecer sua leitura de
              jogo antes de apostar.
            </p>
          </div>

          <div className="grid gap-3 text-xs text-zinc-300 sm:grid-cols-3">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-3">
              <div className="flex items-center gap-2 text-[11px] font-medium text-zinc-200">
                <Activity className="h-3.5 w-3.5 text-emerald-400" />
                Tempo real
              </div>
              <p className="mt-1.5 text-[11px] text-zinc-400">
                Atualização de estatísticas a cada rodada.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-3">
              <div className="flex items-center gap-2 text-[11px] font-medium text-zinc-200">
                <BarChart3 className="h-3.5 w-3.5 text-orange-400" />
                Leitura de valor
              </div>
              <p className="mt-1.5 text-[11px] text-zinc-400">
                Probabilidades estimadas para ajudar na gestão de banca.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-3">
              <div className="flex items-center gap-2 text-[11px] font-medium text-zinc-200">
                <Shield className="h-3.5 w-3.5 text-sky-400" />
                Controle
              </div>
              <p className="mt-1.5 text-[11px] text-zinc-400">
                Histórico de análises e jogos salvos na sua conta.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-2 flex items-center gap-1 text-[11px] text-zinc-500">
          <Sparkles className="h-3.5 w-3.5 text-orange-400" />
          Construído para apostadores que levam gestão de banca a sério.
        </p>
      </section>

      {/* Auth panel */}
      <section className="flex items-center justify-center">
        <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-black/70 p-4 shadow-[0_0_40px_rgba(0,0,0,0.9)] sm:p-6">
          <div className="w-full max-w-md">
            <SignIn
              signUpUrl="/sign-up"
              appearance={{
                baseTheme: 'dark' as unknown as BaseTheme,
                variables: {
                  colorPrimary: '#fb923c',
                  colorText: '#e4e4e7',
                  colorInputBackground: 'rgba(24,24,27,0.9)',
                  borderRadius: '0.75rem',
                },
                elements: {
                  card: 'w-full bg-transparent border-0 shadow-none',
                  headerTitle: 'text-zinc-50 text-lg font-semibold',
                  headerSubtitle: 'text-xs text-zinc-400',
                  socialButtonsBlockButton:
                    'bg-zinc-900 border border-zinc-700 text-zinc-200 hover:border-orange-500 hover:text-orange-400',
                  formButtonPrimary:
                    'bg-orange-500 hover:bg-orange-400 text-zinc-950 font-semibold shadow-[0_0_22px_rgba(251,146,60,0.7)]',
                  formFieldInput:
                    'bg-zinc-900/80 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-orange-500 focus:ring-orange-500/60',
                  formFieldLabel: 'text-xs text-zinc-300',
                  footer: 'text-xs text-zinc-400',
                  footerActionLink:
                    'text-orange-400 hover:text-orange-300 font-medium',
                },
              }}
            />
          </div>
        </div>
      </section>
    </div>
  </main>
)

export default SignInPage
