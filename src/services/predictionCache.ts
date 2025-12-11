// src/services/predictionCache.ts

/**
 * Parameters that identify a unique AI prediction for a match.
 */
export type PredictionKeyParams = {
  date: string
  leagueCountry: string
  leagueName: string
  teamAway: string
  teamHome: string
}

/**
 * Cache entry storing the prediction and its creation timestamp.
 */
type PredictionCacheEntry = {
  createdAt: number
  prediction: string
}

/**
 * Time-to-live for cache entries (in milliseconds).
 *
 * Currently: 6 hours.
 */
const CACHE_TTL_MS = 6 * 60 * 60 * 1000

/**
 * In-memory cache map.
 * Lives at module level, so it persists enquanto o processo do Node estiver rodando.
 */
const predictionCache = new Map<string, PredictionCacheEntry>()

/**
 * Normalizes strings to build a stable cache key.
 *
 * @param value - Raw value.
 * @returns Lower-cased, trimmed, space-collapsed string.
 */
const normalize = (value: string): string =>
  value.trim().toLowerCase().replace(/\s+/g, ' ')

/**
 * Builds a cache key from prediction parameters.
 *
 * @param params - Prediction key parameters.
 */
const buildCacheKey = (params: PredictionKeyParams): string => {
  const parts: string[] = [
    normalize(params.leagueCountry),
    normalize(params.leagueName),
    normalize(params.teamHome),
    normalize(params.teamAway),
    params.date,
  ]

  return parts.join('|')
}

/**
 * Returns a cached prediction if available and not expired.
 *
 * @param params - Prediction key parameters.
 * @returns Cached prediction string or null.
 */
export const getCachedPrediction = (
  params: PredictionKeyParams
): string | null => {
  const key = buildCacheKey(params)
  const entry = predictionCache.get(key)

  if (!entry) {
    return null
  }

  const isExpired = Date.now() - entry.createdAt > CACHE_TTL_MS

  if (isExpired) {
    predictionCache.delete(key)
    return null
  }

  return entry.prediction
}

/**
 * Saves a prediction in cache.
 *
 * @param params - Prediction key parameters.
 * @param prediction - The AI-generated prediction text.
 */
export const setCachedPrediction = (
  params: PredictionKeyParams,
  prediction: string
): void => {
  const key = buildCacheKey(params)

  predictionCache.set(key, {
    createdAt: Date.now(),
    prediction,
  })

  if (process.env.NODE_ENV !== 'production') {
    console.log('[PredictionCache] SET', { key, params })
  }
}
