'use client'

import { observer } from 'mobx-react-lite'
import { useEffect, useMemo, useState } from 'react'
import type { Fixture as FixtureModel, FixturesModel } from '@/models/football'
import { useStores } from '@/stores/RootStore'
import usePrediction from '@/hooks/usePrediction'
import Surface from '@/components/layout/surface/Surface'
import { EmptyState, ErrorState, LoadingState } from '@/components/ui/states'
import { usePagination } from '@/hooks/usePagination'

import FixtureSearchBar from './FixtureSearchBar'
import FixtureResults from './FixtureResults'
import FixturePredictionModal from './FixturePredictionModal'
import { formatFixtureDate } from './fixture.utils'

export type FixtureProps = {
  date: string
  sport: string
}

type SelectedFixtureState = {
  fixtureId: number | string
  leagueCountry: string
  leagueName: string
  teamAway: string
  teamAwayLogo: string
  teamHome: string
  teamHomeLogo: string
  date: string // YYYY-MM-DD
} | null

const Fixture = ({ date }: FixtureProps) => {
  const { footballStore, predictionStore } = useStores()

  const [selected, setSelected] = useState<SelectedFixtureState>(null)

  const { prediction, isLoadingPrediction } = usePrediction(
    selected?.leagueCountry ?? '',
    selected?.leagueName ?? '',
    selected?.teamHome ?? '',
    selected?.teamAway ?? '',
    selected?.date ?? ''
  )

  useEffect(() => {
    footballStore.setAllowedLeagueIds([])
    void footballStore.loadFixtures(date)
  }, [date, footballStore])

  const { error, filteredFixtures, searchedFixtures, fixturesQuery, isLoading } =
    footballStore

  const fixturesModel: FixturesModel = useMemo(() => {
    return { fixtures: searchedFixtures }
  }, [searchedFixtures])

  const pagination = usePagination(fixturesModel.fixtures, { pageSize: 20 })

  // ✅ sempre que mudar a data, reseta paginação e limpa o search
  useEffect(() => {
    pagination.reset()
    footballStore.setFixturesQuery('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])

  // ✅ sempre que mudar a busca, reseta paginação
  useEffect(() => {
    pagination.reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fixturesQuery])

  useEffect(() => {
    if (!prediction || !selected) return

    predictionStore.setPrediction({
      date: selected.date,
      fixtureId: String(selected.fixtureId),
      leagueCountry: selected.leagueCountry,
      leagueName: selected.leagueName,
      prediction,
      teamAway: selected.teamAway,
      teamHome: selected.teamHome,
    })
  }, [prediction, predictionStore, selected])

  const openPrediction = (fixture: FixtureModel) => {
    setSelected({
      fixtureId: fixture.fixture.id,
      leagueCountry: fixture.league.country,
      leagueName: fixture.league.name,
      teamAway: fixture.teams.away.name,
      teamAwayLogo: fixture.teams.away.logo,
      teamHome: fixture.teams.home.name,
      teamHomeLogo: fixture.teams.home.logo,
      date: formatFixtureDate(fixture.fixture.date),
    })
  }

  const closeModal = () => setSelected(null)

  // ✅ estados de tela
  if (isLoading) {
    return <LoadingState title="Carregando partidas..." />
  }

  if (error) {
    return (
      <ErrorState title="Erro ao carregar jogos" description={String(error)} />
    )
  }

  const hasQuery = fixturesQuery.trim().length > 0
  const hasBaseFixtures = filteredFixtures.length > 0
  const hasResults = fixturesModel.fixtures.length > 0

  // ✅ Só mostra EmptyState global se a API não trouxe nada e não tem query
  if (!hasBaseFixtures && !hasQuery) {
    return (
      <EmptyState
        title="Nenhum jogo encontrado"
        description="Nenhum jogo encontrado para as ligas selecionadas nesta data."
      />
    )
  }

  return (
    <>
      <Surface>
        <FixtureSearchBar
          value={fixturesQuery}
          hasQuery={hasQuery}
          onChange={(event) => footballStore.setFixturesQuery(event.target.value)}
          onClear={() => footballStore.setFixturesQuery('')}
        />

        <FixtureResults
          hasResults={hasResults}
          fixturesQuery={fixturesQuery}
          pagination={pagination}
          predictionStore={predictionStore}
          selectedFixtureId={selected?.fixtureId ?? null}
          isLoadingPrediction={isLoadingPrediction}
          onAnalyze={openPrediction}
          onRefresh={openPrediction}
        />
      </Surface>

      <FixturePredictionModal
        isOpen={!!selected}
        selected={
          selected
            ? {
                date: selected.date,
                leagueCountry: selected.leagueCountry,
                leagueName: selected.leagueName,
                teamAway: selected.teamAway,
                teamAwayLogo: selected.teamAwayLogo,
                teamHome: selected.teamHome,
                teamHomeLogo: selected.teamHomeLogo,
              }
            : null
        }
        prediction={prediction}
        isLoadingPrediction={isLoadingPrediction}
        onClose={closeModal}
      />
    </>
  )
}

export default observer(Fixture)
