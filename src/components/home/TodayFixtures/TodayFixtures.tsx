'use client'

import Link from 'next/link'
import Image from 'next/image'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { Bot } from 'lucide-react'

import type { Fixture } from '@/models/football'
import { useStores } from '@/stores/RootStore'
import { cn } from '@/lib/utils'

import Surface from '@/components/layout/surface/Surface'
import Section from '@/components/layout/section/Section'
import Stack from '@/components/layout/stack/Stack'
import List from '@/components/layout/list/List'

import styles from './today-fixtures.module.scss'

function toYYYYMMDD(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function formatKickoff(dateString: string): string {
  const date = new Date(dateString)

  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function getStatusLabel(short: string): string {
  switch (short) {
    case 'NS':
      return 'Agendado'
    case 'FT':
      return 'Finalizado'
    case 'HT':
      return 'Intervalo'
    case '1H':
    case '2H':
      return 'Ao vivo'
    default:
      return short
  }
}

type StatusVariant = 'live' | 'scheduled' | 'finished' | 'neutral'

function getStatusVariant(short: string): StatusVariant {
  switch (short) {
    case 'NS':
      return 'scheduled'
    case 'FT':
      return 'finished'
    case 'HT':
    case '1H':
    case '2H':
      return 'live'
    default:
      return 'neutral'
  }
}

function getScoreText(fixture: Fixture): string {
  const home = fixture.goals.home
  const away = fixture.goals.away

  if (home === null || away === null) return '—'
  return `${home} - ${away}`
}

export const TodayFixtures = observer(() => {
  const { footballStore } = useStores()

  useEffect(() => {
    const today = toYYYYMMDD(new Date())

    if (footballStore.fixturesDate !== today && !footballStore.isLoading) {
      footballStore.loadFixtures(today)
    }
  }, [footballStore])

  const hasError = !footballStore.isLoading && Boolean(footballStore.error)
  const isEmpty =
    !footballStore.isLoading &&
    !footballStore.error &&
    footballStore.homeHighlights.length === 0

  const hasList =
    !footballStore.isLoading &&
    !footballStore.error &&
    footballStore.homeHighlights.length > 0

  return (
    <Surface>
      {/* ✅ aqui a gente controla o padding DO CARD TODO */}
      <Section density="default">
        <Stack>
          <div className={styles.header}>
            <div className={styles.headerInfo}>
              <p className={styles.title}>Jogos de hoje</p>
              <p className={styles.subtitle}>
                Jogos reais carregados da API (ligas permitidas).
              </p>
            </div>

            <Link href="/fixtures" className={styles.headerLink}>
              Ver todos →
            </Link>
          </div>

          {footballStore.isLoading && (
            <div className={styles.state}>
              <p className={styles.stateTitle}>Carregando jogos…</p>
              <p className={styles.stateText}>
                Buscando fixtures do dia na API.
              </p>
            </div>
          )}

          {hasError && (
            <div className={styles.state}>
              <p className={styles.stateTitle}>Não foi possível carregar</p>
              <p className={styles.stateText}>{footballStore.error}</p>
            </div>
          )}

          {isEmpty && (
            <div className={styles.state}>
              <p className={styles.stateTitle}>Nenhum jogo encontrado</p>
              <p className={styles.stateText}>
                Tente alterar as ligas permitidas no `FootballStore`.
              </p>
            </div>
          )}

          {hasList && (
            <List scroll fade maxHeight={560} gap="md">
              {footballStore.homeHighlights.map(item => {
                const variant = getStatusVariant(item.fixture.status.short)

                return (
                  <article
                    key={item.fixture.id}
                    className={styles.card}
                    aria-label={`${item.teams.home.name} x ${item.teams.away.name}`}
                  >
                    <div className={styles.left}>
                      <div className={styles.timeRow}>
                        <span className={styles.kickoff}>
                          {formatKickoff(item.fixture.date)}
                        </span>

                        <span
                          className={cn(
                            styles.status,
                            styles[`status_${variant}`]
                          )}
                        >
                          {getStatusLabel(item.fixture.status.short)}
                        </span>
                      </div>

                      <p className={styles.league}>
                        {item.league.name} • {item.league.country}
                      </p>

                      <div className={styles.teams}>
                        <div className={styles.teamLine}>
                          <Image
                            className={styles.teamLogo}
                            src={item.teams.home.logo}
                            alt={item.teams.home.name}
                            width={18}
                            height={18}
                            sizes="18px"
                          />
                          <span className={styles.teamName}>
                            {item.teams.home.name}
                          </span>
                        </div>

                        <div className={styles.teamLine}>
                          <Image
                            className={styles.teamLogo}
                            src={item.teams.away.logo}
                            alt={item.teams.away.name}
                            width={18}
                            height={18}
                            sizes="18px"
                          />
                          <span className={styles.teamName}>
                            {item.teams.away.name}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.right}>
                      <span className={styles.score}>{getScoreText(item)}</span>

                      <Link href="/predictions" className={styles.aiButton}>
                        <Bot size={16} />
                        <span>Analisar IA</span>
                      </Link>
                    </div>
                  </article>
                )
              })}
            </List>
          )}
        </Stack>
      </Section>
    </Surface>
  )
})
