'use client'

import { useState } from 'react'
import { BarChart3, CalendarDays, ListOrdered, Users } from 'lucide-react'

import Surface from '@/components/layout/surface/Surface'
import Section from '@/components/layout/section/Section'
import Stack from '@/components/layout/stack/Stack'

import styles from './widgets-match-panel.module.scss'

type PanelTab = 'EVENTS' | 'STATISTICS' | 'LINEUPS' | 'PLAYERS'

const TABS: { id: PanelTab; label: string; Icon: typeof BarChart3 }[] = [
  { id: 'EVENTS', label: 'Events', Icon: ListOrdered },
  { id: 'STATISTICS', label: 'Statistics', Icon: BarChart3 },
  { id: 'LINEUPS', label: 'Lineups', Icon: CalendarDays },
  { id: 'PLAYERS', label: 'Players', Icon: Users },
]

export function WidgetsMatchPanel() {
  const [tab, setTab] = useState<PanelTab>('STATISTICS')

  return (
    <Surface>
      <Section>
        <Stack>
          <div className={styles.header}>
            <div className={styles.headerTop}>
              <span className={styles.competition}>World • World Cup</span>
              <span className={styles.stage}>Round of 16</span>
            </div>

            <div className={styles.scoreRow}>
              <div className={styles.team}>
                <div className={styles.logoMock} />
                <div className={styles.teamText}>
                  <span className={styles.teamName}>Brazil</span>
                  <span className={styles.teamMeta}>Home</span>
                </div>
              </div>

              <div className={styles.score}>
                <div className={styles.scoreNumbers}>
                  <span className={styles.scoreNum}>4</span>
                  <span className={styles.scoreSep}>-</span>
                  <span className={styles.scoreNum}>1</span>
                </div>

                <span className={styles.status}>FINISHED</span>
              </div>

              <div className={styles.team}>
                <div className={styles.logoMock} />
                <div className={styles.teamText}>
                  <span className={styles.teamName}>South Korea</span>
                  <span className={styles.teamMeta}>Away</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.tabs}>
            {TABS.map(item => (
              <button
                key={item.id}
                type="button"
                className={`${styles.tab} ${tab === item.id ? styles.tabActive : ''}`}
                onClick={() => setTab(item.id)}
              >
                <item.Icon size={16} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className={styles.body}>
            <div className={styles.placeholder}>
              <p className={styles.placeholderTitle}>Widget pronto pra dados reais</p>
              <p className={styles.placeholderText}>
                Próximo passo: plugar o conteúdo de <b>{tab}</b> baseado no jogo selecionado.
              </p>

              <div className={styles.blocks}>
                <div className={styles.block} />
                <div className={styles.block} />
                <div className={styles.block} />
              </div>
            </div>
          </div>
        </Stack>
      </Section>
    </Surface>
  )
}
