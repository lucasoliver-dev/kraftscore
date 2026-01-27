import { apiFootballClient } from '../client'
import type { ApiFootballResponse } from '@/models/football'

/**
 * Search teams by name.
 *
 * API-Football endpoint: GET /teams?search=<query>
 *
 * @param query - Team name or partial name.
 * @returns A promise that resolves to the raw API response payload for teams search.
 */
export async function searchTeams(
  query: string
): Promise<ApiFootballResponse<unknown>> {
  const { data } = await apiFootballClient.get<ApiFootballResponse<unknown>>(
    '/teams',
    {
      params: { search: query },
    }
  )

  return data
}
