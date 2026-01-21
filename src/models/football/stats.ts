import type { ApiFootballResponse } from './fixture'

/**
 * Raw response shape from API-Football teams statistics endpoint.
 */
export type TeamStatsSource = {
  league: {
    id: number
    name: string
    country: string
    season: number
  }
  team: {
    id: number
    name: string
    logo: string
  }
  fixtures: {
    played: {
      home: number
      away: number
      total: number
    }
    wins: {
      home: number
      away: number
      total: number
    }
    draws: {
      home: number
      away: number
      total: number
    }
    loses: {
      home: number
      away: number
      total: number
    }
  }
  goals: {
    for: {
      total: {
        home: number | null
        away: number | null
        total: number | null
      }
    }
    against: {
      total: {
        home: number | null
        away: number | null
        total: number | null
      }
    }
  }
}

/**
 * Domain model for team stats.
 */
export class TeamStats {
  teamId: number
  teamName: string
  teamLogo: string

  playedTotal: number
  winsTotal: number
  drawsTotal: number
  losesTotal: number

  goalsForTotal: number
  goalsAgainstTotal: number

  constructor(params: {
    teamId: number
    teamName: string
    teamLogo: string
    playedTotal: number
    winsTotal: number
    drawsTotal: number
    losesTotal: number
    goalsForTotal: number
    goalsAgainstTotal: number
  }) {
    this.teamId = params.teamId
    this.teamName = params.teamName
    this.teamLogo = params.teamLogo

    this.playedTotal = params.playedTotal
    this.winsTotal = params.winsTotal
    this.drawsTotal = params.drawsTotal
    this.losesTotal = params.losesTotal

    this.goalsForTotal = params.goalsForTotal
    this.goalsAgainstTotal = params.goalsAgainstTotal
  }

  static copyFrom(source: TeamStatsSource): TeamStats {
    return new TeamStats({
      teamId: source.team.id,
      teamName: source.team.name,
      teamLogo: source.team.logo,
      playedTotal: source.fixtures.played.total,
      winsTotal: source.fixtures.wins.total,
      drawsTotal: source.fixtures.draws.total,
      losesTotal: source.fixtures.loses.total,
      goalsForTotal: source.goals.for.total.total ?? 0,
      goalsAgainstTotal: source.goals.against.total.total ?? 0,
    })
  }

  static specialize(payload: ApiFootballResponse<TeamStatsSource>): TeamStats {
    const first = payload.response[0]

    if (!first) {
      return new TeamStats({
        teamId: 0,
        teamName: 'Sem dados',
        teamLogo: '',
        playedTotal: 0,
        winsTotal: 0,
        drawsTotal: 0,
        losesTotal: 0,
        goalsForTotal: 0,
        goalsAgainstTotal: 0,
      })
    }

    return TeamStats.copyFrom(first)
  }
}
