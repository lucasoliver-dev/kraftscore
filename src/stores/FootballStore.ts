import { makeAutoObservable, runInAction } from 'mobx'
import type { Fixture } from '@/models/football'
import { fetchFixturesByDate } from '@/services/footballService'

/**
 * Store responsible for managing football fixtures state
 * and filtering logic for the application.
 */
export class FootballStore {
  allowedLeagueIds: number[] = [39, 135]
  error: string | null = null
  fixtures: Fixture[] = []
  isLoading = false

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

  setAllowedLeagueIds(ids: number[]): void {
    this.allowedLeagueIds = ids
  }
}
