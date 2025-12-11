// src/components/Prediction/prediction-utils.ts
export type TeamStats = {
  attack: number
  defense: number
  form: number
}

export type MatchStatsSummary = {
  away: TeamStats | null
  home: TeamStats | null
}

export type ScoreGuess = {
  awayGoals: number
  homeGoals: number
}

/**
 * Clamps a numeric value to the [0, 100] range.
 */
export const clamp0to100 = (value: number): number => {
  if (!Number.isFinite(value)) return 0
  if (value < 0) return 0
  if (value > 100) return 100
  return Math.round(value)
}

/**
 * Extracts a simple win probability from the prediction text.
 */
export const extractWinProbabilities = (
  prediction: string,
  teamHome: string,
  teamAway: string,
): { homeWinProb: number; awayWinProb: number } => {
  const text = prediction.replace(/\s+/g, ' ')

  const winMatch = text.match(
    /Mercado Sugerido:\s*Vit[oó]ria do\s+([A-Za-zÀ-ÿ0-9\s\-]+)/i,
  )

  const percentMatch = text.match(
    /Porcentagem Estimada de Acerto:\s*(\d+)\s*%/i,
  )

  if (!winMatch || !percentMatch) {
    return {
      homeWinProb: 50,
      awayWinProb: 50,
    }
  }

  const winnerName = winMatch[1].trim()
  const rawPercent = Number(percentMatch[1])
  const winnerProb = Number.isFinite(rawPercent)
    ? Math.max(0, Math.min(rawPercent, 90))
    : 60

  const winnerIsHome =
    winnerName.toLowerCase().includes(teamHome.toLowerCase())
  const winnerIsAway =
    winnerName.toLowerCase().includes(teamAway.toLowerCase())

  if (winnerIsHome) {
    return {
      homeWinProb: winnerProb,
      awayWinProb: 100 - winnerProb,
    }
  }

  if (winnerIsAway) {
    return {
      homeWinProb: 100 - winnerProb,
      awayWinProb: winnerProb,
    }
  }

  return {
    homeWinProb: 50,
    awayWinProb: 50,
  }
}

/**
 * Extracts a numeric summary for attack/defense/form.
 */
export const extractStatSummary = (
  prediction: string,
): MatchStatsSummary => {
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

  return { home, away }
}

/**
 * Guesses a likely final score.
 */
export const guessScore = (
  prediction: string,
  homeIsFav: boolean,
  awayIsFav: boolean,
): ScoreGuess => {
  const hasUnder25 = /Menos de 2\.5 gols|Under 2\.5/i.test(prediction)
  const hasOver25 = /Mais de 2\.5 gols|Over 2\.5/i.test(prediction)

  if (hasUnder25) {
    if (homeIsFav) {
      return { homeGoals: 1, awayGoals: 0 }
    }

    if (awayIsFav) {
      return { homeGoals: 0, awayGoals: 1 }
    }

    return { homeGoals: 1, awayGoals: 1 }
  }

  if (hasOver25) {
    if (homeIsFav) {
      return { homeGoals: 2, awayGoals: 1 }
    }

    if (awayIsFav) {
      return { homeGoals: 1, awayGoals: 2 }
    }

    return { homeGoals: 2, awayGoals: 2 }
  }

  if (homeIsFav) {
    return { homeGoals: 2, awayGoals: 1 }
  }

  if (awayIsFav) {
    return { homeGoals: 1, awayGoals: 2 }
  }

  return { homeGoals: 1, awayGoals: 1 }
}

/**
 * Returns initials for a given team name.
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}
