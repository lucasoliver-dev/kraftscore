'use client'

import { makeAutoObservable } from 'mobx'
import type { Fixture } from '@/models/football'
import type { FootballStore } from '@/stores/FootballStore'

export type FixtureListStoreConfig = {
  pageSize?: number
}

/**
 * UI store for fixtures list: search + pagination.
 * Depends on FootballStore for fixtures source data.
 */
export class FixtureListStore {
  private footballStore: FootballStore

  search = ''
  page = 1
  pageSize = 20

  constructor(footballStore: FootballStore, config?: FixtureListStoreConfig) {
    this.footballStore = footballStore
    this.pageSize = config?.pageSize ?? 20

    makeAutoObservable(this, {}, { autoBind: true })
  }

  /** Fixtures already filtered by allowed leagues (from FootballStore) */
  get sourceFixtures(): Fixture[] {
    return this.footballStore.filteredFixtures
  }

  /** Normalized search string */
  get normalizedSearch(): string {
    return this.search.trim().toLowerCase()
  }

  /** Search-filtered fixtures */
  get filteredFixtures(): Fixture[] {
    const q = this.normalizedSearch
    if (!q) return this.sourceFixtures

    return this.sourceFixtures.filter((fixture) => {
      const league = fixture.league.name?.toLowerCase() ?? ''
      const country = fixture.league.country?.toLowerCase() ?? ''
      const home = fixture.teams.home.name?.toLowerCase() ?? ''
      const away = fixture.teams.away.name?.toLowerCase() ?? ''

      return (
        league.includes(q) ||
        country.includes(q) ||
        home.includes(q) ||
        away.includes(q)
      )
    })
  }

  /** Total items after filtering */
  get totalItems(): number {
    return this.filteredFixtures.length
  }

  /** Total pages based on pageSize */
  get totalPages(): number {
    const total = Math.ceil(this.totalItems / this.pageSize)
    return Math.max(total, 1)
  }

  /** Current page items */
  get currentItems(): Fixture[] {
    const clampedPage = Math.min(Math.max(this.page, 1), this.totalPages)
    const start = (clampedPage - 1) * this.pageSize
    const end = start + this.pageSize
    return this.filteredFixtures.slice(start, end)
  }

  get hasPrev(): boolean {
    return this.page > 1
  }

  get hasNext(): boolean {
    return this.page < this.totalPages
  }

  setSearch(value: string) {
    this.search = value
    this.page = 1
  }

  nextPage() {
    if (this.hasNext) this.page += 1
  }

  prevPage() {
    if (this.hasPrev) this.page -= 1
  }

  goToPage(targetPage: number) {
    const clamped = Math.min(Math.max(targetPage, 1), this.totalPages)
    this.page = clamped
  }

  reset() {
    this.search = ''
    this.page = 1
  }

  /**
   * Call this whenever new fixtures are loaded,
   * so pagination doesn't point to an invalid page.
   */
  syncPageBounds() {
    if (this.page > this.totalPages) this.page = 1
  }
}
