'use client'

import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { useStores } from '@/stores/RootStore'

import AppShell from '@/components/layout/appShell/AppShell'
import { WidgetsFixtures } from '@/components/widgets/WidgetsFixtures'
import { WidgetsMatchPanel } from '@/components/widgets/WidgetsMatchPanel'
import { WidgetsSidebar } from '@/components/widgets/WidgetsSidebar'

import styles from './widgets-page.module.scss'

function toYYYYMMDD(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const WidgetsPage = observer(() => {
  const { footballStore } = useStores()

  useEffect(() => {
    const today = toYYYYMMDD(new Date())

    if (footballStore.fixturesDate !== today && !footballStore.isLoading) {
      footballStore.loadFixtures(today)
    }
  }, [footballStore])

  return (
    <AppShell>
      <div className={styles.page}>
        <div className={styles.layout}>
          <aside className={styles.colLeft} aria-label="Sidebar">
            <WidgetsSidebar />
          </aside>

          <main className={styles.colCenter} aria-label="Fixtures list">
            <WidgetsFixtures />
          </main>

          <aside className={styles.colRight} aria-label="Match panel">
            <WidgetsMatchPanel />
          </aside>
        </div>
      </div>
    </AppShell>
  )
})
