'use client'

import type { ReactNode } from 'react'
import styles from './list.module.scss'

export default function List({ children }: { children: ReactNode }) {
  return <div className={styles.list}>{children}</div>
}
