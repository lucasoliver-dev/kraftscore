import { apiFootballClient } from '../client'
import type { ApiFootballResponse } from '@/models/football'
import { resolveSeason } from '@/services/api-football/seasons'

/**
 * Fetch statistics for a given fixture (match).
 *
 * API-Football endpoint: GET /fixtures/statistics?fixture=<id>
 *
 * @param fixtureId - Fixture id from API-Football.
 * @returns A promise that resolves to the raw API response payload for fixture statistics.
 */
export async function fetchFixtureStatistics(
  fixtureId: number
): Promise<ApiFootballResponse<unknown>> {
  const { data } = await apiFootballClient.get<ApiFootballResponse<unknown>>(
    '/fixtures/statistics',
    {
      params: { fixture: fixtureId },
    }
  )

  return data
}

/**
 * Fetch aggregated team statistics for a given league and season.
 *
 * API-Football endpoint: GET /teams/statistics?league=<id>&season=<year>&team=<id>
 *
 * Note:
 * - This uses resolveSeason() to avoid plan restrictions (ex: free plan not allowing 2025+).
 *
 * @param leagueId - League id from API-Football.
 * @param season - Season year (ex: 2026).
 * @param teamId - Team id from API-Football.
 * @returns A promise that resolves to the raw API response payload for team statistics.
 */
export async function fetchTeamStatistics(
  leagueId: number,
  season: number,
  teamId: number
): Promise<ApiFootballResponse<unknown>> {
  const resolvedSeason = await resolveSeason(season)

  const { data } = await apiFootballClient.get<ApiFootballResponse<unknown>>(
    '/teams/statistics',
    {
      params: { league: leagueId, season: resolvedSeason, team: teamId },
    }
  )

  return data
}
