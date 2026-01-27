import { apiFootballClient } from '../client'
import type { ApiFootballResponse } from '@/models/football'

/**
 * Search leagues by name or partial name.
 *
 * API-Football endpoint: GET /leagues?search=<query>
 *
 * @param query - League name or partial name.
 * @returns A promise that resolves to the raw API response payload for leagues search.
 */
export async function searchLeagues(
  query: string
): Promise<ApiFootballResponse<unknown>> {
  const { data } = await apiFootballClient.get<ApiFootballResponse<unknown>>(
    '/leagues',
    { params: { search: query } }
  )

  return data
}

/**
 * Fetch available seasons for the current plan.
 *
 * API-Football endpoint: GET /leagues/seasons
 *
 * @returns A promise that resolves to an array of season years.
 */
export async function fetchLeagueSeasons(): Promise<number[]> {
  const { data } = await apiFootballClient.get<ApiFootballResponse<number>>(
    '/leagues/seasons'
  )

  return data.response
}
