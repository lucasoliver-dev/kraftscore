'use client'

import AppShell from '@/components/layout/appShell/AppShell'
import { KraftcoinGuidePage } from '@/components/kraftcoin'

import styles from './page.module.scss'

export default function Page() {
  return (
    <AppShell>
      <div className={styles.page}>
        <KraftcoinGuidePage />
      </div>
    </AppShell>
  )
}
