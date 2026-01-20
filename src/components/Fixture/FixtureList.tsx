'use client'

import type { PaginationResult } from '@/hooks/usePagination'
import type { Fixture as FixtureModel } from '@/models/football'
import FixtureCard from './FixtureCard'
import PredictionInlineSummary from '@/components/Prediction/PredictionInlineSummary'
import type { PredictionStore } from '@/stores/PredictionStore'

export type FixtureListProps = {
  pagination: PaginationResult<FixtureModel>
  predictionStore: PredictionStore
  selectedFixtureId: number | string | null
  isLoadingPrediction: boolean
  onAnalyze: (fixture: FixtureModel) => void
  onRefresh: (fixture: FixtureModel) => void
}

const FixtureList = ({
  pagination,
  predictionStore,
  selectedFixtureId,
  isLoadingPrediction,
  onAnalyze,
  onRefresh,
}: FixtureListProps) => {
  return (
    <>
      {pagination.items.map((fixture: FixtureModel) => {
        const storedPrediction = predictionStore.getByFixtureId(
          fixture.fixture.id
        )

        const isFixtureRefreshing =
          isLoadingPrediction && selectedFixtureId === fixture.fixture.id

        return (
          <FixtureCard
            key={fixture.fixture.id}
            fixture={fixture}
            onAnalyzeClick={() => onAnalyze(fixture)}
            predictionSummary={
              storedPrediction ? (
                <PredictionInlineSummary
                  date={storedPrediction.date}
                  generatedAt={storedPrediction.createdAt}
                  isRefreshing={isFixtureRefreshing}
                  leagueCountry={storedPrediction.leagueCountry}
                  leagueName={storedPrediction.leagueName}
                  onRefreshClick={() => onRefresh(fixture)}
                  prediction={storedPrediction.prediction}
                  teamAway={storedPrediction.teamAway}
                  teamHome={storedPrediction.teamHome}
                />
              ) : null
            }
          />
        )
      })}
    </>
  )
}

export default FixtureList
