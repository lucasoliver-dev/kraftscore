'use client'

import { Circle, Search } from 'lucide-react'
import { observer } from 'mobx-react-lite'

import { cn } from '@/lib/utils'
import type { WidgetsFixturesTab } from '@/stores/FootballWidgetsStore'
import { useStores } from '@/stores/RootStore'

import Section from '@/components/layout/section/Section'
import Stack from '@/components/layout/stack/Stack'
import Surface from '@/components/layout/surface/Surface'

import styles from './widgets-fixtures.module.scss'
import { Button } from '@/components/ui/button'

const TABS: { id: WidgetsFixturesTab; label: string }[] = [
  { id: 'ALL', label: 'ALL' },
  { id: 'LIVE', label: 'LIVE' },
  { id: 'FINISHED', label: 'FINISHED' },
  { id: 'SCHEDULED', label: 'SCHEDULED' },
]

export const WidgetsFixtures = observer(() => {
  const { footballStore, footballWidgetsStore } = useStores()

  const tab = footballWidgetsStore.fixturesTab
  const grouped = footballWidgetsStore.fixturesGrouped

  const handleSelectFixture = (fixtureId: number) => {
    footballWidgetsStore.setSelectedFixtureId(fixtureId)
  }

  return (
    <Surface>
      <Section>
        <Stack>
          <div className={styles.topRow}>
            <div className={styles.tabs}>
              {TABS.map(item => (
                <Button
                  variant="secondaryCta"
                  key={item.id}
                  type="button"
                  className={cn(
                    styles.tab,
                    tab === item.id && styles.tabActive
                  )}
                  onClick={() => footballWidgetsStore.setFixturesTab(item.id)}
                >
                  <span className="inline-flex items-center gap-2">
                    <span className="kbet-dot" data-tab={item.id} />
                    {item.label}
                  </span>
                </Button>
              ))}
            </div>

            <button
              type="button"
              className={styles.iconButton}
              aria-label="Buscar"
            >
              <Search size={16} />
            </button>
          </div>

          <div className={styles.list} role="list">
            {grouped.map(group => (
              <div key={group.key} className={styles.group} role="listitem">
                <div className={styles.groupHeader}>
                  <p className={styles.groupTitle}>{group.title}</p>

                  <button
                    type="button"
                    className={styles.groupMeta}
                    onClick={() =>
                      footballStore.loadStandingsByLeague(
                        group.leagueId,
                        group.season
                      )
                    }
                  >
                    Standings
                  </button>
                </div>

                <div className={styles.groupBody}>
                  {group.fixtures.map(fx => (
                    <button
                      key={fx.fixture.id}
                      type="button"
                      className={styles.fixture}
                      onClick={() => handleSelectFixture(fx.fixture.id)}
                    >
                      <span className={styles.fixtureLeft}>
                        <span className={styles.status}>
                          {fx.fixture.status.short}
                        </span>

                        <span className={styles.teams}>
                          <span className={styles.teamLine}>
                            <span className={styles.teamName}>
                              {fx.teams.home.name}
                            </span>
                            <b className={styles.goal}>{fx.goals.home ?? 0}</b>
                          </span>

                          <span className={styles.teamLine}>
                            <span className={styles.teamName}>
                              {fx.teams.away.name}
                            </span>
                            <b className={styles.goal}>{fx.goals.away ?? 0}</b>
                          </span>
                        </span>
                      </span>

                      <span className={styles.fixtureRight}>›</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Stack>
      </Section>
    </Surface>
  )
})
