'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { observer } from 'mobx-react-lite'
import {
  BarChart3,
  CalendarDays,
  ListOrdered,
  Users,
  Trophy,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { useStores } from '@/stores/RootStore'

import Surface from '@/components/layout/surface/Surface'
import Section from '@/components/layout/section/Section'
import Stack from '@/components/layout/stack/Stack'
import { Button } from '@/components/ui/button'

import styles from './widgets-match-panel.module.scss'

type PanelTab = 'EVENTS' | 'STATISTICS' | 'LINEUPS' | 'PLAYERS'

const TABS: { id: PanelTab; label: string; Icon: LucideIcon }[] = [
  { id: 'EVENTS', label: 'Events', Icon: ListOrdered },
  { id: 'STATISTICS', label: 'Statistics', Icon: BarChart3 },
  { id: 'LINEUPS', label: 'Lineups', Icon: CalendarDays },
  { id: 'PLAYERS', label: 'Players', Icon: Users },
]

export const WidgetsMatchPanel = observer(() => {
  const { footballWidgetsStore } = useStores()
  const fixture = footballWidgetsStore.selectedFixture

  const [tab, setTab] = useState<PanelTab>('STATISTICS')

  const fixtureId = fixture?.fixture.id

  useEffect(() => {
    if (!fixtureId) return

    // só no mobile/tablet (quando o layout vira coluna)
    if (!window.matchMedia('(max-width: 1100px)').matches) return

    requestAnimationFrame(() => {
      document
        .getElementById('match-panel')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [fixtureId])

  const headerInfo = useMemo(() => {
    if (!fixture) return null

    const competition = `${fixture.league.country} • ${fixture.league.name}`
    const stage = fixture.league.round

    const short = fixture.fixture.status.short
    const elapsed = fixture.fixture.status.elapsed

    // ✅ tempo: se estiver rolando (elapsed), mostra "50’"
    // senão usa o short (HT / FT / NS...)
    const timeLabel =
      typeof elapsed === 'number' && elapsed > 0 ? `${elapsed}’` : short

    return {
      competition,
      stage,
      timeLabel,
      home: {
        name: fixture.teams.home.name,
        logo: fixture.teams.home.logo,
        goals: fixture.goals.home ?? 0,
      },
      away: {
        name: fixture.teams.away.name,
        logo: fixture.teams.away.logo,
        goals: fixture.goals.away ?? 0,
      },
    }
  }, [fixture])

  // Estado vazio: nenhum jogo selecionado
  if (!fixture || !headerInfo) {
    return (
      <Surface>
        <Section>
          <Stack>
            <div className={styles.body}>
              <div className={styles.placeholder}>
                <p className={styles.placeholderTitle}>
                  Selecione um jogo na lista
                </p>
                <p className={styles.placeholderText}>
                  Clique em um fixture para abrir os detalhes aqui.
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

  return (
    <Surface>
      <Section>
        <Stack>
          {/* HEADER */}
          <div className={styles.header}>
            <div className={styles.headerTop}>
              <span className={styles.competition}>
                {headerInfo.competition}
              </span>
              <span className={styles.stage}>{headerInfo.stage}</span>
            </div>

            {/* ✅ Times e placar lado a lado (nome em cima do logo) */}
            <div className={styles.scoreRow}>
              {/* Home */}
              <div className={styles.team}>
                <span className={styles.teamName}>{headerInfo.home.name}</span>

                <div className={styles.logoMock}>
                  <Image
                    src={headerInfo.home.logo}
                    alt={headerInfo.home.name}
                    width={40}
                    height={40}
                    style={{ objectFit: 'contain' }}
                  />
                </div>

                <span className={styles.teamMeta}>Home</span>
              </div>

              {/* Score */}
              <div className={styles.score}>
                <div className={styles.scoreNumbers}>
                  <span className={styles.scoreNum}>
                    {headerInfo.home.goals}
                  </span>
                  <span className={styles.scoreSep}>-</span>
                  <span className={styles.scoreNum}>
                    {headerInfo.away.goals}
                  </span>
                </div>

                {/* ✅ Aqui entra o “50’ / HT / FT” */}
                <span className={styles.status}>{headerInfo.timeLabel}</span>
              </div>

              {/* Away */}
              <div className={styles.team}>
                <span className={styles.teamName}>{headerInfo.away.name}</span>

                <div className={styles.logoMock}>
                  <Image
                    src={headerInfo.away.logo}
                    alt={headerInfo.away.name}
                    width={40}
                    height={40}
                    style={{ objectFit: 'contain' }}
                  />
                </div>

                <span className={styles.teamMeta}>Away</span>
              </div>
            </div>
          </div>

          {/* TABS */}
          <div className={styles.tabs}>
            {TABS.map(item => (
              <Button
                key={item.id}
                type="button"
                variant="secondaryCta"
                size="sm"
                className={styles.tab}
                data-active={tab === item.id ? 'true' : 'false'}
                onClick={() => setTab(item.id)}
              >
                <item.Icon size={16} />
                {item.label}
              </Button>
            ))}
          </div>

          {/* BODY */}
          <div className={styles.body}>
            {tab === 'STATISTICS' ? (
              <div className={styles.placeholder}>
                <p className={styles.placeholderTitle}>
                  Estatísticas do jogo (base)
                </p>
                <p className={styles.placeholderText}>
                  Próximo passo: consumir <b>fixtures/statistics</b> pelo{' '}
                  <b>fixtureId</b>.
                </p>

                <div className={styles.blocks}>
                  <div className={styles.block} />
                  <div className={styles.block} />
                  <div className={styles.block} />
                </div>
              </div>
            ) : tab === 'EVENTS' ? (
              <div className={styles.placeholder}>
                <p className={styles.placeholderTitle}>
                  Eventos (gols, cartões, substituições)
                </p>
                <p className={styles.placeholderText}>
                  Próximo passo: consumir <b>fixtures/events</b> pelo fixtureId.
                </p>

                <div className={styles.blocks}>
                  <div className={styles.block} />
                  <div className={styles.block} />
                  <div className={styles.block} />
                </div>
              </div>
            ) : tab === 'LINEUPS' ? (
              <div className={styles.placeholder}>
                <p className={styles.placeholderTitle}>Lineups</p>
                <p className={styles.placeholderText}>
                  Próximo passo: consumir <b>fixtures/lineups</b> pelo
                  fixtureId.
                </p>

                <div className={styles.blocks}>
                  <div className={styles.block} />
                  <div className={styles.block} />
                  <div className={styles.block} />
                </div>
              </div>
            ) : (
              <div className={styles.placeholder}>
                <p className={styles.placeholderTitle}>Players</p>
                <p className={styles.placeholderText}>
                  Próximo passo: consumir <b>fixtures/players</b> pelo
                  fixtureId.
                </p>

                <div className={styles.blocks}>
                  <div className={styles.block} />
                  <div className={styles.block} />
                  <div className={styles.block} />
                </div>
              </div>
            )}
          </div>

          {/* hint opcional */}
          <div style={{ display: 'none' }}>
            <Trophy size={16} />
          </div>
        </Stack>
      </Section>
    </Surface>
  )
})
