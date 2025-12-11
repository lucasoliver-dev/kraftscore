'use client'

import { useMemo, useState } from 'react'
import {
  ChevronDown,
  ChevronUp,
  History,
  LineChart,
  RefreshCw,
  Target,
} from 'lucide-react'

/**
 * Inline summary props for a single fixture prediction.
 */
export type PredictionInlineSummaryProps = {
  /**
   * Match date in ISO format (YYYY-MM-DD or full ISO).
   */
  date: string
  /**
   * League country.
   */
  leagueCountry: string
  /**
   * League name.
   */
  leagueName: string
  /**
   * Raw AI prediction markdown text.
   */
  prediction: string
  /**
   * Away team name.
   */
  teamAway: string
  /**
   * Home team name.
   */
  teamHome: string
  /**
   * ISO timestamp of when the prediction was generated.
   */
  generatedAt?: string
  /**
   * Whether this prediction is currently being refreshed.
   */
  isRefreshing?: boolean
  /**
   * Optional callback to request a new prediction.
   */
  onRefreshClick?: () => void
}

/**
 * Represents numeric stats for a single team.
 */
type TeamStats = {
  /** Attack strength from 0 to 100. */
  attack: number
  /** Defensive strength from 0 to 100. */
  defense: number
  /** Recent form from 0 to 100. */
  form: number
}

/**
 * Represents parsed stats summary for both teams.
 */
type MatchStatsSummary = {
  /** Home team stats. */
  home: TeamStats | null
  /** Away team stats. */
  away: TeamStats | null
}

/**
 * Represents a simple score guess.
 */
type ScoreGuess = {
  /** Away team goals. */
  awayGoals: number
  /** Home team goals. */
  homeGoals: number
}

/**
 * Clamps a numeric value to the [0, 100] range.
 *
 * @param value - Raw numeric value.
 */
const clamp0to100 = (value: number): number => {
  if (!Number.isFinite(value)) return 0
  if (value < 0) return 0
  if (value > 100) return 100
  return Math.round(value)
}

/**
 * Extracts win probabilities for home and away teams from the prediction text.
 *
 * @param prediction - Raw prediction text.
 * @param teamHome - Home team name.
 * @param teamAway - Away team name.
 */
const extractWinProbabilities = (
  prediction: string,
  teamHome: string,
  teamAway: string
): { homeWinProb: number; awayWinProb: number } => {
  const text = prediction.replace(/\s+/g, ' ')

  const winMatch = text.match(
    /Mercado Sugerido:\s*Vit[oó]ria do\s+([A-Za-zÀ-ÿ0-9\s\-]+)/i
  )

  const percentMatch = text.match(
    /Porcentagem Estimada de Acerto:\s*(\d+)\s*%/i
  )

  if (!winMatch || !percentMatch) {
    return {
      awayWinProb: 50,
      homeWinProb: 50,
    }
  }

  const winnerName = winMatch[1].trim()
  const rawPercent = Number(percentMatch[1])
  const winnerProb = Number.isFinite(rawPercent)
    ? Math.max(0, Math.min(rawPercent, 90))
    : 60

  const winnerIsHome = winnerName.toLowerCase().includes(teamHome.toLowerCase())
  const winnerIsAway = winnerName.toLowerCase().includes(teamAway.toLowerCase())

  if (winnerIsHome) {
    return {
      awayWinProb: 100 - winnerProb,
      homeWinProb: winnerProb,
    }
  }

  if (winnerIsAway) {
    return {
      awayWinProb: winnerProb,
      homeWinProb: 100 - winnerProb,
    }
  }

  return {
    awayWinProb: 50,
    homeWinProb: 50,
  }
}

/**
 * Extracts numeric stats for both teams from the "Resumo Estatístico" section.
 *
 * @param prediction - Raw prediction text.
 */
const extractStatSummary = (prediction: string): MatchStatsSummary => {
  const homeRegex =
    /Time da casa\s*\([^)]+\):\s*Ataque:\s*(\d+)\/100,\s*Defesa:\s*(\d+)\/100,\s*Forma recente:\s*(\d+)\/100/i

  const awayRegex =
    /Time visitante\s*\([^)]+\):\s*Ataque:\s*(\d+)\/100,\s*Defesa:\s*(\d+)\/100,\s*Forma recente:\s*(\d+)\/100/i

  const homeMatch = prediction.match(homeRegex)
  const awayMatch = prediction.match(awayRegex)

  const home: TeamStats | null = homeMatch
    ? {
        attack: clamp0to100(Number(homeMatch[1])),
        defense: clamp0to100(Number(homeMatch[2])),
        form: clamp0to100(Number(homeMatch[3])),
      }
    : null

  const away: TeamStats | null = awayMatch
    ? {
        attack: clamp0to100(Number(awayMatch[1])),
        defense: clamp0to100(Number(awayMatch[2])),
        form: clamp0to100(Number(awayMatch[3])),
      }
    : null

  return { away, home }
}

/**
 * Guesses a likely final score based on textual hints and favorite side.
 *
 * @param prediction - Raw prediction text.
 * @param homeIsFav - Whether the home team is favorite.
 * @param awayIsFav - Whether the away team is favorite.
 */
const guessScore = (
  prediction: string,
  homeIsFav: boolean,
  awayIsFav: boolean
): ScoreGuess => {
  const hasUnder25 = /Menos de 2\.5 gols|Under 2\.5/i.test(prediction)
  const hasOver25 = /Mais de 2\.5 gols|Over 2\.5/i.test(prediction)

  if (hasUnder25) {
    if (homeIsFav) {
      return { awayGoals: 0, homeGoals: 1 }
    }

    if (awayIsFav) {
      return { awayGoals: 1, homeGoals: 0 }
    }

    return { awayGoals: 1, homeGoals: 1 }
  }

  if (hasOver25) {
    if (homeIsFav) {
      return { awayGoals: 1, homeGoals: 2 }
    }

    if (awayIsFav) {
      return { awayGoals: 2, homeGoals: 1 }
    }

    return { awayGoals: 2, homeGoals: 2 }
  }

  if (homeIsFav) {
    return { awayGoals: 1, homeGoals: 2 }
  }

  if (awayIsFav) {
    return { awayGoals: 2, homeGoals: 1 }
  }

  return { awayGoals: 1, homeGoals: 1 }
}

/**
 * Formats an ISO date string into a short relative time in Portuguese.
 *
 * Examples: "agora", "há 5 min", "há 2 h", "há 3 d".
 *
 * @param iso - ISO timestamp string.
 */
const formatRelativeTimeFromIso = (iso?: string): string => {
  if (!iso) return ''

  const created = new Date(iso)
  if (Number.isNaN(created.getTime())) return ''

  const now = new Date()
  const diffMs = now.getTime() - created.getTime()

  if (diffMs < 0) return 'agora'

  const diffSeconds = Math.floor(diffMs / 1000)
  const diffMinutes = Math.floor(diffSeconds / 60)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMinutes < 1) return 'agora'
  if (diffHours < 1) return `há ${diffMinutes} min`
  if (diffDays < 1) return `há ${diffHours} h`
  return `há ${diffDays} d`
}

/**
 * Small colored bar used to represent a 0–100 stat value.
 *
 * @param label - Stat label.
 * @param value - Stat value.
 * @param tone - Tailwind color tone name.
 */
const StatBar = ({
  label,
  value,
  tone,
}: {
  label: string
  value: number
  tone: 'orange' | 'sky' | 'amber'
}) => {
  const toneClass =
    tone === 'orange'
      ? 'bg-orange-500'
      : tone === 'sky'
      ? 'bg-sky-500'
      : 'bg-amber-400'

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-[11px] text-zinc-400">
        <span>{label}</span>
        <span>{value}/100</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-zinc-800">
        <div
          className={`h-1.5 rounded-full ${toneClass}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

/**
 * Compact inline prediction summary rendered inside the fixture card.
 * Shows AI score guess, win probabilities, collapsible stat bars
 * and a small footer with last-updated time and refresh control.
 */
const PredictionInlineSummary = ({
  date,
  generatedAt,
  isRefreshing,
  leagueCountry,
  leagueName,
  onRefreshClick,
  prediction,
  teamAway,
  teamHome,
}: PredictionInlineSummaryProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const { homeWinProb, awayWinProb, stats, scoreGuess } = useMemo(() => {
    const win = extractWinProbabilities(prediction, teamHome, teamAway)
    const statsSummary = extractStatSummary(prediction)

    const homeIsFav = win.homeWinProb >= win.awayWinProb
    const awayIsFav = win.awayWinProb > win.homeWinProb

    const score = guessScore(prediction, homeIsFav, awayIsFav)

    return {
      awayWinProb: win.awayWinProb,
      homeWinProb: win.homeWinProb,
      scoreGuess: score,
      stats: statsSummary,
    }
  }, [prediction, teamAway, teamHome])

  const homeIsFav = homeWinProb >= awayWinProb
  const awayIsFav = awayWinProb > homeWinProb

  const formattedDate = useMemo(() => {
    const d = new Date(date)
    if (Number.isNaN(d.getTime())) return date
    return d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }, [date])

  const relativeTime = useMemo(
    () => formatRelativeTimeFromIso(generatedAt),
    [generatedAt]
  )

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-3 text-xs text-zinc-200">
      <div className="flex items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-1">
            <Target className="h-3.5 w-3.5 text-orange-400" />
            <span className="text-[11px] font-semibold uppercase tracking-wide text-zinc-300">
              Resumo da IA
            </span>
          </div>
          <p className="mt-0.5 text-[10px] text-zinc-500">
            {leagueName} · {leagueCountry} · {formattedDate}
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-full border border-zinc-700 bg-zinc-900 px-2 py-1 text-[10px] font-medium text-zinc-300 hover:border-orange-500 hover:text-orange-400"
          onClick={() => setIsExpanded(current => !current)}
        >
          {isExpanded ? 'Esconder detalhes' : 'Ver detalhes'}
          {isExpanded ? (
            <ChevronUp className="h-3 w-3" />
          ) : (
            <ChevronDown className="h-3 w-3" />
          )}
        </button>
      </div>

      {/* Score guess + win probabilities */}
      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col items-center gap-1 sm:flex-row sm:justify-center sm:gap-4">
          <span className="max-w-[120px] text-center text-[11px] text-zinc-300">
            {teamHome}
          </span>

          <div className="rounded-md border border-orange-500/60 bg-zinc-900 px-3 py-1.5 text-lg font-semibold tracking-widest text-orange-400">
            {scoreGuess.homeGoals} <span className="text-zinc-500">x</span>{' '}
            {scoreGuess.awayGoals}
          </div>

          <span className="max-w-[120px] text-center text-[11px] text-zinc-300">
            {teamAway}
          </span>
        </div>

        <div className="flex-1 space-y-2">
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-medium text-zinc-200">{teamHome}</span>
              <span className="text-zinc-400">{homeWinProb.toFixed(0)}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-zinc-800">
              <div
                className={`h-1.5 rounded-full ${
                  homeIsFav ? 'bg-emerald-500' : 'bg-red-500'
                }`}
                style={{ width: `${homeWinProb}%` }}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-medium text-zinc-200">{teamAway}</span>
              <span className="text-zinc-400">{awayWinProb.toFixed(0)}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-zinc-800">
              <div
                className={`h-1.5 rounded-full ${
                  awayIsFav ? 'bg-emerald-500' : 'bg-red-500'
                }`}
                style={{ width: `${awayWinProb}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* High-level textual summary based on probabilities */}
      <p className="mt-2 text-[10px] leading-relaxed text-zinc-500">
        {homeIsFav && !awayIsFav && (
          <>
            A IA enxerga uma leve vantagem para{' '}
            <span className="font-semibold text-zinc-300">{teamHome}</span>, mas
            sem descartar o potencial de {teamAway}.
          </>
        )}

        {awayIsFav && !homeIsFav && (
          <>
            A análise indica{' '}
            <span className="font-semibold text-zinc-300">{teamAway}</span> como
            lado mais forte, mesmo jogando fora, enquanto {teamHome} precisa de
            mais eficiência para surpreender.
          </>
        )}

        {!homeIsFav && !awayIsFav && (
          <>
            As probabilidades estão bem equilibradas, sugerindo um confronto
            aberto em que pequenos detalhes podem decidir o resultado.
          </>
        )}
      </p>

      {/* Collapsible detailed stats */}
      {isExpanded && (
        <>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {stats.home && (
              <div className="space-y-2 rounded-lg border border-zinc-800 bg-zinc-900/70 p-2.5">
                <div className="mb-1 flex items-center gap-1.5">
                  <LineChart className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-[11px] font-semibold text-zinc-200">
                    {teamHome} · Casa
                  </span>
                </div>
                <StatBar
                  label="Ataque"
                  tone="orange"
                  value={stats.home.attack}
                />
                <StatBar label="Defesa" tone="sky" value={stats.home.defense} />
                <StatBar
                  label="Forma recente"
                  tone="amber"
                  value={stats.home.form}
                />
              </div>
            )}

            {stats.away && (
              <div className="space-y-2 rounded-lg border border-zinc-800 bg-zinc-900/70 p-2.5">
                <div className="mb-1 flex items-center gap-1.5">
                  <LineChart className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-[11px] font-semibold text-zinc-200">
                    {teamAway} · Fora
                  </span>
                </div>
                <StatBar
                  label="Ataque"
                  tone="orange"
                  value={stats.away.attack}
                />
                <StatBar label="Defesa" tone="sky" value={stats.away.defense} />
                <StatBar
                  label="Forma recente"
                  tone="amber"
                  value={stats.away.form}
                />
              </div>
            )}
          </div>

          <p className="mt-2 text-[10px] leading-relaxed text-zinc-500">
            Ataque indica capacidade de criar e converter chances; defesa mede a
            solidez sem a bola; e forma recente resume o momento geral das
            equipes nos últimos jogos. Use esses números como um radar rápido de
            tendência, e não como verdade absoluta.
          </p>
        </>
      )}

      {/* Footer: last analysis + refresh */}
      {(relativeTime || onRefreshClick) && (
        <div className="mt-3 flex items-center justify-between gap-2 text-[10px] text-zinc-500">
          {relativeTime && (
            <span className="inline-flex items-center gap-1">
              <History className="h-3 w-3" />
              <span>Gerada {relativeTime}</span>
            </span>
          )}

          {onRefreshClick && (
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-full border border-zinc-700 bg-zinc-900 px-2 py-0.5 text-[10px] font-medium text-zinc-200 hover:border-orange-500 hover:text-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isRefreshing}
              onClick={onRefreshClick}
            >
              <RefreshCw
                className={`h-3 w-3 ${isRefreshing ? 'animate-spin' : ''}`}
              />
              {isRefreshing ? 'Atualizando...' : 'Atualizar análise'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default PredictionInlineSummary
