'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import Surface from '@/components/layout/surface/Surface'
import Section from '@/components/layout/section/Section'
import styles from './home-shortcuts.module.scss'

type ShortcutCardProps = {
  title: string
  description: string
  href?: string
  cta?: string
  hint?: string
  disabled?: boolean
  icon?: React.ReactNode
}

function ShortcutCard({
  title,
  description,
  href,
  cta,
  hint,
  disabled = false,
  icon,
}: ShortcutCardProps) {
  const content = (
    <div className={`${styles.card} ${disabled ? styles.disabled : ''}`}>
      <div className={styles.cardTop}>
        <div className={styles.iconWrap}>{icon}</div>
        {!disabled && <ArrowUpRight size={16} className={styles.chevron} />}
      </div>

      <div className={styles.cardText}>
        <p className={styles.cardTitle}>{title}</p>
        <p className={styles.cardDescription}>{description}</p>
      </div>

      <div className={styles.cardFooter}>
        {href && cta && !disabled ? (
          <span className={styles.cardLink}>{cta}</span>
        ) : (
          <span className={styles.cardHint}>{hint ?? 'Em breve'}</span>
        )}
      </div>
    </div>
  )

  return (
    <Surface glow="soft">
      <Section density="default">
        {href && !disabled ? (
          <Link href={href} className={styles.linkWrap}>
            {content}
          </Link>
        ) : (
          content
        )}
      </Section>
    </Surface>
  )
}

export function HomeShortcuts() {
  return (
    <div className={styles.grid}>
      <ShortcutCard
        title="Jogos de hoje"
        description="Veja as partidas mais relevantes agora."
        href="/fixtures"
        cta="Abrir →"
        icon={<span>🔥</span>}
      />

      <ShortcutCard
        title="Próximos dias"
        description="Planeje picks com antecedência."
        href="/fixtures"
        cta="Abrir →"
        icon={<span>📅</span>}
      />

      <ShortcutCard
        title="Favoritos"
        description="Times e ligas salvos por você."
        hint="Em breve"
        disabled
        icon={<span>⭐</span>}
      />

      <ShortcutCard
        title="Insights (beta)"
        description="Destaques do dia com confiança."
        hint="Em breve"
        disabled
        icon={<span>⚡</span>}
      />
    </div>
  )
}
