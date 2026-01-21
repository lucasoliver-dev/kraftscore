'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import styles from './section.module.scss'

type SectionDensity = 'tight' | 'default' | 'loose'

export default function Section({
  children,
  density = 'default',
  className,
}: {
  children: ReactNode
  density?: SectionDensity
  className?: string
}) {
  return (
    <section className={cn(styles.section, styles[density], className)}>
      {children}
    </section>
  )
}
