'use client'

import Image from 'next/image'
import type { ReactNode } from 'react'

import type { Fixture } from '@/models/football'
import Surface from '@/components/layout/surface/Surface'
import { Button } from '@/components/ui/button'

import styles from './fixture-card.module.scss'

export type FixtureCardProps = {
  fixture: Fixture
  predictionSummary?: ReactNode
  onAnalyzeClick: (params: {
    leagueCountry: string
    leagueName: string
    rawDate: string
    teamAway: string
    teamAwayLogo: string
    teamHome: string
    teamHomeLogo: string
  }) => void
}

const FixtureCard = ({
  fixture,
  onAnalyzeClick,
  predictionSummary,
}: FixtureCardProps) => {
  const dateObj = new Date(fixture.fixture.date)
  const formattedDate = dateObj.toLocaleDateString('en-US')
  const formattedTime = dateObj.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })

  const handleClick = () => {
    onAnalyzeClick({
      leagueCountry: fixture.league.country,
      leagueName: fixture.league.name,
      rawDate: fixture.fixture.date,
      teamHome: fixture.teams.home.name,
      teamAway: fixture.teams.away.name,
      teamHomeLogo: fixture.teams.home.logo,
      teamAwayLogo: fixture.teams.away.logo,
    })
  }

  return (
    <Surface variant="panel" glow="none" className={styles.card}>
      <div className={styles.layout}>
        {/* Meta */}
        <div className={styles.meta}>
          <div className={styles.flagBox}>
            {fixture.league.flag && (
              <Image
                alt={`${fixture.league.country} flag`}
                src={fixture.league.flag}
                width={36}
                height={24}
                className={styles.flagImg}
              />
            )}
          </div>

          <div className={styles.metaText}>
            <p className={styles.date}>
              {formattedDate} • {formattedTime}
            </p>

            <p className={styles.league} title={fixture.league.name}>
              {fixture.league.name}
            </p>

            <p className={styles.country}>{fixture.league.country}</p>
          </div>
        </div>

        {/* Teams */}
        <div className={styles.teamsRow}>
          <div className={styles.team}>
            <div className={styles.logoWrap}>
              <Image
                alt={`${fixture.teams.home.name} logo`}
                src={fixture.teams.home.logo}
                width={40}
                height={40}
                className={styles.teamLogo}
              />
            </div>

            <span className={styles.teamName}>{fixture.teams.home.name}</span>
          </div>

          <div className={styles.vs}>VS</div>

          <div className={styles.team}>
            <div className={styles.logoWrap}>
              <Image
                alt={`${fixture.teams.away.name} logo`}
                src={fixture.teams.away.logo}
                width={40}
                height={40}
                className={styles.teamLogo}
              />
            </div>

            <span className={styles.teamName}>{fixture.teams.away.name}</span>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <Button
            type="button"
            variant="neon"
            size="lg"
            className={styles.analyzeBtn}
            onClick={handleClick}
          >
            Analisar com IA
          </Button>
        </div>
      </div>

      {predictionSummary && (
        <div className={styles.summary}>{predictionSummary}</div>
      )}
    </Surface>
  )
}

export default FixtureCard
