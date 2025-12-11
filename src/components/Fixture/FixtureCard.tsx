'use client'

import Image from 'next/image'
import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import type { Fixture } from '@/models/football'

/**
 * Props for the FixtureCard component.
 */
export type FixtureCardProps = {
  /**
   * Single fixture model.
   */
  fixture: Fixture
  /**
   * Optional inline AI prediction summary to be shown below
   * the main card content.
   */
  predictionSummary?: ReactNode
  /**
   * Callback invoked when the user clicks "Analisar com IA".
   */
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

/**
 * Card component that displays a single football fixture
 * with a dark theme and centered team logos.
 */
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
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-zinc-50 shadow-sm sm:px-5 sm:py-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
        {/* Left column: date + league + country */}
        <div className="flex items-start gap-3 md:w-64">
          {/* Sempre renderiza o “slot” da bandeira */}
          <div className="mt-0.5 flex h-7 w-10 items-center justify-center overflow-hidden rounded-md border border-zinc-700 bg-zinc-800">
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
            <p className="font-semibold text-zinc-100">
              {formattedDate} at {formattedTime}
            </p>
            <p className="text-[13px] font-medium text-zinc-300 truncate max-w-[210px]">
              {fixture.league.name}
            </p>
            <p className="text-[11px] text-zinc-500">
              {fixture.league.country}
            </p>
          </div>
        </div>

        {/* Coluna central: times + escudos centralizados */}
        <div className="flex w-full flex-1 flex-col items-center gap-3 md:flex-row md:items-center md:justify-center md:gap-8">
          {/* Time da casa */}
          <div className="flex min-w-[130px] flex-col items-center gap-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800">
              <Image
                alt={`${fixture.teams.home.name} logo`}
                src={fixture.teams.home.logo}
                width={40}
                height={40}
                className="h-9 w-9 object-contain"
              />
            </div>
            <span className="mt-0.5 flex h-[30px] max-w-[120px] items-center justify-center text-center text-xs leading-tight text-zinc-100">
              {fixture.teams.home.name}
            </span>
          </div>

          {/* VS */}
          <div className="flex items-center justify-center text-xs font-semibold uppercase tracking-wide text-zinc-500">
            VS
          </div>

          {/* Time visitante */}
          <div className="flex min-w-[130px] flex-col items-center gap-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800">
              <Image
                alt={`${fixture.teams.away.name} logo`}
                src={fixture.teams.away.logo}
                width={40}
                height={40}
                className="h-9 w-9 object-contain"
              />
            </div>
            <span className="mt-0.5 flex h-[30px] max-w-[120px] items-center justify-center text-center text-xs leading-tight text-zinc-100">
              {fixture.teams.away.name}
            </span>
          </div>
        </div>

        {/* Right column: analysis button */}
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

      {/* Inline AI summary (optional) */}
      {predictionSummary && (
        <div className="mt-3 border-t border-zinc-800 pt-3">
          {predictionSummary}
        </div>
      )}
    </div>
  )
}

export default FixtureCard
