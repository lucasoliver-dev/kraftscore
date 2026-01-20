'use client'

import type { ReactNode } from 'react'
import styles from './section.module.scss'

export default function Section({ children }: { children: ReactNode }) {
  return <section className={styles.section}>{children}</section>
}
