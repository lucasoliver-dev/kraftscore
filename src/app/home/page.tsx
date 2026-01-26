import AppShell from '@/components/layout/appShell/AppShell'
import styles from './page.module.scss'

import { HomeHero } from '@/components/home/HomeHero/HomeHero'
import { HomeShortcuts } from '@/components/home/HomeShortcuts/HomeShortcuts'
import { LatestPredictions } from '@/components/home/LatestPredictions/LatestPredictions'
import { TodayFixtures } from '@/components/home/TodayFixtures/TodayFixtures'

export default function HomePage() {
  return (
    <AppShell>
      <div className={styles.page}>
        <HomeHero />
        <HomeShortcuts />

        <div className={styles.widgetsGrid}>
          <TodayFixtures />
          <LatestPredictions />
        </div>
      </div>
    </AppShell>
  )
}
