import type { ApiFootballResponse } from './fixture'

/**
 * Raw standing row returned by API-Football standings endpoint.
 */
export type StandingRowSource = {
  all: {
    draw: number
    goals: {
      against: number
      for: number
    }
    lose: number
    played: number
    win: number
  }
  points: number
  rank: number
  team: {
    id: number
    logo: string
    name: string
  }
}

/**
 * Raw league standings wrapper.
 */
export type StandingsLeagueSource = {
  id: number
  name: string
  country: string
  season: number
  standings: StandingRowSource[][]
}

/**
 * Raw standings response item.
 */
export type StandingsSource = {
  league: StandingsLeagueSource
}

/**
 * Domain model for a single row in standings table.
 */
export class StandingRow {
  rank: number
  points: number
  teamId: number
  teamName: string
  teamLogo: string
  played: number
  win: number
  draw: number
  lose: number
  goalsFor: number
  goalsAgainst: number

  constructor(params: {
    rank: number
    points: number
    teamId: number
    teamName: string
    teamLogo: string
    played: number
    win: number
    draw: number
    lose: number
    goalsFor: number
    goalsAgainst: number
  }) {
    this.rank = params.rank
    this.points = params.points
    this.teamId = params.teamId
    this.teamName = params.teamName
    this.teamLogo = params.teamLogo
    this.played = params.played
    this.win = params.win
    this.draw = params.draw
    this.lose = params.lose
    this.goalsFor = params.goalsFor
    this.goalsAgainst = params.goalsAgainst
  }

  static copyFrom(source: StandingRowSource): StandingRow {
    return new StandingRow({
      rank: source.rank,
      points: source.points,
      teamId: source.team.id,
      teamName: source.team.name,
      teamLogo: source.team.logo,
      played: source.all.played,
      win: source.all.win,
      draw: source.all.draw,
      lose: source.all.lose,
      goalsFor: source.all.goals.for,
      goalsAgainst: source.all.goals.against,
    })
  }
}

/**
 * Domain model for standings list.
 */
export class Standings {
  rows: StandingRow[]

  constructor(params: { rows: StandingRow[] }) {
    this.rows = params.rows
  }

  static specialize(payload: ApiFootballResponse<StandingsSource>): Standings {
    const first = payload.response[0]
    const table = first?.league?.standings?.[0] ?? []
    const rows = table.map(item => StandingRow.copyFrom(item))

    return new Standings({ rows })
  }
}
