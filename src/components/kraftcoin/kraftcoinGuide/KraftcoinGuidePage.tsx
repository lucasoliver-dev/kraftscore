'use client'

import Link from 'next/link'

import Stack from '@/components/layout/stack/Stack'
import Surface from '@/components/layout/surface/Surface'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui'

import {
  AlertTriangle,
  ArrowRight,
  Coins,
  ExternalLink,
  Gift,
  LineChart,
  Rocket,
  Shield,
  Sparkles,
  Trophy,
  Users,
} from 'lucide-react'

import styles from './kraftcoin-guide-page.module.scss'
import { KraftcoinIcon } from '@/components/icons'

export function KraftcoinGuidePage() {
  const pumpfunUrl = '#'

  return (
    <Stack className={styles.page}>
      {/* HERO */}
      <Surface variant="hero" glow="strong" className={styles.hero}>
        <div className={styles.split}>
          {/* Left */}
          <Stack className={styles.heroLeft}>
            <div className={styles.badges}>
              <Badge>
                <Sparkles size={14} />
                Guia rápido
              </Badge>

              <Badge variant="soft">
                <Coins size={14} />
                Solana / pump.fun
              </Badge>

              <Badge variant="soft">
                <Users size={14} />
                Comunidade
              </Badge>
            </div>

            <Stack className={styles.heroText}>
              <div className={styles.titleRow}>
                <span className={styles.coinSpin} aria-hidden="true">
                  <KraftcoinIcon size="2xl" className={styles.coinIcon} />
                </span>

                <div className={styles.titleBlock}>
                  <h1 className={styles.title}>Entenda a Kraftcoin</h1>

                  <p className={styles.subtitle}>
                    A Kraftcoin é a memecoin oficial do KraftScore — criada para
                    fortalecer a comunidade e futuramente liberar benefícios
                    dentro do app.
                  </p>
                </div>
              </div>
            </Stack>

            <div className={styles.actions}>
              <Button asChild variant="neon">
                <Link href={pumpfunUrl}>
                  Comprar na pump.fun <ExternalLink size={16} />
                </Link>
              </Button>

              <Button variant="secondaryCta" asChild>
                <Link href="/kraftcoin">
                  Voltar <ArrowRight size={16} />
                </Link>
              </Button>
            </div>

            <p className={styles.note}>
              * O link oficial será ativado quando a Kraftcoin estiver
              publicada.
            </p>
          </Stack>

          {/* Right */}
          <Surface variant="panel" glow="none" className={styles.summaryCard}>
            <Stack className={styles.summary}>
              <p className={styles.summaryTitle}>Resumo rápido</p>

              <div className={styles.kv}>
                <span>Status</span>
                <b>Pré-lançamento</b>

                <span>Plataforma</span>
                <b>pump.fun</b>

                <span>Rede</span>
                <b>Solana</b>

                <span>Objetivo</span>
                <b>Comunidade + utilidade</b>
              </div>
            </Stack>
          </Surface>
        </div>
      </Surface>

      {/* CONTENT */}
      <div className={styles.grid}>
        {/* Left column */}
        <Stack className={styles.col}>
          <Surface variant="panel" glow="soft">
            <Stack className={styles.block}>
              <h2 className={styles.h2}>O que é a Kraftcoin?</h2>

              <p className={styles.p}>
                Uma memecoin com identidade do KraftScore. A ideia é usar a
                comunidade do app como base e evoluir utilidade com o tempo.
              </p>

              <Stack className={styles.list}>
                <div className={styles.listItem}>
                  <Users size={16} />
                  <span>Cripto com foco em comunidade</span>
                </div>

                <div className={styles.listItem}>
                  <Gift size={16} />
                  <span>Futuro acesso a perks dentro do app</span>
                </div>

                <div className={styles.listItem}>
                  <Trophy size={16} />
                  <span>Campanhas e eventos com holders</span>
                </div>
              </Stack>
            </Stack>
          </Surface>

          <Surface variant="panel" glow="soft">
            <Stack className={styles.block}>
              <h2 className={styles.h2}>Como comprar (quando lançar)</h2>

              <Stack className={styles.steps}>
                <div className={styles.step}>
                  <div className={styles.stepIcon}>
                    <Coins size={16} />
                  </div>

                  <div className={styles.stepText}>
                    <b>1- Acesse o link oficial</b>
                    <p>Você vai clicar no botão “Comprar na pump.fun”.</p>
                  </div>
                </div>

                <div className={styles.step}>
                  <div className={styles.stepIcon}>
                    <Users size={16} />
                  </div>

                  <div className={styles.stepText}>
                    <b>2- Conecte sua carteira</b>
                    <p>Ex.: Phantom (Solana).</p>
                  </div>
                </div>

                <div className={styles.step}>
                  <div className={styles.stepIcon}>
                    <ArrowRight size={16} />
                  </div>

                  <div className={styles.stepText}>
                    <b>3- Confirme a compra</b>
                    <p>Finalize na pump.fun e acompanhe no app.</p>
                  </div>
                </div>
              </Stack>

              <div className={styles.ctaInline}>
                <Button asChild>
                  <Link href={pumpfunUrl}>
                    Comprar na pump.fun <ExternalLink size={16} />
                  </Link>
                </Button>
              </div>
            </Stack>
          </Surface>
        </Stack>

        {/* Right column */}
        <Stack className={styles.col}>
          <Surface variant="panel" glow="none">
            <Stack className={styles.block}>
              <h2 className={styles.h2}>Aviso importante</h2>

              <Alert className={styles.alert}>
                <Shield size={16} />
                <div>
                  <AlertTitle>Risco & responsabilidade</AlertTitle>
                  <AlertDescription>
                    Cripto envolve risco. Isso{' '}
                    <b>não é recomendação financeira</b>. Compre apenas se fizer
                    sentido pra você e com valores controlados.
                  </AlertDescription>
                </div>
              </Alert>

              <Stack className={styles.list}>
                <div className={styles.listItem}>
                  <AlertTriangle size={16} />
                  <span>Alta volatilidade</span>
                </div>

                <div className={styles.listItem}>
                  <AlertTriangle size={16} />
                  <span>Não existe garantia de lucro</span>
                </div>

                <div className={styles.listItem}>
                  <AlertTriangle size={16} />
                  <span>Faça DYOR (pesquise por conta própria)</span>
                </div>
              </Stack>
            </Stack>
          </Surface>

          <Surface variant="panel" glow="soft">
            <Stack className={styles.block}>
              <h2 className={styles.h2}>Roadmap (visão)</h2>

              <Stack className={styles.list}>
                <div className={styles.listItem}>
                  <Rocket size={16} />
                  <span>Lançamento na pump.fun</span>
                </div>

                <div className={styles.listItem}>
                  <Gift size={16} />
                  <span>Benefícios no app para holders</span>
                </div>

                <div className={styles.listItem}>
                  <Trophy size={16} />
                  <span>Eventos, sorteios e campanhas</span>
                </div>

                <div className={styles.listItem}>
                  <LineChart size={16} />
                  <span>Integrações e melhorias no KraftScore</span>
                </div>
              </Stack>
            </Stack>
          </Surface>
        </Stack>
      </div>
    </Stack>
  )
}
