import axios from 'axios'
import {
  type ApiFootballResponse,
  type FixtureSource,
  Fixture,
} from '@/models/football'

const API_FOOTBALL_HOST = process.env.NEXT_PUBLIC_API_FOOTBALL_HOST as string
const API_FOOTBALL_KEY = process.env.NEXT_PUBLIC_API_FOOTBALL_KEY as string

/**
 * Axios instance configured to communicate with the API-Football service.
 */
const api = axios.create({
  baseURL: `https://${API_FOOTBALL_HOST}`,
  headers: {
    'X-RapidAPI-Host': API_FOOTBALL_HOST,
    'X-RapidAPI-Key': API_FOOTBALL_KEY,
    'content-type': 'application/octet-stream',
  },
})

/**
 * Fetch fixtures for a given date from API-Football and specialize them
 * into domain models.
 *
 * @param date - The date in YYYY-MM-DD format.
 * @returns A promise that resolves to a list of Fixture domain models.
 */
export async function fetchFixturesByDate(date: string): Promise<Fixture[]> {
  const { data } = await api.get<ApiFootballResponse<FixtureSource>>(
    '/fixtures',
    {
      params: { date },
    }
  )

  return Fixture.specialize(data)
}
