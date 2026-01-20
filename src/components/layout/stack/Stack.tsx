'use client'

import type { ReactNode } from 'react'
import styles from './stack.module.scss'

export default function Stack({ children }: { children: ReactNode }) {
  return <div className={styles.stack}>{children}</div>
}
