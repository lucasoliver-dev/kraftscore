'use client'

import { SignIn } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { Activity, BarChart3, Shield, Sparkles } from 'lucide-react'

import Section from '@/components/layout/section/Section'
import Stack from '@/components/layout/stack/Stack'
import Surface from '@/components/layout/surface/Surface'

import styles from './page.module.scss'

export default function SignInPage() {
  return (
    <main className={styles.page}>
      <Section className={styles.section}>
        <Surface variant="hero" glow="strong" hover={false}>
          <div className={styles.inner}>
            <div className={styles.grid}>
              {/* HERO */}
              <div className={styles.hero}>
                <Stack>
                  <div className={styles.heroHeader}>
                    <p>Bem-vindo de volta</p>

                    <h1>
                      <span className={styles.brand}>KraftScore</span>
                      <span>Insights</span>
                    </h1>

                    <p>
                      Use análises profundas, feitas com dados estratégicos e
                      processadas por supercomputadores, para fortalecer sua
                      leitura de jogo antes de apostar.
                    </p>
                  </div>

                  <div className={styles.features}>
                    <Surface
                      variant="panel"
                      glow="none"
                      hover={false}
                      className={styles.featureCard}
                    >
                      <div className={styles.featureTitle}>
                        <Activity className={styles.icon} />
                        <span>Tempo real</span>
                      </div>
                      <p>Atualização de estatísticas a cada rodada.</p>
                    </Surface>

                    <Surface
                      variant="panel"
                      glow="none"
                      hover={false}
                      className={styles.featureCard}
                    >
                      <div className={styles.featureTitle}>
                        <BarChart3 className={styles.icon} />
                        <span>Leitura de valor</span>
                      </div>
                      <p>
                        Probabilidades estimadas para ajudar na gestão de banca.
                      </p>
                    </Surface>

                    <Surface
                      variant="panel"
                      glow="none"
                      hover={false}
                      className={styles.featureCard}
                    >
                      <div className={styles.featureTitle}>
                        <Shield className={styles.icon} />
                        <span>Controle</span>
                      </div>
                      <p>Histórico de análises e jogos salvos na sua conta.</p>
                    </Surface>
                  </div>
                </Stack>

                <p className={styles.note}>
                  <Sparkles className={styles.noteIcon} />
                  Construído para apostadores que levam gestão de banca a sério.
                </p>
              </div>

              {/* AUTH */}
              <div className={styles.auth}>
                <Surface variant="panel" glow="strong" hover={false}>
                  <SignIn
                    signUpUrl="/sign-up"
                    appearance={{
                      baseTheme: dark,
                      variables: {
                        colorPrimary: 'hsl(var(--brand))',
                        colorText: 'hsl(var(--foreground))',
                        colorInputBackground: 'var(--control-bg)',
                        borderRadius: 'var(--radius-sm)',
                      },
                      elements: {
                        rootBox: styles.clerkRoot,
                        cardBox: styles.clerkRoot,
                        card: styles.clerkCard,

                        formFieldLabel: 'kbet-label',
                        formFieldInput: 'kbet-control',
                        socialButtonsBlockButton: 'kbet-control',

                        formButtonPrimary: styles.clerkButton,
                      },
                    }}
                  />
                </Surface>
              </div>
            </div>
          </div>
        </Surface>
      </Section>
    </main>
  )
}
