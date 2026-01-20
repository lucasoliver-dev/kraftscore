'use client'

import type { ReactNode } from 'react'
import styles from './page.module.scss'

export default function Page({ children }: { children: ReactNode }) {
  return <main className={styles.page}>{children}</main>
}
