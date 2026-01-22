'use client'

import AppShell from '@/components/layout/appShell/AppShell'
import { WidgetsPage } from '@/components/widgets/WidgetsPage/WidgetsPage'
import styles from './page.module.scss'

export default function Page() {
  return (
    <AppShell>
      <div className={styles.page}>
        <WidgetsPage />
      </div>
    </AppShell>
  )
}
