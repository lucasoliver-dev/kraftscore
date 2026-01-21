'use client'

import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { Bot, CalendarDays, Sparkles, TrendingUp } from 'lucide-react'

import Surface from '@/components/layout/surface/Surface'
import Section from '@/components/layout/section/Section'
import styles from './home-hero.module.scss'

function getDisplayName(user: any) {
  return user?.firstName || user?.username || user?.fullName || 'Craque'
}

export function HomeHero() {
  const { user, isLoaded } = useUser()

  const name = isLoaded ? getDisplayName(user) : '...'

  return (
    <div className={styles.heroWrap}>
      <Surface glow="strong" className={styles.heroSurface}>
        <Section density="default">
          <div className={styles.hero}>
            {/* Glow decorativo */}
            <div className={styles.heroGlow} aria-hidden />

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
                👑
              </h1>

              <p className={styles.subtitle}>
                Explore jogos, estatísticas e gere previsões com IA em segundos.
              </p>
            </div>

            {/* Badges rápidos pra não ficar "pálido" */}
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
              <Link href="/fixtures" className={styles.primaryButton}>
                Ver jogos de hoje
              </Link>

              <Link href="/predictions" className={styles.secondaryButton}>
                <Bot size={16} />
                Fazer análise com IA
              </Link>
            </div>
          </div>
        </Section>
      </Surface>
    </div>
  )
}
