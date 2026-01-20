'use client'

import type { ReactNode } from 'react'
import { Card } from '@/components/ui/card'
import styles from './surface.module.scss'

export default function Surface({ children }: { children: ReactNode }) {
  return <Card className={styles.surface}>{children}</Card>
}
