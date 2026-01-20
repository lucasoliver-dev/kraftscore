'use client'

import Image from 'next/image'
import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import type { Fixture } from '@/models/football'

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
    <Card className="rounded-2xl bg-card/70 px-4 py-3 sm:px-5 sm:py-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
        {/* Left column */}
        <div className="flex items-start gap-3 md:w-64">
          <div className="mt-0.5 flex h-7 w-10 items-center justify-center overflow-hidden rounded-md border border-border bg-muted">
            {fixture.league.flag && (
              <Image
                alt={`${fixture.league.country} flag`}
                src={fixture.league.flag}
                width={40}
                height={28}
                className="h-full w-full object-cover"
              />
            )}
          </div>

          <div className="text-xs sm:text-sm">
            <p className="font-semibold text-foreground">
              {formattedDate} at {formattedTime}
            </p>

            <p className="max-w-[210px] truncate text-[13px] font-medium text-muted-foreground">
              {fixture.league.name}
            </p>

            <p className="text-[11px] text-muted-foreground/70">
              {fixture.league.country}
            </p>
          </div>
        </div>

        {/* Center */}
        <div className="flex w-full flex-1 flex-col items-center gap-3 md:flex-row md:items-center md:justify-center md:gap-8">
          <div className="flex min-w-[130px] flex-col items-center gap-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <Image
                alt={`${fixture.teams.home.name} logo`}
                src={fixture.teams.home.logo}
                width={40}
                height={40}
                className="h-9 w-9 object-contain"
              />
            </div>

            <span className="mt-0.5 flex h-[30px] max-w-[120px] items-center justify-center text-center text-xs leading-tight text-foreground">
              {fixture.teams.home.name}
            </span>
          </div>

          <div className="flex items-center justify-center text-xs font-semibold uppercase tracking-wide text-muted-foreground/70">
            VS
          </div>

          <div className="flex min-w-[130px] flex-col items-center gap-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <Image
                alt={`${fixture.teams.away.name} logo`}
                src={fixture.teams.away.logo}
                width={40}
                height={40}
                className="h-9 w-9 object-contain"
              />
            </div>

            <span className="mt-0.5 flex h-[30px] max-w-[120px] items-center justify-center text-center text-xs leading-tight text-foreground">
              {fixture.teams.away.name}
            </span>
          </div>
        </div>

        {/* Right */}
        <div className="flex justify-end md:justify-center">
          <Button
            type="button"
            variant="neon"
            size="lg"
            className="w-full max-w-[150px] text-xs font-semibold sm:text-sm"
            onClick={handleClick}
          >
            Analisar com IA
          </Button>
        </div>
      </div>

      {predictionSummary && (
        <div className="mt-3 border-t border-border pt-3">
          {predictionSummary}
        </div>
      )}
    </Card>
  )
}

export default FixtureCard
