import { apiFootballClient } from '../client'
import type { ApiFootballResponse } from '@/models/football'

/**
 * Fetch available seasons for the current plan.
 *
 * @returns A promise that resolves to an array of season years.
 */
export async function fetchAvailableSeasons(): Promise<number[]> {
  const { data } = await apiFootballClient.get<ApiFootballResponse<number>>(
    '/leagues/seasons'
  )

  return data.response
}

/**
 * Resolves a requested season to the closest available season for the current API plan.
 *
 * Rules:
 * - If the requested season exists in the available list, return it.
 * - Otherwise, return the greatest available season that is <= requested.
 * - If none is <= requested, return the smallest available season.
 */
export async function resolveSeason(requestedSeason: number): Promise<number> {
  const seasons = await fetchAvailableSeasons()
  const sorted = [...seasons].sort((a, b) => a - b)

  if (sorted.length === 0) return requestedSeason
  if (sorted.includes(requestedSeason)) return requestedSeason

  const fallback = [...sorted].reverse().find(s => s <= requestedSeason)
  return fallback ?? sorted[0]
}
