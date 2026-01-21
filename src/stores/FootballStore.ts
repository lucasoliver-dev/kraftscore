import { makeAutoObservable, runInAction } from 'mobx'

import type { Fixture, Standings } from '@/models/football'
import {
  fetchFixturesByDate,
  fetchStandingsByLeague,
} from '@/services/api-football/footballService'

type WidgetsCountryItem = {
  id: string
  label: string
  flag: string | null
  count: number
}

/**
 * Store responsible for managing football fixtures state
 * and filtering logic for the application.
 */
export class FootballStore {
  allowedLeagueIds: number[] = [39, 140, 135, 78, 61]
  error: string | null = null
  fixtures: Fixture[] = []
  fixturesDate: string | null = null
  isLoading = false

  /** Standings loaded by league. */
  standings: Standings | null = null

  /** Loading state for standings requests. */
  isLoadingStandings = false

  /** Error state for standings requests. */
  standingsError: string | null = null

  /** Search query typed by the user (team/league/country). */
  fixturesQuery = ''

  constructor() {
    makeAutoObservable(this)
  }

  /**
   * Returns fixtures filtered by the allowed league IDs.
   */
  get filteredFixtures(): Fixture[] {
    if (!this.allowedLeagueIds.length) {
      return this.fixtures
    }

    return this.fixtures.filter(fixture =>
      this.allowedLeagueIds.includes(fixture.league.id)
    )
  }

  /**
   * Fixtures filtered by search query (team, league, country).
   */
  get searchedFixtures(): Fixture[] {
    const query = this.fixturesQuery.trim().toLowerCase()

    if (!query) return this.filteredFixtures

    return this.filteredFixtures.filter((fixture: Fixture) => {
      const home = fixture.teams.home.name.toLowerCase()
      const away = fixture.teams.away.name.toLowerCase()
      const league = fixture.league.name.toLowerCase()
      const country = fixture.league.country.toLowerCase()

      return (
        home.includes(query) ||
        away.includes(query) ||
        league.includes(query) ||
        country.includes(query)
      )
    })
  }

  /**
   * Updates fixtures search query.
   */
  setFixturesQuery(value: string): void {
    this.fixturesQuery = value
  }

  async loadFixtures(date: string): Promise<void> {
    this.isLoading = true
    this.error = null

    try {
      const fixtures = await fetchFixturesByDate(date)

      runInAction(() => {
        this.fixtures = fixtures
        this.fixturesDate = date
        this.isLoading = false
      })
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to load fixtures'

      runInAction(() => {
        this.error = message
        this.isLoading = false
      })
    }
  }

  /**
   * Loads standings by league + season.
   */
  async loadStandingsByLeague(leagueId: number, season: number): Promise<void> {
    this.isLoadingStandings = true
    this.standingsError = null

    try {
      const standings = await fetchStandingsByLeague(leagueId, season)

      runInAction(() => {
        this.standings = standings
        this.isLoadingStandings = false
      })
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to load standings'

      runInAction(() => {
        this.standingsError = message
        this.isLoadingStandings = false
      })
    }
  }

  /**
   * Highlights usados na Home.
   * Se não existir jogo nas ligas permitidas, usamos fallback geral.
   */
  get homeHighlights(): Fixture[] {
    const base =
      this.filteredFixtures.length > 0 ? this.filteredFixtures : this.fixtures

    return base.slice(0, 6)
  }

  setAllowedLeagueIds(ids: number[]): void {
    this.allowedLeagueIds = ids
  }

  /**
   * Countries list for Widgets sidebar.
   * Built dynamically from fixtures already loaded.
   *
   * Count = number of UNIQUE leagues found for the country.
   */
  get widgetsCountries(): WidgetsCountryItem[] {
    const countryMap = new Map<
      string,
      { flag: string | null; leagueIds: Set<number> }
    >()

    for (const fixture of this.fixtures) {
      const country = fixture.league.country?.trim()
      if (!country) continue

      const current = countryMap.get(country)

      if (!current) {
        countryMap.set(country, {
          flag: fixture.league.flag ?? null,
          leagueIds: new Set([fixture.league.id]),
        })
        continue
      }

      current.leagueIds.add(fixture.league.id)

      if (!current.flag && fixture.league.flag) {
        current.flag = fixture.league.flag
      }
    }

    return Array.from(countryMap.entries())
      .map(([label, data]) => ({
        id: label.toLowerCase().replace(/\s+/g, '-'),
        label,
        flag: data.flag,
        count: data.leagueIds.size,
      }))
      .sort((a, b) => b.count - a.count)
  }
}
