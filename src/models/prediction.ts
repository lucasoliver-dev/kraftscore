/**
 * Payload sent to the prediction API route.
 */
export type PredictionRequest = {
  date: string
  leagueCountry: string
  leagueName: string
  teamAway: string
  teamHome: string
}

/**
 * Raw response shape returned by the prediction API route.
 */
export type PredictionSource = {
  prediction?: string
}

/**
 * Domain model for an AI prediction.
 */
export class Prediction {
  text: string

  /**
   * Creates a new instance of Prediction.
   *
   * @param params - The constructor parameters.
   * @param params.text - The prediction text.
   */
  constructor(params: { text: string }) {
    this.text = params.text
  }

  /**
   * Builds a Prediction instance from a raw API response.
   *
   * @param source - The raw prediction response from the API.
   * @returns A new Prediction domain model instance.
   */
  static copyFrom(source: PredictionSource): Prediction {
    return new Prediction({
      text:
        source.prediction ??
        'A API respondeu, mas não veio nenhuma previsão no campo "prediction".',
    })
  }
}
