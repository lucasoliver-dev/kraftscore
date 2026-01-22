'use client'

import { useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import { useStores } from '@/stores/RootStore'

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
  const { footballStore, footballWidgetsStore } = useStores()

  const matchPanelRef = useRef<HTMLDivElement | null>(null)

  // ✅ load fixtures do dia
  useEffect(() => {
    const today = toYYYYMMDD(new Date())

    if (footballStore.fixturesDate !== today && !footballStore.isLoading) {
      footballStore.loadFixtures(today)
    }
  }, [footballStore])

  // ✅ scroll no mobile ao selecionar fixture
  useEffect(() => {
    const fixtureId = footballWidgetsStore.selectedFixtureId
    if (!fixtureId) return

    if (window.matchMedia('(min-width: 1101px)').matches) return

    requestAnimationFrame(() => {
      matchPanelRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    })
  }, [footballWidgetsStore.selectedFixtureId, footballWidgetsStore])

  return (
    <div className={styles.layout}>
      <aside className={styles.colLeft} aria-label="Sidebar">
        <WidgetsSidebar />
      </aside>

      <main className={styles.colCenter} aria-label="Fixtures list">
        <WidgetsFixtures />
      </main>

      <aside className={styles.colRight} aria-label="Match panel">
        {/* ✅ âncora real para scroll */}
        <div ref={matchPanelRef} id="match-panel" className={styles.anchor} />
        <WidgetsMatchPanel />
      </aside>
    </div>
  )
})
