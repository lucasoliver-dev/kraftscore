import { useEffect, useState } from 'react'
import { Prediction, type PredictionRequest } from '@/models/prediction/prediction'
import { fetchPrediction } from '@/services/prediction/predictionService'

/**
 * Result returned by the usePrediction hook.
 */
export type UsePredictionResult = {
  /**
   * The prediction text ready to be displayed in the UI.
   */
  prediction: string
  /**
   * Indicates whether the prediction is currently being loaded.
   */
  isLoadingPrediction: boolean
}

/**
 * Custom hook responsible for requesting an AI prediction
 * based on league and teams information.
 *
 * It calls the local /api/prediction route and maps the response
 * into a domain model before exposing the final text to the UI.
 *
 * The request is only triggered when all arguments are present.
 * It also avoids state updates after component unmount using a cancel flag.
 *
 * @param leagueCountry - The league country.
 * @param leagueName - The league name.
 * @param teamHome - The home team name.
 * @param teamAway - The away team name.
 * @param date - The match date in YYYY-MM-DD format.
 * @returns An object with the prediction text and the loading state.
 */
const usePrediction = (
  leagueCountry: string,
  leagueName: string,
  teamHome: string,
  teamAway: string,
  date: string
): UsePredictionResult => {
  const [predictionModel, setPredictionModel] = useState<Prediction | null>(
    null
  )
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // se faltar algum dado, não chama a API
    if (!leagueCountry || !leagueName || !teamHome || !teamAway || !date) {
      return
    }

    let cancelled = false

    const fetchData = async () => {
      setIsLoading(true)
      setPredictionModel(null)

      try {
        const payload: PredictionRequest = {
          date,
          leagueCountry,
          leagueName,
          teamAway,
          teamHome,
        }

        const result = await fetchPrediction(payload)

        if (!cancelled) {
          setPredictionModel(result)
        }
      } catch (error) {
        console.error('Error fetching prediction:', error)

        if (!cancelled) {
          setPredictionModel(
            new Prediction({
              text: 'Não foi possível gerar a previsão no momento. Tente novamente mais tarde.',
            })
          )
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void fetchData()

    // evita setState depois do unmount
    return () => {
      cancelled = true
    }
  }, [leagueCountry, leagueName, teamHome, teamAway, date])

  return {
    prediction: predictionModel?.text ?? '',
    isLoadingPrediction: isLoading,
  }
}

export default usePrediction
