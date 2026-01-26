'use client'

import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { Bot, CalendarDays, Crown, Sparkles, TrendingUp } from 'lucide-react'

import Surface from '@/components/layout/surface/Surface'
import Section from '@/components/layout/section/Section'
import { Button } from '@/components/ui/button'

import styles from './home-hero.module.scss'
import { useDisplayName } from '@/hooks/ui/useDisplayName'

export function HomeHero() {
  const { name } = useDisplayName()

  return (
    <div className={styles.wrap}>
      <Surface variant="hero" glow="strong" className={styles.surface}>
        <Section density="default">
          <div className={styles.hero}>
            <div className={styles.badgeRow}>
              <span className={styles.badge}>
                <Sparkles size={14} />
                KraftScore Insights
              </span>

              <span className={styles.miniTag}>
                <TrendingUp size={14} />
                Dashboard
              </span>
            </div>

            <div className={styles.text}>
              <h1 className={styles.title}>
                Bem-vindo de volta, <span className={styles.name}>{name}</span>{' '}
                <Crown className={styles.crown} size={48} />
              </h1>

              <p className={styles.subtitle}>
                Explore jogos, estatísticas e gere previsões com IA em segundos.
              </p>
            </div>

            <div className={styles.pills}>
              <span className={styles.pill}>
                <CalendarDays size={14} />
                Hoje: jogos do dia
              </span>
              <span className={styles.pill}>
                <Bot size={14} />
                IA pronta pra analisar
              </span>
              <span className={styles.pill}>
                <TrendingUp size={14} />
                Picks com confiança
              </span>
            </div>

            <div className={styles.actions}>
              <Button asChild className={styles.primaryButton}>
                <Link href="/fixtures">Ver jogos de hoje</Link>
              </Button>

              <Button
                asChild
                variant="secondary"
                className={styles.secondaryButton}
              >
                <Link href="/predictions" className={styles.secondaryInner}>
                  <Bot size={16} />
                  Fazer análise com IA
                </Link>
              </Button>
            </div>
          </div>
        </Section>
      </Surface>
    </div>
  )
}
