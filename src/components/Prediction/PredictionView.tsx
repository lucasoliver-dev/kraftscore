// src/components/Prediction/PredictionView.tsx
'use client'

import React from 'react'
import PredictionHeader from './PredictionHeader'
import PredictionMarkets from './PredictionMarkets'
import PredictionPerformance from './PredictionPerformance'
import PredictionResultIndicators from './PredictionResultIndicators'
import PredictionScoreGuess from './PredictionScoreGuess'
import PredictionTextAnalysis from './PredictionTextAnalysis'
import {
  extractStatSummary,
  extractWinProbabilities,
  guessScore,
} from './prediction-utils'

export type PredictionViewProps = {
  date: string
  leagueCountry: string
  leagueName: string
  prediction: string
  teamAway: string
  teamAwayLogo?: string
  teamHome: string
  teamHomeLogo?: string
}

/**
 * Top-level component that orchestrates the prediction view sections.
 */
const PredictionView = ({
  date,
  leagueCountry,
  leagueName,
  prediction,
  teamAway,
  teamAwayLogo,
  teamHome,
  teamHomeLogo,
}: PredictionViewProps) => {
  const trimmed = prediction.trim()

  const marker = '### Previsões'
  const hasMarker = trimmed.includes(marker)

  const analysisMarkdown = hasMarker ? trimmed.split(marker)[0] : trimmed

  const predictionsMarkdown = hasMarker
    ? `${marker}${trimmed.split(marker)[1]}`
    : ''

  const { homeWinProb, awayWinProb } = extractWinProbabilities(
    trimmed,
    teamHome,
    teamAway
  )

  const stats = extractStatSummary(trimmed)

  const homeIsFav = homeWinProb >= awayWinProb
  const awayIsFav = awayWinProb > homeWinProb

  const scoreGuess = guessScore(trimmed, homeIsFav, awayIsFav)

  return (
    <div className="space-y-6 text-zinc-50">
      <PredictionHeader
        date={date}
        leagueCountry={leagueCountry}
        leagueName={leagueName}
        teamAway={teamAway}
        teamHome={teamHome}
      />

      <PredictionPerformance
        stats={stats}
        teamAway={teamAway}
        teamHome={teamHome}
      />

      <PredictionResultIndicators
        awayWinProb={awayWinProb}
        homeWinProb={homeWinProb}
        teamAway={teamAway}
        teamHome={teamHome}
      />

      {analysisMarkdown && (
        <PredictionTextAnalysis markdown={analysisMarkdown} />
      )}

      {predictionsMarkdown && (
        <PredictionMarkets markdown={predictionsMarkdown} />
      )}

      <PredictionScoreGuess
        guess={scoreGuess}
        teamAway={teamAway}
        teamAwayLogo={teamAwayLogo}
        teamHome={teamHome}
        teamHomeLogo={teamHomeLogo}
      />

      {!predictionsMarkdown && (
        <p className="text-xs text-zinc-500">
          Esta análise foi gerada automaticamente pela IA com base nas
          informações recentes das equipes. Use sempre em conjunto com sua
          própria leitura de jogo.
        </p>
      )}
    </div>
  )
}

export default PredictionView
