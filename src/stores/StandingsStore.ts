import { makeAutoObservable, runInAction } from 'mobx'
import type { Standings } from '@/models/football'
import { fetchStandingsByLeague } from '@/services/api-football/footballService'

/**
 * Store responsible for managing standings state.
 */
export class StandingsStore {
  standings: Standings | null = null
  isLoading = false
  error: string | null = null

  constructor() {
    makeAutoObservable(this)
  }

  async loadStandings(leagueId: number, season: number): Promise<void> {
    this.isLoading = true
    this.error = null

    try {
      const standings = await fetchStandingsByLeague(leagueId, season)

      runInAction(() => {
        this.standings = standings
        this.isLoading = false
      })
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to load standings'

      runInAction(() => {
        this.error = message
        this.isLoading = false
      })
    }
  }

  clear(): void {
    this.standings = null
    this.error = null
    this.isLoading = false
  }
}
