'use client'

import { Loader2 } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import FixtureCard from '@/components/Fixture/FixtureCard'
import PredictionInlineSummary from '@/components/Prediction/PredictionInlineSummary'
import PredictionView from '@/components/Prediction/PredictionView'
import Modal from '@/components/shared/Modal'
import type { FixturesModel } from '@/models/football'
import { useStores } from '@/stores/RootStore'
import usePrediction from '@/hooks/usePrediction'

/**
 * Props for the Fixture component.
 */
export type FixtureProps = {
  /** The selected date used to load fixtures (YYYY-MM-DD). */
  date: string
  /** The selected sport (currently only football is supported). */
  sport: string
}

/**
 * Displays a list of football fixtures and integrates with the AI prediction modal.
 */
const Fixture = ({ date }: FixtureProps) => {
  const { footballStore, predictionStore } = useStores()

  const [selectedDate, setSelectedDate] = useState('')
  const [selectedFixtureId, setSelectedFixtureId] = useState<
    number | string | null
  >(null)
  const [selectedLeagueCountry, setSelectedLeagueCountry] = useState('')
  const [selectedLeagueName, setSelectedLeagueName] = useState('')
  const [selectedTeamAway, setSelectedTeamAway] = useState('')
  const [selectedTeamAwayLogo, setSelectedTeamAwayLogo] = useState('')
  const [selectedTeamHome, setSelectedTeamHome] = useState('')
  const [selectedTeamHomeLogo, setSelectedTeamHomeLogo] = useState('')

  const { prediction, isLoadingPrediction } = usePrediction(
    selectedLeagueCountry,
    selectedLeagueName,
    selectedTeamHome,
    selectedTeamAway,
    selectedDate
  )

  useEffect(() => {
    /**
     * Allowed league ids filter can be adjusted here.
     * Example: Premier League (39) + Serie A (135).
     */
    footballStore.setAllowedLeagueIds([])
    void footballStore.loadFixtures(date)
  }, [date, footballStore])

  const { error, filteredFixtures, isLoading } = footballStore

  const fixturesModel: FixturesModel = {
    fixtures: filteredFixtures,
  }

  /**
   * Whenever a new prediction is available for the currently selected fixture,
   * store it in the PredictionStore so it can be reused inline and persisted.
   */
  useEffect(() => {
    if (
      !prediction ||
      !selectedFixtureId ||
      !selectedDate ||
      !selectedLeagueCountry ||
      !selectedLeagueName ||
      !selectedTeamHome ||
      !selectedTeamAway
    ) {
      return
    }

    predictionStore.setPrediction({
      date: selectedDate,
      fixtureId: String(selectedFixtureId),
      leagueCountry: selectedLeagueCountry,
      leagueName: selectedLeagueName,
      prediction,
      teamAway: selectedTeamAway,
      teamHome: selectedTeamHome,
    })
  }, [
    prediction,
    predictionStore,
    selectedDate,
    selectedFixtureId,
    selectedLeagueCountry,
    selectedLeagueName,
    selectedTeamAway,
    selectedTeamHome,
  ])

  /**
   * Handles the click event to open the prediction modal
   * and formats the fixture date for the AI prediction hook.
   *
   * @param params - Match identification data.
   */
  const handlePredictionClick = (params: {
    fixtureId: number | string
    leagueCountry: string
    leagueName: string
    rawDate: string
    teamAway: string
    teamAwayLogo: string
    teamHome: string
    teamHomeLogo: string
  }) => {
    const {
      fixtureId,
      leagueCountry,
      leagueName,
      rawDate,
      teamAway,
      teamAwayLogo,
      teamHome,
      teamHomeLogo,
    } = params

    setSelectedFixtureId(fixtureId)
    setSelectedLeagueCountry(leagueCountry)
    setSelectedLeagueName(leagueName)
    setSelectedTeamHome(teamHome)
    setSelectedTeamAway(teamAway)
    setSelectedTeamAwayLogo(teamAwayLogo)
    setSelectedTeamHomeLogo(teamHomeLogo)

    const d = new Date(rawDate)
    const year = d.getFullYear()
    const monthNumber = d.getMonth() + 1
    const dayNumber = d.getDate()
    const month = monthNumber < 10 ? `0${monthNumber}` : String(monthNumber)
    const day = dayNumber < 10 ? `0${dayNumber}` : String(dayNumber)

    setSelectedDate(`${year}-${month}-${day}`)
  }

  /**
   * Clears modal-related state and closes the prediction modal.
   */
  const closeModal = () => {
    setSelectedFixtureId(null)
    setSelectedLeagueCountry('')
    setSelectedLeagueName('')
    setSelectedTeamHome('')
    setSelectedTeamAway('')
    setSelectedDate('')
    setSelectedTeamAwayLogo('')
    setSelectedTeamHomeLogo('')
  }

  if (isLoading) {
    return (
      <div className="mt-4 flex items-center justify-center text-sm text-zinc-300">
        <Loader2 className="mr-2 h-4 w-4 animate-spin text-orange-400" />
        Carregando partidas...
      </div>
    )
  }

  if (error) {
    return (
      <div className="mt-4 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
        Erro ao carregar jogos: {error}
      </div>
    )
  }

  if (!fixturesModel.fixtures.length) {
    return (
      <div className="mt-4 rounded-md border border-zinc-700 bg-zinc-900/70 px-3 py-2 text-sm text-zinc-300">
        Nenhum jogo encontrado para as ligas selecionadas nesta data.
      </div>
    )
  }

  const isModalOpen =
    !!selectedLeagueCountry &&
    !!selectedLeagueName &&
    !!selectedTeamHome &&
    !!selectedTeamAway &&
    !!selectedDate

  return (
    <>
      {/* Main fixtures list container */}
      <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-3 sm:p-4">
        <div className="flex flex-col gap-3">
          {fixturesModel.fixtures.map(fixture => {
            const storedPrediction = predictionStore.getByFixtureId(
              fixture.fixture.id
            )

            const isFixtureRefreshing =
              isLoadingPrediction && selectedFixtureId === fixture.fixture.id

            return (
              <FixtureCard
                key={fixture.fixture.id}
                fixture={fixture}
                onAnalyzeClick={params =>
                  handlePredictionClick({
                    ...params,
                    fixtureId: fixture.fixture.id,
                  })
                }
                predictionSummary={
                  storedPrediction ? (
                    <PredictionInlineSummary
                      date={storedPrediction.date}
                      generatedAt={storedPrediction.createdAt}
                      isRefreshing={isFixtureRefreshing}
                      leagueCountry={storedPrediction.leagueCountry}
                      leagueName={storedPrediction.leagueName}
                      onRefreshClick={() =>
                        handlePredictionClick({
                          fixtureId: fixture.fixture.id,
                          leagueCountry: fixture.league.country,
                          leagueName: fixture.league.name,
                          rawDate: fixture.fixture.date,
                          teamAway: fixture.teams.away.name,
                          teamAwayLogo: fixture.teams.away.logo,
                          teamHome: fixture.teams.home.name,
                          teamHomeLogo: fixture.teams.home.logo,
                        })
                      }
                      prediction={storedPrediction.prediction}
                      teamAway={storedPrediction.teamAway}
                      teamHome={storedPrediction.teamHome}
                    />
                  ) : null
                }
              />
            )
          })}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {isLoadingPrediction ? (
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <Loader2 className="h-4 w-4 animate-spin text-orange-400" />
            <span>Gerando análise com IA...</span>
          </div>
        ) : (
          <PredictionView
            date={selectedDate}
            leagueCountry={selectedLeagueCountry}
            leagueName={selectedLeagueName}
            prediction={prediction}
            teamAway={selectedTeamAway}
            teamAwayLogo={selectedTeamAwayLogo}
            teamHome={selectedTeamHome}
            teamHomeLogo={selectedTeamHomeLogo}
          />
        )}
      </Modal>
    </>
  )
}

export default observer(Fixture)
