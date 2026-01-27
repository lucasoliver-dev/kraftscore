import { apiFootballClient } from './client'
import {
  Fixture,
  Standings,
  type ApiFootballResponse,
  type FixtureSource,
  type StandingsSource,
} from '@/models/football'

/**
 * Fetch fixtures for a given date using local Next.js API route,
 * then specialize them into domain models.
 *
 * @param date - The date in YYYY-MM-DD format.
 * @returns A promise that resolves to a list of Fixture domain models.
 */
export async function fetchFixturesByDate(date: string): Promise<Fixture[]> {
  const { data } = await apiFootballClient.get<
    ApiFootballResponse<FixtureSource>
  >('/fixtures', {
    params: { date },
  })

  return Fixture.specialize(data)
}

/**
 * Fetch standings for a given league and season.
 *
 * @param leagueId - League id from API-Football.
 * @param season - Season year (ex: 2026).
 * @returns A promise that resolves to the standings domain model.
 */
export async function fetchStandingsByLeague(
  leagueId: number,
  season: number
): Promise<Standings> {
  const { data } = await apiFootballClient.get<
    ApiFootballResponse<StandingsSource>
  >('/standings', {
    params: { league: leagueId, season },
  })

  return Standings.specialize(data)
}
