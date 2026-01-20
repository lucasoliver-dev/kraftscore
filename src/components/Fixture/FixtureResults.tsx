'use client'

import List from '@/components/layout/list/List'
import { EmptyState } from '@/components/ui/states'
import { Pagination } from '@/components/ui/pagination'
import type { PaginationResult } from '@/hooks/usePagination'
import type { Fixture as FixtureModel } from '@/models/football'
import type { PredictionStore } from '@/stores/PredictionStore'
import FixtureList from './FixtureList'

export type FixtureResultsProps = {
  hasResults: boolean
  fixturesQuery: string
  pagination: PaginationResult<FixtureModel>
  predictionStore: PredictionStore
  selectedFixtureId: number | string | null
  isLoadingPrediction: boolean
  onAnalyze: (fixture: FixtureModel) => void
  onRefresh: (fixture: FixtureModel) => void
}

const FixtureResults = ({
  hasResults,
  fixturesQuery,
  pagination,
  predictionStore,
  selectedFixtureId,
  isLoadingPrediction,
  onAnalyze,
  onRefresh,
}: FixtureResultsProps) => {
  if (!hasResults) {
    return (
      <EmptyState
        title="Nenhum jogo encontrado"
        description={`Não encontramos resultados para "${fixturesQuery}".`}
      />
    )
  }

  return (
    <>
      <List>
        <FixtureList
          pagination={pagination}
          predictionStore={predictionStore}
          selectedFixtureId={selectedFixtureId}
          isLoadingPrediction={isLoadingPrediction}
          onAnalyze={onAnalyze}
          onRefresh={onRefresh}
        />
      </List>

      <Pagination
        page={pagination.page}
        totalPages={pagination.totalPages}
        canGoPrev={pagination.canGoPrev}
        canGoNext={pagination.canGoNext}
        onPrev={pagination.prev}
        onNext={pagination.next}
      />
    </>
  )
}

export default FixtureResults
