'use client'

import { makeAutoObservable, runInAction } from 'mobx'

/**
 * Single AI prediction stored for a fixture.
 */
export type StoredPrediction = {
  /** Match date in YYYY-MM-DD format. */
  date: string
  /** ISO string of when the prediction was generated. */
  createdAt: string
  /** Unique fixture identifier (stringified). */
  fixtureId: string
  /** League country name. */
  leagueCountry: string
  /** League name. */
  leagueName: string
  /** Raw AI prediction markdown text. */
  prediction: string
  /** Away team name. */
  teamAway: string
  /** Home team name. */
  teamHome: string
}

/**
 * Input shape for storing a prediction. The createdAt field is optional
 * and will be filled automatically when omitted.
 */
export type StoredPredictionInput = Omit<StoredPrediction, 'createdAt'> & {
  /** Optional ISO creation timestamp. If omitted, now() is used. */
  createdAt?: string
}

/** Local storage key used to persist predictions. */
const STORAGE_KEY = 'kbet:predictions:v1'

/**
 * MobX store responsible for caching AI predictions per fixture.
 *
 * It keeps predictions in memory and also persists them to localStorage,
 * so previously analyzed matches can be shown inline after a page refresh.
 */
export class PredictionStore {
  /** Internal map of predictions, indexed by fixture id. */
  predictionsByFixtureId = new Map<string, StoredPrediction>()

  constructor() {
    makeAutoObservable(this)

    if (typeof window !== 'undefined') {
      this.hydrateFromStorage()
    }
  }

  /**
   * Clears all cached predictions (memory + localStorage).
   */
  clearAll() {
    this.predictionsByFixtureId.clear()
    this.saveToStorage()
  }

  /**
   * Returns a prediction by fixture id, if available.
   *
   * @param fixtureId - Unique fixture identifier (number or string).
   */
  getByFixtureId(fixtureId: number | string) {
    return this.predictionsByFixtureId.get(String(fixtureId))
  }

  /**
   * Loads predictions from localStorage into the internal map.
   * If older records do not have createdAt, it will be filled with now().
   */
  private hydrateFromStorage() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (!raw) return

      const parsed = JSON.parse(raw) as StoredPredictionInput[]
      if (!Array.isArray(parsed)) return

      runInAction(() => {
        this.predictionsByFixtureId.clear()

        for (const record of parsed) {
          if (!record?.fixtureId) continue

          const createdAt =
            record.createdAt ?? new Date().toISOString()

          const normalized: StoredPrediction = {
            createdAt,
            date: record.date,
            fixtureId: String(record.fixtureId),
            leagueCountry: record.leagueCountry,
            leagueName: record.leagueName,
            prediction: record.prediction,
            teamAway: record.teamAway,
            teamHome: record.teamHome,
          }

          this.predictionsByFixtureId.set(
            normalized.fixtureId,
            normalized,
          )
        }
      })
    } catch (error) {
      console.error(
        '[PredictionStore] Failed to hydrate from storage',
        error,
      )
    }
  }

  /**
   * Persists the current prediction map to localStorage.
   */
  private saveToStorage() {
    try {
      if (typeof window === 'undefined') return

      const payload = Array.from(this.predictionsByFixtureId.values())
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    } catch (error) {
      console.error(
        '[PredictionStore] Failed to save to storage',
        error,
      )
    }
  }

  /**
   * Stores or updates a prediction for a specific fixture,
   * and persists the updated state to localStorage.
   *
   * If createdAt is not provided, the current timestamp is used.
   *
   * @param record - Prediction record to be stored.
   */
  setPrediction(record: StoredPredictionInput) {
    const createdAt = record.createdAt ?? new Date().toISOString()

    const normalized: StoredPrediction = {
      createdAt,
      date: record.date,
      fixtureId: String(record.fixtureId),
      leagueCountry: record.leagueCountry,
      leagueName: record.leagueName,
      prediction: record.prediction,
      teamAway: record.teamAway,
      teamHome: record.teamHome,
    }

    this.predictionsByFixtureId.set(
      normalized.fixtureId,
      normalized,
    )
    this.saveToStorage()
  }
}
