import axios from 'axios'
import {
  type ApiFootballResponse,
  type FixtureSource,
  Fixture,
} from '@/models/football'

/**
 * Fetch fixtures for a given date using local Next.js API route,
 * then specialize them into domain models.
 *
 * @param date - The date in YYYY-MM-DD format.
 * @returns A promise that resolves to a list of Fixture domain models.
 */
export async function fetchFixturesByDate(date: string): Promise<Fixture[]> {
  const { data } = await axios.get<ApiFootballResponse<FixtureSource>>(
    '/api/football/fixtures',
    {
      params: { date },
    }
  )

  return Fixture.specialize(data)
}
