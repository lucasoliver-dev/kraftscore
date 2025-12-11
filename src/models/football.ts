/**
 * Represents the league information returned by the API-Football fixtures endpoint.
 */
export type League = {
  country: string
  flag: string | null
  id: number
  logo: string | null
  name: string
  round: string
  season: number
}

/**
 * Represents a team inside a fixture (home or away).
 */
export type TeamInfo = {
  id: number
  logo: string
  name: string
  winner: boolean | null
}

/**
 * Represents the basic fixture information (metadata about the match).
 */
export type FixtureInfo = {
  date: string
  id: number
  status: {
    elapsed: number | null
    long: string
    short: string
  }
  timezone: string
}

/**
 * Represents a collection of fixtures used in the UI layer.
 */
export type FixturesModel = {
  fixtures: Fixture[]
}

/**
 * Represents the goals scored in a fixture.
 */
export type Goals = {
  away: number | null
  home: number | null
}

/**
 * Raw fixture item as returned by the API-Football fixtures endpoint.
 * This type mirrors the JSON payload.
 */
export type FixtureSource = {
  fixture: FixtureInfo
  goals: Goals
  league: League
  teams: {
    away: TeamInfo
    home: TeamInfo
  }
}

/**
 * Generic wrapper for API-Football responses that contain a list of items.
 */
export type ApiFootballResponse<T> = {
  response: T[]
  results: number
}

/**
 * Domain model for a football fixture, specialized from the raw API-Football response.
 * This class is responsible for mapping and adapting the JSON payload.
 */
export class Fixture {
  fixture: FixtureInfo
  goals: Goals
  league: League
  teams: {
    away: TeamInfo
    home: TeamInfo
  }

  /**
   * Creates a new instance of Fixture.
   *
   * @param params - The constructor parameters.
   * @param params.fixture - The fixture metadata.
   * @param params.goals - The goals scored in the fixture.
   * @param params.league - The league information.
   * @param params.teams - The teams that are playing this fixture.
   */
  constructor(params: {
    fixture: FixtureInfo
    goals: Goals
    league: League
    teams: {
      away: TeamInfo
      home: TeamInfo
    }
  }) {
    this.fixture = params.fixture
    this.goals = params.goals
    this.league = params.league
    this.teams = params.teams
  }

  /**
   * Builds a Fixture instance from a raw API-Football fixture object.
   *
   * @param source - The raw fixture object from the API.
   * @returns A new Fixture domain model instance.
   */
  static copyFrom(source: FixtureSource): Fixture {
    return new Fixture({
      fixture: source.fixture,
      goals: source.goals,
      league: source.league,
      teams: source.teams,
    })
  }

  /**
   * Maps an API-Football response object into a list of Fixture domain models.
   *
   * @param payload - The API response containing raw fixtures.
   * @returns A list of Fixture domain model instances.
   */
  static specialize(payload: ApiFootballResponse<FixtureSource>): Fixture[] {
    return payload.response.map((item) => Fixture.copyFrom(item))
  }
}
