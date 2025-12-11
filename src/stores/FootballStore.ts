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

  /**
   * Creates a new instance of FootballStore.
   */
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
   * Loads fixtures for a given date and updates the store state.
   *
   * @param date - The date in YYYY-MM-DD format.
   */
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

  /**
   * Updates the list of allowed league IDs used to filter fixtures.
   *
   * @param ids - The league IDs to allow.
   */
  setAllowedLeagueIds(ids: number[]): void {
    this.allowedLeagueIds = ids
  }
}
