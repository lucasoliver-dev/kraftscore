import Link from 'next/link'
import Surface from '@/components/layout/surface/Surface'
import Section from '@/components/layout/section/Section'
import styles from './home-panel.module.scss'

type HomePanelProps = {
  title: string
  subtitle?: string
  actionHref?: string
  actionLabel?: string
  children: React.ReactNode
}

export function HomePanel({
  title,
  subtitle,
  actionHref,
  actionLabel,
  children,
}: HomePanelProps) {
  return (
    <Surface>
      <Section>
        <div className={styles.panel}>
          <div className={styles.header}>
            <div className={styles.headerText}>
              <p className={styles.title}>{title}</p>
              {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
            </div>

            {actionHref && actionLabel ? (
              <Link href={actionHref} className={styles.action}>
                {actionLabel}
              </Link>
            ) : null}
          </div>

          <div className={styles.body}>{children}</div>
        </div>
      </Section>
    </Surface>
  )
}
