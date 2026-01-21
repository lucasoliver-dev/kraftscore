import { makeAutoObservable } from 'mobx'

import type { Fixture } from '@/models/football'
import type { FootballStore } from '@/stores/FootballStore'

type WidgetsCountryItem = {
  id: string
  label: string
  flag: string | null
  count: number
}

export type WidgetsFixturesTab = 'ALL' | 'LIVE' | 'FINISHED' | 'SCHEDULED'

export type WidgetsFixturesGroup = {
  key: string
  title: string
  leagueId: number
  season: number
  fixtures: Fixture[]
}

/**
 * UI store for Widgets page (filters, tabs, selection).
 * Domain data is read from FootballStore.
 */
export class FootballWidgetsStore {
  private footballStore: FootballStore

  /** Sidebar search query. */
  countriesQuery = ''

  /** Selected country label (ex: "Brazil", "England") */
  selectedCountry: string | null = null

  /** Center column tab. */
  fixturesTab: WidgetsFixturesTab = 'ALL'

  /** Center search query. */
  fixturesQuery = ''

  /** Selected fixture id for MatchPanel. */
  selectedFixtureId: number | null = null

  constructor(footballStore: FootballStore) {
    this.footballStore = footballStore
    makeAutoObservable(this, {}, { autoBind: true })
  }

  /* ==========================================================
   * Helpers
   * ========================================================== */

  private toSlug(value: string): string {
    return value
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '')
  }

  private isLive(short: string): boolean {
    // API-Football tem mais opções, mas essas já cobrem o core
    return (
      short === 'HT' ||
      short === '1H' ||
      short === '2H' ||
      short === 'ET' ||
      short === 'BT' ||
      short === 'P'
    )
  }

  private isScheduled(short: string): boolean {
    return short === 'NS' || short === 'TBD'
  }

  private isFinished(short: string): boolean {
    return short === 'FT' || short === 'AET' || short === 'PEN'
  }

  /* ==========================================================
   * Actions (UI)
   * ========================================================== */

  setCountriesQuery(value: string): void {
    this.countriesQuery = value
  }

  toggleSelectedCountry(label: string): void {
    if (this.selectedCountry === label) {
      this.selectedCountry = null
      return
    }

    this.selectedCountry = label
  }

  setFixturesTab(value: WidgetsFixturesTab): void {
    this.fixturesTab = value
  }

  setFixturesQuery(value: string): void {
    this.fixturesQuery = value
  }

  setSelectedFixtureId(value: number): void {
    this.selectedFixtureId = value
  }

  /* ==========================================================
   * Sidebar - Countries
   * ========================================================== */

  get countries(): WidgetsCountryItem[] {
    const fixtures = Array.isArray(this.footballStore.fixtures)
      ? this.footballStore.fixtures
      : []

    const countryMap = new Map<
      string,
      { flag: string | null; leagueIds: Set<number> }
    >()

    for (const fixture of fixtures) {
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
        id: this.toSlug(label),
        label,
        flag: data.flag,
        count: data.leagueIds.size,
      }))
      .sort((a, b) => b.count - a.count)
  }

  get countriesSearched(): WidgetsCountryItem[] {
    const query = this.countriesQuery.trim().toLowerCase()
    if (!query) return this.countries

    return this.countries.filter(item =>
      item.label.toLowerCase().includes(query)
    )
  }

  /* ==========================================================
   * Center - Fixtures list
   * ========================================================== */

  get fixturesBase(): Fixture[] {
    const fixtures = Array.isArray(this.footballStore.fixtures)
      ? this.footballStore.fixtures
      : []

    const country = this.selectedCountry?.trim()
    if (!country) return fixtures

    return fixtures.filter(fx => fx.league.country === country)
  }

  get fixturesSearched(): Fixture[] {
    const query = this.fixturesQuery.trim().toLowerCase()
    if (!query) return this.fixturesBase

    return this.fixturesBase.filter(fx => {
      const home = fx.teams.home.name.toLowerCase()
      const away = fx.teams.away.name.toLowerCase()
      const league = fx.league.name.toLowerCase()
      const country = fx.league.country.toLowerCase()

      return (
        home.includes(query) ||
        away.includes(query) ||
        league.includes(query) ||
        country.includes(query)
      )
    })
  }

  get fixturesFilteredByTab(): Fixture[] {
    if (this.fixturesTab === 'ALL') return this.fixturesSearched

    return this.fixturesSearched.filter(fx => {
      const short = fx.fixture.status.short

      if (this.fixturesTab === 'LIVE') return this.isLive(short)
      if (this.fixturesTab === 'FINISHED') return this.isFinished(short)
      if (this.fixturesTab === 'SCHEDULED') return this.isScheduled(short)

      return true
    })
  }

  get fixturesGrouped(): WidgetsFixturesGroup[] {
    const map = new Map<number, WidgetsFixturesGroup>()

    for (const fx of this.fixturesFilteredByTab) {
      const leagueId = fx.league.id
      const existing = map.get(leagueId)

      if (!existing) {
        map.set(leagueId, {
          key: `${fx.league.country}-${fx.league.id}`,
          title: `${fx.league.country} • ${fx.league.name}`,
          leagueId: fx.league.id,
          season: fx.league.season,
          fixtures: [fx],
        })
        continue
      }

      existing.fixtures.push(fx)
    }

    return Array.from(map.values())
  }

  get selectedFixture(): Fixture | null {
    if (this.selectedFixtureId === null) return null

    return (
      this.footballStore.fixtures.find(
        fx => fx.fixture.id === this.selectedFixtureId
      ) ?? null
    )
  }
}
