import axios from 'axios'
import {
  Prediction,
  type PredictionRequest,
  type PredictionSource,
} from '@/models/prediction'

/**
 * Calls the local /api/prediction route and maps the response
 * into a Prediction domain model.
 *
 * @param payload - The prediction request payload.
 * @returns A promise that resolves to a Prediction instance.
 */
export async function fetchPrediction(
  payload: PredictionRequest,
): Promise<Prediction> {
  const { data } = await axios.post<PredictionSource>(
    '/api/prediction',
    payload,
  )

  return Prediction.copyFrom(data)
}
